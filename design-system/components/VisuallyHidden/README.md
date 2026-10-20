# Visually hidden

Words for screen readers only: out of sight, still read out.

- `.pc-visually-hidden` on a `<span>` keeps its words for screen readers and hides them from the eye; it's the same as Tailwind's `sr-only`, which the apps can use instead.
- Use it for words the eye gets from the layout: the "tasks" after a count, "(opens in a new tab)" after a link, the name of a column that has no visible heading (a table's ⋯ column).
- An icon button names itself with `aria-label`, not hidden text. Something that needs to be hidden from screen readers too gets `aria-hidden="true"` or `hidden`.
- `.pc-visually-hidden-focusable` comes back into sight when it gets keyboard focus; the Skip link is one.
