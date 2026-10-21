# Alert

A message in a page or form: something worked, something needs attention soon, or something went wrong.

- `<p class="pc-alert pc-alert-notice" role="status">` (something worked, or what happens next), `pc-alert-warning` with `role="status"` (something needs attention soon, but nothing is wrong yet) or `pc-alert-error` with `role="alert"` (something went wrong).
- The 16px icon comes first and is required, so the kind never rests on colour alone: Phosphor `check-circle` (notice; `info` for what happens next), `warning` (warning), `warning-circle` (error), or one that says more (`archive`).
- One line: the words take the kind's colour (amber, red); a notice's are in the text colour.
- Longer: a `<div class="pc-alert …">` with a `.pc-alert-body` holding a `<p class="pc-alert-title">` and a `<p>` under it. The title takes the kind's colour (a notice's teal); everything after the first line is in the text colour, easier to read.
- A form's errors: an error alert at the top of the form whose body is a lead line ("Fix these 2 fields to create your account:") and a `<ul>` of the fields. The lead line is red, the list in the text colour; each field also shows its own error.
- Dismissible: a ghost icon button `.pc-alert-close` (Phosphor `x`, `aria-label="Dismiss"`) last; it takes the alert's colour.
- With an action: an outline button with `.pc-alert-action` at the end (Unarchive).
- A banner across the top of a page (offline, a trial ending): add `.pc-alert-banner` for no corners, edge to edge, one line; usually dismissible.
- Errors say what went wrong and what to do next. Flash messages use this component.
- Motion: its x (`.pc-alert-close`) closes it with pecaiet.js: it fades, then the gap it leaves closes smoothly. `Pecaiet.leave(alert)` does the same from the app.
