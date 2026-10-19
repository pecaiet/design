# Pecaiet design

The shared look for the Pecaiet apps (idp, todo): colours, type, and plain HTML/CSS components. One CSS file, `pecaiet.css`, built on Tailwind v4. Every app writes its own markup (ERB, JSX, …) with the class names below; change the CSS here and every app follows.

The design lives in the private Pecaiet design system on claude.ai (look: Senin). This repo is its code.

## Use it

Import it right after Tailwind, in the app's main CSS file:

```css
@import "tailwindcss";
@import "<path to>/pecaiet.css";
```

That gives every app:

- The colour tokens as CSS variables (`--primary`, `--sidebar`, …) and as Tailwind utilities (`bg-primary`, `text-muted-foreground`, `border-border`, …). The shadcn names (`sidebar-accent`, `card-foreground`, `popover`, …) are kept as aliases.
- Figtree as the default font (`--font-sans`), and four text sizes as utilities: `text-pc-title` (22), `text-pc-heading` (15), `text-pc-body` (14, the default), `text-pc-small` (12).
- Every component of the design system, in Tailwind's `components` layer. The reviewed ones have full sections below; the rest are listed under Draft components.

Figtree itself isn't bundled yet: until it is, load it in the app or the system font is used.

## Naming

- Every class and every variable of our own starts with `pc-`: `.pc-btn`, `.pc-sidebar-item`, `--pc-row`, `--pc-raise`. Nothing an app defines can clash with them.
- Two families keep standard names: the colour tokens (shadcn's: `primary`, `muted-foreground`, …) and the fonts (Tailwind's: `--font-sans`, `--font-mono`).
- Names describe the shape, never one app's content: `.pc-sidebar-heading`, not "space"; `.pc-sidebar-detail-alert`, not "late".
- States are attributes, never classes: `aria-current="page"`, `aria-expanded`, `aria-pressed`, `disabled` / `aria-disabled`, `data-state="closed"`.

## Dark mode

Add `class="dark"` to `<html>`. Without it the page is light. `dark:` utilities follow the same class.

For a "System" choice, set the class from `prefers-color-scheme`, as idp's layout does.

## Tokens

- **Colours**: `background`, `foreground`, `muted`, `muted-foreground`, `card`, `border`, `input`, `primary`, `primary-foreground`, `primary-hover`, `primary-soft`, `accent`, `sidebar`, `sidebar-hover`, `sidebar-active`, `sidebar-active-foreground`, `destructive`, `destructive-soft`, `ring`, `overlay`.
- **Row height**: `--pc-row` (36px) for sidebar rows, buttons, menu items and inputs.
- **Corners**: `--pc-radius-sm` (5px), `--pc-radius` (10px), `--pc-radius-lg` (14px).
- **Shadows**: `--pc-raise` (the active row, cards), `--pc-raise-lg` (menus, the phone sidebar), `--pc-focus` (keyboard focus on controls), `--pc-focus-inset` (keyboard focus on rows).
- **Motion**: `--pc-motion-fast` and `--pc-motion-base`, both 0ms for now, so everything is instant. Set them (e.g. 120ms and 200ms) to turn motion on everywhere. Reduced motion always keeps 0.

## Rules for apps

Follow these and nothing in an app can break the shared look.

Setup:

- Import `tailwindcss` in full, then `pecaiet.css`, once, at the top of the app's main CSS file. The components rely on Tailwind's base reset (box-sizing, button reset).
- Never edit the copy inside an app. Change this repo, then update the app.
- Point each app at a tag (`v0.1.0`), not at whatever is latest.

Don't override:

- Never define a `.pc-*` class or a `--pc-*` variable in an app, and never redefine the colour tokens (`--primary`, …). Running `npx shadcn init` writes its own; delete them.
- Classes that belong to one app only get that app's prefix (`todo-…`, `idp-…`).
- On a shared component, use utilities only to place it: margin, width, grid or flex position, hidden. Never colour, padding, height, corners, font, border or shadow. If something needs a different look, add a variant here.
- No `!important`, and never `outline-none` on anything you can click.

Tokens only:

