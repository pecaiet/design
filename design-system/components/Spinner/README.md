# Spinner

Something is working and the page isn't ready yet: Phosphor's open circle (`circle-notch`), turning, in the colour of the words around it.

- `<span class="pc-spinner" role="status" aria-label="Loading">` holding the `circle-notch` svg: 16px beside text, `.pc-spinner-small` 12px in tight spots, `.pc-spinner-large` 20px on its own. It takes the words' colour: muted on its own, white in a teal button.
- It turns even while motion is off: turning is the only way it says "working". For people who ask for reduced motion it turns three times slower.
- In a button at work: the spinner in place of its icon, words that say what's happening ("Saving…"), and `aria-busy="true"`: the button keeps its width and can't be pressed again.
- On its own, where a part of the page is loading, with words if it takes more than a moment ("Loading tasks…"). When the page knows the shape of what's coming, a Skeleton instead; when it knows how far it's got, the Progress bar.
