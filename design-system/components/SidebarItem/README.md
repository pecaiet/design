# Sidebar item

One row in a sidebar: a link to a page, a button that does something, or a heading.

- Shapes:
  - Label only.
  - Icon + label.
  - Icon + label + detail. The detail sits on the right and is one of: a number, a number that needs attention (red), a word, or a key or an icon.
  - Heading: a letter tile or icon and a bold label. Not clickable; it names the rows nested under it.
  - Nested: any of the above under a heading, the whole row a step to the right and filling the rest of the width.
- Every shape: a long label is cut with an ellipsis and the detail stays.
- Markup: `.pc-sidebar-item` on an `<a>` (opens a page) or `<button>` (does something). Inside, in this order: the icon `<svg>` (or a `.pc-sidebar-mark` letter tile), the label in `.pc-sidebar-label`, then the detail: `.pc-sidebar-detail` for a number or a word, `.pc-kbd` for a key, an `<svg>` for an icon.
- A number that needs attention adds `.pc-sidebar-detail-alert`: red and bold.
- Every part of a row (icon, label, detail) is the text colour, `foreground`. Only a number that needs attention stays red. Fills do the rest: `sidebar-hover` under the pointer, the raised `sidebar-active` pill on the page you are on.
- The page you are on gets `aria-current="page"`: the `sidebar-active` pill (flat, no shadow), nothing else changes. Buttons are never "the page you're on".
- A heading is not a control: `<div class="pc-sidebar-item pc-sidebar-heading">`. No hover, no focus, never active. Its rows follow it in `.pc-sidebar-sub`, and the heading and its rows sit together in a `.pc-sidebar-section`.
