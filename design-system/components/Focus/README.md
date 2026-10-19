# Focus

Keyboard focus, the same on every component, as on claude.ai: one blue ring and one soft glow. It only shows on `:focus-visible` (keyboard), never on a mouse click.

Two shapes:

- **Outside, for controls** (buttons, fields, select, checkboxes, radios, links): `--pc-focus` draws a 1px blue `ring` just outside the edge and the glow. The control's own outer 1px turns the page colour, so a thin line separates its fill from the ring.
  - Bordered controls turn their border that colour: `border-color: var(--background)`.
  - Borderless ones draw the line inside: `box-shadow: inset 0 0 0 1px var(--background), var(--pc-focus)`.
- **Inside, for rows** (sidebar rows, menu items, search results, calendar days, table rows): `--pc-focus-inset` draws the ring inside the row's own edge; only the glow leaves the row. Rows also take their hover fill. This lets rows sit with no gap.

Building your own focusable thing:

- A standalone control with a border: `outline: 2px solid transparent; outline-offset: 1px; border-color: var(--background); box-shadow: var(--pc-focus);`
- A standalone control without a border: `outline: 2px solid transparent; outline-offset: 1px; box-shadow: inset 0 0 0 1px var(--background), var(--pc-focus);`
- A row in a list: `outline: 2px solid transparent; box-shadow: var(--pc-focus-inset);` plus its hover fill.
- Always on `:focus-visible`, and keep the transparent outline: Windows high-contrast mode draws it when shadows are hidden.
- Focus wins over hover and over a selected toggle: a focused button looks the same under the pointer.

Known exception: a field with an error keeps its red border while focused, so the error stays visible.
