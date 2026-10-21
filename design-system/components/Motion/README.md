# Motion

How things move in every app: two speeds, one curve, three kinds of motion, the same everywhere.

- Speeds (tokens): `pc-motion-fast` 120ms for small changes, `pc-motion-base` 200ms for whatever appears, leaves or travels. Curve: Ease out (`--pc-motion-ease`). Worked out from base: `--pc-motion-wait` (a tooltip's wait, 0.4s), `--pc-motion-spin` (one spinner turn, 0.8s), `--pc-motion-slide` (unknown progress, 1.4s), `--pc-motion-pulse` (the skeleton, 1.6s). How far things move as they appear: `--pc-motion-distance` (`pc-space-1`, 4px).
- Change: hover and focus colours fade, ticks and dots fade in, arrows turn (120ms); the switch's knob, the segmented pill, the tab line and a progress bar travel (200ms).
- Appear: menus, popovers, tooltips (after 0.4s), dialogs, toasts, field errors, accordion answers and new rows fade in while they move 4px from where they come from (`--pc-enter`), and leave the same way backwards. Chips, tab panels and carousel slides only fade. Rows, chips and panels move only when they arrive after the page has loaded, so a page never fades in row by row.
- Leave: a removed row, alert or toast fades, then its gap closes; toasts above it glide down.
- Slide: the drawer, the sidebar and its phone sheet, the sheets on phones and the skip link come in from their edge, while the page dims behind sheets.
- Loading: the spinner turns, the skeleton pulses, unknown progress slides. Pages crossfade (Chrome, Edge, Safari); jumps within a page scroll smoothly.
- Still: numbers, the stepper's number, a pressed button.
- Off: Settings › Preferences › Motion (On · Off) puts `data-motion="off"` on `<html>`, remembered in the motion cookie (the layout sets it before the page draws, like the theme). Until someone chooses, a device that asks for less motion gets Off. Off makes everything instant; the spinner still turns, slowly (2.4s).
- `pecaiet.js` (next to `pecaiet.css`) plays what CSS can't. By itself: closings of menus, popovers and sheets when the app hides them, Escape on a dialog, an accordion answer closing, an alert's x and any `[data-pc-dismiss]`, the tab line, Turbo removals, smooth jumps, and radios named `pc-theme` or `pc-motion`. One call for what only the app knows: `Pecaiet.leave(row)` before removing something (React), `Pecaiet.close(dialog)`, `Pecaiet.setTheme(mode)`, `Pecaiet.setMotion(mode)`, `Pecaiet.enter(el)`.
- Never: durations or curves of an app's own, a whole page animating in, bounce or shake, numbers counting up, loops for decoration.
