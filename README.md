# Pecaiet design

The shared look for the Pecaiet apps (idp, todo): colours, type, and plain HTML/CSS components. One CSS file, `pecaiet.css`, built on Tailwind v4. Every app writes its own markup (ERB, JSX, …) with the class names below; change the CSS here and every app follows.

The design lives in the private Pecaiet design system on claude.ai (look: Senin). This repo is its code.

`design-system/` is a copy of that design system's own files (guidelines, cards, `tokens.json`, `components/bundle.css`). The real tokens are `design-system/tokens.json` and `pecaiet.css`; the design-system page makes its own `tokens.css`, `manifest.json` and `api/` cards, which aren't kept here.

## Use it

Import it right after Tailwind, in the app's main CSS file:

```css
@import "tailwindcss";
@import "<path to>/pecaiet.css";
```

That gives every app:

- The colour tokens as CSS variables (`--primary`, `--sidebar`, …) and as Tailwind utilities (`bg-primary`, `text-muted-foreground`, `border-border`, …). The shadcn names (`sidebar-accent`, `card-foreground`, `popover`, …) are kept as aliases.
- Figtree as the default font (`--font-sans`), and the type scale as utilities, each size with its own line height: `text-pc-title` (22/28), `text-pc-heading` (16/24), `text-pc-body` (14/20, the default), `text-pc-small` (12/16), `text-pc-tiny` (10/14); free steps `text-pc-18`, `text-pc-28`, `text-pc-40`; a hero's `text-pc-56` and `text-pc-72`.
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

