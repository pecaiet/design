# Modal

A small window over the page that asks one thing: a yes or no, or a few fields.

- `<dialog class="pc-dialog">` opened with `showModal()` and labelled by its title. Inside `.pc-dialog-body`: a `<div>` with the `.pc-dialog-title` (the question, or the task) and an optional `.pc-dialog-description`; an optional `.pc-dialog-content` (fields, an error, longer text); then `.pc-dialog-actions` with Cancel (outline) and the action (primary; a delete that can't be undone is `.pc-btn-primary.pc-btn-destructive`, solid red), on the right under a line from edge to edge.
- Name the action on the button: "Sign out", "Delete user", "Create list"; never "OK" or "Yes".
- One thing at a time: a confirmation, or a short form (a few fields; choices use the Select). Anything longer gets its own page or the Drawer.
- Closing: Cancel, Esc, or a click on the dimmed page (not while it's working, and not on a form with unsaved changes). There's no x.
- Working: the action gets `aria-busy="true"`, a spinner and new words ("Creating…"); Cancel is disabled until it's done.
- Something went wrong: an error Alert at the top of `.pc-dialog-content`; what was typed stays.
- Long content: `.pc-dialog-content` scrolls; the title and the actions stay where they are.
- Focus: opening moves it to the first field, or to Cancel for a dangerous confirmation; closing returns it to the button that opened the modal.
- Phones: a sheet from the bottom over the dimmed page, like the menus and popovers; the buttons share the width. It grows with its content up to 85% of the screen, then the middle scrolls.
- Motion: it fades in while the page dims (120ms); on phones the sheet slides up. Closing plays it backwards: CSS does it in Chrome and Edge, pecaiet.js everywhere else (Escape, or `Pecaiet.close(dialog)`).
