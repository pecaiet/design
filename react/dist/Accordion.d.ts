import { type ComponentPropsWithRef, type ReactNode } from 'react';
export type AccordionProps = ComponentPropsWithRef<'div'> & {
    /** One open at a time: opening one closes the others (the items share a name). Several can be open by default. */
    single?: boolean;
};
/** Questions or sections that open to show more, one under another: FAQs and optional detail, never something needed to finish a
 *  task. The browser opens and closes them (Enter and Space too); with pecaiet.js the answer grows open and the rest glide. */
export declare function Accordion({ single, className, ...div }: AccordionProps): import("react").JSX.Element;
export type AccordionItemProps = Omit<ComponentPropsWithRef<'details'>, 'children' | 'open' | 'onToggle'> & {
    /** The question. */
    summary: ReactNode;
    /** The answer. */
    children?: ReactNode;
    /** Open at first. Passed with onOpenChange it follows the app; it changes only when its value does, so the motion isn't cut short. */
    open?: boolean;
    /** It opened or closed (the toggle event, after pecaiet.js has played it). */
    onOpenChange?: (open: boolean) => void;
    /** Coming later: half strength, and it doesn't open. */
    disabled?: boolean;
};
export declare function AccordionItem({ summary, children, open, onOpenChange, disabled, className, ...details }: AccordionItemProps): import("react").JSX.Element;
