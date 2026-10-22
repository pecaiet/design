import { X } from '@phosphor-icons/react'
import { useId, useRef, useState, type ReactNode } from 'react'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { cx } from './cx'
import { Dialog, type DialogProps } from './Modal'
import { SidebarContext, SidebarToggle } from './Navigation'
import { useSheet } from './shell'
import { SidebarItem } from './SidebarItem'

export type SettingsSection = {
  /** Its name in the nav, and the window's title while it's shown: "Account". */
  label: string
  /** Its own address: /settings/account. */
  href: string
  /** 16px: UserCircle, Devices, SlidersHorizontal. */
  icon: ReactNode
  /** The section shown. */
  current?: boolean
}

export type SettingsModalProps = Omit<DialogProps, 'kind' | 'title' | 'children'> & {
  /** The nav's head, and the window's name: "Settings". */
  title?: string
  /** One row per section, each its own address; mark the one shown current. */
  sections: SettingsSection[]
  /** Who is signed in, muted at the nav's foot. */
  email: string
  /** The section's cards, stacked in the body, which scrolls on its own. */
  children: ReactNode
}

/** The settings window: a big window over the page with its own nav. The app opens it over the page you are on (open), and the x,
 *  Escape and a click on the dimmed page call onClose, which goes back there. Up to 960 × 640 on desktop; on phones it fills the
 *  screen and its toggle opens the nav as a sheet, which the backdrop or Escape closes first. Keep it mounted across sections (a
 *  persistent layout), so moving between them doesn't open it again. */
export function SettingsModal({ title = 'Settings', sections, email, children, onClose, ...dialog }: SettingsModalProps) {
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
          {sections.map(section => (
            <SidebarItem key={section.href} href={section.href} icon={section.icon} current={section.current}>{section.label}</SidebarItem>
          ))}
          <div className="pc-sidebar-footer">
            <div className="pc-modal-nav-user">
              <Avatar initials={email.charAt(0).toUpperCase()} />
              <span>{email}</span>
            </div>
          </div>
        </nav>
      </div>
      <section className="pc-modal-main" inert={sheet}>
        <div className="pc-modal-head">
          <div className="pc-page-title-row">
            <SidebarContext value={{ open: sheet, toggle: () => setSheet(!sheet), id: `${id}-nav` }}>
              <SidebarToggle />
            </SidebarContext>
            <h2 className="pc-page-title">{sections.find(section => section.current)?.label}</h2>
          </div>
          <Button variant="ghost" icon={<X />} label="Close settings" data-pc-tooltip-side="bottom" onClick={onClose} />
        </div>
        <div className="pc-modal-body">{children}</div>
      </section>
    </Dialog>
  )
}
