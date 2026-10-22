// Types for pecaiet.js: importing "@pecaiet/design" runs it once and sets window.Pecaiet.

export interface Pecaiet {
  /** Shrinks el out while it fades, then removes it. In React pass { remove: false } and drop it from state afterwards. */
  leave(el: Element | null, options?: { remove?: boolean }): Promise<void>
  /** Something the person just added: a row or alert grows in, anything else fades in. */
  enter(el: Element | null): Promise<void>
  /** Plays the closing, then closes a <dialog> or sets hidden. */
  close(el: Element | null): Promise<void>
  /** The .dark class on <html>, remembered in the theme cookie. */
  setTheme(mode: 'dark' | 'light' | 'system'): void
  /** data-motion on <html>, remembered in the motion cookie; null follows the device again. */
  setMotion(mode: 'on' | 'off' | null): void
  motion(): 'on' | 'off'
}

declare global {
  interface Window {
    Pecaiet: Pecaiet
  }
}
