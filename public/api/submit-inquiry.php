<?php

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
    'Estimated quantity: ' . ($quantity !== '' ? $quantity : 'Not provided'),
    'Source: ' . ($source !== '' ? $source : 'Website'),
    '',
    'Project details:',
    $message,
    '',
    'Reference files: ' . (count($attachments) > 0 ? implode(', ', array_column($attachments, 'name')) : 'None'),
];

$boundary = '=_YQ_' . bin2hex(random_bytes(18));
$body = '--' . $boundary . "\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= implode("\r\n", $lines) . "\r\n";

foreach ($attachments as $attachment) {
    $body .= '--' . $boundary . "\r\n";
    $body .= 'Content-Type: ' . $attachment['type'] . '; name="' . $attachment['name'] . '"' . "\r\n";
    $body .= 'Content-Disposition: attachment; filename="' . $attachment['name'] . '"' . "\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($attachment['content'])) . "\r\n";
}
$body .= '--' . $boundary . "--\r\n";

$subjectText = 'YQ GLASSES inquiry: ' . $interest;
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$headers = [
    'MIME-Version: 1.0',
    'From: YQ GLASSES Website <noreply@yqglasses.com>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail(YQ_RECIPIENT, $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    error_log('YQ inquiry mail() returned false.');
    yq_redirect('error');
}

@touch($rateFile);
yq_redirect('success');
