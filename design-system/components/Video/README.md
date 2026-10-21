# Video

A video in the page: Image's corners and edge, a white play button until it starts, then the browser's own controls.

- `<div class="pc-video">` around a `<video poster="…" preload="none" playsinline>`: 10px corners, the faint edge inside (the text colour at 12%), black behind. 16:9 unless you give it another `aspect-ratio`; the video is never cropped.
- Before it plays: a `<button class="pc-video-play" aria-label="Play “…”, 2 minutes">` in the middle (a white 48px circle, Phosphor `play-fill` in the text colour, a soft shadow) and `<span class="pc-video-length" aria-hidden="true">2:05</span>` at the bottom right. Under the pointer the button turns faintly grey; keyboard focus is the blue ring.
- Pressing play sets `data-state="playing"` on `.pc-video`, which hides the button and the length, gives the video `controls` and starts it. From then on the browser's own controls do the rest (pause, the bar, the time, sound, full screen).
- Not loaded yet, or can't play: `<div class="pc-video pc-video-empty" role="img" aria-label="…">` in the muted fill with a Phosphor `video` icon.
- With a caption: inside a `<figure class="pc-figure">` with a `<figcaption>`, as for Image.
- Never start on its own with sound. A video with speech gets captions (`<track kind="captions">`).
- `play-fill` is the second filled icon, after the Rating star: an outline play mark is too faint at this size.
