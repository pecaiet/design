import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { type AppSwitcherProps } from './AppSwitcher';
import { type Account } from './SidebarAccount';
type Sidebar = {
    /** Open on desktop, or its sheet open on phones. */
    open: boolean;
    toggle: () => void;
    /** The nav's id, for the toggle's aria-controls. */
    id: string;
};
/** What a toggle in a title row opens and closes: the app's sidebar, or the settings window's nav. Not exported from the package. */
export declare const SidebarContext: import("react").Context<Sidebar | null>;
/** The sidebar around this page, for a toggle of your own: open, and toggle(). Null outside a Navigation. */
export declare const useSidebar: () => Sidebar | null;
export type SidebarToggleProps = {
    className?: string;
};
/** The one toggle that opens and closes the sidebar, first in the page's title row (PageHeader puts it there). Open, it points left
 *  (text-outdent, "Close sidebar"); closed, right (text-indent, "Open sidebar"). Nothing outside a Navigation. */
export declare function SidebarToggle({ className }: SidebarToggleProps): import("react").JSX.Element | null;
export type NavigationProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
    /** The head: the app switcher, with the app you are in. */
    switcher: AppSwitcherProps;
    /** The rows: SidebarItems, and SidebarSections for headings with rows under them. */
    items: ReactNode;
    /** The app's own actions in the footer, above the account row (todo's New list): SidebarItem buttons. */
    actions?: ReactNode;
    /** The account row, always last. */
    account: Account;
    /** The page, in <main>, beside the sidebar. */
    children: ReactNode;
};
/** The app's frame: the sidebar (the app switcher, the rows, the footer with the account row) and the page beside it. The toggle in
 *  each page's title row opens and closes it. Desktop: it slides closed while the page widens, remembered in the sidebar cookie.
 *  Phones: always starts closed; the toggle opens it as a sheet over the dimmed page, which the backdrop, Escape or a visit closes. */
export declare function Navigation({ switcher, items, actions, account, children, style, ...div }: NavigationProps): import("react").JSX.Element;
export {};
