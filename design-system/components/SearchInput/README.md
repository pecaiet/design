# Search input

Finding things: a search field on a page, or the search window over everything.

- On a page (filtering a table or a list): `<div class="pc-input-group" role="search">` with the Phosphor `magnifying-glass`, then `<input class="pc-input" type="search" aria-label="Search users" placeholder="Search users">`. It looks like every other field: the border, the corners, the focus ring.
- Once there's text, an x at the end clears it: `<span class="pc-input-group-end">` with a ghost icon button (`x`, `aria-label="Clear search"`). While the results take a moment, a `.pc-spinner` (`role="status"`) sits there instead.
- The list filters as people type. Say how many match near it ("2 of 48 users"). Nothing matches: an Empty state that repeats the words (no button: the field's x clears them).
- The search window, for searching everything (⌘K): `.pc-dialog.pc-search` with a `.pc-search-field` (a bare 48px row: the magnifier and the input; with keyboard focus the row takes the inset ring), `.pc-search-results` with `.pc-search-group` headings (a `.pc-search-count` after the name) and `.pc-search-result` links, and an optional `.pc-search-footer` with keys.
- Before typing: recent searches, under a "Recent searches" heading with a `.pc-search-group-action` (Clear) at its end, each row with the `clock-counter-clockwise` icon. While it looks: a `.pc-spinner` at the end of the field.
- Each result: a mark (open, done or note), the `.pc-search-title` with the matching words in `<mark class="pc-search-match">` (semibold), and where it lives on the right (`.pc-search-place`). The highlighted result has `aria-selected="true"`; Enter opens it. Nothing found: a `.pc-empty` that repeats the words and says what search looks at.
- On phones the window fills the screen (not the sheet other modals use): the field at the top with a `.pc-search-cancel` button at its end; the keys and the places are hidden.
