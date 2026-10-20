# Toggle

A switch for a setting that takes effect straight away, with no Save button.

- `<input type="checkbox" role="switch" class="pc-switch">`: a 36×20 pill. Off is the `input` colour with a white knob at the start; on is teal with the knob at the end.
- Its words: in a `<label class="pc-check">` beside it (with an optional `.pc-field-hint` under them), or at the start of a settings row with the switch at the end; the whole row is the label.
- Space switches it; keyboard focus is the blue ring. `disabled` fades it.
- Something that's only saved with the form's Save button is a Checkbox, not a toggle.
