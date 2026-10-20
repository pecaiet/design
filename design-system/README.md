Pecaiet is the shared look of the Pe caiet apps: **idp** (sign-in and account settings) and **todo** (lists and tasks). Both apps render the same class names with the same tokens, so a change here reaches every app. The look is called **Senin** (Romanian for a clear sky): roomy, soft and calm.

## Colour

- Two themes, three tones each (sidebar, page, cards): light (sky-tinted grey ground, white cards) and dark (deep slate). In the apps, `class="dark"` on `<html>` turns dark on; without it the page is light. The cards here switch with the page's own theme control (`senin-light`, `senin-dark`). Check every new screen in both.
- idp's older names (`card-foreground`, `secondary`, `popover`, `sidebar-accent`, `sidebar-border`, `sidebar-primary` and the rest) are kept as aliases so existing pages keep working; new code uses the main names (`foreground`, `card`, `muted`, `sidebar-hover` and the rest).
- Use the token names, never a raw hex: `background`, `foreground`, `card`, `border`, `input`, `primary`, `sidebar`, `sidebar-active`, `destructive` and the rest.
- Body text is `foreground` on `background` or `card`. Secondary text (dates, counts, descriptions, table headers) is `muted-foreground`.
- `primary` (teal) is the one main action per view and the checked checkbox; text on it is `primary-foreground`, and it darkens to `primary-hover` under the pointer. Links are the text colour with a soft grey underline.
- Notices sit on `primary-soft`, errors on `destructive-soft`. An open dialog dims the page with `overlay`.
- Late dates and counts, and delete actions, are `destructive`.
- The active sidebar row is a `sidebar-active` pill; its text, icon and count keep the same colours as every other row.
- Every text pair named in a token's note holds 4.5:1 in both themes; `input` and `ring` hold 3:1 on `card`.

## Type

