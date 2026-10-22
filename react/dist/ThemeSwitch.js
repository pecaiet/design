import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from '@phosphor-icons/react';
import { cx } from './cx';
import { useDark } from './shell';
/** The light/dark switch of the signed-out pages: an icon-only row button, a moon in light and a sun in dark. A click switches to
 *  the other theme and remembers it (pecaiet.js's setTheme), the same choice Settings › Preferences makes. */
export function ThemeSwitch({ className, style, ...button }) {
    const dark = useDark();
    return (_jsx("button", { ...button, type: "button", className: cx('pc-sidebar-item', className), style: { width: 'auto', ...style }, "aria-label": "Switch between light and dark", "data-pc-tooltip": "Switch between light and dark", "data-pc-tooltip-side": "left", onClick: () => window.Pecaiet?.setTheme(dark ? 'light' : 'dark'), children: dark ? _jsx(Sun, {}) : _jsx(Moon, {}) }));
}
