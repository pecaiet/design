# Header

The bar across the top of a page without a sidebar: the logo, and who is signed in. Only pe caiet's root page uses it.

- A `<header>` row: the `.pc-app-logo` on the left and the account row on the right: the Sidebar account row (`.pc-sidebar-item` with an `.pc-avatar` and the email in `.pc-sidebar-label`) with an up-down caret (Phosphor `caret-up-down`), as wide as its content.
- Its menu, the account menu (`.pc-menu.pc-menu-pop`, see Dropdown menu), opens down from the row, aligned to its right edge; on phones it is a sheet at the bottom of the screen.
- Desktop: 72px tall (24 above and below the 24px logo) and 24px from the edges, so the logo sits exactly where it sits on the sign-in page. The page under it is a column up to 1120px.
- Phones: 48px tall and 16px from the edges, in the `sidebar` colour, like the sign-in page's bar.
- Built from the shared classes; the bar's own layout is app utilities (Tailwind in idp), as on Sign in.
