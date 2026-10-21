# Tree view

Things inside things, like folders of lists, as sidebar rows that open and close.

- `<ul class="pc-tree" role="tree">` of `<li class="pc-tree-item" role="treeitem" aria-level="1">` rows, as tall as the row and 2px apart, in the sidebar's colours. Each row: a `.pc-tree-caret` before anything that opens (Phosphor `caret-right`, `caret-down` when open, with `aria-expanded`), a 16px icon, the `.pc-tree-label` (cut off when long) and an optional `.pc-tree-count`.
- Each level starts 24px further in, and the row's fill starts there too, right under its parent's icon, so it's clear what sits inside what.
- At the top level, a row with nothing to open keeps an empty `.pc-tree-caret` so its icon lines up with the folders'.
- Under the pointer a row takes the sidebar hover fill; the current item (`aria-current="page"`) is the active sidebar pill; keyboard focus is the ring inside the row.
- Keyboard: up and down move between rows, right opens or goes into a folder, left closes or goes back to its folder.
