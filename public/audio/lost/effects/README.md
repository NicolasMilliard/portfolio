# Island interaction sounds

Five small local PCM WAV effects, mono, 22.05 kHz / 16-bit, approximately 191 KB
in total. PCM avoids compressed-codec priming delays on short interactions.
There are no runtime audio libraries or third-party requests.

| Asset | Action | Duration |
| --- | --- | --- |
| `ui-click-v1.wav` | Explore, animation, sound toggle, close, terminal execute | 75 ms |
| `baggage-handle-v1.wav` | Select the suitcase from the scene | 850 ms |
| `baggage-open-v1.wav` | Release two latches and open the suitcase | 1.05 s |
| `paper-rustle-v1.wav` | Inspect the boarding pass; unfold/fold the lottery ticket | 900 ms |
| `terminal-boot-v1.wav` | Open the terminal from the phone or keyboard Easter egg | 1.45 s |

## Sources and licences

All sources were checked on their original Freesound pages on 2026-11-03 and
are [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

- **Bag rustle.wav**, Eyewer:
  https://freesound.org/people/Eyewer/sounds/435769/
  HQ preview: https://cdn.freesound.org/previews/435/435769_2716684-hq.mp3
- **suitcase_click_open_sqeeeek.wav**, sqeeeek:
  https://freesound.org/people/sqeeeek/sounds/381854/
  HQ preview: https://cdn.freesound.org/previews/381/381854_4277312-hq.mp3
- **Pickup_Note_03.wav**, scholzi982:
  https://freesound.org/people/scholzi982/sounds/566187/
  HQ preview: https://cdn.freesound.org/previews/566/566187_5547093-hq.mp3

The UI click is original procedural audio: a short, damped low tone and filtered
noise burst, generated offline with a fixed seed. The terminal startup is also
original: a quiet power-on click, a short CRT/motor hum and two soft monophonic
beeps. The suitcase opening layers two latch clicks with bag movement. Foley
is trimmed, filtered, levelled, and given short fades.

Source ranges: bag 23.015–23.865 s, latch 0.050–0.630 s, paper 0.025–0.925 s. The opening's lining layer uses bag 23.015–23.765 s,
starting 250 ms after the first latch.

## Rebuild

Download the HQ previews into a working folder as `bag.mp3`, `latch.mp3`,
and `paper.mp3`. Decode each, for example on macOS:

```sh
afconvert -f WAVE -d LEI16@22050 -c 1 bag.mp3 bag.wav
```

From the repository root:

```sh
node scripts/prepare-island-effects.mjs /path/to/decoded-recordings public/audio/lost/effects
```

An optional third argument writes a listening preview, in the table's order,
with half-second gaps. Preparation is separate from the production build.

## Playback

The sound control governs ambience and effects, preserving the existing stored
preference. Muted scene interactions stay silent. When switching sound off,
only the tiny confirmation click finishes. Dialogs pause the ambience while
leaving their own foley available.

Effects preload after sound starts or an enabled interaction requests one.
One foreground voice and a 75 ms same-cue debounce prevent rapid clicks from
stacking. Hidden tabs and navigation stop pending/playing effects. Media errors
and browser autoplay rejection never block the interaction.
