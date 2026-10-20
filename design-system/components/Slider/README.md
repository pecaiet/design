# Slider

Choosing a value in a range by dragging a handle: a 6px track like the Progress bar, teal up to the value, and a white handle.

- `<input type="range" class="pc-slider" min max step value>`: the track in `track`, teal up to the value, and a white 18px handle with the `input` border and `pc-raise`. The app keeps `--value` (0–100%) in step with the value as it moves, for the teal part (Firefox draws it on its own).
- Above it, in a `.pc-field`: the label and the value in words ("60%", "3 days before"), in a `.pc-progress-head`.
- Steps: `step="1"`, and `.pc-slider-marks` under it, one `<span>` per step; words at both ends when the ends need names.
- A range with two handles: `.pc-slider-range` around two sliders (`aria-label="From"`, `"To"`), with `--from` and `--to` for the teal part between them.
- Keyboard focus rings the handle in blue; the arrow keys move it a step, Home and End to the ends. `disabled` fades it.
- For an exact number, a Text input or a Stepper; a slider is for "about this much".
