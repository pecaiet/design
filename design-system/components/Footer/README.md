# Footer

The bottom of a site's page: links, then the app's word, big and faint, cut off by the bottom edge.

- `<footer class="pc-footer">` at the bottom of signed-out pages and landing pages, with a line across its top. Apps with a sidebar have no footer.
- Link groups: `.pc-footer-groups` of `<nav class="pc-footer-group" aria-label="…">`, each an `<h2 class="pc-footer-heading">` (12px semibold, the text colour) over `.pc-footer-link` links, quiet links (muted; the text colour and an underline under the pointer; the blue ring on keyboard focus). They sit side by side and wrap when they don't fit.
- Under them, `.pc-footer-bottom`: a line across, then "© 2026 pe caiet" on the left and the language on the right, 12px, muted.
- The smallest footer has one `.pc-footer-line` instead: "© 2026 todo", Privacy, Terms.
- Last, the app's word: its SVG from the design repo (`pe-caiet-word.svg`, `todo-word.svg`) pasted inline as `<svg class="pc-footer-word" aria-hidden="true" focusable="false">`, so it takes the border colour. It fills the footer's width on every screen, and the page's bottom edge cuts the tip of the "p".
- The word is drawn in Figtree Black (900), so no extra font weight is loaded for it. A new app's word is drawn the same way: letters 2% tighter, from the left edge of the first letter to the right edge of the last, down to 0.18em under the line.
