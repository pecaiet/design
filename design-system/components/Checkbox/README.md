# Checkbox

A square box with its label: on, off, or half when it stands for a group that's only partly picked.

- `<label class="pc-check"><input class="pc-checkbox" type="checkbox"><span>Label</span></label>` in a `.pc-field`, then an optional `.pc-field-hint` or `.pc-field-error`. The hint lines up under the words by itself.
- On is a teal fill with a tick in `primary-foreground` (white in light, near-black in dark). Half is the same fill with a dash: a "pick all" box over a group (a table's header, a parent setting) when only some are ticked. Set it in script (`el.indeterminate = true`); clicking it picks all, clicking again clears all.
- Put the words in a `<span>`: then a long label wraps and the box stays beside its first line.
- No change under the pointer, like every other field. Keyboard focus is the blue ring; disabled is half strength, the box and its words together.
- An error (a box that has to be ticked, left empty): `aria-invalid="true"` and a `.pc-field-error` under the words, tied with `aria-describedby`. The border turns red.
- The label says what turning it on means: "Admin", "Confidential client". Task rows and tables use the same box.
- Motion: the tick fades in and the box's colour fades (120ms).
