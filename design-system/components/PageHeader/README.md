# Page header

The top of a page: its title, an optional line about it, and, on some pages, the page's action on the right.

- Two types: without an action (the title alone) and with one on the right.
- `.pc-page-header` holding `.pc-page-header-text` and, when the page has an action, `.pc-page-header-actions`.
- `.pc-page-header-text`: a `.pc-page-title-row` (the sidebar toggle, then the `.pc-page-title`), then an optional `.pc-page-description`. The description lines up with the title, not the toggle.
- Every page's title row starts with the sidebar toggle (see Navigation): `text-outdent` while the sidebar is open, `text-indent` while it's closed. The toggle and the title never move.
- Actions: at most one primary button. A page about one thing (a list, a client) can have its ⋯ menu here.
- When the action doesn't fit beside the title, at any width, it moves to the next row, under the title, aligned left.
