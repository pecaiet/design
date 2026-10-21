# Avatar

Who someone is, as a circle: their letters or photo, or a person icon when there's nobody.

- `<span class="pc-avatar">AC</span>`: a circle with a thin `border` on `card`, one or two letters, upper case, semibold, in `foreground`. Three sizes: 24px (the default, 10px letters) beside one line in a 32px row, `.pc-avatar-medium` 32px (14px) beside two lines, `.pc-avatar-large` 48px (22px) at the top of a person's page.
- A photo: an `<img alt="">` inside fills the circle, with Image's faint edge. If it doesn't load, show the letters.
- Nobody (a deleted account, or no email yet): `.pc-avatar-none`, the muted fill with Phosphor `user`.
- A team, an app or a client: `.pc-avatar-square`, with 5, 10 or 14px corners by size.
- Several people: `.pc-avatars` overlaps them, each ringed in the colour behind it; the rest as `<span class="pc-avatar pc-avatar-more">+3</span>`.
- Online: `<span class="pc-avatar-status">` inside, a teal dot at the corner. Say it in the avatar's name too ("ana@example.com, online").
- A badge: a small badge (`.pc-badge.pc-badge-small`: Pro, Admin) inside a 32 or 48px avatar sits at its bottom right, level with the online dot and ringed the same way, hanging 6px past the right edge. It always has a solid fill (an outline or soft badge gets the colour behind the avatar under it), so the circle doesn't show through. With a 22px avatar the badge goes after the email instead, at its usual size.
- Rings (stacks, the dot, a badge) take the colour behind the avatar from `--pc-avatar-ring`: the page colour, the card colour inside cards, dialogs, drawers, popovers and menus, the sidebar colour in the sidebar.
- Beside the email or name, the avatar only repeats it: `aria-hidden="true"`. On its own (in a stack, an assignee) it gets `role="img"` and an `aria-label` with the email, and the email in a tooltip.
- As a button (`<button class="pc-avatar">`): a 2px ring in the `input` colour under the pointer, the blue ring on keyboard focus.
