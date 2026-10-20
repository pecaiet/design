# Date input

A date in a form: a button that looks like a field and opens the Datepicker. No typing.

- `.pc-picker.pc-date` holding a `.pc-picker-button` (`aria-haspopup="dialog"`, `aria-expanded`): a Phosphor `calendar-dots` icon, then the date in a `<span>`, short (“Fri, 23 Oct”; the year only when it isn't this year).
- Nothing chosen: `<span class="pc-picker-placeholder">No date</span>`, in muted.
- With a date, a `.pc-btn.pc-btn-ghost.pc-btn-icon.pc-date-clear` (`aria-label="Clear date"`, a Phosphor `x`) sits at the end of the field and clears it.
- Opening it shows the Datepicker (`.pc-popover`, `role="dialog"`) under the button: quick picks and the month. Picking a day fills the field, closes it and puts focus back on the button; Escape closes it without a change.
- On phones the Datepicker is a sheet from the bottom: put a `.pc-popover-backdrop` right before the `.pc-popover`.
- Keyboard focus is the controls' blue ring.
