# Skeleton

Blocks shaped like the content that's coming, shown while it loads.

- `.pc-skeleton` on any box, in the `border` colour with 5px corners, sized for what will be there: `.pc-skeleton-line` (a line of text, 10px tall; make the last line of a paragraph shorter), `.pc-skeleton-title` (14px), `.pc-skeleton-circle` (an avatar, 24px), `.pc-skeleton-control` (a field or a button, as tall as the row, with 10px corners). Widths come from the layout.
- Keep the real layout: the same card, the same gaps, the same rows; only the content is blocks.
- The blocks fade gently in and out together (1.6s once motion is on). They stand still while motion is off, and never move for people who ask for reduced motion.
- The area that's loading gets `aria-busy="true"`; the blocks are `aria-hidden="true"`.
- Show a skeleton when the page knows the shape of what's coming; for a wait with no shape (saving, sending), a Spinner or the Progress bar.
