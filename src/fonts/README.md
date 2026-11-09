# Web fonts

These WOFF2 files are subset for Latin and extended Latin, combining accents,
punctuation, currency symbols, arrows, and the check mark used by the site. They
cover English and French content, including accented names, curly quotes, and
dashes. Characters absent from the upstream fonts still use the CSS fallback
fonts.

Source Serif 4 and DM Sans retain their complete weight and optical-size axes.
The subsets retain kerning, ligatures, common text-shaping features, case and
numeric variants, hinting, and font copyright/license metadata. Unused small-cap
and stylistic alternate features are removed.

After replacing a font with a new upstream version, regenerate the subsets using
Python 3.11 or newer (`python3.14` if the system `python3` is older):

```sh
python3 -m venv /tmp/portfolio-font-tools
/tmp/portfolio-font-tools/bin/pip install 'fonttools[woff]==4.68.0'
/tmp/portfolio-font-tools/bin/python scripts/subset-fonts.py
```

The script updates the three fonts in place. Expand its Unicode ranges before
adding content in another alphabet. Keep `font-display: swap` in the CSS.
