# Label

The name of a field, above it: 12px semibold, 6px over the field.

- `<label class="pc-label" for="…">` first in a `.pc-field`, the field 6px under it. Every field has one; a field without a visible label needs an `aria-label`. A placeholder is an example, never the label.
- Most fields must be filled in, so only the optional ones are marked: `<span class="pc-label-optional">(optional)</span>` after the words, muted and not bold. Required fields have no mark; a missing one shows its error when the form's action is pressed.
- A link about the field ("Forgot password?") sits at the right end of the label's row, in 12px.
- The words: a noun in sentence case ("Email", "Redirect URI"), no colon.
- A caption over a group of radios or checkboxes is a Fieldset's legend, which looks the same.
