# Empty state

What shows where a table, a list or a page has nothing in it: a title and one line, centred.

- `.pc-empty` holds a `.pc-empty-title` (semibold, `foreground`) and an optional `.pc-empty-description` (one line in `muted-foreground`), 4px apart, centred, with 28px above and below.
- The title says what isn't there ("No failed jobs", "No tasks yet"); the line says what will show up here, or why nothing does.
- No icon and no button: the page's own action (Add task, New client) stays where it always is.
- In a table it fills the one row: `<tr><td colspan="…"><div class="pc-empty">…</div></td></tr>`. On a page it sits under the title, where the list would be. Search with no matches uses it too.
