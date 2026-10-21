# File

A file to download, or an attachment: a row with the file's icon, its name and its size, like a task or menu row.

- `.pc-files` stacks the `.pc-file` rows 2px apart. Each row is 32px tall: the file's Phosphor icon (`file-pdf`, `file-xls`, `file-image`, `file-text`, or `file`), a `.pc-file-name` (cut off with "…" when long) and a `.pc-file-size` in muted 12px.
- To download: the row is `<a class="pc-file" href="…" download>`, with a `.pc-file-action` (Phosphor `download-simple`) last. Under the pointer and on keyboard focus it takes the hover fill, and the download icon shows in place of the size.
- While editing (attachments in a form): the row is a `<div class="pc-file">` ending in a ghost icon button with an x (`aria-label="Remove <name>"`), always shown, so it works on touch too.
- Uploading a file is File upload.
- Motion: rows added after the page has loaded fade in and drop 4px (File upload).
