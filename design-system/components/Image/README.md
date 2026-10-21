# Image

A picture: our 10px corners and a faint edge, so white pictures keep their shape.

- `<img class="pc-image" alt="…">` gets the 10px corners and a hairline inside its edge, in the text colour at 12%. A photo barely changes; a white screenshot keeps its edge on a white card.
- Give it a size or an aspect ratio (`width` and `height`, or `aspect-ratio`) so the page doesn't jump while it loads; the picture fills that box (`object-fit: cover`).
- While it loads, or if it can't: `<div class="pc-image pc-image-empty" role="img" aria-label="…">` in the muted fill, with a Phosphor `image` icon.
- With a caption: `<figure class="pc-figure">`, the image, then a `<figcaption>` (12px, muted).
- `alt` says what's in the picture; a picture that's only decoration gets `alt=""`.
