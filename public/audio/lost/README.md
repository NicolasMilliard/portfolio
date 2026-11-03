# Island ambience

`island-ambience-v1.m4a` is a locally mixed 60-second stereo ambience loop.
This fictional island soundscape combines real field recordings rather than
show audio, music, synthetic bird calls, or runtime third-party streams.

## Sources

All three recordings are published under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
Licences were checked on their original Freesound pages on 2026-11-03.

- **Pacifica Ocean Waves with Birds**, el_boss:
  https://freesound.org/people/el_boss/sounds/561502/
  Published HQ preview: https://cdn.freesound.org/previews/561/561502_9129912-hq.mp3
- **Jungle / Forest Ambience**, seventhsamurai:
  https://freesound.org/people/seventhsamurai/sounds/644989/
  Published HQ preview: https://cdn.freesound.org/previews/644/644989_3288322-hq.mp3
- **Ambiance_Wind_Trees_Leaves_Moderate_Loop_Stereo.wav**, Nox_Sound:
  https://freesound.org/people/Nox_Sound/sounds/546759/
  Published HQ preview: https://cdn.freesound.org/previews/546/546759_9250976-hq.mp3

## Mix and export

Surf leads the mix; leaf movement and birds sit quietly behind it. Processing
removes low-frequency rumble, softens high frequencies, narrows the distant bird
layer, balances levels, and crossfades individual layers and the final boundary.
The loop crosses between continuous samples instead of fading to silence.
The AAC-LC export contains 44.1 kHz stereo audio at approximately 128 kbps,
occupies 995 KB, and has peak headroom. The PCM master measures -24.2 dBFS RMS
with a -3.7 dBFS peak; the player starts at 45% volume.

To reproduce on macOS, download the published previews into a working folder as
`surf.mp3`, `jungle.mp3`, and `leaves.mp3`. Decode each using, for example:

```sh
afconvert -f WAVE -d LEI16@44100 -c 2 surf.mp3 surf.wav
```

Run the offline mixer from the repository root (Node built-ins only):

```sh
node scripts/mix-island-ambience.mjs /path/to/decoded-recordings /tmp/island-ambience.wav
afconvert -f m4af -d aac -b 128000 -q 127 /tmp/island-ambience.wav public/audio/lost/island-ambience-v1.m4a
```

Audio preparation is separate from the site build. The source recordings and
intermediate WAV are not needed at runtime. No new package dependency is used.

## Playback

The page requests quiet playback by default and presents a play button if the
browser blocks autoplay. Explicit pauses are remembered in local storage and
also mute interaction effects.
Playback pauses while a dialog is open, while the document is hidden, and on
navigation away. Returning resumes only if the visitor has not paused it.
Environmental animation and audio have independent controls. Sound-enabled
scene interactions can unlock the requested ambience after an autoplay block.
Short local interaction cues are documented in [effects/README.md](effects/README.md).
