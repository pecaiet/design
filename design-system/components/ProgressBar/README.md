# Progress bar

How far a long task has got: a 6px bar, teal on the grey `track`, filling as it goes.

- `<div class="pc-progress" role="progressbar" aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">` holds a `.pc-progress-fill` as wide as what's done. Give it a name: `aria-label`, or `aria-labelledby` pointing at the words above it.
- Above it, in a `.pc-field`: a `.pc-progress-head` with what's happening on the left ("Uploading Contract draft.pdf") and a `.pc-progress-value` on the right ("64%").
- When it can't tell how long, leave out `aria-valuenow`: a third of the bar slides along it (`--pc-motion-slide`, 1.44s); it stands still with motion off.
- Done: the bar full, and the words say so ("Uploaded"). An error: `.pc-progress-error` turns the fill red where it stopped, and a `.pc-field-error` under it says what to do.
- Inside a row (a file uploading): `.pc-progress-small`, 4px.
- For steps someone goes through (Account, Profile, …), use the Progress indicator; for a short wait with nothing to measure, a Spinner.
- Motion: the fill glides to its new value (120ms).
