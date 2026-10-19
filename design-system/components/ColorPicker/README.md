# Color picker

A colour from a set, or any colour.

- `.pc-swatches` (`role="radiogroup"` with an `aria-label`) holds one `<label class="pc-swatch pc-colour-red" data-pc-tooltip="Red">` per colour, around its radio (`<input type="radio" name="colour" value="red" aria-label="Red">`), hidden over the swatch. Arrow keys move between them, like any radios.
- The set: Gray, Red, Orange, Yellow, Green, Teal, Blue, Purple, Pink (`.pc-colour-*`), the same in light and dark. Each is a 20px dot in a target the height of a row.
- The chosen one has a ring in the text colour, 2px out. Under the pointer: a soft ring and its name as a tooltip. Keyboard focus: the controls' blue ring around it.
- Last, the colour well: `<label class="pc-swatch pc-swatch-custom" data-pc-tooltip="Custom colour">` around `<input type="color" aria-label="Custom colour">`, a `<span class="pc-swatch-ring">` and a Phosphor `plus`. A rainbow ring with a + in it: it opens the device's own colour chooser.
- Once a colour is picked, the well also holds a radio for it (`value="#c2410c"`, `aria-label="Custom colour #C2410C"`, checked), the + goes, and the colour fills the ring's middle. The app's script adds that radio and sets `--pc-colour` on the well (idp's CSP blocks `style=`). Clicking the well again opens the chooser to change it; a colour from the set can still be chosen, and the custom one stays in the ring to go back to.
