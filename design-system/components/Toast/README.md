# Toast

A short message after something happens: "Task deleted", "Couldn't save". Our panel, at the bottom right.

- `.pc-toasts` holds them over the page at the bottom right, the newest at the bottom, 8px apart; on phones they run across the bottom, above the home bar.
- A `.pc-toast` is our panel (card colour, border, `pc-raise-lg`, 14px corners): a 16px Phosphor icon, the words in `.pc-toast-text`, an optional action (a ghost button: "Undo", "Retry") and the x (`aria-label="Dismiss"`).
- The icon says what kind it is: `data-tone="success"` (`check-circle`, teal), `data-tone="warning"` (`warning`, amber: offline, about to run out), `data-tone="error"` (`warning-circle`, red), otherwise news (`info`, muted).
- `role="status"`; an error is `role="alert"`. It goes on its own after about five seconds, longer when it has an action, and never while it's under the pointer or has focus.
- One short sentence. Something people must act on before going on is an Alert on the page or a Modal, not a toast.
