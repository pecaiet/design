# Modal

A small window over the page that asks to confirm an action.

- `<dialog class="pc-dialog">` holding `.pc-dialog-body`: the `.pc-dialog-title` (the question), `.pc-dialog-description` (what will happen), and `.pc-dialog-actions` with Cancel (outline) and the action (primary, or destructive when it can't be undone).
- Name the action on the button: "Sign out", "Delete user", never "OK" or "Yes".
- Only for yes/no. Anything that needs a field gets its own form.
- A dialog with a form puts its `.pc-field`s between the text and the actions; the action names what it creates: "Create list".
