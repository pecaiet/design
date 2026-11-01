import { XIcon } from '@phosphor-icons/react'
import { useId, useRef, useState, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { Dialog, type DialogProps } from './Modal'
import { SidebarContext, SidebarToggle } from './Navigation'
import { useSheet } from './shell'

export type NavigationModalProps = Omit<DialogProps, 'kind' | 'title' | 'children'> & {
  /** The nav's head, and the window's name: "Settings". */
  title: string
  /** The nav's rows: SidebarItems (and SidebarSections), each its own address; mark the one shown current. */
  items: ReactNode
  /** At the nav's foot, muted: who is signed in (<Avatar initials="A" /> and the email), or nothing. */
  footer?: ReactNode
  /** The content's title, in the head's title row: the current row's name, "Account". */
  heading: ReactNode
  /** The close button's name and tooltip: "Close settings". */
  closeLabel: string
  /** The content, stacked in the body, which scrolls on its own. */
  children: ReactNode
}

/** A big window over the page with its own nav: Navigation, inside a modal (settings, an account, help). The app opens it over the
 *  page you are on (open), and the x, Escape and a click on the dimmed page call onClose, which goes back there. Up to 960 × 640
 *  on desktop; on phones it fills the screen and its toggle opens the nav as a sheet, which the backdrop or Escape closes first.
 *  Keep it mounted across rows (a persistent layout), so moving between them doesn't open it again. */
export function NavigationModal({ title, items, footer, heading, closeLabel, children, onClose, ...dialog }: NavigationModalProps) {
  const id = useId()
  const frame = useRef<HTMLDivElement>(null)
  const [sheet, setSheet] = useState(false)
  useSheet(sheet, () => setSheet(false), frame, `${id}-nav`)

  return (
    <Dialog aria-labelledby={`${id}-title`} {...dialog} kind="modal" onClose={onClose}>
      <div ref={frame} className={cx('pc-modal-frame', sheet && 'pc-sidebar-sheet')}>
        <div className="pc-sheet-backdrop" onClick={() => setSheet(false)} />
        <nav id={`${id}-nav`} className="pc-sidebar pc-modal-nav" aria-label={title}>
          <div className="pc-sidebar-head">
            <h2 id={`${id}-title`} className="pc-dialog-title">{title}</h2>
          </div>
          {items}
          {footer && (
            <div className="pc-sidebar-footer">
              <div className="pc-modal-nav-user">{footer}</div>
            </div>
          )}
        </nav>
      </div>
      <section className="pc-modal-main" inert={sheet}>
        <div className="pc-modal-head">
          <div className="pc-page-title-row">
            <SidebarContext value={{ open: sheet, toggle: () => setSheet(!sheet), id: `${id}-nav` }}>
              <SidebarToggle />
            </SidebarContext>
            <h2 className="pc-page-title">{heading}</h2>
          </div>
          <Button variant="ghost" icon={<XIcon />} label={closeLabel} data-pc-tooltip-side="bottom" onClick={onClose} />
        </div>
        <div className="pc-modal-body">{children}</div>
      </section>
    </Dialog>
  )
}