- Colours: only token colours (`bg-primary`, `text-muted-foreground`, `var(--border)`). No hex values, no Tailwind palette colours (`bg-teal-600`), no `dark:` colour pairs: the tokens switch by themselves.
- Type: only `text-pc-title`, `text-pc-heading`, `text-pc-body`, `text-pc-small`. Not Tailwind's `text-xs`, `text-sm`, `text-lg`, ….
- Motion: transitions use only `--pc-motion-fast`, `--pc-motion-base` and `--pc-motion-ease`, never their own durations.

Markup:

- Set states with the attributes above, never with classes like `.active` or `.is-open`.
- Follow the snippets below: element order and wrappers matter (the label needs `.pc-sidebar-label` for its ellipsis).
- Icons: Phosphor, regular weight, inline `<svg fill="currentColor">` (or `@phosphor-icons/react`), no size classes: the CSS sizes them (16px beside 14px text).
- Dark mode is `.dark` on `<html>` only; no `prefers-color-scheme` rules in app CSS.

Updating:

- Change the design system on claude.ai first, then this repo.
- Renaming or removing a class or variable is a breaking change: new major tag. Apps move to it on purpose.

## Rules every component follows

- Focus: as on claude.ai. Controls (buttons, fields, checkboxes, links) use `--pc-focus`: their outer 1px turns the page colour (bordered controls turn their border that colour), then a 1px blue `--ring` line on the edge and a soft glow in a darker blue. Rows (sidebar, menu, search, calendar days, table rows) use `--pc-focus-inset`: the ring inside the row's own edge, only the glow outside. Blue is for focus only, so it shows on teal buttons and ticked boxes too. Fields with an error keep their red border. Rows also take their hover fill, and sidebar rows touch, with no gap, since their ring sits inside; menu and search rows sit 4px apart. A transparent outline stays underneath for Windows high-contrast mode.
  - Your own focusable thing, always on `:focus-visible` with `outline: 2px solid transparent` underneath (Windows high-contrast mode draws it):
    - a control with a border: `border-color: var(--background); box-shadow: var(--pc-focus);`
    - a control without a border: `box-shadow: inset 0 0 0 1px var(--background), var(--pc-focus);`
    - a row in a list: `box-shadow: var(--pc-focus-inset);` plus its hover fill.
  - Focus wins over hover and over a selected toggle (`aria-pressed`), so a focused button looks the same under the pointer.
- Links: a soft underline at rest that turns solid under the pointer.
- Disabled: half opacity, no pointer.

## Button

```html
<button class="pc-btn pc-btn-primary" type="button">Save email</button>
<button class="pc-btn pc-btn-outline" type="button">Cancel</button>
<button class="pc-btn pc-btn-ghost" type="button">Sign out</button>
<button class="pc-btn pc-btn-destructive" type="button">Delete account</button>
<button class="pc-btn pc-btn-ghost pc-btn-icon" type="button" aria-label="More"><svg>…</svg></button>
```

- One primary button per view.
- `pc-btn-icon` is square; it needs an `aria-label`.
- `aria-pressed="true"` turns a button into a pressed toggle.

## Sidebar item

One row of the sidebar: a link (`<a>`) when it opens a page, a `<button>` when it does something, or a heading.

```html
<!-- Label only -->
<a class="pc-sidebar-item" href="/account" aria-current="page"><span class="pc-sidebar-label">Account</span></a>

<!-- Icon + label -->
<a class="pc-sidebar-item" href="/scratchpad"><svg>…</svg><span class="pc-sidebar-label">Scratchpad</span></a>

<!-- Icon + label + detail: a number, a number that needs attention, a word, or a key / icon -->
<a class="pc-sidebar-item" href="/inbox"><svg>…</svg><span class="pc-sidebar-label">Inbox</span><span class="pc-sidebar-detail">2</span></a>
<a class="pc-sidebar-item" href="/due"><svg>…</svg><span class="pc-sidebar-label">Due</span><span class="pc-sidebar-detail pc-sidebar-detail-alert">4</span></a>
<a class="pc-sidebar-item" href="/lists/7"><svg>…</svg><span class="pc-sidebar-label">Q3 launch</span><span class="pc-sidebar-detail">Work</span></a>
<button class="pc-sidebar-item" type="button"><svg>…</svg><span class="pc-sidebar-label">Search</span><span class="pc-kbd">/</span></button>

<!-- Heading (not clickable) with nested rows -->
<div class="pc-sidebar-section">
  <div class="pc-sidebar-item pc-sidebar-heading"><span class="pc-sidebar-mark">W</span><span class="pc-sidebar-label">Work</span></div>
  <div class="pc-sidebar-sub">
    <a class="pc-sidebar-item" href="/lists/1"><svg>…</svg><span class="pc-sidebar-label">America</span><span class="pc-sidebar-detail">3</span></a>
  </div>
</div>
```

