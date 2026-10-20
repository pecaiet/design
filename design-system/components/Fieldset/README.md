# Fieldset

A caption over a group of related controls: radios, or checkboxes that belong together.

- `<fieldset class="pc-fieldset">` with `<legend class="pc-legend">` first, then a `.pc-fieldset-options` holding the radios or checkboxes, 10px apart: each a `.pc-check` in its own `.pc-field`, with an optional `.pc-field-hint`.
- The caption looks like a field's label (12px semibold), 6px above the options. No line and no box: the group reads as one more field in the form.
- Bigger sections of a form are Cards (a title and a description), as in Settings.
- `disabled` on the fieldset turns off every control in it.
