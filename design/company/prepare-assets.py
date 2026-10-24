"""Prepare user-supplied company photographs without changing their scene content."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import hashlib
import io
import json

ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path('/Users/laotie/Desktop/TP图片')
DEST = ROOT / 'knowledge-base/assets/company'
MAX_EDGE = 600
MAX_BYTES = 40_000
ITEMS = json.loads((Path(__file__).parent / 'sources.json').read_text())


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def export_webp(image):
    # Keep the largest allowed dimensions and find the highest quality below the cap.
    for edge in (MAX_EDGE, 560, 520):
        sized = image.copy()
        sized.thumbnail((edge, edge), Image.Resampling.LANCZOS)
        low, high = 40, 95
        best = None
        while low <= high:
            quality = (low + high) // 2
            buf = io.BytesIO()
            sized.save(buf, 'WEBP', quality=quality, method=6)
            data = buf.getvalue()
            if len(data) < MAX_BYTES:
                best = (data, quality)
                low = quality + 1
            else:
                high = quality - 1
        if best:
            return sized, best[0], best[1]
    raise ValueError('Cannot meet the export size limit at acceptable dimensions.')


records = []
for item in ITEMS:
    source = SOURCE / item['source']
    original_bytes = source.read_bytes()
    with Image.open(io.BytesIO(original_bytes)) as opened:
        image = ImageOps.exif_transpose(opened).copy()
    original_size = list(image.size)
    bounds = (0, 0, image.width, image.height)
    crop_kind = 'none'
    if 'A' in image.getbands():
        alpha_bounds = image.getchannel('A').getbbox()
        if alpha_bounds is None:
            raise ValueError(f'Empty transparent image: {source.name}')
        if alpha_bounds != bounds:
            bounds = alpha_bounds
            crop_kind = 'transparent_canvas_padding'
            image = image.crop(bounds)
        if image.getchannel('A').getextrema() == (255, 255):
            image = image.convert('RGB')
    else:
        image = image.convert('RGB')

    sized, encoded, quality = export_webp(image)
    output = DEST / item['category'] / (item['name'] + '.webp')
    output.parent.mkdir(parents=True, exist_ok=True)
    if output.exists():
        raise FileExistsError(f'Refusing to replace an existing asset: {output}')
    output.write_bytes(encoded)
    with Image.open(output) as check:
        check.verify()
    assert max(sized.size) <= MAX_EDGE and len(encoded) < MAX_BYTES
    assert sha256(source.read_bytes()) == sha256(original_bytes)
    records.append({
        **item,
        'source_path': str(source),
        'source_sha256': sha256(original_bytes),
        'source_bytes': len(original_bytes),
        'source_size': original_size,
        'crop': {'kind': crop_kind, 'box': list(bounds)},
        'file': str(output.relative_to(DEST)),
        'width': sized.width,
        'height': sized.height,
        'bytes': len(encoded),
        'quality': quality,
        'sha256': sha256(encoded),
    })
    print(f"{item['id']} {sized.width}x{sized.height} {len(encoded)} bytes Q{quality}", flush=True)

manifest = {
    'id': 'KB-ASSET-015',
    'title': 'YQ GLASSES office showroom and processing factory photographs',
    'prepared_date': '2026-10-24',
    'source_statement': 'User supplied and confirmed these as YQ GLASSES office and processing factory photographs.',
    'capture_date': None,
    'constraints': {'format': 'WebP', 'max_edge_px': MAX_EDGE, 'max_bytes_exclusive': MAX_BYTES},
    'processing': 'Crop transparent canvas padding, resize proportionally without upscaling, compress to WebP. Preserve scene content and original files.',
    'assets': records,
}
(DEST / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')

# A separate overview for reviewing the library; not a web-ready asset or public page.
font_path = '/System/Library/Fonts/Supplemental/Arial.ttf'
font = ImageFont.truetype(font_path, 16)
heading_font = ImageFont.truetype(font_path, 26)
sheet = Image.new('RGB', (1140, 1690), '#f5f1eb')
draw = ImageDraw.Draw(sheet)
draw.text((26, 22), 'YQ GLASSES  |  Company photograph library', font=heading_font, fill='#292824')
for index, record in enumerate(records):
    x = 26 + (index % 3) * 375
    y = 84 + (index // 3) * 318
    thumb = Image.open(DEST / record['file']).convert('RGB')
    thumb.thumbnail((350, 258), Image.Resampling.LANCZOS)
    sheet.paste(thumb, (x + (350 - thumb.width) // 2, y + (258 - thumb.height) // 2))
    draw.text((x, y + 268), record['id'], font=font, fill='#8f3714')
    draw.text((x, y + 291), f"{record['width']} x {record['height']}  |  {record['bytes'] / 1000:.2f} KB", font=font, fill='#292824')
sheet.save(Path(__file__).parent / 'contact-sheet.jpg', quality=88, optimize=True)
print(json.dumps({'count': len(records), 'bytes': sum(a['bytes'] for a in records), 'largest': max(a['bytes'] for a in records)}))