- Order inside a row: icon (or `.pc-sidebar-mark` letter tile), label, detail.
- A row is one colour, the text colour (no bold, no muted parts). Only a number that needs attention stays red. Fills mark state: the hover fill under the pointer, the flat pill (no shadow) on the page you are on.
- A long label is cut with an ellipsis; the detail stays.
- Buttons are never "the page you're on".

## Sidebar account

The account row at the foot of the sidebar, and the menu it opens upward.

```html
<div class="pc-sidebar-account">
  <div class="pc-menu pc-sidebar-account-menu" role="menu" hidden>
    <a class="pc-menu-item" role="menuitem" href="/account"><svg>…</svg>Settings</a>
    <a class="pc-menu-item" role="menuitem" href="/admin"><svg>…</svg>Admin panel</a>
    <div class="pc-menu-separator"></div>
    <button class="pc-menu-item pc-menu-item-destructive" role="menuitem" type="button"><svg>…</svg>Sign out</button>
  </div>
  <button class="pc-sidebar-item" type="button" aria-haspopup="menu" aria-expanded="false">
    <span class="pc-avatar">A</span><span class="pc-sidebar-label">ana@example.com</span><svg>…caret-down…</svg>
  </button>
</div>
```

- Set `aria-expanded="true"` while the menu is open; the row keeps its hover fill.
- Settings, Admin panel (admins only), then Sign out in red. Nothing else.
- It closes on a click outside, Escape, or a choice. The same menu is used on phones.

## Sidebar

Always a sidebar. One toggle opens and closes it on desktop and phones, and it sits in the page's title row.

```html
<nav class="pc-sidebar">
  <div class="pc-sidebar-head"><span class="pc-app-logo"><span class="pc-app-logo-mark">P</span>Todo</span></div>
  <!-- sidebar items -->
  <div class="pc-sidebar-footer">
    <button class="pc-sidebar-item" type="button"><svg>…</svg><span class="pc-sidebar-label">New list</span></button>
    <!-- sidebar account -->
  </div>
</nav>

<main>
  <div class="pc-page-title-row">
    <button class="pc-btn pc-btn-ghost pc-btn-icon pc-sidebar-toggle" type="button" aria-label="Close sidebar" aria-expanded="true"><svg>…text-outdent…</svg></button>
    <h1 class="pc-page-title">America</h1>
  </div>
</main>
```

- The logo is optional; no logo, no `pc-sidebar-head`.
- The footer always sits at the bottom, and stays pinned while the rows scroll. The account row is always last.
- Closed (desktop): `data-state="closed"` on the `.pc-sidebar`. The toggle shows Phosphor `text-indent`, with `aria-label="Open sidebar"` and `aria-expanded="false"`.
- Remember the desktop choice per person; phones always start closed.
- Phones: open it as a sheet over a dimmed page. A tap on the backdrop or Escape closes it.

```html
<div class="pc-sidebar-sheet">
  <div class="pc-sheet-backdrop"></div>
  <nav class="pc-sidebar">…</nav>
</div>
```

## Page header

The top of a page: its title, one line about it, and the page's main action on the right. Every page's title row starts with the sidebar toggle.

