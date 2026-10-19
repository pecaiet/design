# Accordion

Questions or sections that open to show more, one under another.

- Markup: a `.pc-accordion` holding `<details class="pc-accordion-item">` items, each a `<summary>` (the question, then Phosphor `caret-down`) and a `.pc-accordion-content` (the answer). The browser opens and closes them: no script, and Enter or Space works from the keyboard.
- Closed: the question in the text colour, the chevron pointing down. Open (`open`): the question semibold, the chevron up, and the answer under it in `muted-foreground`, lined up with the question.
- Rows like a menu's: at least `pc-row` (32px) tall and wrapping long questions, rounded, 2px apart, no lines between them. Under the pointer `accent`; keyboard focus the blue ring inside the row.
- Something coming later: `aria-disabled="true"` on the item and `tabindex="-1"` on its summary: half strength, no pointer, it doesn't open.
- Several can be open at once. To keep one open at a time, give the items the same `name`; the browser closes the others.
- In a card it sits in `.pc-card-content`, and the questions line up with the card's title.
- For FAQs and optional detail; never to hide something people need to finish a task.
