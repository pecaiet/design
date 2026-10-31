import { type ReactNode } from 'react';
import { type DialogProps } from './Modal';
export type NavigationModalProps = Omit<DialogProps, 'kind' | 'title' | 'children'> & {
    /** The nav's head, and the window's name: "Settings". */
    title: string;
    /** The nav's rows: SidebarItems (and SidebarSections), each its own address; mark the one shown current. */
    items: ReactNode;
    /** At the nav's foot, muted: who is signed in (<Avatar initials="A" /> and the email), or nothing. */
    footer?: ReactNode;
    /** The content's title, in the head's title row: the current row's name, "Account". */
    heading: ReactNode;
    /** The close button's name and tooltip: "Close settings". */
    closeLabel: string;
    /** The content, stacked in the body, which scrolls on its own. */
    children: ReactNode;
};
/** A big window over the page with its own nav: Navigation, inside a modal (settings, an account, help). The app opens it over the
 *  page you are on (open), and the x, Escape and a click on the dimmed page call onClose, which goes back there. Up to 960 × 640
 *  on desktop; on phones it fills the screen and its toggle opens the nav as a sheet, which the backdrop or Escape closes first.
 *  Keep it mounted across rows (a persistent layout), so moving between them doesn't open it again. */
export declare function NavigationModal({ title, items, footer, heading, closeLabel, children, onClose, ...dialog }: NavigationModalProps): import("react").JSX.Element;
