"""Resize supplied certificate images for the private asset library; preserve every page edge."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import hashlib
import io
import json

ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / 'knowledge-base/assets/company/patents'
SOURCES = [
    {
        'id': 'YQ-PATENT-001',
        'source_path': '/Users/laotie/Desktop/TP图片/TP/专利资料/水晶杯2022301452406-外观专利电子证书/水晶杯外观专利证书.jpg',
        'file': 'yq-glassware-design-patent-zl2022301452406.webp',
        'label': '玻璃杯外观设计专利证书',
        'design_title_zh': '水晶杯',
        'design_title_en': 'Crystal cup',
        'patent_number': 'ZL202230145240.6',
        'certificate_number': '7503123',
        'application_date': '2022-03-20',
        'authorization_publication_number': 'CN307487759S',
        'alt': 'First page of a Chinese design patent certificate for a crystal cup, patent number ZL202230145240.6.',
        'display_title_en': 'Glassware Design Patent',
    },
    {
        'id': 'YQ-PATENT-002',
        'source_path': '/Users/laotie/Desktop/TP图片/TP/专利资料/蛋糕刀铲（水晶）2022301412409-外观专利电子证书/4.jpg',
        'file': 'yq-cake-serving-set-design-patent-zl2022301412409.webp',
        'label': '蛋糕刀铲外观设计专利证书',
        'design_title_zh': '蛋糕刀铲（水晶）',
        'design_title_en': 'Cake knife and server (crystal)',
        'patent_number': 'ZL202230141240.9',
        'certificate_number': '7507599',
        'application_date': '2022-03-18',
        'authorization_publication_number': 'CN307479124S',
        'alt': 'First page of a Chinese design patent certificate for a cake knife and server, patent number ZL202230141240.9.',
        'display_title_en': 'Cake Knife and Server Design Patent',
    },
]

DEST.mkdir(parents=True, exist_ok=True)
records = []
for record in SOURCES:
    source = Path(record['source_path'])
    original = source.read_bytes()
    with Image.open(io.BytesIO(original)) as opened:
        image = ImageOps.exif_transpose(opened).convert('RGB')
    original_size = image.size
    image.thumbnail((600, 600), Image.Resampling.LANCZOS)
    best = None
    for quality in range(95, 39, -1):
        buf = io.BytesIO()
        image.save(buf, 'WEBP', quality=quality, method=6)
        if len(buf.getvalue()) < 40_000:
            best = (quality, buf.getvalue())
            break
    if best is None:
        raise ValueError('Cannot meet the certificate preview byte limit.')
    output = DEST / record['file']
    if output.exists():
        raise FileExistsError(f'Refusing to replace an existing asset: {output}')
    output.write_bytes(best[1])
    assert source.read_bytes() == original
    records.append({
        **record,
        'patent_type': 'Chinese design patent',
        'issuing_authority_zh': '国家知识产权局',
        'patentee_as_printed_zh': '广州市拓天家居用品有限公司',
        'designer_as_printed_zh': '肖志勇',
        'authorization_publication_date': '2022-08-02',
        'provided_page': 1,
        'total_pages_as_printed': 2,
        'source_size': list(original_size),
        'source_bytes': len(original),
        'source_sha256': hashlib.sha256(original).hexdigest(),
        'width': image.width,
        'height': image.height,
        'bytes': len(best[1]),
        'quality': best[0],
        'sha256': hashlib.sha256(best[1]).hexdigest(),
        'crop': None,
    })

manifest = {
    'id': 'KB-ASSET-016',
    'prepared_date': '2026-10-24',
    'source_type': 'User-supplied scans of Chinese design patent certificate first pages',
    'constraints': {'format': 'WebP', 'max_edge_px': 600, 'max_bytes_exclusive': 40_000},
    'processing': 'Proportional resize and WebP compression only. Preserve the complete page including certificate text, seals, watermarks, QR codes and page numbering.',
    'legal_status_source': 'Certificate images only; no current patent-register status lookup performed.',
    'website_section': 'About Us / Design Patents',
    'assets': records,
}
(DEST / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')

font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 18)
heading = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 25)
sheet = Image.new('RGB', (944, 738), '#f5f1eb')
draw = ImageDraw.Draw(sheet)
draw.text((24, 16), 'YQ GLASSES  |  Chinese design patent certificates', font=heading, fill='#292824')
for index, record in enumerate(records):
    x = 24 + index * 460
    image = Image.open(DEST / record['file']).convert('RGB')
    sheet.paste(image, (x, 60))
    draw.text((x, 676), record['patent_number'], font=font, fill='#8f3714')
    draw.text((x, 704), f"Page 1 of 2  |  {record['width']} x {record['height']}  |  {record['bytes']:,} B", font=font, fill='#292824')
sheet.save(Path(__file__).parent / 'patent-certificates-preview.jpg', quality=90, optimize=True)
print(json.dumps([{'file': a['file'], 'size': [a['width'], a['height']], 'bytes': a['bytes'], 'quality': a['quality']} for a in records], ensure_ascii=False))
