# LOST 404 runtime images

This folder contains only the **33 WebP images used by the current LOST 404
experience**, plus this asset list. Unused JPEG backgrounds, original PNG
exports, and superseded artwork have been removed from the public directory.

All responsive variants and images loaded by inspections are included. A file
is still used even if your current screen size or inspection state does not
request it.

## Replacing files with compressed versions

Use the exact filenames listed below. Keep the existing pixel dimensions,
transparent margins, and alpha channels so the objects, foliage masks, and
inspection overlays stay aligned. No component or stylesheet changes are
needed when replacing these files in place.

## Usage

| File family | Use | Width variants |
| --- | --- | --- |
| `clearing-sea-v1` | Desktop sky, sea and beach layer | 1056, 1586 |
| `clearing-forest-v1` | Desktop forest layer | 1056, 1586 |
| `clearing-ground-v1` | Desktop sand, roots and rocks | 1056, 1586 |
| `clearing-mobile-v1` | Dedicated portrait environment | 480, 852 |
| `canopy-warm-v1` | Overhead foliage | 1000, 2000 |
| `foreground-left-v1` | Left foreground and object concealment | 450, 900 |
| `foreground-right-v1` | Right foreground and object concealment | 450, 900 |
| `fuselage-v1` | Aircraft wreckage | 480, 960 |
| `wheelchair-v1` | Scene, inspection and frame detail | 240, 480, 960 |
| `dharma-can-v1` | Scene and upright inspection | 160, 640 |
| `dharma-can-base-v1` | Turned-over can inspection | 720 |
| `boarding-pass-weathered-v1` | Scene preview and paper inspection | 160, 320, 720, 1440 |
| `folded-shirt-v1` | Shirt inspection | 600, 1000 |
| `suitcase-preview-v2.webp` | Scene preview | Single file |
| `suitcase-closed-v2.webp` | Closed suitcase inspection | Single file |
| `suitcase-open-v2.webp` | Open suitcase and item hotspots | Single file |
| `satellite-phone-v1.webp` | Phone opening the terminal | Single file |
| `lottery-ticket-damaged-v3.webp` | Lottery inspection | Single file |

Families with width variants use the filename `<family>-<width>.webp`.

## Complete file list

```text
boarding-pass-weathered-v1-1440.webp
boarding-pass-weathered-v1-160.webp
boarding-pass-weathered-v1-320.webp
boarding-pass-weathered-v1-720.webp
canopy-warm-v1-1000.webp
canopy-warm-v1-2000.webp
clearing-forest-v1-1056.webp
clearing-forest-v1-1586.webp
clearing-ground-v1-1056.webp
clearing-ground-v1-1586.webp
clearing-mobile-v1-480.webp
clearing-mobile-v1-852.webp
clearing-sea-v1-1056.webp
clearing-sea-v1-1586.webp
dharma-can-base-v1-720.webp
dharma-can-v1-160.webp
dharma-can-v1-640.webp
folded-shirt-v1-1000.webp
folded-shirt-v1-600.webp
foreground-left-v1-450.webp
foreground-left-v1-900.webp
foreground-right-v1-450.webp
foreground-right-v1-900.webp
fuselage-v1-480.webp
fuselage-v1-960.webp
lottery-ticket-damaged-v3.webp
satellite-phone-v1.webp
suitcase-closed-v2.webp
suitcase-open-v2.webp
suitcase-preview-v2.webp
wheelchair-v1-240.webp
wheelchair-v1-480.webp
wheelchair-v1-960.webp
```

## Artwork and composition

Original artwork was generated with the built-in `image_gen` tool through the
approved composition and object reviews. The desktop layers share a 1586 × 992
frame; the portrait artwork uses an 852 × 1846 frame. Media-selected picture
sources keep the desktop plates from downloading on mobile and vice versa.
Large paper and artifact inspection images load only when their views open.

The wheelchair and can clue numbers are text overlays, so their image canvas
and object placement must remain consistent. Boarding-pass and lottery digits
are part of their photographic artwork.

Reference photographs informed the artwork and are not served by the site:
[wheelchair reference](https://www.wired.com/2010/08/lost-props-2/),
[Dharma ration props](https://www.juliensauctions.com/en/items/314885/lost-dharma-initiative-food-ration-props),
[lottery reference](https://lostpedia.fandom.com/wiki/The_Numbers?file=Lotto_ticket_.jpg),
[production lottery prop](https://propstoreauction.com/lot-details/index/catalog/489/lot/185675/296-Hugo-Hurley-Reyes-Jorge-Garcia-Production-Made-Mega-Lotto-Jackpot-Ticket-LOST-T-V-SERIES-2004-2010).
