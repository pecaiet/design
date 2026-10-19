# Picker

Every choice from a list, instead of a native select: a button that looks like a field, opening a menu (a listbox) of options. On desktop the menu drops below the button; on phones it is a sheet at the bottom of the screen.

- Markup: `.pc-picker` holding `.pc-picker-button` (aria-haspopup="listbox", aria-expanded; the value in a `<span>`, then a chevron) and, right after it, `.pc-menu-backdrop` and `.pc-menu.pc-picker-menu.pc-menu-pop` (role="listbox", hidden until open).
- Options are `.pc-menu-item` with role="option"; the chosen one has aria-selected="true" and a `.pc-menu-check` tick at the end. Nothing else is bold. Groups use `.pc-menu-label`.
- Search: put an input with an icon (`.pc-input-group` with the search icon and a `.pc-input`) first in the menu; it filters the options. When nothing matches, one `.pc-menu-empty` line says so.
- A list of places instead of values (switching list, workspace or app): add `.pc-menu-places`, use links with `aria-current="page"` on where you are (a primary bar and a semibold name, no tick), and give the button the up-down caret instead of the chevron.
- A `.pc-menu-label.pc-menu-title` first in the menu names the choice ("Sort by"); it shows only on phones, where the sheet has no field label above it.
- Picking applies the value, closes, and puts focus back on the button. Escape or a tap on the backdrop closes without a change. Up and Down move through the options, Enter picks.
- The app opens and closes it (toggles `hidden` and `aria-expanded`) and filters for search; the classes only style it.
