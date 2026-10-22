import type { ReactNode } from 'react';
export type SwitcherApp = {
    /** Its name: "todo", "pe caiet". */
    name: string;
    /** Its home page. Apps are separate sites, so this is a plain link that loads it. */
    href: string;
    /** Its square mark (TodoMark, PeCaietMark, an <img alt="">), or a letter as a stand-in. */
    mark: ReactNode;
};
export type AppSwitcherProps = {
    /** The apps, in order (todo, …). */
    apps: SwitcherApp[];
    /** pe caiet, last under a divider, ending in the grid icon. */
    home: SwitcherApp;
    /** The name of the app you are in: the head shows it, and its row has the primary bar. */
    current: string;
    /** On the head. */
    className?: string;
};
/** The sidebar's head: the current app's mark and name, opening the menu of apps below it, as wide as the head (a sheet on phones). */
export declare function AppSwitcher({ apps, home, current, className }: AppSwitcherProps): import("react").JSX.Element;
