"""Resize and compress the generated Blog banner without altering its contents."""
from pathlib import Path
from PIL import Image
import hashlib
import io
import json

ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path('/Users/laotie/.codex/generated_images/01a15337-b339-7cd2-8058-64601b2e816c/exec-f62471ce-ea15-4c65-b3ef-2a6fd925d2bd.png')
TARGET = ROOT / 'public/images/blog/celebration-table-banner.webp'
assert not TARGET.exists(), 'Use a new filename rather than overwriting an image.'

with Image.open(SOURCE) as original:
    source_size = original.size
    image = original.convert('RGB')
    image.thumbnail((600, 600), Image.Resampling.LANCZOS)
    for quality in range(95, 39, -1):
        encoded = io.BytesIO()
        image.save(encoded, format='WEBP', quality=quality, method=6)
        data = encoded.getvalue()
        if len(data) < 40000:
            break
    else:
        raise ValueError('Cannot meet the image size limit.')
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_bytes(data)
    metadata = {
        'prepared_date': '2026-10-25',
        'asset_type': 'AI-generated editorial celebration scene; not a real event photograph',
        'tool': 'Built-in image_gen',
        'source': str(SOURCE),
        'source_size': source_size,
        'source_sha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
        'references': [
            'public/images/cake-knife-sets/studded-pair.webp',
            'public/images/champagne-glasses/heart-stem-pair.webp',
        ],
        'file': str(TARGET.relative_to(ROOT)),
        'width': image.width,
        'height': image.height,
        'bytes': len(data),
        'quality': quality,
        'sha256': hashlib.sha256(data).hexdigest(),
        'processing': 'Proportional resize and WebP compression; no cropping or retouching.',
        'usage': 'Full-width decorative background behind the Blog H1; empty alt because it adds no article information.',
        'prompt_file': 'design/blog/banner-prompt.txt',
    }
    (Path(__file__).parent / 'banner-generation.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(metadata, ensure_ascii=False))
