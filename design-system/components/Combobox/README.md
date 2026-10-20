# Combobox

Picking one value from a long list by typing: the Select with search. No classes of its own.

- A `.pc-picker` whose menu starts with a search field (`.pc-input-group` with the `magnifying-glass` icon and a `.pc-input type="search"`). Typing filters the options; when nothing matches, one `.pc-menu-empty` line says so.
- Everything else is the Select's: a button that looks like a field, the chosen option ticked, Up and Down to move, Enter to pick, Escape to close; a sheet on phones, with the search at the top.
- Only values from the list. Typing straight into the field, creating a value from what was typed, and several values as chips inside the field are not designed; they wait until an app needs them (tags in todo).
