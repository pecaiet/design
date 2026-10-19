# Table

Rows of records, usually inside a card.

- `<table class="pc-table">` with a `thead`. The header has a line under it; the rows have none.
- Rows are rounded pills (`pc-radius`), 2px apart. Every second row is in the page colour (`background`), so the rows read across without lines; the row under the pointer turns `accent`, over the stripe.
- A row that opens a record puts `<a class="pc-row-link">` on its main cell; the whole row becomes clickable and keyboard users tab to the link. With focus the row turns `accent` with the blue ring inside its rounded edge.
- Empty: one row with a cell spanning all columns holding `.pc-empty` (an `.pc-empty-title` and one sentence about what will appear).
