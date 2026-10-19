# Breadcrumbs

Where the page sits: the pages above it, as links, above its title.

- `<nav class="pc-breadcrumbs" aria-label="Breadcrumb">`: the parent pages as `<a>`, a Phosphor `caret-right` `<svg>` between, and the page you are on last as `<span aria-current="page">`.
- 12px: parents in `muted-foreground` with no underline until the pointer is on them (then the text colour and a soft underline, like a link); the page you are on in `foreground`. Keyboard focus is the controls' blue ring.
- Above the page header. With the sidebar toggle in the title row, the trail lines up with the title, not the toggle (like the page description). The app adds a little space under it (6px in idp).
- A long trail wraps; phones show the same trail.
- Only on pages below another page (a user under Users); never on a top-level page.
