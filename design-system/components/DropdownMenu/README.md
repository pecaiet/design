# Dropdown menu

A short list of actions or choices that opens over the page from a button.

- Parts:
  - `.pc-menu` holds the `.pc-menu-item`s (a button or a link, with an optional 16px icon in `muted-foreground`), 4px apart.
  - `.pc-menu-separator`: a line between groups, from edge to edge.
  - `.pc-menu-label`: an optional group heading, in `muted-foreground` at 12px.
- Actions: every item is a verb, and one that opens another choice ends in "…". Delete goes last, after a separator, as `.pc-menu-item.pc-menu-item-destructive`, in red.
- Choosing one of many: `role="menuitemradio"` items, and a `.pc-menu-check` tick on the current one.
- Where you are, in a menu of places (`.pc-menu-places`): a semibold name and a primary bar on the menu's left edge. The App switcher shows it.
- Hover and keyboard focus fill the row with `accent`; keyboard focus adds the ring inside the row (Focus). A disabled item is at half strength.
- It closes on Escape and on a click outside. The app positions it next to the button that opens it; the component only draws it.

## On phones

Every menu that pops up is a sheet on phones: docked to the bottom of the screen, full width, rows 40px tall like every row on phones, over the dimmed page. On desktop it stays a dropdown. There is no drag handle: a tap on the dimmed page or Escape closes it.

- Give the popping-up `.pc-menu` the `.pc-menu-pop` modifier and put a `.pc-menu-backdrop` right before it. Below 48rem the menu becomes the sheet and the backdrop shows while it is open. `.pc-menu-sheet` makes a menu a sheet at any width.
- A `.pc-menu-label.pc-menu-title` names the thing acted on; it shows only in the sheet.
- The sheet leaves room for the phone's home bar and scrolls inside when it is taller than 85% of the screen. While it is open the page behind it doesn't scroll.
