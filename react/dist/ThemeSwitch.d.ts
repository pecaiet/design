import type { ComponentPropsWithRef } from 'react';
export type ThemeSwitchProps = Omit<ComponentPropsWithRef<'button'>, 'children' | 'type' | 'onClick'>;
/** The light/dark switch of the signed-out pages: an icon-only row button, a moon in light and a sun in dark. A click switches to
 *  the other theme and remembers it (pecaiet.js's setTheme), the same choice Settings › Preferences makes. */
export declare function ThemeSwitch({ className, style, ...button }: ThemeSwitchProps): import("react").JSX.Element;
