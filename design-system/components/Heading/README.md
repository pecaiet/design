# Heading

Two heading styles and no others: the page's title, and the title of everything inside the page.

- The page title: `<h1 class="pc-page-title">` (`pc-title`, 22px bold), one per page, in the Page header. Each Settings section's title is one too.
- Everything inside the page is `pc-heading` (16px semibold, 24px line): a card's title (`.pc-card-title`), a dialog's (`.pc-dialog-title`), the Drawer's (`.pc-drawer-title`), and a section on a page that isn't in a card (`<h2 class="pc-section-title">`).
- Each can have one muted line under it: `.pc-card-description`, `.pc-section-description`, and so on (12px, `muted-foreground`).
- No line under a heading. A section is told apart by its title and the space above it (24px), as a card is.
- Use the heading levels in order (`h1` for the page, `h2` for sections and cards, `h3` inside them); the look comes from the class, not the level.
