import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from 'react';
export type CardProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
    title?: ReactNode;
    /** A line under the title. */
    description?: ReactNode;
    /** On the right of the header, centred on the title's line: a small button, a ⋯ menu or a switch. */
    action?: ReactNode;
    /** The title's heading level, the page's own: h2 under the page's h1 by default. */
    titleAs?: 'h2' | 'h3' | 'h4';
    /** Makes the whole card a link to this page (through its title). The action stays clickable on its own. */
    href?: string;
    /** An image on top, edge to edge (5:2, cropped to fit). */
    media?: ComponentPropsWithoutRef<'img'>;
    /** The content is a table or rows: they run to 4px from the card's edge. */
    rows?: boolean;
    /** Cancel and the action, on the right under a line. */
    footer?: ReactNode;
    /** A muted note on the footer's left ("Changed 3 days ago"). */
    footerNote?: ReactNode;
};
export declare function Card({ title, description, action, titleAs: Title, href, media, rows, footer, footerNote, children, className, ...div }: CardProps): import("react").JSX.Element;
