# Combobox

Picking one value from a long list by typing: the Select with search. No classes of its own.

- A `.pc-picker` whose menu starts with a search field (`.pc-input-group` with the `magnifying-glass` icon and a `.pc-input type="search"`). Typing filters the options; when nothing matches, one `.pc-menu-empty` line says so.
- Everything else is the Select's: a button that looks like a field, the chosen option ticked, Up and Down to move, Enter to pick, Escape to close; a sheet on phones, with the search at the top.
- Several values (labels or tags on a task, the people a list is shared with, filters, an app's scopes): `.pc-picker-field` in place of the button, a `<div role="combobox" tabindex="0" aria-haspopup="listbox">` because it holds the chips' own buttons. The picked ones sit in the field as `.pc-chip`s, each with its x (`.pc-chip-remove`, "Remove Design"); with none it says what to do in muted words (`.pc-picker-placeholder`, "Add a label"); when they don't fit, the field grows a line. In the field, chips are a step smaller than elsewhere (`pc-row-xs`: 24, and 32 on phones), 4px from the field's edge and from each other, so a field with one line stays as tall as the row.
- Its menu (`aria-multiselectable="true"`) starts with the same search; each row starts with a `.pc-checkbox`, ticked when picked (the Select's tick at the end means "the one"). A click or Enter picks or unpicks and the menu stays open; Backspace in an empty search removes the last chip; Escape or a click outside closes it. On phones it's the Select's sheet, open while you pick.
- An error (`aria-invalid="true"`) turns the field's border red, with the message under it; turned off (`aria-disabled="true"`), it fades to half like every field.
- Only values from the list: typing only filters. Typing straight into the field and creating a value from what was typed are not designed; new values are made where they're managed (settings).
