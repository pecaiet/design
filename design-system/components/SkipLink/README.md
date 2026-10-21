# Skip link

A link that lets keyboard users jump past the sidebar to the page's content.

- `<a class="pc-skip-link" href="#main">Skip to tasks</a>`, the first thing in the page. It stays out of sight until it has keyboard focus (the first Tab), then shows as a raised pill at the top left, 8px in, over the page, with the blue focus ring.
- The place it skips to gets an `id` and `tabindex="-1"`, so Enter moves focus there and the next Tab starts from it.
- Say where it goes: "Skip to tasks", "Skip to settings". A page with two places to skip to has two links, one after the other, shown in the same place.
- Motion: it slides down into view when it gets keyboard focus, and back up (200ms).
