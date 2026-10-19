# Code

Machine values: IDs, secrets, error codes and keyboard keys, in the system's monospace.

- Inline: `<code class="pc-code">`. Keys: `<span class="pc-kbd">`.
- A secret shown once: one `.pc-alert-notice` holding the warning and, under it, `.pc-secret` with the `.pc-secret-value` and an outline Copy button ("Copied" for a moment after a click). The warning and the value stay together in one box; no separate label.
- A block of output (a backtrace): `<pre class="pc-code-block">`. It scrolls inside itself and never widens the page.
