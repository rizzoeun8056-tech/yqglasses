"""Export web logo sizes with the installed image40 engine.

Usage: python export-assets.py /path/to/image40/scripts
Only resizing, format conversion, compression and ICO packaging are performed.
"""
from pathlib import Path
import base64
import json
import shutil
import sys

from PIL import Image

sys.path.insert(0, sys.argv[1])
from image40 import Options, run_batch

ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / 'public/images/brand'
WORK = ROOT / 'design/brand/exports'
SOURCES = {
    'horizontal': ROOT / 'design/brand/source-horizontal-v2.png',
    'icon': ROOT / 'design/brand/source-icon.png',
    'dark': ROOT / 'design/brand/source-dark-v2.png',
    'social': ROOT / 'design/brand/source-social-v2.png',
}
DEST.mkdir(parents=True, exist_ok=True)
WORK.mkdir(parents=True, exist_ok=True)

# Exact pixels; retain alpha on logos and use opaque ivory for app icons.
tasks = [
    ('horizontal', 'logo-horizontal-v2.png', 480, 160, 'png', True, 40000),
    ('horizontal', 'logo-horizontal-v2@2x.png', 960, 320, 'png', True, 40000),
    ('horizontal', 'logo-horizontal-v2.webp', 480, 160, 'webp', True, 40000),
    ('dark', 'logo-dark-v2.png', 480, 160, 'png', False, 40000),
    ('dark', 'logo-dark-v2.webp', 480, 160, 'webp', False, 40000),
    ('dark', 'logo-dark-v2@2x.webp', 960, 320, 'webp', False, 40000),
    ('icon', 'logo-mark-512.png', 512, 512, 'png', True, 40000),
    ('icon', 'logo-mark-1024.png', 1024, 1024, 'png', True, 150000),
    ('icon', '../../favicon-yq-color-v3-16.png', 16, 16, 'png', False, 40000),
    ('icon', '../../favicon-yq-color-v3-32.png', 32, 32, 'png', False, 40000),
    ('icon', '../../favicon-yq-color-v3-48.png', 48, 48, 'png', False, 40000),
    ('icon', '../../apple-touch-icon.png', 180, 180, 'png', False, 40000),
    ('icon', '../../android-chrome-192x192.png', 192, 192, 'png', False, 40000),
    ('icon', '../../android-chrome-512x512.png', 512, 512, 'png', False, 40000),
    ('social', 'social-share-v2-1200x630.jpg', 1200, 630, 'jpg', False, 120000),
]
inventory = []
for key, name, width, height, fmt, alpha, limit in tasks:
    report = run_batch([SOURCES[key]], WORK, Options(width=width, height=height,
        format=fmt, transparent=alpha, background='#292824' if key == 'dark' else '#f5f1eb',
        fit='pad', limit_bytes=limit))
    row = report['files'][0]
    if row['status'] != 'ok':
        raise RuntimeError(row)
    target = (DEST / name).resolve()
    shutil.copy2(row['output'], target)
    with Image.open(target) as im:
        assert im.size == (width, height)
        extrema = im.convert('RGBA').getchannel('A').getextrema()
        if alpha:
            assert extrema[0] == 0, f'Expected transparency: {target}'
        else:
            assert extrema == (255, 255), f'Expected opaque background: {target}'
    item = dict(path=str(target.relative_to(ROOT / 'public')), width=width, height=height,
                bytes=target.stat().st_size, limit_bytes=limit, status='ok',
                transparent=alpha, setting=row['setting'], notes=row['notes'])
    inventory.append(item)
    print(f"{item['path']}: {width}x{height}, {item['bytes']} bytes, {row['setting']}")

# One ICO containing multiple real resolutions, rather than a renamed PNG.
with Image.open(ROOT / 'public/android-chrome-512x512.png') as im:
    im.convert('RGBA').save(ROOT / 'public/favicon-yq-color-v3.ico', format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
with Image.open(ROOT / 'public/favicon-yq-color-v3.ico') as ico:
    assert ico.ico.sizes() == {(16, 16), (32, 32), (48, 48), (64, 64)}

# Keep the legacy SVG URL useful; this is an SVG wrapper around the raster mark.
encoded = base64.b64encode((DEST / 'logo-mark-512.png').read_bytes()).decode('ascii')
(ROOT / 'public/favicon-yq-color-v3.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">'
    '<rect width="512" height="512" rx="64" fill="#f5f1eb"/>'
    f'<image width="512" height="512" href="data:image/png;base64,{encoded}"/>'
    '</svg>\n')
# Keep conventional fallback URLs consistent with the explicitly versioned icons.
for size in (16, 32, 48):
    shutil.copy2(ROOT / f'public/favicon-yq-color-v3-{size}.png',
                 ROOT / f'public/favicon-{size}x{size}.png')
for extension in ('ico', 'svg'):
    shutil.copy2(ROOT / f'public/favicon-yq-color-v3.{extension}',
                 ROOT / f'public/favicon.{extension}')
(ROOT / 'design/brand/asset-inventory.json').write_text(json.dumps(inventory, indent=2))
