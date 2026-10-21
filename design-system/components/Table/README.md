# Table

Rows of records, usually inside a card.

- `<table class="pc-table">` with a `thead`. The header has a line under it; the rows have none.
- Rows are rounded pills (`pc-radius`), 32px tall like every other row, 2px apart. Every second row is in the page colour (`background`), so the rows read across without lines; the row under the pointer turns `accent`, over the stripe.
- A row that opens a record puts `<a class="pc-row-link">` on its main cell; the whole row becomes clickable and keyboard users tab to the link. With focus the row turns `accent` with the blue ring inside its rounded edge.
- Picking rows: a first column (`.pc-table-check`) with a checkbox in each row and one in the header for all. A picked row has `aria-selected="true"` and turns `primary-soft`.
- Sorting: a column people can sort holds a `<button class="pc-table-sort">` in its `th`, with `aria-sort` on the `th` (`ascending` or `descending`) and a Phosphor caret, up for A to Z, down for Z to A. Sort one column at a time.
- Numbers sit on the right (`.pc-table-num`), with their header, in even-width figures. Dates and other quiet values are `.pc-muted`.
- A row's own actions: a ⋯ ghost icon button (`aria-label`, `aria-haspopup="menu"`) in the last column (`.pc-table-actions`), opening a Dropdown menu. The header cell names it for screen readers only.
- Checkboxes and buttons in a row stay clickable over a row link.
- Empty: one row with a cell spanning all columns holding `.pc-empty` (an `.pc-empty-title` and a `.pc-empty-description` about what will appear).
- Motion: rows added after the page has loaded fade in and drop 4px; `Pecaiet.leave(row)` fades one out before it goes (a Turbo remove does it by itself).
