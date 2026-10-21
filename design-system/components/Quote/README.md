# Quote

Words from someone else, or a line pulled from the page: a 2px line down the start, who said it underneath.

- `<figure class="pc-quote">` holds a `<blockquote>` (a 2px line in the `input` colour down its start, the words in the text colour) and an optional `<figcaption>` under it: who said it in `.pc-quote-name` (semibold), then their role or the source in muted 12px. An avatar (`.pc-avatar`) can lead the caption for a person people should recognise.
- A pull quote, a line from the page itself set apart to catch the eye: `.pc-quote-pull`, 16px semibold, no caption.
- Quoting a reply in a comment or a message: `.pc-quote-small`, muted 12px, shortened with "…", above the answer.
- An inline quote is only curly quotes (“like this”) in the running text; no styling.
- Who said it goes in the `<figcaption>`, outside the `<blockquote>`; the title of a book or a page goes in `<cite>`.
