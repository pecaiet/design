# Carousel

One item at a time, with dots to pick one.

- The slides are the app's own content: show one and hide the others (`hidden`), with no motion.
- Under them, `.pc-carousel-dots` holds one `<button class="pc-carousel-dot" aria-label="Show todo">` per slide. The current one has `aria-current="true"`: long and strong; the others are short and faint, a little stronger under the pointer. Keyboard focus is the controls' blue ring.
- It may move on by itself every few seconds. It stops for good once a dot is picked, while an error shows on the page, and for people who ask for reduced motion.
- The sign-in page's left half is one: the apps, one at a time.
