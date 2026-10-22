import { CaretUpDown, SquaresFour } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { cx } from './cx'
import { DropdownMenu, MenuLabel, MenuSeparator } from './DropdownMenu'
import { SidebarItem } from './SidebarItem'

export type SwitcherApp = {
  /** Its name: "todo", "pe caiet". */
  name: string
  /** Its home page. Apps are separate sites, so this is a plain link that loads it. */
  href: string
  /** Its square mark (TodoMark, PeCaietMark, an <img alt="">), or a letter as a stand-in. */
  mark: ReactNode
}

export type AppSwitcherProps = {
  /** The apps, in order (todo, …). */
  apps: SwitcherApp[]
  /** pe caiet, last under a divider, ending in the grid icon. */
  home: SwitcherApp
  /** The name of the app you are in: the head shows it, and its row has the primary bar. */
  current: string
  /** On the head. */
  className?: string
}

/** The sidebar's head: the current app's mark and name, opening the menu of apps below it, as wide as the head (a sheet on phones). */
export function AppSwitcher({ apps, home, current, className }: AppSwitcherProps) {
  const here = [...apps, home].find(app => app.name === current) ?? home
  const row = (app: SwitcherApp, end?: ReactNode) => (
    <a key={app.name} className="pc-menu-item" role="menuitem" tabIndex={-1} href={app.href} aria-current={app.name === current ? 'page' : undefined}>
      <span className="pc-app-logo-mark">{app.mark}</span>
      {app.name}
      {end}
    </a>
  )
  return (
    <div className={cx('pc-sidebar-head', className)}>
      <DropdownMenu
        className="pc-sidebar-apps"
        menuClassName="pc-sidebar-apps-menu"
        trigger={
          <SidebarItem icon={<span className="pc-app-logo-mark">{here.mark}</span>} iconAfter={<CaretUpDown />}>
            {here.name}
          </SidebarItem>
        }
      >
        <MenuLabel>Switch app</MenuLabel>
        {apps.map(app => row(app))}
        <MenuSeparator />
        {row(home, <SquaresFour className="pc-menu-end" />)}
      </DropdownMenu>
    </div>
  )
}
