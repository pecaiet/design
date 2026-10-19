# Text input

Text fields and text areas, with a label, an optional hint and an error.

- Wrap each field in `.pc-field`: a `.pc-label` with `for`, then `.pc-input` or `.pc-textarea`, then an optional `.pc-field-hint` or `.pc-field-error`.
- On error set `aria-invalid="true"` and point `aria-describedby` at the `.pc-field-error`. The message says how to fix it.
- A field without a visible label needs an `aria-label`. Placeholders are examples, never the label.