- Figtree throughout (`--font-sans`), plus the system's monospace (`pc-mono`, `--font-mono`) for IDs, secrets and error codes. Figtree comes in four styles and no others: `pc-title` (22px: page, pane and dialog-page titles, big numbers), `pc-heading` (15px: card, dialog and section titles, the sidebar app name), `pc-body` (14px: everything else), `pc-small` (12px: dates, counts, labels, hints, keys). In the apps they are the Tailwind utilities `text-pc-title`, `text-pc-heading`, `text-pc-body` and `text-pc-small`; Tailwind's own sizes (`text-sm`, `text-lg`, …) are not used. The only smaller text is the initial in a 20px tile (10px).
- The apps load fonts only from their own origin (idp's Content Security Policy), so Figtree is self-hosted as woff2 files.

## Shape and density

- One row height, `pc-row` (32px), for every row and control: sidebar, menu, search and table rows, calendar days, buttons, inputs, selects.
- Corners: `pc-radius-sm` (5px) for checkboxes and key caps, `pc-radius` (10px) for every row and control, `pc-radius-lg` (14px) for panels (cards, menus, dialogs, popovers). Avatars, badges, chips and radios are round. Inside a padded container the inner corner is the outer one minus the gap: menus keep 4px around 10px rows (14 = 10 + 4).
- `pc-raise` lifts cards. The active sidebar row is a flat pill: its fill alone marks it. `pc-raise-lg` lifts what opens over the page: menus, dialogs, tooltips. Nothing else casts a shadow.

## Motion

- Everything is instant for now: no transitions, no animations.
- Motion is shared, so it can be turned on later in one place: `components/bundle.css` starts with `--pc-motion-fast` (state changes: hover fills, focus rings, colours, tooltips), `--pc-motion-base` (things that move: the sidebar sliding, the phone sheet) and one easing, `--pc-motion-ease`. Both durations are 0ms today, and every animated property in every component reads them.
- To turn motion on in every app, change those two values (for example 120ms and 200ms). Nothing else changes.
- Reduced motion (the person's system setting) always keeps both at 0.

## Components

- `components/bundle.css` holds every class both apps use. Each component has a card here showing its states in light and dark, and a guideline under it. The code the apps import is `pecaiet.css` in github.com/pecaiet/design.
- Every class and every variable of our own starts with `pc-` (`.pc-btn`, `.pc-sidebar-item`, `--pc-row`, `--pc-raise`), so nothing an app defines can clash with them. Two families keep standard names: the colour tokens (shadcn's: `primary`, `muted-foreground`, …) and the fonts (Tailwind's: `--font-sans`, `--font-mono`). States are attributes, never classes.
- The cards follow component.gallery's list of component types (it collects them from 90+ public design systems): its 60, with its names, in its order. A card with no preview is one not designed yet. Our own pieces that aren't on that list come after the 60: Code, Focus, Page header, Sidebar item, Sidebar account, App switcher, Picker, Input group.
- Designed: Accordion (questions that open to show their answer), Alert, Avatar (the email's first letter in a circle, always next to the email), Badge (and removable chips), Breadcrumbs (the pages above this one, above its title), Button (primary, outline, ghost, destructive, icon-only), Button group (buttons 8px apart, and a toolbar of tools in a quiet tray), Card, Carousel (one item at a time, with dots to pick one: the sign-in page's left half), Checkbox, Color picker (swatches from a set, and a colour well for any colour), Combobox (the Picker with search), Date input (a field-like button that opens the Datepicker), Datepicker, Drawer (a panel from the right with a form or a record's details: over the page, edge to edge, or beside it), Dropdown menu (actions, and choosing one of many; a sheet at the bottom on phones), Empty state (a title and one line, centred, where there is nothing to show), Fieldset (a caption like a field's label over a group of radios or checkboxes), File (a file to download or an attachment: a row with its icon, name and size), File upload (an outline button that opens the file picker; the chosen files show under it), Form (fields in a card, Cancel and the action on the right in its footer; errors under each field), Heading (the page title, and one heading style for cards, dialogs and sections), Icon (Phosphor, regular weight: 16px beside 14px text, 14px beside 12px, muted by default), Image (10px corners and a faint edge; a muted box until it loads), Label (12px semibold above its field; only optional fields are marked), List (bullets, numbers, and labels with their values side by side), Header (a page without a sidebar: the logo and the account row), Link, Modal (confirm, and with a form), Navigation (always a sidebar, the app switcher at its head; one toggle in each page's title row opens and closes it), Pagination (page numbers with the current one outlined, Previous and Next, a compact one, Show more), Popover (a panel from a button, on click, 4px away; a sheet on phones), Progress bar (6px, teal on the muted track; it moves when it can't tell how long), Progress indicator (a bar over each step's name; compact on phones), Quote (a line down the start, who said it underneath; a pull quote and a quoted reply), Rating (teal stars: an average with its count, or five to rate with), Segmented control (the toolbar's tray for choosing one of a few options), Separator (one 1px line in the border colour: between sections, edge to edge, vertical, with a word), Skeleton (blocks shaped like what's coming, in the border colour; they pulse once motion is on), Skip link (on the first Tab, a raised pill at the top left that jumps to the content), Slider (a 6px track, teal up to the value, and a white handle; one value, steps, or a range), Spinner (Phosphor's open circle, turning, in the words' colour), Stack (the spacing scale as a wrapper: 4, 8, 12, 16 and 24px between children), Stepper (one field: “−”, the number, “+”), Radio button, Search input (a search dialog), Select, Table (rounded striped rows; row links, picking rows, sorting, a row's ⋯ menu, empty state), Tabs (words over a line; the current one semibold with a teal line under it), Text input (text field, text area and label), Textarea (three lines tall, growing with what's written; a count for a limit), Tooltip. Ours: Code (inline, secret shown once, keys), Focus (keyboard focus, the same on every control and row), Page header (the title row with the sidebar toggle), Sidebar item, Sidebar account, App switcher, Picker (every choice, with search), Input group (a field with an icon: quick add, search).
- Not designed yet: Footer, Hero, Rich text editor, Toast, Toggle, Tree view, Video, Visually hidden.
- Pages, last: Email, Error page, Settings modal (a big window with its own nav, over the page you are on; full screen on phones), Sign in. Whole pages as the apps build them, marked as pages: examples to follow, not components to mount.
- The current page's sidebar item carries `aria-current="page"`. Each app decides which one that is; the CSS only styles the attribute.
- Hover, keyboard focus and disabled states are built into the classes, the same way everywhere:
  - Hover: every clickable row and ghost or outline control takes a fill (`accent` on surfaces, `sidebar-hover` in the sidebar).
  - Focus: `pc-focus` on every control and row alike: as on claude.ai. Controls (buttons, fields, checkboxes, links) use `pc-focus`: their outer 1px turns the page colour (bordered controls turn their border that colour), then a 1px blue `ring` line on the edge and a soft glow in a darker blue. Rows (sidebar, menu, search, calendar days, table rows) use `pc-focus-inset`: the ring inside the row's own edge, only the glow outside. A transparent outline stays underneath for Windows high-contrast mode. Blue is used for focus only, so it shows on teal buttons and ticked boxes too. Rows also take their hover fill. Sidebar rows sit 1px apart, as on claude.ai. Menu and search rows sit 4px apart. Borderless inline fields (the search field) show only the caret.
  - Disabled: half strength and a not-allowed pointer, fields included.
  - Choices from a list use the Picker, never a native select. Every menu that pops up (pickers, the account menu, the app switcher, row actions) is a dropdown on desktop and a sheet at the bottom of the screen on phones.
  - Divider lines (menus, card footers, the search dialog, table headers) run edge to edge, the same everywhere.
  - Panels (cards, dialogs, popovers) have 16px inside.
  - Scrollbars are thin and muted (`muted-foreground` at 40%, no track), drawn by the browser on every scroll area and the page itself, so each system keeps its own behaviour (macOS hides them until you scroll).

## Iconography

- Phosphor icons (phosphoricons.com), regular weight, drawn in `currentColor`: 16px beside 14px text, 14px beside 12px text. todo uses `@phosphor-icons/react`; idp inlines the same SVGs from `@phosphor-icons/core`. Icons sit in `muted-foreground`, on the active row too.
- No emoji in the interface.

## Copy

- Sentence case everywhere.
- Buttons say what happens: "Save email", "Sign out", "Delete account".
- Speak to the person as "you"; name devices the way people know them: "Chrome on macOS", "2 hours ago".


---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

`components/bundle.js` defines `window.Pecaiet` (31 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. `components/bundle.css` reads its variables from `tokens.css`. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then `components/bundle.js` as a classic script (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `components/bundle.css` and `components/bundle.js` onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); load the stylesheet before the script; mount with `<x-import component-from-global-scope="Pecaiet.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens only — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers.

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`; stored assets and their paths: `api/assets/<Group>.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` is the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: surface, text, border, palette, type, spacing, radius, shadow. (9.0k)

**Icons and assets**

- `api/assets/logo.md` — 2 files, by asset id. (0.8k)

**Components** (`api/components/<Comp>.md`, 31)

- **Actions**: `Button` — A button that does something, in four styles · `Link` — A teal, underlined link inside running text
- **Navigation**: `SidebarItem` — One row in a sidebar: a link to a page, a button that does something, or a heading · `SidebarAccount` — The account row at the foot of the sidebar, and the menu it opens · `AppSwitcher` — The sidebar head as a button: the current app's mark and name, and an up-down caret · `Sidebar` — The app's navigation, always a sidebar · `PageHeader` — The top of a page: its title, one line about it, and the page's main action on the right
- **Foundations**: `Focus` — Keyboard focus, the same on every component, as on claude.ai: one blue ring and one soft glow
- **Overlays**: `Menu` — A short list of actions or places that opens over the page from a button · `Tooltip` — A short hint shown above an element on hover and keyboard focus · `Dialog` — A small window over the page that asks to confirm an action · `DatePicker` — Choosing a task's due date: quick picks, a month, and its reminders, in a popover · `Search` — A dialog for finding tasks: the field on top, results grouped below
- **Forms**: `Input` — Text fields and text areas, with a label, an optional hint and an error · `InputGroup` — A text field with an icon inside it, for quick add and search · `Select` — Choosing one option from a list, using the browser's own menu · `Checkbox` — A square checkbox with its label, and an optional hint under it · `Radio` — Choosing one of a few options that are all visible at once
- **Status**: `Badge` — A short round label for a status or a fact on a row · `Alert` — A message at the top of a page or form: a notice that something worked, or an error
- **Data**: `StatTile` — A big number with its label, for counts at a glance (admin overview, jobs) · `DetailList` — Label and value pairs describing one record (a user, a client, a job) · `Code` — Machine values: IDs, secrets, error codes and keyboard keys, in the system's monospace
- **Containers**: `Card` — A white, slightly raised panel that groups one task on a page · `Table` — Rows of records, usually inside a card
- **Tasks**: `TaskRow` — One task in a list: checkbox, title, due date · `TaskPane` — The open task, beside the list (on wide screens) or in its place (on narrow ones)
- **Screens**: `Senin` — Senin applied to both apps: the todo workspace and the idp Account page, in light and dark · `SignIn` — The signed-out page, used for sign in, sign up and password reset · `ErrorPage` — A signed-out page that says something went wrong and what to do (idp's "Can't sign in to this app") · `Email` — The password reset email, in Senin's light colours