```html
<div class="pc-page-header">
  <div class="pc-page-header-text">
    <div class="pc-page-title-row">
      <button class="pc-btn pc-btn-ghost pc-btn-icon pc-sidebar-toggle" type="button" aria-label="Close sidebar" aria-expanded="true"><svg>…text-outdent…</svg></button>
      <h1 class="pc-page-title">OAuth clients</h1>
    </div>
    <p class="pc-page-description">Apps that sign in with this IdP.</p>
  </div>
  <div class="pc-page-header-actions">
    <button class="pc-btn pc-btn-primary" type="button">New client</button>
  </div>
</div>
```

- The description is optional; it lines up with the title, not the toggle.
- The toggle and the title never move: open, the toggle shows `text-outdent`; closed, `text-indent`.
- Actions: at most one primary button. A page about one thing (a list, a client) can have its ⋯ menu here.
- Phones: when the title and the actions don't fit on one line, the actions move under it.

## Draft components

In `pecaiet.css` and usable now, but not reviewed yet: their look or class names may still change. The design system card for each one shows every state; each gets a full section here once it's reviewed.

- **Menu**: `.pc-menu` holding `.pc-menu-item` (`.pc-menu-item-destructive` for delete, last), `.pc-menu-separator`, `.pc-menu-label`, `.pc-menu-check` for the current choice.
- **Tooltip**: `data-pc-tooltip="Text"` on any element; on a `<span tabindex="0">` around a disabled button.
- **Dialog**: `<dialog class="pc-dialog">` with `.pc-dialog-body`, `.pc-dialog-title`, `.pc-dialog-description`, `.pc-dialog-actions`.
- **Date picker**: `.pc-popover` with a `.pc-calendar` (`.pc-calendar-head`, `.pc-calendar-grid`, `.pc-calendar-weekday`, `.pc-calendar-day`; today `aria-current="date"`, chosen `aria-selected="true"`, `.pc-calendar-day-outside`).
- **Search**: `.pc-search` (on a `.pc-dialog`) with `.pc-search-field`, `.pc-search-results`, `.pc-search-result` (`aria-selected="true"` for the highlighted one), `.pc-search-footer`.
- **Link**: `.pc-link`.
- **Input**: `.pc-field` holding a `.pc-label` and a `.pc-input` or `.pc-textarea`, then `.pc-field-hint` or `.pc-field-error` (with `aria-invalid="true"` on the field).
- **Input group**: `.pc-input-group` with an icon `<svg>` first, then the `.pc-input`, and an optional `.pc-input-group-end`.
- **Select**: `.pc-select` around a native `<select>` and a caret `<svg>`.
- **Checkbox and radio**: `<label class="pc-check">` with an `<input class="pc-checkbox">` or `<input class="pc-radio">`.
- **Badge and chip**: `.pc-badge` (`-primary`, `-outline`, `-destructive`); `.pc-chip` with an optional `.pc-chip-remove` button.
- **Alert**: `.pc-alert` with `.pc-alert-notice` or `.pc-alert-error`, an optional icon first, and an optional `.pc-alert-action`.
- **Stat tile**: `.pc-stats` holding `.pc-stat` (`.pc-stat-label`, `.pc-stat-value`, `.pc-stat-value-alert`).
- **Detail list**: `<dl class="pc-details">`.
- **Code**: `.pc-code` inline, `.pc-secret` with `.pc-secret-value`, `.pc-code-block` for output.
- **Card**: `.pc-card` with `.pc-card-header` (`.pc-card-title`, `.pc-card-description`), `.pc-card-content`, `.pc-card-footer`.
- **Table**: `.pc-table`; `.pc-row-link` makes a whole row a link; `.pc-empty` (`.pc-empty-title`, `.pc-empty-art`) when there's nothing; `.pc-muted` for quiet cells.
- **Task row**: `.pc-task-list` of `.pc-task` (`.pc-task-title`, `.pc-task-due`, `.pc-task-due-late`, `.pc-task-body`, `.pc-task-sub`, `.pc-task-meta`, `.pc-list-label`), grouped by `.pc-task-group`; `.pc-tally` for counts.
- **Task pane**: `.pc-pane` with `.pc-pane-toolbar` (`.pc-pane-toolbar-end`), `.pc-pane-title`, `.pc-pane-notes`, `.pc-section-title`, `.pc-subtask`.
