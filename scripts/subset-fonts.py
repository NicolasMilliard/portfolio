"""Subset the site's web fonts after replacing them with upstream originals.

Requires fonttools[woff]. Run from any directory with Python 3.11 or newer.
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


FONT_DIRECTORY = Path(__file__).resolve().parents[1] / "src" / "fonts"
FONT_FILES = (
    "SourceSerif4-VariableFont_opsz,wght.woff2",
    "DMSans-VariableFont_opsz,wght.woff2",
    "Caveat-Medium-Latin.woff2",
)

# Latin, combining accents, punctuation, currency, arrows, and the site's check mark.
UNICODE_RANGES = (
    (0x0020, 0x024F),
    (0x0300, 0x036F),
    (0x1E00, 0x1EFF),
    (0x2000, 0x206F),
    (0x2070, 0x209F),
    (0x20A0, 0x20CF),
    (0x2100, 0x214F),
    (0x2190, 0x21FF),
    (0x2212, 0x2212),
    (0x2713, 0x2713),
    (0xFEFF, 0xFEFF),
    (0xFFFD, 0xFFFD),
)


def main():
    codepoints = {
        codepoint
        for start, end in UNICODE_RANGES
        for codepoint in range(start, end + 1)
    }
    for filename in FONT_FILES:
        path = FONT_DIRECTORY / filename
        original_size = path.stat().st_size
        options = subset.Options()
        options.flavor = "woff2"
        # Keep the default shaping features, plus case and numeric variants.
        options.layout_features += [
            "case", "lnum", "onum", "ordn", "pnum", "sinf", "subs", "sups",
            "tnum", "zero",
        ]
        options.name_IDs = ["*"]
        options.name_legacy = True
        options.name_languages = ["*"]
        with TTFont(path) as font:
            subsetter = subset.Subsetter(options=options)
            subsetter.populate(unicodes=codepoints)
            subsetter.subset(font)
            font.save(path)
        print(f"{filename}: {original_size:,} → {path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
