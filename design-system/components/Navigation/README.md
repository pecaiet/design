# Navigation

The app's navigation, always a sidebar. One toggle opens and closes it, on desktop and on phones, and it lives in each page's title row.

- The toggle: `.pc-btn .pc-btn-ghost .pc-btn-icon .pc-sidebar-toggle` at the start of the page's `.pc-page-title-row`, left of the title. Open, it shows Phosphor's `text-outdent` (pointing left; `aria-label="Close sidebar"`, `aria-expanded="true"`); closed, `text-indent` (pointing right; `aria-label="Open sidebar"`, `aria-expanded="false"`). It never moves, and neither does the title.
- Open (desktop): `<nav class="pc-sidebar">` with a `.pc-sidebar-head` holding the App switcher (the current app; its menu lists the others), the `.pc-sidebar-item` rows (headings with their nested rows in `.pc-sidebar-sub`), and `.pc-sidebar-footer` with the app's own actions (todo's New list) and the account row. Sticky, one screen tall; it scrolls when the rows don't fit.
- The account row is always at the bottom: the footer is pushed down when the rows are few and stays pinned while they scroll.
- Opening and closing are instant for now (`data-state="closed"` on the sidebar). The slide uses the shared `--pc-motion-base`, so it animates once motion is turned on.
- Phone: no extra bar; the title row is the same. Open, `.pc-sidebar-sheet` with a `.pc-sheet-backdrop` and the same `.pc-sidebar` opens over the page; a tap on the backdrop or Escape closes it. While it is open the page behind it doesn't scroll. The sidebar itself never holds a toggle.
- Remember the desktop choice (open or closed) per person; phones always start closed.
