# Stack

Things one under another, with the same space between them: the spacing scale as a wrapper.

- `.pc-stack` lays its children in a column, 12px apart (`pc-space-3`, the space between fields). The other steps of the scale: `.pc-stack-1` 4px (rows in a menu), `.pc-stack-2` 8px (a title and its line, buttons side by side), `.pc-stack-4` 16px (groups inside a card), `.pc-stack-6` 24px (cards and sections on a page).
- `.pc-stack-row` puts them side by side instead, 8px apart, wrapping when there's no room.
- The space comes from the stack, never from margins on what's inside; components have no outer margin of their own.
- In the apps, Tailwind's `flex flex-col gap-3` and the like do the same job with the same steps; use those or this, never other sizes.
