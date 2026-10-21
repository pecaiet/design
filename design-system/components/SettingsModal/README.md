# Settings modal

A big window over the page with its own nav, for settings: not a plain modal. Each section has its own address (/settings/account). Opened from a link in the app it opens over the page you are on, and closing goes back there; an address typed in opens it over the home page.

- `<dialog class="pc-modal" tabindex="-1">`, opened with `showModal()` and then focused itself, so no row lights up on open (Tab moves in); the browser keeps focus inside and dims the page with `::backdrop`. Label it with the nav's title (`aria-labelledby`).
- Inside: `.pc-modal-frame` holding a `.pc-sheet-backdrop` and the nav, a `.pc-sidebar.pc-modal-nav` (216px, the sidebar's colour, no line on its right): a `.pc-sidebar-head` with the title as `.pc-dialog-title` ("Settings"), one `.pc-sidebar-item` per section (Account, Sessions, Preferences) with the current one `aria-current="page"`, and in a `.pc-sidebar-footer` the signed-in email as `.pc-modal-nav-user` (an `.pc-avatar` and the email, muted).
- Then `.pc-modal-main`: a `.pc-modal-head` with a `.pc-page-title-row` (the sidebar toggle and the section's `.pc-page-title`) and a ghost icon close button (`aria-label="Close settings"`), over a `.pc-modal-body` that scrolls on its own and stacks the section's cards.
- Desktop: up to 960 × 640, centred, with 24px of page showing around it; the toggle is hidden.
- Phones (below 48rem): it fills the screen and the nav is hidden. The toggle opens `.pc-modal-frame` as a `.pc-sidebar-sheet`, exactly like the app's sidebar; the backdrop or Escape closes the sheet.
- The close button, Escape and a click on the dimmed page around it leave the modal (back to the page under it). The click counts only when the press started there too, so selecting text and letting go outside doesn't close it. The page behind doesn't scroll while it is open.
- Motion: it opens and closes like a Modal; on phones the settings nav slides in from the left. Preferences has a Motion card under Theme, On · Off (radios named `pc-motion` set it, with pecaiet.js loaded).
