"""Places the facade photograph under the transparent photo area of the card layers.
Run in the Higgsfield sandbox: python3 compose.py <layers_dir> <out_dir>"""
import sys, urllib.request
from io import BytesIO
from pathlib import Path
from PIL import Image

FACADE = "https://d8j0ntlcm91z4.cloudfront.net/user_3HHQ3Zj0HlreqqecTg7cEiD4uTK/hf_20260923_165237_a4b4f765-aa4f-4645-938e-a69306c19ff1.png"
layers, out = Path(sys.argv[1]), Path(sys.argv[2])
photo = Image.open(BytesIO(urllib.request.urlopen(FACADE).read())).convert("RGB")
for layer_name, out_name, img_w in [("og-layer.png", "og-praxor.jpg", 440), ("cover-layer.png", "cover-praxor.jpg", 560)]:
    layer = Image.open(layers / layer_name).convert("RGBA")
    W, H = layer.size
    # cover-fit the photo into the right column, framed slightly above centre
    scale = max(img_w / photo.width, H / photo.height)
    fitted = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
    left = (fitted.width - img_w) // 2
    top = int((fitted.height - H) * 0.4)
    base = Image.new("RGB", (W, H), (12, 27, 46))
    base.paste(fitted.crop((left, top, left + img_w, top + H)), (W - img_w, 0))
    base = Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")
    base.save(out / out_name, quality=88, optimize=True, progressive=True)
    print(out_name, base.size)
