"""
Convert KITE brand logo PDFs into web-ready PNG assets.

Outputs three variants per source PDF, web-optimized:
  - <name>-teal.png  : original (white logo on teal background)
  - <name>-white.png : transparent background, white logo (for dark backgrounds)
  - <name>-dark.png  : transparent background, charcoal logo (for light backgrounds)
"""

from pathlib import Path

import fitz                          # PyMuPDF
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "logo"
OUT_DIR.mkdir(parents=True, exist_ok=True)

SOURCES = [
    (Path(r"C:\Users\acer\Desktop\Kite LOGO.pdf"),     "kite-mark"),
    (Path(r"C:\Users\acer\Desktop\Logo and name.pdf"), "kite-full"),
]

TEAL     = np.array([145, 211, 199], dtype=np.int16)   # #91d3c7
CHARCOAL = (56, 56, 54)                                # #383836
MAX_WIDTH = 1400                                       # web cap


def render_pdf(pdf_path: Path, dpi: int = 300) -> Image.Image:
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)
    matrix = fitz.Matrix(dpi / 72, dpi / 72)
    pix = page.get_pixmap(matrix=matrix, alpha=False)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    doc.close()
    return img


def trim_to_logo(img: Image.Image, teal_tol: int = 25) -> Image.Image:
    """Tight crop around any non-teal pixels (the logo art)."""
    arr = np.asarray(img.convert("RGB"), dtype=np.int16)
    diff = np.abs(arr - TEAL).max(axis=2)
    mask = diff > teal_tol                          # True where pixel is NOT teal
    if not mask.any():
        return img

    ys, xs = np.where(mask)
    top, bottom = ys.min(), ys.max()
    left, right = xs.min(), xs.max()

    # 4% padding
    pad = max(20, (right - left) // 25)
    h, w = arr.shape[:2]
    top    = max(0, top - pad)
    bottom = min(h - 1, bottom + pad)
    left   = max(0, left - pad)
    right  = min(w - 1, right + pad)

    return img.crop((left, top, right + 1, bottom + 1))


def make_variant(img: Image.Image, target_rgb: tuple[int, int, int]) -> Image.Image:
    """
    Convert teal-background image → transparent PNG, recolouring the white
    logo strokes to `target_rgb`. Uses distance-based alpha blending so
    antialiased edges remain crisp.
    """
    arr = np.asarray(img.convert("RGB"), dtype=np.float32)

    # Distance from each pixel to teal vs. to white
    dist_teal  = np.abs(arr - TEAL).sum(axis=2)
    dist_white = np.abs(arr - 255).sum(axis=2)
    total = dist_teal + dist_white
    total[total == 0] = 1                            # avoid div-by-zero

    alpha = (255.0 * dist_teal / total).clip(0, 255)
    alpha = np.where(alpha < 8, 0, alpha)
    alpha = np.where(alpha > 247, 255, alpha)

    h, w = alpha.shape
    out = np.zeros((h, w, 4), dtype=np.uint8)
    out[..., 0] = target_rgb[0]
    out[..., 1] = target_rgb[1]
    out[..., 2] = target_rgb[2]
    out[..., 3] = alpha.astype(np.uint8)
    return Image.fromarray(out, mode="RGBA")


def downsize(img: Image.Image, max_w: int = MAX_WIDTH) -> Image.Image:
    if img.width <= max_w:
        return img
    new_h = round(img.height * max_w / img.width)
    return img.resize((max_w, new_h), Image.LANCZOS)


def main():
    for src, name in SOURCES:
        if not src.exists():
            print(f"[skip] {src} not found")
            continue
        print(f"\n→ {src.name}")

        raw = render_pdf(src, dpi=300)
        print(f"  rendered {raw.size}")

        cropped = trim_to_logo(raw)
        print(f"  trimmed  {cropped.size}")

        cropped = downsize(cropped)
        print(f"  resized  {cropped.size}")

        # Teal background variant
        teal_path = OUT_DIR / f"{name}-teal.png"
        cropped.save(teal_path, optimize=True)
        print(f"  saved {teal_path.name}  ({teal_path.stat().st_size // 1024} KB)")

        # White-on-transparent variant
        white = make_variant(cropped, (255, 255, 255))
        white_path = OUT_DIR / f"{name}-white.png"
        white.save(white_path, optimize=True)
        print(f"  saved {white_path.name}  ({white_path.stat().st_size // 1024} KB)")

        # Charcoal-on-transparent variant
        dark = make_variant(cropped, CHARCOAL)
        dark_path = OUT_DIR / f"{name}-dark.png"
        dark.save(dark_path, optimize=True)
        print(f"  saved {dark_path.name}  ({dark_path.stat().st_size // 1024} KB)")

    print("\nDone →", OUT_DIR)


if __name__ == "__main__":
    main()
