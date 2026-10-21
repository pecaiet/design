# Select

Choosing one value from a list: a button that looks like a field and opens our own list. On desktop the list drops below the button; on phones it's a sheet at the bottom of the screen. The browser's own dropdown isn't used.

- Markup (the code names say "picker", from when this was called the Picker): `.pc-picker` holding a `.pc-picker-button` (`aria-haspopup="listbox"`, `aria-expanded`; the value in a `<span>`, then the `caret-down` chevron) and, right after it, `.pc-menu-backdrop` and `.pc-menu.pc-picker-menu.pc-menu-pop` (`role="listbox"`, hidden until open). Label it with a `.pc-label` in a `.pc-field`.
- The field: nothing chosen yet shows a muted `.pc-picker-placeholder` ("Choose a space"); a long value is cut with "…". Keyboard focus is the blue ring; `disabled` is half strength. An error: `aria-invalid="true"` turns the border red and a `.pc-field-error` under it says what to do.
- Options are `.pc-menu-item` with `role="option"`; the chosen one has `aria-selected="true"` and a `.pc-menu-check` tick at the end. Nothing else is bold. Groups use `.pc-menu-label`.
- An option can start with a colour dot (`<span class="pc-menu-dot pc-colour-green">`) or a 16px icon. A first "None" option (`.pc-menu-none`, muted) lets people clear the choice. A choice that can't be picked gets `aria-disabled="true"` (half strength) and says why in a `.pc-menu-note` at its end.
- Search: an Input group (`.pc-input-group` with the search icon and a `.pc-input`) first in the list filters the options. When nothing matches, one `.pc-menu-empty` line says so.
- A list of places instead of values (switching list, workspace or app): add `.pc-menu-places`, use links with `aria-current="page"` on where you are (a primary bar and a semibold name, no tick), and give the button the up-down caret instead of the chevron.
- A `.pc-menu-label.pc-menu-title` first in the list names the choice ("Sort by"); it shows only on phones, where the sheet has no field label above it.
- Picking applies the value, closes, and puts focus back on the button. Escape or a tap on the backdrop closes without a change. Up and Down move through the options, Enter picks.
- When: six or more choices, or long ones. Two to five that should all be visible are Radio buttons; switching a view right away is a Segmented control; typing to find in a long list is the Combobox (this with search).
- The app opens and closes it (toggles `hidden` and `aria-expanded`) and filters for search; the classes only style it.
- Motion: its menu fades like every menu (Dropdown menu), and its arrow turns up while the list is open (120ms).
