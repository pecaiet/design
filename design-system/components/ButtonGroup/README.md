# Button group

Buttons that go together. Two kinds: a group (separate buttons side by side) and a toolbar (tools in a quiet tray).

- Group: `.pc-btn-group` around ordinary `.pc-btn`s: side by side, 8px apart, each its own shape; they wrap when there is no room. At most one primary in a group; a delete goes last. Page header actions and dialog actions follow the same rule.
- Toolbar: `.pc-toolbar` around ghost buttons (`.pc-btn .pc-btn-ghost`, usually `.pc-btn-icon` with an `aria-label`): a tray in `muted` with 4px around the tools, 2px between them; `.pc-toolbar-divider` between groups of tools. The tool under the pointer lifts as a raised pill (`sidebar-active`: white in light, a lighter slate in dark); a tool that stays on (a view or a filter) carries `aria-pressed="true"` and keeps that look. Keyboard focus is the controls' blue ring.
- Use the toolbar for tools on a list or an editor (search, sort, view, more); actions on a page or in a dialog are a group.
- Choosing exactly one of a few options in the same tray is a Segmented control.
