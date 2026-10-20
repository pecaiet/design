# Alert

A message at the top of a page or form: a notice that something worked, or an error.

- `<p class="pc-alert pc-alert-notice" role="status">` (something worked, what happens next), `<p class="pc-alert pc-alert-warning" role="status">` (something needs attention soon, but nothing is wrong yet: amber, with Phosphor `warning`) or `<p class="pc-alert pc-alert-error" role="alert">`, with an optional 16px icon first.
- Errors say what went wrong and what to do next. Flash messages use this component.
- An alert with an action puts an outline button with `.pc-alert-action` last (Unarchive).
