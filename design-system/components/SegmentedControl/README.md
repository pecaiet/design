# Segmented control

Choosing exactly one of two to five options that are always in view: Dark, Light or System; List, Board or Calendar.

- It's the toolbar's tray (Button group): `.pc-segmented` (`role="radiogroup"`, `aria-label`) around `<label class="pc-btn pc-btn-ghost">`s, each holding a radio (one `name` for the group) that stays out of sight, then an optional 16px icon and the words.
- One option is always chosen: it lifts as a raised pill (`sidebar-active`, white in light and a lighter slate in dark), the only raised pill in the tray. The option under the pointer shows a pale pill (`sidebar-active` at 55%), flat, so hover never looks chosen.
- The options share the width evenly. `.pc-segmented-full` stretches it to its container (in a card, on a phone).
- Icons only: `.pc-btn-icon` on the label and an `aria-label` on its radio.
- The keyboard works as in any radio group: Tab to the chosen option, the arrow keys to move; focus is the blue ring. `disabled` on the radios fades it.
- Six or more options, or long words, are a Select. Separate tools that each do their own thing (search, sort, more) are a toolbar.
