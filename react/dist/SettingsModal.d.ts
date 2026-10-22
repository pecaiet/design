import { type ReactNode } from 'react';
import { type DialogProps } from './Modal';
export type SettingsSection = {
    /** Its name in the nav, and the window's title while it's shown: "Account". */
    label: string;
    /** Its own address: /settings/account. */
    href: string;
    /** 16px: UserCircle, Devices, SlidersHorizontal. */
    icon: ReactNode;
    /** The section shown. */
    current?: boolean;
};
export type SettingsModalProps = Omit<DialogProps, 'kind' | 'title' | 'children'> & {
    /** The nav's head, and the window's name: "Settings". */
    title?: string;
    /** One row per section, each its own address; mark the one shown current. */
    sections: SettingsSection[];
    /** Who is signed in, muted at the nav's foot. */
    email: string;
    /** The section's cards, stacked in the body, which scrolls on its own. */
    children: ReactNode;
};
/** The settings window: a big window over the page with its own nav. The app opens it over the page you are on (open), and the x,
 *  Escape and a click on the dimmed page call onClose, which goes back there. Up to 960 × 640 on desktop; on phones it fills the
 *  screen and its toggle opens the nav as a sheet, which the backdrop or Escape closes first. Keep it mounted across sections (a
 *  persistent layout), so moving between them doesn't open it again. */
export declare function SettingsModal({ title, sections, email, children, onClose, ...dialog }: SettingsModalProps): import("react").JSX.Element;
