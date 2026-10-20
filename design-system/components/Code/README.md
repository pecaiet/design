# Code

Machine values: IDs, secrets, error codes and keyboard keys, in the system's monospace.

- Inline: `<code class="pc-code">`. Keys: `<span class="pc-kbd">`.
- A secret shown once: one `.pc-alert-notice` holding the warning and, under it, the value in a read-only field with a copy button at its end, as in Text input: a `.pc-input-group` with `<input class="pc-input pc-input-mono" readonly aria-label="Secret">` and a ghost icon button (Phosphor `copy`, `aria-label="Copy secret"`). `.pc-input-mono` sets the value in the monospace at 12px. The warning and the value stay together in one box; no separate label.
- Copied: a copy button with words turns into a tick and "Copied" for two seconds; an icon-only one swaps its icon for a tick and its tooltip says "Copied". No toast.
- A block of output (a backtrace): `<pre class="pc-code-block">`. It scrolls inside itself and never widens the page.
