# Card

A white, slightly raised panel that groups one subject on a page.

- `.pc-card` holding `.pc-card-header` (a `.pc-card-title` heading at the page's level, an optional `.pc-card-description`), `.pc-card-content`, and an optional `.pc-card-footer`: Cancel and the action on the right, under a line from edge to edge. A `.pc-card-footer-note` sits on the footer's left (a muted "Changed 3 days ago").
- An action in the header: a `.pc-card-action` after the title and description holds a small button (`.pc-btn-small`), a ⋯ menu or a switch; it sits on the right, centred on the title's line, and the description runs under both.
- A card can be only a header (a setting with its switch) or only content.
- Rows inside (a `.pc-table`, a list of rows): `.pc-card-content.pc-card-rows`, so they run to 4px from the card's edge.
- An image on top: `<img class="pc-card-media">` first, edge to edge in the card's corners (5:2, cropped to fit).
- A card you can click: its title is `<a class="pc-card-link">`, which covers the whole card, as a table row's link does. Under the pointer the card takes the hover grey (`accent`), like rows and ghost buttons; keyboard focus rings the whole card. Its `.pc-card-action` stays clickable on its own.
- Side by side, cards in a row are the same height and their footers line up.
- Loading: Skeleton blocks where the words will be. Nothing to show: the Empty state inside the content.
- One subject per card: "Email address", "Sessions". Deleting gets a card like the others at the end of the page, holding only its red outline button. Never a card inside a card: use a Separator or a list.
- Phones: full width inside the page's 16px margin; the header's action stays on the right.
