# LOST 404 webfonts

Only the LOST 404 page loads these subsets. Its stylesheet declares unique
`Lost Sans` and `Lost Serif` families and scopes the family aliases to
`.lost-page`. The homepage and writing routes continue to use the original
`DM Sans` and `Source Serif 4` files and declarations in `src/index.css`.
An `html:has(.lost-page)` rule also uses the subset for root font metrics only
while the 404 is mounted, preventing an extra shared-font request on entry.
`Jost-404.ttf` is already a two-character subset and is unchanged.

| Font | Original | LOST subset |
|---|---:|---:|
| DM Sans | 88,592 bytes | 75,928 bytes |
| Source Serif 4 | 423,744 bytes | 182,248 bytes |
| Total | 512,336 bytes | 258,176 bytes |

This saves 254,160 bytes (49.6%) on an initial 404 visit. On first navigation
from the 404 to another portfolio route, that route loads its original fonts.

The LOST subsets retain:

- Western Latin, Latin Extended-A, combining accents, punctuation, currencies,
  arrows, mathematical symbols, and any additional characters in the LOST
  source that the original font supports.
- The complete weight and optical-size axes, hinting, standard shaping,
  kerning, ligatures, fractions, and numeric variants including tabular figures.
- Copyright and license metadata from the original SIL Open Font License fonts.
  The internal subset names are `Lost Sans Latin` and `Lost Serif Latin`.

Unused scripts, stylistic sets, and small-cap alternates are excluded. The
original variable-axis ranges are retained to preserve glyph interpolation.
