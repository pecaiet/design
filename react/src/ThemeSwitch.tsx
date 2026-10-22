import { Moon, Sun } from '@phosphor-icons/react'
import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'
import { useDark } from './shell'

export type ThemeSwitchProps = Omit<ComponentPropsWithRef<'button'>, 'children' | 'type' | 'onClick'>

/** The light/dark switch of the signed-out pages: an icon-only row button, a moon in light and a sun in dark. A click switches to
 *  the other theme and remembers it (pecaiet.js's setTheme), the same choice Settings › Preferences makes. */
export function ThemeSwitch({ className, style, ...button }: ThemeSwitchProps) {
  const dark = useDark()
  return (
    <button
      {...button}
      type="button"
      className={cx('pc-sidebar-item', className)}
      style={{ width: 'auto', ...style }}
      aria-label="Switch between light and dark"
      data-pc-tooltip="Switch between light and dark"
      data-pc-tooltip-side="left"
      onClick={() => window.Pecaiet?.setTheme(dark ? 'light' : 'dark')}
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  )
}
