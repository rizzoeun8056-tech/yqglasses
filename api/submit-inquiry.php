<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/../vendor/phpmailer/src/Exception.php';
require_once __DIR__ . '/../vendor/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/phpmailer/src/SMTP.php';

const YQ_RECIPIENT = 'zcolin867@gmail.com';
const YQ_MAX_FILES = 3;
const YQ_MAX_FILE_SIZE = 5 * 1024 * 1024;

function yq_redirect($status)
{
    header('Location: /file-upload/?status=' . rawurlencode($status) . '#project-form', true, 303);
    exit;
}

function yq_single_line($value, $limit)
{
    $text = is_string($value) ? $value : '';
    $text = str_replace(["\r", "\n", "\0"], ' ', $text);
    $text = trim(strip_tags($text));
    return substr($text, 0, $limit);
}

function yq_message($value, $limit)
{
    $text = is_string($value) ? $value : '';
    $text = str_replace("\0", '', $text);
    $text = trim(strip_tags($text));
    return substr($text, 0, $limit);
}

function yq_smtp_credentials()
{
    $username = getenv('YQ_SMTP_USERNAME');
    $password = getenv('YQ_SMTP_APP_PASSWORD');

    if (is_string($username) && $username !== '' && is_string($password) && $password !== '') {
        return [
            'username' => trim($username),
            'app_password' => preg_replace('/\s+/', '', $password),
        ];
    }

    // This file is stored one level above public_html so it is never deployed
    // from GitHub and cannot be downloaded from the website.
    $configFile = dirname(__DIR__, 2) . '/.yq-mail-config.php';
    if (!is_file($configFile)) {
        return null;
    }

    $config = require $configFile;
    if (!is_array($config)) {
        return null;
    }

    $username = $config['username'] ?? '';
    $password = $config['app_password'] ?? '';
    if (!is_string($username) || trim($username) === '' || !is_string($password) || trim($password) === '') {
        return null;
    }

    return [
        'username' => trim($username),
        'app_password' => preg_replace('/\s+/', '', $password),
    ];
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo 'Method not allowed.';
    exit;
}

// Quietly accept bot submissions that fill the hidden field.
if (yq_single_line($_POST['website'] ?? '', 100) !== '') {
    yq_redirect('success');
}

$name = yq_single_line($_POST['name'] ?? '', 100);
$email = yq_single_line($_POST['email'] ?? '', 180);
$company = yq_single_line($_POST['company'] ?? '', 160);
$phone = yq_single_line($_POST['phone'] ?? '', 60);
$interest = yq_single_line($_POST['interest'] ?? '', 120);
$orderType = yq_single_line($_POST['order_type'] ?? '', 20);
$orderLabels = ['stock' => 'Ready to ship', 'custom' => 'Custom order'];
$orderLabel = $orderLabels[$orderType] ?? 'Not specified';
$design = yq_single_line($_POST['design'] ?? '', 120);
$quantity = yq_single_line($_POST['quantity'] ?? '', 40);
$message = yq_message($_POST['message'] ?? '', 3000);
$source = yq_single_line($_POST['source_page'] ?? '', 120);

if ($name === '' || $interest === '' || strlen($message) < 20 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    yq_redirect('invalid');
}

$allowedExtensions = [
    'pdf', 'jpg', 'jpeg', 'png', 'webp', 'ai', 'eps', 'svg',
    'dwg', 'dxf', 'step', 'stp', 'iges', 'igs', 'zip',
];
$attachments = [];
$upload = $_FILES['attachments'] ?? null;

if (is_array($upload) && isset($upload['name']) && is_array($upload['name'])) {
    $nonEmptyFiles = array_filter($upload['name'], static fn($name): bool => is_string($name) && $name !== '');
    if (count($nonEmptyFiles) > YQ_MAX_FILES) {
        yq_redirect('files');
    }

    foreach ($upload['name'] as $index => $originalName) {
        if (!is_string($originalName) || $originalName === '') {
            continue;
        }

        $error = (int) ($upload['error'][$index] ?? UPLOAD_ERR_NO_FILE);
        $size = (int) ($upload['size'][$index] ?? 0);
        $tmpName = (string) ($upload['tmp_name'][$index] ?? '');
        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        if ($error !== UPLOAD_ERR_OK || $size < 1 || $size > YQ_MAX_FILE_SIZE || !in_array($extension, $allowedExtensions, true) || !is_uploaded_file($tmpName)) {
            yq_redirect('files');
        }

        $content = file_get_contents($tmpName);
        if ($content === false) {
            yq_redirect('files');
        }

        $safeBase = preg_replace('/[^A-Za-z0-9._-]+/', '-', basename($originalName));
        $safeBase = trim((string) $safeBase, '.-');
        if ($safeBase === '') {
            $safeBase = 'reference-file.' . $extension;
        }

        $mime = 'application/octet-stream';
        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            if ($finfo !== false) {
                $detected = finfo_file($finfo, $tmpName);
                if (is_string($detected) && $detected !== '') {
                    $mime = yq_single_line($detected, 100);
                }
                finfo_close($finfo);
            }
        }

        $attachments[] = [
            'name' => $safeBase,
            'type' => $mime,
            'content' => $content,
        ];
    }
}

// Limit repeat submissions from one address without storing inquiry content.
$clientIp = yq_single_line($_SERVER['REMOTE_ADDR'] ?? 'unknown', 100);
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'yq-inquiry-' . hash('sha256', $clientIp);
if (is_file($rateFile) && (time() - (int) filemtime($rateFile)) < 45) {
    yq_redirect('error');
}

$lines = [
    'New wholesale inquiry from yqglasses.com',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Company: ' . ($company !== '' ? $company : 'Not provided'),
    'WhatsApp / phone: ' . ($phone !== '' ? $phone : 'Not provided'),
    'Product: ' . $interest,
    'Order type: ' . $orderLabel,
    'Design reference: ' . ($design !== '' ? $design : 'Not provided'),
    'Estimated quantity: ' . ($quantity !== '' ? $quantity : 'Not provided'),
    'Source: ' . ($source !== '' ? $source : 'Website'),
    '',
    'Project details:',
    $message,
    '',
    'Reference files: ' . (count($attachments) > 0 ? implode(', ', array_column($attachments, 'name')) : 'None'),
];

$subjectText = 'YQ GLASSES inquiry: ' . $interest;
$credentials = yq_smtp_credentials();
if ($credentials === null) {
    error_log('YQ inquiry SMTP credentials are not configured.');
    yq_redirect('error');
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $credentials['username'];
    $mail->Password = $credentials['app_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->Timeout = 20;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;

    $mail->setFrom($credentials['username'], 'YQ GLASSES Website');
    $mail->addAddress(YQ_RECIPIENT, 'YQ GLASSES Sales');
    $mail->addReplyTo($email, $name);
    $mail->Subject = $subjectText;
    $mail->Body = implode("\r\n", $lines);

    foreach ($attachments as $attachment) {
        $mail->addStringAttachment(
            $attachment['content'],
            $attachment['name'],
            PHPMailer::ENCODING_BASE64,
            $attachment['type']
        );
    }

    $mail->send();
} catch (Throwable $error) {
    error_log('YQ inquiry SMTP send failed: ' . $error->getMessage());
    yq_redirect('error');
}

@touch($rateFile);
yq_redirect('success');
