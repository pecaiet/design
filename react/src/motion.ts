import type {} from '../../pecaiet'

// pecaiet.js plays what CSS can't. Without it (the app didn't import "@pecaiet/design") these resolve at once and nothing moves.

/** Shrinks it out while it fades, and leaves removing it to React: await it, then drop the item from state. */
export const leave = async (el: Element | null) => {
  await window.Pecaiet?.leave(el, { remove: false })
}

/** Something the person just added grows or fades in. Call it once the element is in the page. */
export const enter = async (el: Element | null) => {
  await window.Pecaiet?.enter(el)
}

/** Plays a <dialog>'s closing, then closes it. */
export const close = async (el: HTMLDialogElement | null) => {
  if (window.Pecaiet) await window.Pecaiet.close(el)
  else el?.close()
}
