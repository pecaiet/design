# Form

Fields that send something: labels above, the action at the end, and errors where the problem is.

- In a Card: the `.pc-card-header` (title and description), the fields in `.pc-card-content`, 12px apart, and the actions in `.pc-card-footer`: Cancel (outline), then the action (primary), on the right under a line from edge to edge. A Modal and a Drawer keep the same order in their own footers.
- The action names what happens: "Create client", "Save email", never "Submit" or "OK".
- Each field is a `.pc-field`: the `.pc-label` above, an optional `.pc-field-hint` under. A group of radios or checkboxes is a Fieldset; a file is a File upload.
- Errors show when the action is pressed, not while someone types:
  - Each field with a problem gets `aria-invalid="true"` (a red border) and a `.pc-field-error` under it, in place of its hint, saying how to fix it: "Enter a name.", "Enter a URL that starts with https://.". Tie it to the field with `aria-describedby`.
  - The app moves focus to the first field with a problem.
  - A problem with the whole form ("Couldn't save. Try again.") is an error Alert at the top of the fields.
