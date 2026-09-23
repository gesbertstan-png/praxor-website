"""Local development only: builds blurred stand-ins for the Higgsfield photographs
(from coarse colour grids sampled in the Higgsfield sandbox) so the site renders
offline. Production images are exported in the Higgsfield repository by
scripts/sync-to-higgsfield.sh and are never overwritten by these files."""
from pathlib import Path
from PIL import Image, ImageFilter

GRIDS = {
    "facade": (9, 12, (1744, 2336), [480, 800, 1200, 1600],
        "6c615560564c61574d61574d675d535c534a5c534a5a514862584e|695b4c5b52496c6258695f555d52465a524a685f56685d515e5347|a195879b8d7e8e7e6d95897c9b8f8191867a897b6c8a7f7390867d|baac9e686562545b65848180bbac9c656464585f687d7a78ada399|b7aa9c636871526783898b8fbbac9c61697452657f868688b2a69b|b6a89a6b6f77505d6f88837fc2b3a35c5e633b43508b8782b9ada2|aca094626469454c5787827db1a5985a5b5d424953898480aba197|76706b494b4f2e343d615f607a747145484d2d333d6d6b6a7d7671|6c66634c4e54353a4369666678716d46484e373c4579767477706b|6b61575e564e5f57506a5f546b60555b534c5d5650675d54685d53|5c514550473e685d5260564b55493b544b41665c505d53485b4f43|877c71716860766c627c726883776c716a63746b61786e64887a6c"),
    "parquet": (8, 10, (1792, 2240), [480, 800, 1200, 1600],
        "574e4554483d4b3c2e49392a4838284434244132223d2f1f|59524a564b424a3b2d4a3b2c4d3e2d4837274333233f3020|5d544b766758bda17f806a4f4436274b3b29453624413221|a08e79dec5a5d7b890e1bc8c7c6346473726493826443422|615448ceb495cbad88ceac80dbb27f6d543840301f463623|5145396d5d4cd8b88fa78863a3825ac39b696f5638392a1b|5344355244367c674fbc9d76ab895fc99d69c095616d5235|4c3c2d5546364d4033a58866cba779aa865ac598628c6a43|4637284c3d2e534535514233b28f65ae895d6a533740301e|4435254a3b2a4e3f3046392b5a4731634d323c2d1d433220"),
    "toits": (16, 9, (2688, 1520), [800, 1280, 1920, 2560],
        "dcdcddd5d7d9d5d6d9d6d8dadadadcdbdbdcd7d8dad6d7dad7d7dad4d5d8d4d4d8d5d5d7d8d7d8e0dcdbe4e0dde5e1de|babbbdd8d6d6d7d6d5d9d7d6dbd8d6dfdbd8e0dcd9e2ddd9e1dcd8e4ded9e6dfdae6ded8e8dfd7f0e6dcf5e9def6e9dd|7d8592b4bac3b8bbc3b8bbc3b8bcc5b8bbc2bcbdc1b9babfc0c0c3b6bac0b8b8bcc3c2c5c3c3c6bcb6b5c0bab8bcb8b9|6d758170757f807a7d7b7778796f6b797677767e8980848b7c76787b7779757e896c6f79726d6f7574797b797d838995|575b61666a6f68717d6c747d7d7b7b938d88757e89777f8a6b758189838094969a797f8789807c71757d4e5763495464|50555c555b6277818f697787666f7b656d77717881777f8965707c747a8171777f6c747d71747877737264605f636061|52575f50545a6666665b626b656a6e576370525b6568707a4e5968656c7555606c585e665e6166716d6b5f5a57646060|746a5e6f665cad978085817f4b515a5c62695a5d616765646c6967787068837a707e756c897e729989796760596e6662|7d78726e6f70b2a1929d8c7b74685b84766682776a8f827496887a8d837ba4978a8a827c867e789c8e7f66605a6e6762"),
}

out = Path(__file__).resolve().parent.parent / "app" / "public" / "images"
out.mkdir(parents=True, exist_ok=True)
for name, (w, h, full, widths, data) in GRIDS.items():
    rows = data.split("|")
    assert len(rows) == h, (name, len(rows))
    small = Image.new("RGB", (w, h))
    for y, row in enumerate(rows):
        assert len(row) == w * 6, (name, y, len(row))
        for x in range(w):
            small.putpixel((x, y), tuple(int(row[x * 6 + i * 2 : x * 6 + i * 2 + 2], 16) for i in range(3)))
    for width in widths:
        height = round(width * full[1] / full[0])
        img = small.resize((width, height), Image.BICUBIC).filter(ImageFilter.GaussianBlur(width / 60))
        img.save(out / f"{name}-{width}.webp", quality=70)
        img.save(out / f"{name}-{width}.avif", quality=55)
    print(name, "ok")
