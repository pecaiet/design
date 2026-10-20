# Separator

A line between things: 1px in the `border` colour, the same line every divider uses.

- Between sections: `<hr class="pc-separator">`. It has no margin of its own; the space around it is the layout's gap. Screen readers hear it as a break between sections.
- Inside a card or a panel the line runs to its edges: `.pc-separator-bleed` (16px out each side), as the footer line does.
- Between items in a row (a date, a count, who it's shared with; or groups of buttons): `<span class="pc-separator pc-separator-vertical" aria-hidden="true">`, 16px tall.
- With a word in the middle ("or" between two ways to sign in): `<div class="pc-separator-text" role="separator">or</div>`, the word in muted 12px.
- The same line is already in other components and stays theirs: `.pc-menu-separator` between a menu's groups, `.pc-toolbar-divider` between a toolbar's groups, the line over a Card's, Modal's and Drawer's footer, and under a table's header.
- Use a separator only where space alone doesn't divide clearly; a new card or a heading usually does.
