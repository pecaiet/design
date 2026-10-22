import { router } from '@inertiajs/react'
import { useEffect, useEffectEvent, useSyncExternalStore, type RefObject } from 'react'

// What the app's frame shares (the sidebar, the top bar, the signed-out pages, the settings window): the phone width, the theme,
// links to other sites and the phone sheet. Not exported from the package.

// Below 48rem pecaiet.css draws the phone layout.
const PHONE = '(max-width: 47.99rem)'
const watchPhone = (notify: () => void) => {
  const query = matchMedia(PHONE)
  query.addEventListener('change', notify)
  return () => query.removeEventListener('change', notify)
}

/** True below 48rem, where the layouts pecaiet.css leaves to the app change shape. */
export const usePhone = () => useSyncExternalStore(watchPhone, () => matchMedia(PHONE).matches, () => false)

const watchDark = (notify: () => void) => {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

/** True while <html> has .dark. */
export const useDark = () => useSyncExternalStore(watchDark, () => document.documentElement.classList.contains('dark'), () => false)

/** Another site (another pe caiet app): a plain link that loads it, since an Inertia visit can't cross origins. */
export const external = (href: string) => /^([a-z][a-z\d+.-]*:|\/\/)/i.test(href)

/** A sidebar shown as a sheet over the page: opening moves focus to its first row, closing (the backdrop, Escape, a visit) puts it
 *  back on the toggle that opens it (aria-controls). */
export function useSheet(open: boolean, close: () => void, frame: RefObject<HTMLElement | null>, nav: string) {
  const shut = useEffectEvent(close)

  // A row or the account menu's Settings opens another page: the sheet closes behind it.
  useEffect(() => router.on('navigate', () => shut()), [])

  useEffect(() => {
    if (!open) return
    // The first row that's drawn: the app switcher's hidden menu comes before its button.
    const rows = frame.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)') ?? []
    ;[...rows].find(row => row.checkVisibility())?.focus({ preventScroll: true })
    const escape = (event: KeyboardEvent) => {
      // A menu open inside it closes first (it prevents the key); in the settings window this stops the window closing too.
      if (event.key !== 'Escape' || event.defaultPrevented) return
      event.preventDefault()
      shut()
    }
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('keydown', escape)
      const now = document.activeElement
      if (now && now !== document.body && !frame.current?.contains(now)) return
      document.querySelector<HTMLElement>(`[aria-controls="${nav}"]`)?.focus({ preventScroll: true })
    }
  }, [open])
}
