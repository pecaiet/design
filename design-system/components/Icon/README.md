# Icon

Phosphor icons (phosphoricons.com), regular weight only (the two fill icons are `star-fill` in a Rating and `play-fill` on a Video's play button), drawn in `currentColor`.

- Two sizes: 16px beside 14px text (rows, buttons, menus, fields), 14px beside 12px text. An icon on its own is 20px: the stars you click in a Rating, a Spinner on its own, the icon in an empty image or video box.
- Colour: `muted-foreground` by default, except in sidebar rows, where icons take the text colour. Where the text has a colour, the icon takes it: a button's text colour, red in a delete action.
- An icon on its own needs words: an icon button gets an `aria-label`; an icon beside words gets `aria-hidden="true"`.
- todo uses `@phosphor-icons/react`; idp inlines the same SVGs from `@phosphor-icons/core` (its `app/views/icons` partials). Use a Phosphor name before drawing anything new; the card shows every icon in use.
- No emoji in the interface.
