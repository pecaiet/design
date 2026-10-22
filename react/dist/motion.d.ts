/** Shrinks it out while it fades, and leaves removing it to React: await it, then drop the item from state. */
export declare const leave: (el: Element | null) => Promise<void>;
/** Something the person just added grows or fades in. Call it once the element is in the page. */
export declare const enter: (el: Element | null) => Promise<void>;
/** Plays a <dialog>'s closing, then closes it. */
export declare const close: (el: HTMLDialogElement | null) => Promise<void>;
