# App switcher

The sidebar head as a button: the current app's mark and name, and an up-down caret. It opens a menu below it, as wide as the head (like the account menu above the account row).

- Markup: `.pc-sidebar-head > .pc-sidebar-apps` holding `.pc-menu.pc-sidebar-apps-menu` (role="menu", hidden until opened) and the button `.pc-sidebar-item` (aria-haspopup="menu", aria-expanded).
- The menu: a `.pc-menu-label` "Switch app", one `.pc-menu-item` per app, a `.pc-menu-separator`, then "pe caiet". The app you are in has `aria-current="page"`, which draws a primary bar on the menu's left edge. pe caiet ends with a grid icon (`.pc-menu-end`, a muted icon or text pushed to the right).
- Each app's mark is `.pc-app-logo-mark`, a square slot: put the app's square `<img>` or `<svg>` inside it and it fills the square (24px in the head, 20px in the menu). A letter works as a stand-in.
- Open and close it like the account menu: the button toggles `hidden` and `aria-expanded`; Escape or a click outside closes it.
