import { TextIndent, TextOutdent } from '@phosphor-icons/react'
import { createContext, useContext, useId, useRef, useState, type ComponentPropsWithRef, type CSSProperties, type ReactNode } from 'react'
import { AppSwitcher, type AppSwitcherProps } from './AppSwitcher'
import { Button } from './Button'
import { cx } from './cx'
import { usePhone, useSheet } from './shell'
import { SidebarAccount, type Account } from './SidebarAccount'

type Sidebar = {
  /** Open on desktop, or its sheet open on phones. */
  open: boolean
  toggle: () => void
  /** The nav's id, for the toggle's aria-controls. */
  id: string
}

/** What a toggle in a title row opens and closes: the app's sidebar, or the settings window's nav. Not exported from the package. */
export const SidebarContext = createContext<Sidebar | null>(null)

/** The sidebar around this page, for a toggle of your own: open, and toggle(). Null outside a Navigation. */
export const useSidebar = () => useContext(SidebarContext)

export type SidebarToggleProps = {
  className?: string
}

/** The one toggle that opens and closes the sidebar, first in the page's title row (PageHeader puts it there). Open, it points left
 *  (text-outdent, "Close sidebar"); closed, right (text-indent, "Open sidebar"). Nothing outside a Navigation. */
export function SidebarToggle({ className }: SidebarToggleProps) {
  const sidebar = useContext(SidebarContext)
  if (!sidebar) return null
  return (
    <Button
      variant="ghost"
      icon={sidebar.open ? <TextOutdent /> : <TextIndent />}
      label={sidebar.open ? 'Close sidebar' : 'Open sidebar'}
      className={cx('pc-sidebar-toggle', className)}
      aria-expanded={sidebar.open}
      aria-controls={sidebar.id}
      data-pc-tooltip-side="bottom"
      onClick={sidebar.toggle}
    />
  )
}

export type NavigationProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** The head: the app switcher, with the app you are in. */
  switcher: AppSwitcherProps
  /** The rows: SidebarItems, and SidebarSections for headings with rows under them. */
  items: ReactNode
  /** The app's own actions in the footer, above the account row (todo's New list): SidebarItem buttons. */
  actions?: ReactNode
  /** The account row, always last. */
  account: Account
  /** The page, in <main>, beside the sidebar. */
  children: ReactNode
}

// Desktop: sticky and one screen tall; the rows scroll inside it when they don't fit.
const FRAME: CSSProperties = { position: 'sticky', top: 0, display: 'flex', flexShrink: 0, alignSelf: 'flex-start', height: '100dvh' }

const remembered = () => {
  try {
    return !/(?:^|; )sidebar=closed(?:;|$)/.test(document.cookie)
  } catch {
    return true
  }
}

/** The app's frame: the sidebar (the app switcher, the rows, the footer with the account row) and the page beside it. The toggle in
 *  each page's title row opens and closes it. Desktop: it slides closed while the page widens, remembered in the sidebar cookie.
 *  Phones: always starts closed; the toggle opens it as a sheet over the dimmed page, which the backdrop, Escape or a visit closes. */
export function Navigation({ switcher, items, actions, account, children, style, ...div }: NavigationProps) {
  const phone = usePhone()
  const id = useId()
  const frame = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(remembered)
  const [sheet, setSheet] = useState(false)
  const sheetOpen = phone && sheet
  useSheet(sheetOpen, () => setSheet(false), frame, id)

  const toggle = () => {
    if (phone) return setSheet(!sheet)
    setOpen(!open)
    try {
      document.cookie = `sidebar=${open ? 'closed' : 'open'}; path=/; max-age=31536000; samesite=lax`
    } catch {}
  }

  return (
    <SidebarContext value={{ open: phone ? sheet : open, toggle, id }}>
      <div {...div} style={{ ...(phone ? undefined : { display: 'flex', minHeight: '100dvh' }), ...style }}>
        {/* React sets these in this order. hidden has to change before the class: the other way round, pecaiet.js plays the sheet's
            closing twice (once for the class going, once for hidden). Its closing keeps the frame drawn, hidden or not. */}
        <div
          ref={frame}
          hidden={phone && !sheet}
          className={sheetOpen ? 'pc-sidebar-sheet' : undefined}
          role={sheetOpen ? 'dialog' : undefined}
          aria-modal={sheetOpen || undefined}
          aria-label={sheetOpen ? switcher.current : undefined}
          style={phone ? undefined : FRAME}
        >
          {phone && <div className="pc-sheet-backdrop" onClick={() => setSheet(false)} />}
          <nav id={id} className="pc-sidebar" aria-label={switcher.current} data-state={!phone && !open ? 'closed' : undefined}>
            <AppSwitcher {...switcher} />
            {items}
            <div className="pc-sidebar-footer">
              {actions}
              <SidebarAccount {...account} />
            </div>
          </nav>
        </div>
        <main inert={sheetOpen} style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </div>
    </SidebarContext>
  )
}
