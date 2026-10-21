# Pagination

Moving through something split into pages: page numbers, Previous and Next, or Show more.

- `<nav class="pc-pagination" aria-label="Pages">` holds ghost buttons (links, so each page has an address):
  - Previous and Next, with their words and a `caret-left` / `caret-right`; where room is short, the arrows alone (`.pc-btn-icon`, with an `aria-label`).
  - The page numbers, `.pc-btn.pc-btn-ghost.pc-btn-icon.pc-pagination-page`. The current one has `aria-current="page"` and an outline button's border, so it never looks like the hover fill.
  - `.pc-pagination-gap` ("…", `aria-hidden`) for the pages left out: show the first and last pages and the ones either side of the current one. Seven pages or fewer: show them all.
  - An end that goes nowhere (Previous on the first page) gets `aria-disabled="true"` and no `href`, and, like any ghost button that can't be used, turns grey words with no box, lighter than the working end.
- Compact, for a narrow card and on phones: two arrows around `.pc-pagination-where` ("Page 5 of 20"). Below 48rem, use this one.
- When the page number doesn't matter (a log, search results): `.pc-pagination-bar` with a `.pc-pagination-count` ("81–100 of 394") first and the two arrows at the end.
- A big table can let people choose how many rows: `.pc-pagination-size` ("Rows per page" and a Select button) first in the bar.
- Show more instead of pages: `.pc-pagination-more`, an outline "Show 20 more" button with how many are shown ("40 of 134"); the next rows join the ones you see.
- Under a table, the bar sits in the card's footer: the count first, the pages at the end.
