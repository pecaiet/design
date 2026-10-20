# Text input

A one-line field for text, with a label, an optional hint and an error. More than a line is the Textarea.

- Wrap each field in `.pc-field`: a `.pc-label` with `for`, then the `.pc-input`, then an optional `.pc-field-hint` or `.pc-field-error`, tied to the field with `aria-describedby`.
- The placeholder is an example ("ana@example.com"), never the label. A field without a visible label (quick add) needs an `aria-label`.
- Error: `aria-invalid="true"` turns the border red; the message under the field says how to fix it. Disabled is half strength. Keyboard focus is the blue ring; nothing changes under the pointer.
- Password: put the field in a `.pc-input-group` with `<span class="pc-input-group-end"><button class="pc-btn pc-btn-ghost pc-btn-icon" type="button" aria-label="Show password">` (Phosphor `eye`). Pressing it turns the field to `type="text"`, the icon to `eye-slash` and the label to "Hide password"; again, back. Keep `autocomplete="current-password"` or `"new-password"`.
- Read-only: the `readonly` attribute gives the muted fill and no border; the value can still be selected and copied. An optional copy button sits at the end the same way (Phosphor `copy`, `aria-label="Copy client ID"`); after a click its icon turns into a tick and its tooltip says "Copied" for two seconds. No toast.
- A short field (a code, a year) gets a width that fits what goes in, such as `width: 12ch`; everything else is the full width.
- What the browser fills in (a saved email or password) keeps our colours instead of its yellow or blue.
