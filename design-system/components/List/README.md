# List

Items that belong together: bullets, numbers, and a list of labels and values.

- Bullets (`<ul class="pc-list">`) and numbers (`<ol class="pc-list">`) are for a few short points in running text: the markers muted, the items 20px in and 4px apart. Use numbers only when the order matters (steps). Anything people act on is rows instead: tasks, menu items, files, a Table.
- A label-and-value list describes one thing (a client, a user, a job): `<dl class="pc-details">` with `<dt>` and `<dd>` in turn. The label is muted, in a 160px column; the value sits beside it, rows 10px apart, and long values wrap anywhere. On phones each label goes above its value.
- Values can hold Code (IDs, URLs), a Badge or a small button; an empty value says so in muted text ("Not set") rather than staying blank.
