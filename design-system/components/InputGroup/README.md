# Input group

A text field with something inside it: an icon at the start, words before or after the value, icon buttons at the end.

- `.pc-input-group` holding a 16px icon `<svg>` first (search, quick add), then the `.pc-input`; quick add adds on Enter and empties itself.
- `.pc-input-group-end` on the right for a `.pc-kbd` hint, a ghost icon button (clear, show the password, copy; each with its tooltip) or a `.pc-spinner` while it checks.
- Words before or after the value (https://, kg, @pecaiet.ro): a `.pc-input-addon` before or after the `.pc-input`, inside the field and muted, the value right after it. The group then draws the field's edge: keyboard focus rings the whole field, `aria-invalid="true"` on the input turns the edge red, a disabled input makes it half strength.
- A field and its button (Invite, Add): `.pc-input-row` puts them side by side, 8px apart, each its own shape, like the search field and Filter.
- Give the field an `aria-label` when it has no visible label.
