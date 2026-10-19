# Datepicker

Choosing a task's due date: quick picks, a month, and its reminders, in a popover.

- `.pc-popover` holding quick picks (`.pc-menu-item` buttons with the day on the right), a `.pc-calendar`, then reminders as `.pc-chip`s, then Clear date and Done.
- The calendar: `.pc-calendar-head` with previous/next icon buttons, `.pc-calendar-grid` with seven `.pc-calendar-weekday` cells and the `.pc-calendar-day` buttons. Today has `aria-current="date"`, the chosen day `aria-selected="true"`, days of other months `.pc-calendar-day-outside`.
- Weeks start on Monday.