- **Colours**: `background`, `foreground`, `muted`, `track`, `muted-foreground`, `card`, `border`, `input`, `primary`, `primary-foreground`, `primary-hover`, `primary-soft`, `accent`, `sidebar`, `sidebar-hover`, `sidebar-active`, `sidebar-active-foreground`, `destructive`, `destructive-hover`, `destructive-foreground`, `destructive-soft`, `warning`, `warning-soft`, `ring`, `overlay`.
- **Row height**: `--pc-row` (32px; 40px on phones, under 48rem wide) for every row and control: sidebar, menu, search and table rows, calendar days, buttons, inputs and selects. On phones fields also take 16px text, so iPhones don't zoom in.
- **Spacing**: `--pc-space-0-5` 2px, `--pc-space-1` 4px, `--pc-space-1-5` 6px, `--pc-space-2` 8px, `--pc-space-2-5` 10px, `--pc-space-3` 12px, `--pc-space-4` 16px, `--pc-space-6` 24px, `--pc-space-8` 32px, `--pc-space-12` 48px (Tailwind's steps 0.5 to 12); the components use them for padding, margins and gaps.
- **Every other size** (tokens.json's further sections, in the Tokens `:root` here): `--pc-text-N` with `--pc-line-N` (ten text sizes), `--pc-size-12/16/20/24/32/48` (icons and fixed squares), `--pc-width-*`, `--pc-height-list/panel/sheet`, `--pc-border`, `--pc-border-2`, `--pc-bar-2/4/6`, `--pc-dot-8/10/12`, `--pc-opacity-disabled`, `--pc-mix-*`, `--pc-weight-*`, `--pc-tracking-*`, `--pc-layer-*` (raised, tooltip, menu, drawer, backdrop, overlay, toast, skip link). Corners add `--pc-radius-xs` (2px) and `--pc-radius-full` (round). Colours that stay the same in both themes: `--media`, `--media-scrim`, `--on-media`, `--on-media-foreground`, `--on-media-hover`, `--knob`, `--colour-gray` … `--colour-pink`.
- **Corners**: `--pc-radius-sm` (5px), `--pc-radius` (10px), `--pc-radius-lg` (14px).
- **Shadows**: `--pc-raise` (cards, the raised pill: a toolbar tool under the pointer, the chosen segment; the slider's handle), `--pc-raise-lg` (everything that opens over the page: menus, popovers, dialogs, drawers, toasts, tooltips, the skip link, the phone sidebar), `--pc-raise-sm` (a switch's knob), `--pc-raise-media` (the play button on a video), `--pc-focus-offset` (keyboard focus on a chosen day or month), `--pc-focus` (keyboard focus on controls), `--pc-focus-inset` (keyboard focus on rows).
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
- Type: only the `text-pc-*` sizes above. Not Tailwind's `text-xs`, `text-sm`, `text-lg`, ….
- Motion: transitions use only `--pc-motion-fast`, `--pc-motion-base` and `--pc-motion-ease`, never their own durations.

Markup:

- Set states with the attributes above, never with classes like `.active` or `.is-open`.
- Follow the snippets below: element order and wrappers matter (the label needs `.pc-sidebar-label` for its ellipsis).
- Icons: Phosphor, regular weight, inline `<svg fill="currentColor">` (or `@phosphor-icons/react`), no size classes: the CSS sizes them (16px beside text of any size).
- Dark mode is `.dark` on `<html>` only; no `prefers-color-scheme` rules in app CSS.

Updating:

- Change the design system on claude.ai first, then this repo.
- Renaming or removing a class or variable is a breaking change: new major tag. Apps move to it on purpose.

## Rules every component follows

- Focus: as on claude.ai. Controls (buttons, fields, checkboxes, links) use `--pc-focus`: their outer 1px turns the page colour (bordered controls turn their border that colour), then a 1px blue `--ring` line on the edge and a soft glow in a darker blue. Rows (sidebar, menu, search, calendar days, table rows) use `--pc-focus-inset`: the ring inside the row's own edge, only the glow outside. Blue is for focus only, so it shows on teal buttons and ticked boxes too. Fields with an error keep their red border. Rows also take their hover fill, and sidebar rows sit 2px apart, as on claude.ai; menu and search rows sit 4px apart. A transparent outline stays underneath for Windows high-contrast mode.
  - Your own focusable thing, always on `:focus-visible` with `outline: 2px solid transparent` underneath (Windows high-contrast mode draws it):
    - a control with a border: `border-color: var(--background); box-shadow: var(--pc-focus);`
    - a control without a border: `box-shadow: inset 0 0 0 1px var(--background), var(--pc-focus);`
    - a row in a list: `box-shadow: var(--pc-focus-inset);` plus its hover fill.
  - Focus wins over hover and over a selected toggle (`aria-pressed`), so a focused button looks the same under the pointer.
- Links: the text colour, with a soft grey underline at rest that turns solid under the pointer. Quiet links (a footer, breadcrumbs, a group's Clear) are muted with no underline until the pointer is on them.
- Can't be used: half strength with the not-allowed pointer; buttons keep their own shape in grey (a box turns a flat grey box, a ghost button grey words with no box; the segmented control and Attach files likewise), so a tooltip on them can say why.
- Divider lines (menus, card footers, the search dialog) run edge to edge, the same everywhere.
- Scrollbars: thin and muted (`muted-foreground` at 40%, no track), drawn by the browser on every scroll area and the page itself, so each system keeps its own behaviour (macOS hides them until you scroll).

## Button

```html
<button class="pc-btn pc-btn-primary" type="button">Save email</button>
<button class="pc-btn pc-btn-outline" type="button">Cancel</button>
<button class="pc-btn pc-btn-ghost" type="button">Sign out</button>
<button class="pc-btn pc-btn-destructive" type="button">Delete account</button>
<button class="pc-btn pc-btn-primary pc-btn-destructive" type="button">Delete user</button>
<button class="pc-btn pc-btn-ghost pc-btn-icon" type="button" aria-label="More" data-pc-tooltip="More"><svg>…</svg></button>
```

- One solid button per view: the main action, `pc-btn-primary` (teal) or, for a delete that can't be undone, `pc-btn-primary pc-btn-destructive` (solid red, a confirming dialog's Delete). A red outline (`pc-btn-destructive`) on a page opens that dialog; what can come back gets no red button, only an icon or menu item and Undo.
- Sizes: `pc-btn-small` (28px), the 32px default, `pc-btn-large` (40px); `pc-btn-full` takes the full width. Icons are 16px in every size.
- `pc-btn-icon` is square; it needs an `aria-label` and the same words as a tooltip.
- `aria-pressed="true"`: a button that stays on, soft teal.
- `disabled`: its own shape in grey (a flat grey box; a ghost button grey words, no box), not-allowed pointer; `aria-disabled="true"` instead when a tooltip says why (the app ignores the click).
- `aria-busy="true"` with a `.pc-spinner` while it works.

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
- Settings, Admin panel (admins only), then Sign out in red. Nothing else. Inside the admin panel, Admin panel becomes "Back to pe caiet" (Phosphor `arrow-left`), which goes to pe caiet's home page.
- It closes on a click outside, Escape, or a choice. The same menu is used on phones.

## App switcher

The sidebar head as a button: the current app's mark and name, and the menu of apps it opens downward, as wide as the head.

```html
<div class="pc-sidebar-head">
  <div class="pc-sidebar-apps">
    <div class="pc-menu pc-sidebar-apps-menu" role="menu" hidden>
      <div class="pc-menu-label">Switch app</div>
      <a class="pc-menu-item" role="menuitem" href="…"><span class="pc-app-logo-mark"><img src="todo.svg" alt=""></span>todo</a>
      <div class="pc-menu-separator"></div>
      <a class="pc-menu-item" role="menuitem" href="/" aria-current="page"><span class="pc-app-logo-mark"><img src="pe-caiet.svg" alt=""></span>pe caiet<svg class="pc-menu-end">…squares-four…</svg></a>
    </div>
    <button class="pc-sidebar-item" type="button" aria-haspopup="menu" aria-expanded="false">
      <span class="pc-app-logo-mark"><img src="pe-caiet.svg" alt=""></span><span class="pc-sidebar-label">pe caiet</span><svg>…caret-up-down…</svg>
    </button>
  </div>
</div>
```

- The apps first, then pe caiet under a divider. The app you are in has `aria-current="page"`: a primary bar on the menu's left edge.
- `.pc-app-logo-mark` is a square slot: the app's square `<img>` or `<svg>` (`pe-caiet.svg`, `todo.svg` in this repo) fills it, 24px in the head and 20px in the menu. A letter works as a stand-in.
- `.pc-menu-end` pushes a muted icon or text to the end of a menu row.
- It opens and closes like the account menu.

## Navigation

Always a sidebar. One toggle opens and closes it on desktop and phones, and it sits in the page's title row.

```html
<nav class="pc-sidebar">
  <div class="pc-sidebar-head"><!-- app switcher --></div>
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

- The head is the App switcher: the current app, and a menu of the others.
- The footer always sits at the bottom, and stays pinned while the rows scroll. The account row is always last.
- Closed (desktop): `data-state="closed"` on the `.pc-sidebar`. The toggle shows Phosphor `text-indent`, with `aria-label="Open sidebar"` and `aria-expanded="false"`.
- Remember the desktop choice per person; phones always start closed.
- Phones: open it as a sheet over a dimmed page. A tap on the backdrop or Escape closes it. While it is open the page behind it doesn't scroll.

```html
<div class="pc-sidebar-sheet">
  <div class="pc-sheet-backdrop"></div>
  <nav class="pc-sidebar">…</nav>
</div>
```

## Header

A page without a sidebar: the logo on the left and the account row on the right. Used only on pe caiet's root page.

```html
<header><!-- the app's layout: a row, the logo left, the account pushed right -->
  <span class="pc-app-logo"><span class="pc-app-logo-mark"><img src="pe-caiet.svg" alt=""></span>pe caiet</span>
  <div><!-- relative, so the menu opens from here -->
    <div class="pc-menu-backdrop"></div>
    <div class="pc-menu pc-menu-pop" role="menu" hidden><!-- the account menu: Settings, Admin panel, Sign out --></div>
    <button class="pc-sidebar-item" type="button" aria-haspopup="menu" aria-expanded="false">
      <span class="pc-avatar">A</span><span class="pc-sidebar-label">ana@example.com</span><svg>…caret-up-down…</svg>
    </button>
  </div>
</header>
```

- The account row is the Sidebar account row with an up-down caret, as wide as its content.
- Its menu opens downward from the row, aligned to its right edge; on phones it is the usual bottom sheet.
- The bar's layout is the app's own (Tailwind in idp): 72px tall and 28px from the edges on desktop, so the logo sits where it sits on the sign-in page; 52px tall and 20px from the edges on phones, in the `sidebar` colour.

## Page header

The top of a page: its title, an optional line about it, and, on some pages, the page's action on the right. Two types: without an action and with one. Every page's title row starts with the sidebar toggle.

```html
<div class="pc-page-header">
  <div class="pc-page-header-text">
    <div class="pc-page-title-row">
      <button class="pc-btn pc-btn-ghost pc-btn-icon pc-sidebar-toggle" type="button" aria-label="Close sidebar" aria-expanded="true"><svg>…text-outdent…</svg></button>
      <h1 class="pc-page-title">OAuth clients</h1>
    </div>
    <p class="pc-page-description">Apps that sign in with this IdP.</p>
  </div>
  <div class="pc-page-header-actions"><!-- only on a page with an action -->
    <button class="pc-btn pc-btn-primary" type="button">New client</button>
  </div>
</div>
```

- The description is optional; it lines up with the title, not the toggle.
- The toggle and the title never move: open, the toggle shows `text-outdent`; closed, `text-indent`.
- Actions: at most one primary button. A page about one thing (a list, a client) can have its ⋯ menu here.
- A page without an action leaves out `.pc-page-header-actions`.
- When the action doesn't fit beside the title, at any width, it moves to the next row, under the title.

## Select

Every choice from a list, instead of a native `<select>`: a button that looks like a field and opens a menu of options. A dropdown on desktop, a sheet on phones (see Dropdown menu on phones).

```html
<div class="pc-field">
  <span class="pc-label">Category</span>
  <div class="pc-picker">
    <button class="pc-picker-button" type="button" aria-haspopup="listbox" aria-expanded="false"><span>Groceries</span><svg>…caret-down…</svg></button>
    <div class="pc-menu-backdrop"></div>
    <div class="pc-menu pc-picker-menu pc-menu-pop" role="listbox" aria-label="Category" hidden>
      <div class="pc-menu-label pc-menu-title">Category</div>
      <div class="pc-input-group"><svg>…magnifying-glass…</svg><input class="pc-input" type="search" placeholder="Search categories" aria-label="Search categories"></div>
      <div class="pc-menu-label">Food</div>
      <button class="pc-menu-item" type="button" role="option" aria-selected="true">Groceries<svg class="pc-menu-check">…check…</svg></button>
      <button class="pc-menu-item" type="button" role="option" aria-selected="false">Restaurants</button>
    </div>
  </div>
</div>
```

- A value: the chosen option has `aria-selected="true"` and a `.pc-menu-check` tick at the end; nothing else is bold. The button shows the value and a chevron.
- A place (switching list, workspace or app): add `.pc-menu-places`, use links with `aria-current="page"` on where you are (a primary bar and a semibold name, no tick), and give the button the up-down caret.
- Search is optional: an Input group, first in the menu. When nothing matches, one `<p class="pc-menu-empty">` says so.
- `.pc-menu-title` names the choice and shows only on phones, where the sheet has no label above it.
- The app opens and closes it (`hidden`, `aria-expanded`), filters for search, and moves with the arrow keys; Enter picks, Escape or a tap on the backdrop closes without a change.

## Dropdown menu on phones

Every menu that pops up (pickers, the account menu, the app switcher, row actions) is a sheet at the bottom of the screen on phones: full width, 40px rows like every row on phones, over a dimmed backdrop. On desktop it stays a dropdown.

- Give the menu `.pc-menu-pop` and put a `<div class="pc-menu-backdrop">` right before it; a tap on the backdrop or Escape closes. Below 48rem the menu becomes the sheet and the backdrop shows while it is open, and the page behind it doesn't scroll. `.pc-menu-sheet` makes a menu a sheet at any width.
- Actions: every item is a verb, Delete last after a divider, in red; one that opens another choice ends in "…". A `.pc-menu-label.pc-menu-title` names the thing acted on ("Birthday present"), shown only in the sheet.
- No drag handle: nothing to swipe.

## Settings modal

A big window over the page with its own nav, for settings: not a plain modal. Each section has its own address (`/settings/account`). Opened from a link in the app it opens over the page you are on, and closing goes back there; an address typed in opens it over the home page.

```html
<dialog class="pc-modal" tabindex="-1" aria-labelledby="settings-title">
  <div class="pc-modal-frame">
    <div class="pc-sheet-backdrop"></div>
    <nav class="pc-sidebar pc-modal-nav" aria-label="Settings">
      <div class="pc-sidebar-head"><h2 id="settings-title" class="pc-dialog-title">Settings</h2></div>
      <a class="pc-sidebar-item" href="/settings/account" aria-current="page"><svg>…user-circle…</svg><span class="pc-sidebar-label">Account</span></a>
      …
      <div class="pc-sidebar-footer"><div class="pc-modal-nav-user"><span class="pc-avatar">A</span><span>ana@example.com</span></div></div>
    </nav>
  </div>
  <section class="pc-modal-main">
    <div class="pc-modal-head">
      <div class="pc-page-title-row"><button class="pc-btn pc-btn-ghost pc-btn-icon pc-sidebar-toggle" aria-label="Open sidebar" aria-expanded="false">…</button><h2 class="pc-page-title">Account</h2></div>
      <a class="pc-btn pc-btn-ghost pc-btn-icon" href="/" aria-label="Close settings"><svg>…x…</svg></a>
    </div>
    <div class="pc-modal-body">…cards…</div>
  </section>
</dialog>
```

- Open it with `showModal()`, then focus the window itself (`tabindex="-1"`) so no row lights up on open; Tab moves in. The browser keeps focus inside and dims the page with `::backdrop`. The page behind doesn't scroll while it is open.
- Desktop: up to 960 × 640, centred; the nav is a 216px column in the sidebar's colour, with no line on its right; the toggle is hidden. The body scrolls on its own and stacks the section's cards.
- Phones (below 48rem): it fills the screen and the nav is hidden. The toggle opens `.pc-modal-frame` as a `.pc-sidebar-sheet`, like the app's sidebar; the backdrop or Escape closes the sheet first.
- The close button, Escape and a click on the dimmed page around it leave the modal, back to the page under it. The click counts only when the press started there too, so selecting text and letting go outside doesn't close it.

## Draft components

In `pecaiet.css` and usable now, but not reviewed yet: their look or class names may still change. The design system card for each one shows every state; each gets a full section here once it's reviewed.

- **Accordion**: `.pc-accordion` of `<details class="pc-accordion-item">`, each a `<summary>` (the question and a `caret-down`) and a `.pc-accordion-content`; `aria-disabled="true"` plus `tabindex="-1"` on the summary for one coming later; the same `name` on the items keeps one open at a time.
- **Avatar**: `.pc-avatar` (24px), `.pc-avatar-medium` (32px), `.pc-avatar-large` (48px): letters or an `<img>`; `.pc-avatar-none`, `.pc-avatar-square`, `.pc-avatars` with `.pc-avatar-more`, `.pc-avatar-status` (online), a `.pc-badge-small` inside a 32 or 48px one (bottom right, level with the dot, on a solid fill); rings from `--pc-avatar-ring`.
- **Breadcrumbs**: `<nav class="pc-breadcrumbs" aria-label="Breadcrumb">` with the parent pages as `<a>`, a `caret-right` `<svg>` between, and the current page last as `<span aria-current="page">`; above a page header with the sidebar toggle it lines up with the title.
- **Button group**: `.pc-btn-group` puts buttons side by side, 8px apart; `.pc-toolbar` holds ghost tools in a quiet `muted` tray with `.pc-toolbar-divider` between groups, the tool under the pointer raised as a pill, a pressed one (`aria-pressed="true"`) soft teal.
- **Carousel**: `.pc-carousel-dots` holding one `<button class="pc-carousel-dot">` per slide, the current one `aria-current="true"` (long); the app shows one slide and hides the others, with no motion.
- **Color picker**: `.pc-swatches` (`role="radiogroup"`) of `<label class="pc-swatch pc-colour-red" data-pc-tooltip="Red">` around a radio, from the set `.pc-colour-gray`, `-red`, `-orange`, `-yellow`, `-green`, `-teal`, `-blue`, `-purple`, `-pink`; the chosen one ringed in the text colour. Last, the colour well `.pc-swatch .pc-swatch-custom`: an `<input type="color">`, a `.pc-swatch-ring` (rainbow) and a `plus`, opening the device's own chooser. A picked colour fills the ring's middle: the app's script adds its radio (`value` the hex) to the well and sets `--pc-colour` on it.
- **Dropdown menu**: `.pc-menu` holding `.pc-menu-item` (`.pc-menu-item-destructive` for delete, last), `.pc-menu-separator`, `.pc-menu-label`, `.pc-menu-check` for the current choice.
- **Tooltip**: `data-pc-tooltip="Text"` on any element, ink (dark on light, light on dark); every icon-only button gets one with its name. `data-pc-tooltip-side="bottom|left|right"` where there's no room above; a 0.4s wait under the pointer, at once on keyboard focus; `data-pc-tooltip-hidden` hides it (Escape). On a button that can't be used, use `aria-disabled="true"` and put it on the button.
- **Modal**: `<dialog class="pc-dialog">` with `.pc-dialog-body`, `.pc-dialog-title`, `.pc-dialog-description`, an optional `.pc-dialog-content` (fields, an error, longer text; it scrolls when it doesn't fit) and `.pc-dialog-actions`. No x; on phones a sheet from the bottom with the buttons sharing the width.
- **Date input**: `.pc-picker.pc-date` holding a `.pc-picker-button` (a `calendar-dots` icon, then the date in a `<span>`, or `<span class="pc-picker-placeholder">No date</span>`), a `.pc-btn-ghost.pc-btn-icon.pc-date-clear` to clear it, and the Datepicker `.pc-popover` dropping under it.
- **Datepicker**: `.pc-calendar` (`.pc-calendar-head`, `.pc-calendar-grid`, `.pc-calendar-weekday`, `.pc-calendar-day`, `.pc-calendar-day-outside`) in a `.pc-popover`; today (`aria-current="date"`) has its number in bold teal, chosen days (`aria-selected="true"`) are filled teal; a range uses `data-range="start|mid|end"` (one soft teal band) and `data-range-preview` while picking the end; `aria-disabled="true"` days are faded; `.pc-calendar-title` opens `.pc-calendar-months`; inside a `.pc-date` it's a sheet on phones.
- **Drawer**: `<dialog class="pc-drawer">` (opened with `showModal()`: over the dimmed page, full height and flush with the screen's right edge; full screen on phones) or `<aside class="pc-drawer pc-drawer-beside">` (the last thing in the page's row, nothing dimmed; full screen on phones), each holding `.pc-drawer-head` (an optional `.pc-drawer-back`, the `.pc-drawer-title`, the `.pc-drawer-close` x), `.pc-drawer-body` and `.pc-drawer-footer`.
- **Search input**: on a page, a `.pc-input-group` (`role="search"`) with the magnifier, a `type="search"` `.pc-input`, and our x or a `.pc-spinner` in its `.pc-input-group-end`. The window: `.pc-search` (on a `.pc-dialog`) with `.pc-search-field`, `.pc-search-results`, `.pc-search-result` (`aria-selected="true"` for the highlighted one), `<mark class="pc-search-match">`, `.pc-search-group-action`, `.pc-search-footer`, `.pc-search-cancel`; full screen on phones.
- **Link**: `.pc-link` in text (also on a `<button>`; an icon after the words needs no class, `arrow-square-out` for another site; an icon before them takes `class="pc-link-lead"`; inside an alert it takes the alert's colour); `.pc-link-quiet` for links that stand alone in a muted place.
- **Text input**: `.pc-field` holding a `.pc-label` and a `.pc-input` or `.pc-textarea`, then `.pc-field-hint` or `.pc-field-error` (with `aria-invalid="true"` on the field).
- **Label**: `.pc-label` (12px semibold, 6px above its field); an optional field adds `<span class="pc-label-optional">(optional)</span>`; required fields have no mark.
- **Input group**: `.pc-input-group` with an icon `<svg>` first, then the `.pc-input`, and an optional `.pc-input-group-end`. An icon button in the end (`.pc-btn-ghost.pc-btn-icon`: show the password with Phosphor `eye`/`eye-slash`, copy) is row − 4 (28; 36 on phones) and the text stops before it. `readonly` gives a field the muted fill; autofilled fields keep our colours. Words before or after the value: a `.pc-input-addon` inside the field (muted), the group then draws the field's edge, focus ring and error. A field and its button side by side: `.pc-input-row`, 8px apart.
- **Select**: ours, not the browser's (see the Select section above; the code names stay `pc-picker`). `aria-invalid="true"` on the button turns it red; options can start with a `.pc-menu-dot` (plus a `.pc-colour-*`); `.pc-menu-none` is a muted first "None"; `aria-disabled="true"` with a `.pc-menu-note` for a choice that can't be picked. The native `.pc-select` is retired.
- **Checkbox and radio**: `<label class="pc-check">` with an `<input class="pc-checkbox">` or `<input class="pc-radio">` and the words in a `<span>` (the box stays on a long label's first line); a `.pc-field-hint` or `.pc-field-error` after it lines up under the words. Half (`el.indeterminate = true`) is a teal box with a white dash; `aria-invalid="true"` turns the border red.
- **Fieldset**: `<fieldset class="pc-fieldset">` with a `<legend class="pc-legend">` (it looks like a field's label) over a `.pc-fieldset-options` of radios or checkboxes; `.pc-fieldset-options-row` puts two or three short choices side by side, `.pc-fieldset-boxes` puts choices with a description in boxes (the chosen one teal). Radios in a group share one `name`; `aria-invalid="true"` turns them red.
- **File**: `.pc-files` of `.pc-file` rows (the file's icon, `.pc-file-name`, `.pc-file-size`): `<a class="pc-file" href download>` with a `.pc-file-action` download icon shown on hover and focus, or a `<div class="pc-file">` ending in an x button while editing.
- **File upload**: `<label class="pc-btn pc-btn-outline pc-file-upload">` with a `paperclip`, the words and a hidden `<input type="file">` inside; the chosen files show under it as File rows.
- **Footer**: `<footer class="pc-footer">` with `.pc-footer-groups` of `<nav class="pc-footer-group">` (a `.pc-footer-heading` over `.pc-footer-link` links), a `.pc-footer-bottom` line (or only a `.pc-footer-line`), then the app's word, `pe-caiet-word.svg` or `todo-word.svg` pasted inline as `<svg class="pc-footer-word" aria-hidden="true">`, in the border colour and cut off by the bottom edge.
- **Form**: the fields in a `.pc-card-content`, 12px apart, and Cancel then the action on the right in the `.pc-card-footer`; errors show when the action is pressed, as `aria-invalid="true"` and a `.pc-field-error` under each field with a problem.
- **Badge and chip**: `.pc-badge` (`-primary`, `-soft`, `-outline`, `-warning`, `-destructive`), `.pc-badge-small` (16px, 10px words) in any style; `-soft` is a light teal tint over whatever is behind it, for a quiet label; `.pc-chip` with an optional `.pc-chip-remove` button.
- **Alert**: `.pc-alert` with `.pc-alert-notice`, `.pc-alert-warning` or `.pc-alert-error`, the icon first (required). One line takes the kind's colour; a longer one has a `.pc-alert-body` with a `.pc-alert-title` in the kind's colour over text in the text colour (or a lead line over a list of a form's errors). Optional `.pc-alert-action`, a `.pc-alert-close` x, and `.pc-alert-banner` for a banner across the top of a page.
- **Code**: `.pc-code` inline; a secret shown once sits inside the notice that warns about it, as a read-only `.pc-input.pc-input-mono` in a `.pc-input-group` with a copy icon button at its end (after a click: a tick, and the tooltip says "Copied"); `.pc-code-block` for output.
- **Card**: `.pc-card` with `.pc-card-header` (`.pc-card-title`, `.pc-card-description`, an optional `.pc-card-action` on the right), `.pc-card-content`, `.pc-card-footer` (an optional `.pc-card-footer-note` on its left). `.pc-card-rows` on the content for a table or rows (4px from the edge); `.pc-card-media` for an image on top; a `.pc-card-link` title makes the whole card clickable (hover grey, focus ring round the card). Cards in a row share their height. Never a card inside a card.
- **Heading**: `.pc-page-title` for the page; `.pc-section-title` (and `.pc-section-description`) for a section on a page that isn't in a card, the same 16px semibold as a card's title.
- **Image**: `<img class="pc-image">` (10px corners, a faint edge inside); `.pc-image.pc-image-empty` with an `image` icon until it loads; `<figure class="pc-figure">` with a `<figcaption>` for a caption.
- **List**: `<ul class="pc-list">` or `<ol class="pc-list">` (muted markers, 24px in, 4px apart); `<dl class="pc-details">` with `<dt>` and `<dd>` in turn for labels and values (a 160px muted label column; stacked on phones).
- **Pagination**: `<nav class="pc-pagination">` of ghost buttons (Previous, `.pc-pagination-page` numbers with the current one `aria-current="page"` and outlined, `.pc-pagination-gap`, Next); `.pc-pagination-where` for the compact one; `.pc-pagination-bar` with a `.pc-pagination-count` or `.pc-pagination-size` first; `.pc-pagination-more` for Show more.
- **Popover**: `.pc-popover-anchor` around the button and its `.pc-popover` (hidden until opened), 4px below and aligned to the start; `.pc-popover-end`, `.pc-popover-up`; `.pc-popover-head`, `.pc-popover-text`, `.pc-dialog-actions` inside; a sheet over a `.pc-popover-backdrop` on phones.
- **Progress bar**: `<div class="pc-progress" role="progressbar" aria-valuenow>` with a `.pc-progress-fill` (6px, teal on the grey `track`); no `aria-valuenow` moves a third of the bar along it; `.pc-progress-error`, `.pc-progress-small`; `.pc-progress-head` with a `.pc-progress-value` above it.
- **Progress indicator**: `<ol class="pc-steps">` of `<li class="pc-step">` (a 4px bar over each `.pc-step-label`; `aria-current="step"`, `data-state="done"` or `"error"`); `.pc-steps-compact` with a `.pc-steps-head` for phones; `.pc-steps-vertical` for a checklist.
- **Quote**: `<figure class="pc-quote">` with a `<blockquote>` (a 2px line down its start) and a `<figcaption>` (`.pc-quote-name`, then the role in muted text); `.pc-quote-pull` (16px semibold), `.pc-quote-small` (a quoted reply).
- **Rating**: `.pc-rating-star` (a `star` outline and a `star-fill` cut to `--fill`); `.pc-rating` with `.pc-rating-stars`, `.pc-rating-value`, `.pc-rating-count` to show one; `.pc-rating-input`, a radio group of five star labels, to set one.
- **Segmented control**: `.pc-segmented` (`role="radiogroup"`) of `<label class="pc-btn pc-btn-ghost">`s around hidden radios; the chosen one lifts as a raised pill, the one under the pointer shows a pale pill; `.pc-segmented-full` stretches it.
- **Separator**: `<hr class="pc-separator">` (1px, the border colour); `.pc-separator-bleed` to a panel's edges; `.pc-separator-vertical` (16px tall, between items in a row); `.pc-separator-text` with a word in the middle.
- **Skeleton**: `.pc-skeleton` blocks in the border colour (`.pc-skeleton-line`, `-title`, `-circle`, `-control`), pulsing on the motion tokens; `aria-busy="true"` on the area, the blocks `aria-hidden`.
- **Skip link**: `<a class="pc-skip-link" href="#main">`, first in the page, out of sight until focused, then a raised pill at the top left; the target gets `tabindex="-1"`.
- **Stack**: `.pc-stack` (a column, 12px apart), `.pc-stack-1` 4px, `-2` 8px, `-4` 16px, `-6` 24px; `.pc-stack-row` side by side, 8px apart, wrapping.
- **Slider**: `<input type="range" class="pc-slider">` (6px track, teal up to `--value`, a 20px handle in `card`); `.pc-slider-marks` for steps; `.pc-slider-range` around two sliders with `--from` and `--to`.
- **Spinner**: `<span class="pc-spinner" role="status" aria-label="Loading">` with Phosphor's `circle-notch`, still while motion is off (it turns once motion comes back); `-small` 12px, `-large` 20px; a button at work gets `aria-busy="true"`.
- **Stepper**: `.pc-stepper`, one field as tall as the row holding a `minus` button, an `<input type="number">` and a `plus` button (`tabindex="-1"`); the end button is disabled at the limit; focus in the number rings the whole control.
- **Tabs**: `.pc-tabs` (`role="tablist"`) of `.pc-tab` buttons (`aria-selected`) or links (`aria-current="page"`), over a line; the current one semibold with a 2px teal line under it; `.pc-tab-count`; scrolls sideways when it doesn't fit.
- **Textarea**: `.pc-textarea` starts three lines tall and grows with the text up to ten (`field-sizing: content`; a drag handle where that's missing); `.pc-field-count` under it, `data-state="over"` in red.
- **Visually hidden**: `.pc-visually-hidden` (the same as Tailwind's `sr-only`); `.pc-visually-hidden-focusable` comes back into sight on keyboard focus.
- **Toast**: `.pc-toasts` (bottom right; across the bottom on phones) of `.pc-toast` panels: an icon (`data-tone="success"`, `"warning"` or `"error"`), `.pc-toast-text`, an optional ghost action and the x.
- **Toggle**: `<input type="checkbox" role="switch" class="pc-switch">`, a 36×20 pill, teal when on.
- **Tree view**: `.pc-tree` of `.pc-tree-item` rows (`aria-level`, `aria-expanded`), a `.pc-tree-caret`, an icon, `.pc-tree-label`, `.pc-tree-count`; each level 26px in, its fill starting under its parent's icon.
- **Video**: `.pc-video` around a `<video>` with a poster: `.pc-video-play` (a white round button) and `.pc-video-length` until `data-state="playing"`, then the browser's controls; `.pc-video-empty` when it can't play.
- **Table**: `.pc-table`; `.pc-row-link` makes a whole row a link; `.pc-table-check` for a checkbox column and `aria-selected="true"` on a picked row; `.pc-table-sort` in a `th` with `aria-sort`; `.pc-table-num`; `.pc-table-actions` for a row's ⋯ menu; `.pc-empty` (`.pc-empty-title`, `.pc-empty-description`) when there's nothing; `.pc-muted` for quiet cells.
