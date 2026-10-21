# Datepicker

Choosing a date, or a range of dates, from a month, in a popover under its field (the Date input); a sheet on phones.

- `.pc-popover` (`role="dialog"`) holding a `.pc-calendar`: a `.pc-calendar-head` with previous and next icon buttons around the month's name, then a `.pc-calendar-grid` of seven `.pc-calendar-weekday` cells and the `.pc-calendar-day` buttons. Days of other months are `.pc-calendar-day-outside`. Weeks start on Monday.
- Today (`aria-current="date"`) has its number in bold teal, no fill; the light grey is only for the day under the pointer. The chosen day (`aria-selected="true"`) is filled teal. Picking one date closes the picker.
- A range: both ends `aria-selected="true"` with `data-range="start"` and `data-range="end"`, each day between `data-range="mid"`: one soft teal band from end to end, round only at the ends and at the edges of a week. While picking the end, the day under the pointer gets `data-range="end" data-range-preview` (outlined) and the days up to it the band. A range closes with Done; Clear empties it.
- Days that can't be picked (before today, fully booked) get `aria-disabled="true"`: faded, no hover, and the keyboard skips them.
- Jumping far: the month's name is a `.pc-calendar-title` button that swaps the grid for `.pc-calendar-months` (twelve `.pc-calendar-month` buttons, the current one `aria-selected`), as wide as the day grid, so the popover keeps one width; its arrows change the year.
- Quick picks (todo's due date): `.pc-menu-item` buttons first, each with its day in a `.pc-menu-note`, a `.pc-menu-separator`, then the month; reminders as `.pc-chip`s under it; Clear date and Done in `.pc-dialog-actions`.
- Keyboard: the arrow keys move by day and week, Page Up and Page Down by month, Enter picks, Escape closes. Focus is the ring inside the day.
- Phones: inside a `.pc-date` it becomes a sheet from the bottom over a `.pc-popover-backdrop` (right before it), the month the full width and the buttons sharing it.
- Motion: the calendar moves like every popover; on phones the sheet slides up.
