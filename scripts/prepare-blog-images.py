"""Create blog-only WebP exports below 30,000 bytes; preserve shared originals."""
from pathlib import Path
from PIL import Image, ImageOps
import io,json
ROOT=Path(__file__).resolve().parents[1]
items=[
 ('public/images/blog/cake-slicing-knife-and-servers-oh42046.webp','public/images/blog/cake-slicing-knife-and-servers-oh42046.webp',False),
 ('public/images/blog/celebration-table-banner.webp','public/images/blog/celebration-table-banner.webp',False),
 ('public/images/champagne-glasses/studded-pair.webp','public/images/blog/champagne-studded-pair.webp',False),
 ('public/images/champagne-glasses/heart-stem-pair.webp','public/images/blog/champagne-heart-stem-pair.webp',False),
 ('public/images/cake-knife-sets/studded-pair.webp','public/images/blog/cake-studded-pair.webp',False),
 ('public/images/cake-knife-sets/rose-pair.webp','public/images/blog/cake-rose-pair.webp',False),
 *[(f'public/images/about/{name}.webp',f'public/images/blog/company/{name}.webp',True) for name in ['assembly-workbench-retouched','glass-processing-retouched','cake-serving-batch','showroom-aisle-retouched']]
]
records=[]
for original,destination,square in items:
 source=ROOT/original
 # Reuse the highest-quality source when supplied for these two generated exports.
 if 'cake-slicing-knife' in original:
  raw=Path('/Users/laotie/Desktop/TP图片/阿钢/蛋糕刀铲/oh42046/1_0000s_0007_DSC07333.jpg')
  if raw.is_file():source=raw
 elif 'celebration-table-banner' in original:
  meta=ROOT/'design/blog/banner-generation.json'
  if meta.exists():
   raw=Path(json.loads(meta.read_text())['source'])
   if raw.is_file():source=raw
 with Image.open(source) as im:
  im=ImageOps.exif_transpose(im).convert('RGB')
  if square:
   side=min(im.size);im=ImageOps.fit(im,(side,side),centering=(.5,.5))
  im.thumbnail((480,480) if 'cake-slicing-knife' in original else (600,600),Image.Resampling.LANCZOS)
  while True:
   for quality in range(92,54,-1):
    buf=io.BytesIO();im.save(buf,'WEBP',quality=quality,method=6)
    if len(buf.getvalue())<30000:break
   if len(buf.getvalue())<30000:break
   im.thumbnail((max(1,int(im.width*.92)),max(1,int(im.height*.92))),Image.Resampling.LANCZOS)
  output=ROOT/destination;output.parent.mkdir(parents=True,exist_ok=True);output.write_bytes(buf.getvalue())
  records.append({'source':str(source),'file':destination,'width':im.width,'height':im.height,'bytes':len(buf.getvalue()),'quality':quality,'square_crop':square})
(ROOT/'design/blog/image-exports.json').write_text(json.dumps({'limit_bytes_exclusive':30000,'images':records},ensure_ascii=False,indent=2)+'\n')
for r in records:print(r['file'],r['width'],r['height'],r['bytes'])
