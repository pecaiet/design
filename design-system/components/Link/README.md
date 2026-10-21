# Link

A link: in running text, the text colour with a soft underline; standing alone in a muted place, quiet.

- `<a class="pc-link">` inside sentences: "Forgot password?", "Create an account". The text colour (`foreground`), medium weight, a soft underline at rest (`muted-foreground` at 50%) that turns solid under the pointer. The underline stays, so a link never relies on colour alone; in a muted line ("New here?") it stands out by being darker. Teal stays for the main action and for what's chosen.
- On its own line ("View all"): the same link with Phosphor `caret-right` after the words.
- To another site: `arrow-square-out` after the words, `target="_blank"` and a visually hidden "(opens in a new tab)".
- With an icon before it (`download-simple`, a file): 16px, in the link's colour, with `class="pc-link-lead"` on the icon. An icon after the words (a caret, the arrow of a link to another site) needs no class.
- A button that does something instead of going somewhere ("Send it again"): `<button class="pc-link">`, the same look.
- Inside an alert: the alert's colour, semibold, a solid underline.
- `.pc-link-quiet` for links that stand alone in a muted place: muted, no underline; under the pointer the text colour and an underline. The footer's links, breadcrumbs and a group's Clear (Search) look the same.
- Visited links look the same. Rows that open something use the Table row link or a sidebar item instead.
