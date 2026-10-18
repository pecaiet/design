# Pecaiet UI

The shared look for the Pecaiet apps (idp, todo): colours, type, and plain HTML/CSS components. One CSS file, `pecaiet.css`, built on Tailwind v4. Every app writes its own markup (ERB, JSX, …) with the class names below; change the CSS here and every app follows.

The design lives in the private Pecaiet design system on claude.ai (Senin). This repo is its code.

## Use it

Import it right after Tailwind, in the app's main CSS file:

```css
@import "tailwindcss";
@import "<path to>/pecaiet.css";
```

That gives every app:

- The colour tokens as CSS variables (`--primary`, `--sidebar`, …) and as Tailwind utilities (`bg-primary`, `text-muted-foreground`, `border-border`, …). The shadcn names (`sidebar-accent`, `card-foreground`, `popover`, …) are kept as aliases.
- Figtree as the default font (`--font-sans`), and four text sizes as utilities: `text-title` (24), `text-heading` (16), `text-body` (15, the default), `text-small` (13).
- The components below, in Tailwind's `components` layer, so a utility on the same element still wins.

Figtree itself isn't bundled yet: until it is, load it in the app or the system font is used.

## Dark mode

Add `class="dark"` to `<html>`. Without it the page is light. `dark:` utilities follow the same class.

For a "System" choice, set the class from `prefers-color-scheme`, as idp's layout does.

## Tokens

- **Colours**: `background`, `foreground`, `muted`, `muted-foreground`, `card`, `border`, `input`, `primary`, `primary-foreground`, `primary-hover`, `primary-soft`, `accent`, `sidebar`, `sidebar-hover`, `sidebar-active`, `sidebar-active-foreground`, `destructive`, `destructive-soft`, `ring`, `overlay`.
- **Row height**: `--senin-row` (36px) for sidebar rows, buttons, menu items and inputs.
- **Corners**: `--senin-radius-sm` (5px), `--senin-radius` (10px), `--senin-radius-lg` (14px).
- **Shadows**: `--raise` (the active row, cards), `--raise-lg` (menus, the phone sidebar).
- **Motion**: `--motion-fast` and `--motion-base`, both 0ms for now, so everything is instant. Set them (e.g. 120ms and 200ms) to turn motion on everywhere. Reduced motion always keeps 0.

## Rules every component follows

- Focus: a 2px `--ring` outline with a 2px gap. Rows also take their hover fill when focused.
- Disabled: half opacity, no pointer.
- Icons: Phosphor, regular weight, 16px beside 15px text.
- The page you are on is marked with `aria-current="page"`; the CSS styles that, not a class.

## Button

```html
<button class="btn btn-primary" type="button">Save email</button>
<button class="btn btn-outline" type="button">Cancel</button>
<button class="btn btn-ghost" type="button">Sign out</button>
<button class="btn btn-destructive" type="button">Delete account</button>
<button class="btn btn-ghost btn-icon" type="button" aria-label="More"><svg>…</svg></button>
```

- One primary button per view.
- `btn-icon` is square; it needs an `aria-label`.
- `aria-pressed="true"` turns a button into a pressed toggle.

## Sidebar item

One row of the sidebar. A link (`<a>`) when it opens a page, a `<button>` when it does something.

```html
<!-- Label only (idp) -->
<a class="sidebar-item" href="/account" aria-current="page"><span class="sidebar-label">Account</span></a>

<!-- Icon, label, count; a late count is red -->
<a class="sidebar-item" href="/lists/1"><svg>…</svg><span class="sidebar-label">America</span><span class="sidebar-badge">3</span></a>
<a class="sidebar-item" href="/lists/2"><svg>…</svg><span class="sidebar-label">Japan</span><span class="sidebar-badge sidebar-badge-late">10</span></a>

<!-- With a keyboard shortcut -->
<button class="sidebar-item" type="button"><svg>…</svg><span class="sidebar-label">Search</span><span class="kbd">/</span></button>

<!-- A space: bold, not clickable, its lists indented under it -->
<div class="sidebar-section">
  <div class="sidebar-item sidebar-space"><span class="sidebar-logo">W</span><span class="sidebar-label">Work</span></div>
  <div class="sidebar-sub">
    <a class="sidebar-item" href="/lists/1"><svg>…</svg><span class="sidebar-label">America</span></a>
  </div>
</div>
```

- Long labels are cut with an ellipsis; the count stays.
- A closed list shows its space on the right as a `sidebar-badge`.

## Sidebar account

The account row at the foot of the sidebar, and the menu it opens upward.

```html
<div class="sidebar-account">
  <div class="menu sidebar-account-menu" role="menu" hidden>
    <a class="menu-item" role="menuitem" href="/account"><svg>…</svg>Settings</a>
    <a class="menu-item" role="menuitem" href="/admin"><svg>…</svg>Admin panel</a>
    <div class="menu-separator"></div>
    <button class="menu-item menu-item-destructive" role="menuitem" type="button"><svg>…</svg>Sign out</button>
  </div>
  <button class="sidebar-item" type="button" aria-haspopup="menu" aria-expanded="false">
    <span class="avatar">A</span><span class="sidebar-label">ana@example.com</span><svg>…caret-down…</svg>
  </button>
</div>
```

- Set `aria-expanded="true"` while the menu is open; the row keeps its hover fill.
- Settings, Admin panel (admins only), then Sign out in red. Nothing else.
- It closes on a click outside, Escape, or a choice. The same menu is used on phones.

## Sidebar

Always a sidebar. One toggle opens and closes it on desktop and phones, and it sits in the page's title row.

```html
<nav class="sidebar">
  <div class="sidebar-head"><span class="app-logo"><span class="app-logo-mark">P</span>Todo</span></div>
  <!-- sidebar items -->
  <div class="sidebar-footer">
    <button class="sidebar-item" type="button"><svg>…</svg><span class="sidebar-label">New list</span></button>
    <!-- sidebar account -->
  </div>
</nav>

<main>
  <div class="page-title-row">
    <button class="btn btn-ghost btn-icon sidebar-toggle" type="button" aria-label="Close sidebar" aria-expanded="true"><svg>…text-outdent…</svg></button>
    <h1 class="page-title">America</h1>
  </div>
</main>
```

- The logo is optional; no logo, no `sidebar-head`.
- The footer always sits at the bottom, and stays pinned while the rows scroll. The account row is always last.
- Closed (desktop): `data-state="closed"` on the `.sidebar`. The toggle shows Phosphor `text-indent`, with `aria-label="Open sidebar"` and `aria-expanded="false"`.
- Remember the desktop choice per person; phones always start closed.
- Phones: open it as a sheet over a dimmed page. A tap on the backdrop or Escape closes it.

```html
<div class="sidebar-sheet">
  <div class="sheet-backdrop"></div>
  <nav class="sidebar">…</nav>
</div>
```
