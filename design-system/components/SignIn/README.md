# Sign in

The signed-out pages, all on one layout: sign in, create an account, reset your password, and choose a new password.

- Two halves. The left one is the sidebar colour (no edge line): the pe caiet logo at the top, "© pe caiet" at the foot, and between them one app at a time, every 2.8 seconds (todo, then pe caiet):
  - a wash of the app's colour over the whole half (22% in light, 16% in dark);
  - its mark, 160px with rounded corners and a soft shadow, above "One space for / your lists" (`pc-page-title`; the word is the app's: lists, account), a muted line, and dots that pick an app (the current one long);
  - the same mark at 900px, very faint (14% in light, 10% in dark) and tilted, cut off at the half's bottom-right corner.
  - No motion, only show and hide. It stops while an error shows (on the first app) and for people who ask for reduced motion.
- Desktop: the left content and the form are both 400px columns, each 7% of the window (40–120px) from the divider, so the two halves mirror each other.
- The right half holds the form: the title (`pc-page-title`), a muted line with the switch to the other page (`pc-link`), the fields (`pc-field`, `pc-label`, `pc-input`, `pc-field-hint`), and the main button full width (`.pc-btn-full`).
- Errors: a `pc-alert pc-alert-error` above the fields, and `aria-invalid="true"` on the field at fault. After a reset request the person is back on sign in with a `pc-alert pc-alert-notice` above the fields.
- "Forgot password?" sits at the right end of the password label's row.
- A light/dark switch: an icon-only row button (`pc-sidebar-item`, like the account row in a top bar, so it takes the same `sidebar-hover` fill; `aria-label="Switch between light and dark"`) showing a moon in light and a sun in dark (Phosphor `moon`, `sun`). On desktop it sits in the top-right corner, level with the logo, 28px from the edge; on phones right under the bar. A click switches to the other theme and remembers it, the same choice the settings' Preferences make.
- Phones: the left half shrinks to a bar with the logo on the left and, on the right, the current app's mark with "for your lists" (changing with it; the words share one spot, so the mark doesn't move). The form takes the width (at most 360px) in the middle of the screen, with "© pe caiet" at the foot.
- Built only from the shared classes above. The layout itself (the two halves, the columns, the wash, the label row) is not a shared class: apps lay it out with their own utilities (Tailwind in idp).
