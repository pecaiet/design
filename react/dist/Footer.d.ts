import { type ComponentPropsWithRef, type ReactElement, type ReactNode, type SVGProps } from 'react';
export type FooterLink = {
    label: ReactNode;
    /** A page of the app (an Inertia link), or another site's address (a plain link). */
    href: string;
};
export type FooterGroup = {
    /** Over its links, and the name of its nav: "Apps", "Help", "Legal". */
    heading: string;
    links: FooterLink[];
};
type Content = 
/** Link groups side by side (they wrap when they don't fit), then the bottom line: the copyright left, the language right. */
{
    groups: FooterGroup[];
    copyright: ReactNode;
    language?: ReactNode;
    links?: never;
}
/** The smallest: one line, the copyright then a few links ("© 2026 todo", Privacy, Terms). */
 | {
    links: FooterLink[];
    copyright: ReactNode;
    groups?: never;
    language?: never;
};
export type FooterProps = Content & Omit<ComponentPropsWithRef<'footer'>, 'children'> & {
    /** The app's word, last: <PeCaietWord />, <TodoWord />, or a new app's drawn the same way. It fills the width in the border
     *  colour, cut off by the page's bottom edge. */
    word: ReactElement<SVGProps<SVGSVGElement>>;
};
/** The bottom of a signed-out or landing page (apps with a sidebar have none): links, then the app's word, big and faint. */
export declare function Footer({ groups, links, copyright, language, word, className, ...footer }: FooterProps): import("react").JSX.Element;
export {};
