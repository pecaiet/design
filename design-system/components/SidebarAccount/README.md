# Sidebar account

The account row at the foot of the sidebar: who is signed in, and the button that opens the account menu.

- Always the last thing in the sidebar, at the bottom, inside the pinned `.pc-sidebar-footer`; it stays in view while the rows scroll.
- A `.pc-sidebar-item` button inside `.pc-sidebar-account`: an `.pc-avatar` (the email's first letter), the email in `.pc-sidebar-label`, and a caret pointing down (Phosphor `caret-down`). People have an email, not a name, so the email is the label.
- `aria-haspopup="menu"`; `aria-expanded="true"` while its menu is open, which keeps the hover fill.
- Its menu (Settings, Admin panel, Sign out) is on the Dropdown menu card; in the Header the same row sits on the right with an up-down caret.
