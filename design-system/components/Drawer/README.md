# Drawer

A panel from the right with a form or a record's details, over the page or beside it.

- Two kinds, with the same parts:
  - **Over the page**: `<dialog class="pc-drawer">`, opened with `showModal()`. It is 400px wide, full height and flush with the screen's right edge, with a line on its left and `pc-raise-lg`, over the dimmed page (`overlay`). The x, Escape or a click on the dimmed page closes it. On phones it fills the screen, like the Settings modal. Use it for one edit that the page waits on: Save or Cancel.
  - **Beside the page**: `<aside class="pc-drawer pc-drawer-beside">`, the last thing in the page's row. It is 400px on the right and nothing is dimmed, so the page stays usable: open one row, then the next. The open row keeps its fill. On phones it fills the screen, and its back arrow shows in place of the x.
- Parts:
  - `.pc-drawer-head`: an optional `.pc-btn.pc-btn-ghost.pc-btn-icon.pc-drawer-back` (a Phosphor `caret-left`, shown only for a drawer beside the page on phones), the `.pc-drawer-title` (`pc-heading`), and the close x, `.pc-btn.pc-btn-ghost.pc-btn-icon.pc-drawer-close` (`aria-label="Close"`).
  - `.pc-drawer-body`: the `.pc-field`s, 12px apart; it scrolls when they don't fit.
  - `.pc-drawer-footer`: Cancel (outline), then the action (primary), under a line from edge to edge. The action names what happens: "Save", "Create list".
- Label the drawer by its title (`aria-labelledby`). Focus starts on the drawer itself (`tabindex="-1"`, focused after `showModal()`), as in the Settings modal; Tab moves into it. The page behind doesn't scroll while it is open.
- The app provides: opening and closing (`showModal()`, `close()`, the click on the dimmed page), which row is open, and the row a drawer beside the page sits in, as tall as the page.
- A yes/no question stays a Modal.
