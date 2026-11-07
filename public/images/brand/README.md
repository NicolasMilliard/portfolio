# Watercolor illustrations

Source artwork supplied by Nicolas Milliard. Transparent cutouts were made with
the built-in ImageGen tool, using the `background-extraction` edit mode. Their
alpha channels and ground shadows are preserved. The PNGs were resized with
macOS `sips`; the original generated outputs remain outside the repository.

Runtime assets, relative to this directory:

- `nicolas-portrait-cutout.png` — 640 × 1129, introduction.
- `nicolas-portrait-small-cutout.png` — 320 × 564, responsive portrait.
- `nicolas-skating-cutout.png` — 480 × 720, decorative contact illustration.
- `companions-cutout.png` — 960 × 720, current footer trio.
- `companions-small-cutout.png` — 480 × 360, responsive trio.
- `nicolas-face.png` — 256 × 256, face logo.
- `nicolas-face-small.png` — 96 × 96, header logo and embedded SVG favicon.

`public/favicon.svg` and `public/milliard-dev-logo.svg` are self-contained SVG
wrappers around the transparent face PNG. The favicon also has 32 px and 64 px
PNG alternatives at `public/favicon-32.png` and `public/favicon-64.png`.

The interface borrows the illustrations’ warm paper, ink blue, and terracotta
palette. The artwork does not assert biographical details.

## Final ImageGen prompts

Each edit used its matching source PNG as the only edit target, with
`transparent_background: true`. The exact common prompt below was expanded with
one of the subject descriptions that follow.

> Use case: background-extraction. Asset type: transparent watercolor
> illustration for a personal portfolio. Edit target: the single provided image.
> Remove only the flat peach/cream textured paper background and replace it with
> genuine alpha transparency. Keep {subject}. Preserve the original illustration
> exactly: character identity, pose, proportions, expression, colors, brushwork,
> fine fur or hair details, composition, and clothing. Preserve grounded
> translucent watercolor shadows, softly fading to transparent. No white or
> peach rectangle, no opaque backdrop, no checkerboard painted into the image.
> Do not add, redraw, stylize, or change any subject. Provide a complete cutout
> with a little transparent breathing room around all sides.

- Portrait (`Portrait aquarelle d’un jeune homme décontracté.png`): “the full
  standing man with backpack, from his hair to both shoes, including his
  delicate blue-gray watercolor ground shadow and a few nearby paint splashes”.
- Skater (`Skateur en mouvement, aquarelle dynamique.png`): “the crouching
  skateboarder with backpack, his entire skateboard including wheels, and the
  delicate blue-gray watercolor shadow and splashes underneath”.
- Companions (`Compagnons en aquarelle chaleureuse.png`): “all three animals:
  the sleeping black-and-white cat and its full scratching post, the central
  puppy, and the seated tabby at right, plus their delicate warm watercolor
  ground shadows”.

## Current trio and face prompts

Both edits used the built-in ImageGen tool with `transparent_background: true`.

### New trio

Source: `Trio d’animaux en aquarelle chaleureuse.png`.

> Use case: background-extraction. Edit the single supplied watercolor
> illustration. Remove ONLY its pale peach textured paper background and replace
> it with genuine alpha transparency. Preserve the exact three animals, colors,
> watercolor brushwork, poses, expressions, proportions, and composition: the
> sleeping blue-gray and white cat on its full scratching post at left, the
> central brown puppy with white face and chest, and the seated tabby at right.
> Keep all whiskers, fur details, the complete post and base, paws, tails, and
> the soft mauve watercolor ground shadows. Shadows must fade softly to
> transparent. Do not add, redraw, restyle, recolor, or reposition the subjects.
> No opaque rectangle, no paper background, no checkerboard baked into the
> image. Keep the full composition with a little transparent breathing room.

### Face mark

Source: the existing `nicolas-portrait-cutout.png`.

> Use case: identity-preserve and background-extraction. The supplied watercolor
> character is the EDIT TARGET. Create a square, transparent avatar/logo by
> isolating and closely framing this exact character's head: all of his tousled
> brown hair, both ears, blue eyes, smiling face, beard, and a tiny natural hint
> of the neck below the beard. Preserve the original face exactly: same
> expression, head angle, features, colors, and watercolor brushwork. This is a
> crop/extraction of the existing character, not a new portrait. Exclude the
> backpack, torso, clothing, and ground shadow. Center the head, occupying about
> 88 percent of the square so it remains recognizable as a tiny favicon. Keep a
> little transparent breathing room around the hair and ears. Genuine alpha
> transparency outside the head, no circle, badge, border, paper background,
> lettering, or newly added elements.

## Handwriting

The page self-hosts Caveat Medium (Latin WOFF2) from Google Fonts. Its SIL Open
Font License is included at `src/fonts/Caveat-OFL.txt`.

“Hello” uses outlines from the same Caveat Medium font. The static glyph data is
in `src/features/home/helloLettering.ts`, with pen guides that reveal each
letter through SVG masks in `src/features/home/Greeting.tsx`. Font parsing was
performed once in a temporary directory; it adds no runtime or project
dependency. The masks stay fully revealed when reduced motion is requested.
