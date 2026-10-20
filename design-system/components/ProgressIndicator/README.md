# Progress indicator

Where someone is in a few steps: a short bar over each step's name, teal for the steps done and the one they're on.

- `<ol class="pc-steps" aria-label="Steps">` of `<li class="pc-step">`, each holding a `.pc-step-label`. A 4px bar sits over each label.
- The step they're on has `aria-current="step"`: its bar teal and its name bold. Steps done have `data-state="done"`: their bar teal. Steps to come stay grey (`track`). A step with a problem has `data-state="error"`: its bar red and a ! before its name.
- On phones and in narrow places: `.pc-steps-compact`, with a `.pc-steps-head` (the step's name in `.pc-steps-now` and "Step 2 of 4" in `.pc-steps-count`) over the bars; the names are kept for screen readers only.
- Down the page, for a checklist: `.pc-steps-vertical`, the bar beside each step's name.
- Name steps with a noun or a short verb ("Account", "Add your profile"); three to five steps. It shows where they are; moving between steps is the page's own buttons.
