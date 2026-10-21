# Stepper

A number to change a step at a time: one field as tall as the row with "−" at the start, the number in the middle and "+" at the end.

- `.pc-stepper` holds a `<button>` with a Phosphor `minus` (`aria-label="Fewer"`), an `<input type="number" min max step value>` with its label, and a `<button>` with a `plus` (`aria-label="More"`), all inside one border like a text field.
- At the lowest value "−" is `disabled`; at the highest, "+".
- The buttons are for the pointer (`tabindex="-1"`). With the keyboard, focus is in the number: the whole control gets the blue ring, the arrow keys change it a step, and typing a number works too.
- In a form it sits under its `.pc-label`, with a `.pc-field-hint` for the limits ("Up to 5 for each task"); in a row it sits at the end.
- For "about this much" in a wide range, a Slider; for a number to type, a Text input.
