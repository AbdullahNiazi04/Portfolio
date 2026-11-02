#!/usr/bin/env python3
"""Convert product screenshots into the two WebP variants the site serves.

The repo had no image pipeline — the first three projects' shots were converted
ad hoc, which is fine once and a liability the second time. This does it
repeatably and, more usefully, prints the `PhoneShot` / `preview` literals with
the measured intrinsic dimensions, so the numbers in src/data cannot drift from
the files in public/img.

Requires Pillow (`pip install Pillow`). Node is the repo's toolchain for
everything else, but it has no image library installed and Pillow is already on
this machine.

    python scripts/gen-shots.py --slug unike shots/*.png
    python scripts/gen-shots.py --slug unike --landscape shots/dashboard.png

Portrait (default) writes public/img/shot-<slug>-<name>-{420,840}.webp.
Landscape writes public/img/shot-<slug>-{700,1400}.webp, which is the single
hero-shot naming the landscape components expect, so it takes exactly one file.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover - a missing dep is the whole message
    sys.exit("gen-shots: Pillow is not installed. Run: pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "img"

PORTRAIT_WIDTHS = (420, 840)
LANDSCAPE_WIDTHS = (700, 1400)

# Matches the quality the existing shots were converted at. Lower is visibly
# soft on UI text, which is most of what a screenshot contains.
QUALITY = 82


def slugify(value: str) -> str:
    """'Home Screen 2.png' -> 'home-screen-2'."""
    out = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return out or "shot"


def convert(src: Path, stem: str, widths: tuple[int, ...]) -> tuple[int, int]:
    """Write one WebP per width. Returns the largest variant's dimensions."""
    with Image.open(src) as img:
        img = img.convert("RGB")
        largest: tuple[int, int] = (0, 0)

        for width in widths:
            if img.width < width:
                print(
                    f"  note: {src.name} is {img.width}px wide, narrower than the "
                    f"{width}px variant - not upscaling, writing it at source width"
                )
            target_w = min(width, img.width)
            target_h = round(img.height * target_w / img.width)
            resized = img.resize((target_w, target_h), Image.LANCZOS)

            dest = OUT_DIR / f"{stem}-{width}.webp"
            resized.save(dest, "WEBP", quality=QUALITY, method=6)
            size_kb = dest.stat().st_size / 1024
            print(f"  wrote {dest.name}  {target_w}x{target_h}  {size_kb:.1f} KB")

            if width == widths[-1]:
                largest = (target_w, target_h)

    return largest


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", required=True, help="project slug, e.g. unike")
    parser.add_argument(
        "--landscape",
        action="store_true",
        help="one landscape hero shot rather than portrait phone captures",
    )
    parser.add_argument("sources", nargs="+", type=Path)
    args = parser.parse_args()

    missing = [str(p) for p in args.sources if not p.is_file()]
    if missing:
        return print("gen-shots: no such file(s): " + ", ".join(missing)) or 1

    if args.landscape and len(args.sources) != 1:
        return print("gen-shots: --landscape takes exactly one source image") or 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    literals: list[str] = []

    for src in args.sources:
        if args.landscape:
            stem = f"shot-{args.slug}"
            print(f"{src.name} -> {stem}-{{700,1400}}.webp")
            w, h = convert(src, stem, LANDSCAPE_WIDTHS)
            literals.append(
                f"preview: {{ width: {w}, height: {h}, "
                f"alt: 'TODO: short alt' }},"
            )
        else:
            name = slugify(src.stem)
            stem = f"shot-{args.slug}-{name}"
            print(f"{src.name} -> {stem}-{{420,840}}.webp")
            w, h = convert(src, stem, PORTRAIT_WIDTHS)
            literals.append(
                f"{{ name: '{name}', width: {w}, height: {h}, "
                f"alt: 'TODO: short alt', caption: 'TODO: one or two sentences' }},"
            )

    # Plain hyphen, not an em dash: this prints to a Windows console that is
    # still cp1252 by default, where the dash arrives as a replacement glyph.
    print("\nPaste into src/data - dimensions are the largest variant:\n")
    for line in literals:
        print("  " + line)

    return 0


if __name__ == "__main__":
    sys.exit(main())
