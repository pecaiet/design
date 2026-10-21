# Radio button

Choosing one of a few options that are all visible at once.

- A group is a `<fieldset class="pc-fieldset">` with its caption in a `<legend class="pc-legend">` (see Fieldset), then a `.pc-fieldset-options`. Each choice: `<div class="pc-field"><label class="pc-check"><input class="pc-radio" type="radio" name="…"><span>Label</span></label></div>`. Every radio in a group shares one `name`.
- One is chosen to start with, unless the choice has to be made on purpose (a plan); then nothing is chosen and an empty answer is an error.
- Two to five choices; more go in the Select. Choosing a view right away (List or Board) is a Segmented control.
- Two or three short choices can sit side by side: `.pc-fieldset-options.pc-fieldset-options-row`.
- When each choice has a description (a `.pc-field-hint` under its words, tied with `aria-describedby`), put them in boxes: `.pc-fieldset-options.pc-fieldset-boxes`. Each box has a thin border; the chosen one a teal border and a soft teal fill, and the whole box picks it. Short choices stay plain.
- A long label wraps; the circle stays beside its first line.
- Keyboard: Tab reaches the group, the arrow keys move between its choices. Focus is the blue ring; a choice turned off (`disabled`) is half strength and its hint says why. Nothing changes under the pointer.
- Error: `aria-invalid="true"` on the radios turns the circles red; a `.pc-field-error` under the group says what to do, tied to the fieldset with `aria-describedby`.
- Radios are round; checkboxes are square.
- Motion: the dot fades in (120ms).
