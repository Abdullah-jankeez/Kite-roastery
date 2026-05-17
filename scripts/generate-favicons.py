"""
Generate web favicons and Open Graph image from the KITE logo.

Outputs to /public:
  - favicon.ico             multi-size ICO (16, 32, 48)
  - icon.png                512x512 PWA icon (charcoal logo on teal)
  - apple-icon.png          180x180 Apple touch icon
  - og-image.png            1200x630 Open Graph share image (teal w/ full logo)
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
LOGO_DIR = PUBLIC / "logo"

TEAL     = (145, 211, 199)   # #91d3c7
CHARCOAL = (56, 56, 54)      # #383836

MARK_TEAL = LOGO_DIR / "kite-mark-teal.png"
MARK_WHITE = LOGO_DIR / "kite-mark-white.png"
FULL_WHITE = LOGO_DIR / "kite-full-white.png"


def _paste_centered(canvas: Image.Image, logo: Image.Image, target_h: int) -> None:
    """Resize logo proportionally to `target_h` and paste into the centre of canvas (RGBA)."""
    aspect = logo.width / logo.height
    new_h = target_h
    new_w = round(target_h * aspect)
    resized = logo.resize((new_w, new_h), Image.LANCZOS)
    x = (canvas.width - new_w) // 2
    y = (canvas.height - new_h) // 2
    canvas.alpha_composite(resized, (x, y))


def make_app_icon(size: int = 512) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (*TEAL, 255))
    logo = Image.open(MARK_WHITE).convert("RGBA")
    _paste_centered(canvas, logo, int(size * 0.62))
    return canvas


def make_apple_icon() -> Image.Image:
    # Apple recommends an opaque, slightly inset icon
    size = 180
    canvas = Image.new("RGBA", (size, size), (*TEAL, 255))
    logo = Image.open(MARK_WHITE).convert("RGBA")
    _paste_centered(canvas, logo, int(size * 0.65))
    return canvas


def make_favicon_ico() -> None:
    base = make_app_icon(256)
    sizes = [(48, 48), (32, 32), (16, 16)]
    base.save(PUBLIC / "favicon.ico", format="ICO", sizes=sizes)
    print("  saved favicon.ico")


def make_og_image() -> Image.Image:
    """Open-Graph share card: 1200x630 with full logo on teal background."""
    w, h = 1200, 630
    canvas = Image.new("RGBA", (w, h), (*TEAL, 255))

    # Subtle vignette using a radial-ish gradient approximation
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for i in range(0, 60, 2):
        od.rectangle([i, i, w - i, h - i], outline=(0, 0, 0, 5))
    canvas.alpha_composite(overlay)

    full = Image.open(FULL_WHITE).convert("RGBA")
    _paste_centered(canvas, full, int(h * 0.55))
    return canvas


def main():
    # 1) favicon.ico
    make_favicon_ico()

    # 2) 512x512 app icon
    app = make_app_icon(512)
    app.save(PUBLIC / "icon.png", optimize=True)
    print("  saved icon.png         (512x512)")

    # 3) apple-icon
    apple = make_apple_icon()
    apple.save(PUBLIC / "apple-icon.png", optimize=True)
    print("  saved apple-icon.png   (180x180)")

    # 4) Open Graph image
    og = make_og_image()
    og.convert("RGB").save(PUBLIC / "og-image.png", optimize=True)
    print("  saved og-image.png     (1200x630)")

    print("\nDone →", PUBLIC)


if __name__ == "__main__":
    main()
