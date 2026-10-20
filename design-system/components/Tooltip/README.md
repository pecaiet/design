# Tooltip

A short hint on hover and keyboard focus: dark on light, light on dark.

- Add `data-pc-tooltip="Text"` to the element. No script needed.
- Every icon-only button gets one with its name, the same words as its `aria-label`. A shortcut goes after the name ("Search  ⌘K").
- Above by default. Near the top edge (a header, a toolbar at the top) add `data-pc-tooltip-side="bottom"`; `"left"` or `"right"` where there's no room.
- Inside a drawer or a window's head (the close x, a back arrow), put it below too: the panel cuts off anything above its edge.
- It waits 0.4s under the pointer, so moving across a toolbar doesn't flash them, and shows at once on keyboard focus. Escape hides it: the app sets `data-pc-tooltip-hidden` on the element until the pointer or focus leaves.
- Up to 240px wide, then it wraps. Keep it to one short sentence.
- A button that can't be used and says why: `aria-disabled="true"` (not `disabled`), with the tooltip on the button itself.
- Phones have no hover: never put needed information only in a tooltip; the button's name lives in its `aria-label`.
