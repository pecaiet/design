# Search input

A dialog for finding tasks: the field on top, results grouped below.

- `.pc-dialog .pc-search` holding `.pc-search-field` (an icon and a bare input), `.pc-search-results` with `.pc-search-group` headings (a `.pc-search-count` after the name) and `.pc-search-result` links, and an optional `.pc-search-footer` with keys.
- Each result: a mark (open, done or note), the `.pc-search-title`, and where it lives on the right (`.pc-search-place`: an icon and a name). The highlighted result has `aria-selected="true"`; Enter opens it.
- No results: an `.pc-empty` that repeats the query and says what search looks at.
