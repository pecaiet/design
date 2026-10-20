# File upload

Adding files from the device: an outline button that opens the file picker. The chosen files show under it as File rows.

- `<label class="pc-btn pc-btn-outline pc-file-upload">` with a Phosphor `paperclip`, the words ("Attach files", or "Attach file" for one) and the real `<input type="file">` inside it, out of sight. Add `multiple` for more than one file, and `accept` for the kinds allowed.
- In a form it sits in a `.pc-field` under its `.pc-label`, with a `.pc-field-hint` that says what's allowed ("PDF or image, up to 10 MB each"). A file that isn't allowed gets a `.pc-field-error`.
- The chosen files show under it as File rows (`.pc-files`), each ending in an x to remove it. The button stays, to add more.
- Keyboard focus lands on the hidden input and shows the button's focus ring; Enter or Space opens the picker. `disabled` on the input fades the button.
- No drop area for now.
