"""Exports the Higgsfield photographs as responsive AVIF + WebP files.
Run inside the Higgsfield sandbox: python3 build-images.py <out_dir>"""
import sys, urllib.request
from io import BytesIO
from pathlib import Path
from PIL import Image, features

BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3HHQ3Zj0HlreqqecTg7cEiD4uTK/"
SOURCES = {
    "facade": ("hf_20260923_165237_a4b4f765-aa4f-4645-938e-a69306c19ff1.png", [480, 800, 1200, 1600]),
    "parquet": ("hf_20260923_165205_587e4ba7-a70f-4266-8ef5-f8333341570f.png", [480, 800, 1200, 1600]),
    "toits": ("hf_20260923_165205_6c1ec756-7444-4c03-b9e5-5ebd5115b6b4.png", [800, 1280, 1920, 2560]),
}

out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
avif = features.check("avif")
print("AVIF support:", avif)
for name, (file, widths) in SOURCES.items():
    src = Image.open(BytesIO(urllib.request.urlopen(BASE + file).read())).convert("RGB")
    for w in widths:
        w = min(w, src.width)
        img = src.resize((w, round(src.height * w / src.width)), Image.LANCZOS)
        img.save(out / f"{name}-{w}.webp", quality=78, method=6)
        if avif:
            img.save(out / f"{name}-{w}.avif", quality=58, speed=4)
    print(name, src.size, "ok")
