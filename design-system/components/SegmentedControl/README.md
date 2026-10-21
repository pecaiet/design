# Segmented control

Choosing exactly one of two to five options that are always in view: Dark, Light or System; List, Board or Calendar.

- It's the toolbar's tray (Button group): `.pc-segmented` (`role="radiogroup"`, `aria-label`) around `<label class="pc-btn pc-btn-ghost">`s, each holding a radio (one `name` for the group) that stays out of sight, then an optional 16px icon and the words.
- One option is always chosen: it lifts as a raised pill (`sidebar-active`, white in light and a lighter slate in dark), the only raised pill in the tray. The option under the pointer shows a pale pill (`sidebar-active` at 50%), flat, so hover never looks chosen.
- The options share the width evenly. `.pc-segmented-full` stretches it to its container (in a card, on a phone).
- Icons only: `.pc-btn-icon` on the label, an `aria-label` on its radio and the same words as a tooltip on the label.
- The keyboard works as in any radio group: Tab to the chosen option, the arrow keys to move; focus is the blue ring. `disabled` on the radios turns the words grey (the chosen one keeps its pill), with the not-allowed pointer.
- Six or more options, or long words, are a Select. Separate tools that each do their own thing (search, sort, more) are a toolbar.
- Motion: the chosen pill slides to the new option (200ms), in CSS alone (the options share one width; up to five).
