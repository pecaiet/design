# Tabs

Switching between parts of one page: words over a line, the current one marked with a teal line under it.

- `<div class="pc-tabs" role="tablist" aria-label="…">` of `<button class="pc-tab" role="tab" aria-controls="…">`, each part in a `<div class="pc-tab-panel" role="tabpanel">`. When each part has its own address, the tabs are links: `<a class="pc-tab" aria-current="page">`.
- The current tab (`aria-selected="true"`) is in the text colour, semibold, with a 2px teal line under it; the others are muted and turn the text colour under the pointer. A line in the `border` colour runs under the whole row.
- An optional 16px icon before the words; an optional count after them (`.pc-tab-count`).
- Keyboard: only the current tab is in the Tab order (`tabindex="0"`, the rest `-1`); the arrow keys move between tabs, and focus is the ring inside the tab's edge.
- When the tabs don't fit (on a phone), the row scrolls sideways; keep the current tab in view.
- Two to six tabs, named with a noun. Choosing a value or a view of the same things (List or Board) is a Segmented control; going to another page is Navigation.
