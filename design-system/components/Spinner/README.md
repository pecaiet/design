# Spinner

Something is working and the page isn't ready yet: Phosphor's open circle (`circle-notch`), in the colour of the words around it; still for now, it turns once motion comes back.

- `<span class="pc-spinner" role="status" aria-label="Loading">` holding the `circle-notch` svg: 16px beside text, `.pc-spinner-small` 12px in tight spots, `.pc-spinner-large` 20px on its own. It takes the words' colour: muted on its own, `primary-foreground` in a teal button.
- For now it stands still, like all motion: put words beside it ("Checking…", "Saving…") so it doesn't read as a broken ring. When motion comes back it turns, three times slower for people who ask for reduced motion.
- In a button at work: the spinner in place of its icon, words that say what's happening ("Saving…"), and `aria-busy="true"`: the button keeps its width and can't be pressed again.
- On its own, where a part of the page is loading, with words if it takes more than a moment ("Loading tasks…"). When the page knows the shape of what's coming, a Skeleton instead; when it knows how far it's got, the Progress bar.
