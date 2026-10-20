# Textarea

Writing more than a line: it starts three lines tall and grows with what's written.

- `<textarea class="pc-textarea">` in a `.pc-field`, under its `.pc-label`. It starts three lines tall (76px), grows with the text up to ten lines, then scrolls inside. There's no handle to drag.
- Where the browser can't grow it (Firefox for now), it stays three lines tall and gets a handle to drag it taller.
- A placeholder is an example ("Anything to remember about this task"), never the label.
- A limit: a `.pc-field-count` under it, on the right ("13 / 200"), tied to it with `aria-describedby`. Over the limit the count gets `data-state="over"` (red) and the text area `aria-invalid="true"`.
- Hint, error, focus and disabled are the Text input's.
