# Dropdown menu

A short list of actions or places that opens over the page from a button.

- `.pc-menu` holding `.pc-menu-item` (a button or link, with an optional 16px icon), `.pc-menu-separator` between groups, and an optional `.pc-menu-label` for who or what the menu is about.
- Put a delete action last, after a separator, as `.pc-menu-item .pc-menu-item-destructive`.
- Close it on Escape and on a click outside. The app positions it; the component only draws it.
- Choosing one of many (Move to): `.pc-menu-label` group headings, `role="menuitemradio"` items with the list's icon, and a `.pc-menu-check` tick on the current one.
- The account menu: three items and nothing else: Settings (the idp account settings), Admin panel (admins only), then a separator and Sign out as `.pc-menu-item-destructive`. In the admin panel, Admin panel becomes Back to pe caiet (Phosphor `arrow-left`), which goes to pe caiet's home page. No header: the row it opens from already shows who is signed in.
  - From the sidebar's account row: `.pc-sidebar-account-menu`, placed above the row and as wide as the sidebar.
  - From the top bar's account row: it opens down from the row, aligned to its right edge.

## On phones

Every menu that pops up is a sheet on phones: docked to the bottom of the screen, full width, rows 44px tall, over a dimmed backdrop. On desktop it stays a dropdown. There is no drag handle: a tap on the backdrop or Escape closes it.

- Give the popping-up `.pc-menu` the `.pc-menu-pop` modifier and put a `.pc-menu-backdrop` right before it. Below 48rem the menu becomes the sheet and the backdrop shows while it is open. `.pc-menu-sheet` makes a menu a sheet at any width.
- Each kind keeps its marker in the sheet:
  - Places (the app switcher): a primary bar and a semibold name on where you are. The trigger shows the current place with an up-down caret.
  - Actions: no marker; every item is a verb, Delete goes last after a divider, in red, and an item that opens another choice ends in "…". A `.pc-menu-label.pc-menu-title` names the thing acted on; it shows only in the sheet.
  - Values are the Picker's: a tick on the current one.
- The sheet leaves room for the phone's home bar and scrolls inside when it is taller than 85% of the screen. While it is open the page behind it doesn't scroll.
