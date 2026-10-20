# Popover

A panel that opens from a button, on click, and can hold a link, a field or buttons. A Tooltip is for a few words on hover; anything you can click goes in a popover.

- `.pc-popover-anchor` wraps the button and the `.pc-popover`. The popover is hidden until the button is clicked; the button gets `aria-expanded="true"` and keeps its pressed fill while it's open. The popover is `role="dialog"`, labelled by its title.
- It's our panel, the same as menus and the Datepicker: card colour, 14px corners, a border and `pc-raise-lg`, 16px inside, 4px from its button. No arrow.
- Placement: below, aligned to the button's start; `.pc-popover-end` aligns it to the end, `.pc-popover-up` opens it above when there's no room below. At most 320px wide.
- Inside: an optional `.pc-popover-head` with a `.pc-dialog-title`, a `.pc-popover-text` in muted text, a link, fields, and `.pc-dialog-actions` (Cancel, then the action, under a line).
- A click outside or Escape closes it, and focus goes back to the button.
- On phones it's a sheet from the bottom over a `.pc-popover-backdrop` (put right before the popover), with an x (`.pc-popover-close`) beside its title; the page behind doesn't scroll.
- The Datepicker is a popover too.
