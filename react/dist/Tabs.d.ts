import { type ComponentPropsWithRef, type ReactNode } from 'react';
type Look = {
    /** A noun: "Account", "Sessions". */
    label: ReactNode;
    /** 16px, before the words. */
    icon?: ReactNode;
    /** After the words, in a small pill: 12. */
    count?: ReactNode;
};
export type Tab<V extends string = string> = Look & {
    value: V;
    disabled?: boolean;
};
export type TabLink = Look & {
    href: string;
    /** The page you're on. */
    current?: boolean;
};
export type TabsProps<V extends string = string> = Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'children'> & {
    /** What the parts belong to, for screen readers: "Account". */
    label: string;
    /** Two to six. */
    tabs: Tab<V>[];
    value: V;
    onChange: (value: V) => void;
    /** A TabPanel for each tab, anywhere under it. */
    children?: ReactNode;
};
/** Switching between parts of one page: words over a line, the current one with a teal line under it (it slides there with
 *  pecaiet.js). Only the current tab is in the Tab order; the arrow keys, Home and End move between tabs and show their part. */
export declare function Tabs<V extends string = string>({ label, tabs, value, onChange, children, className, ...div }: TabsProps<V>): import("react").JSX.Element;
export type TabPanelProps = ComponentPropsWithRef<'div'> & {
    /** The tab it belongs to. */
    value: string;
};
/** One tab's part: shown while its tab is the current one (it fades in), hidden otherwise. */
export declare function TabPanel({ value, className, ...div }: TabPanelProps): import("react").JSX.Element;
export type TabLinksProps = Omit<ComponentPropsWithRef<'nav'>, 'children'> & {
    /** What the pages belong to, for screen readers: "Settings". */
    label: string;
    tabs: TabLink[];
};
/** Tabs whose parts each have their own address: Inertia links, the page you're on marked current. */
export declare function TabLinks({ label, tabs, className, ...nav }: TabLinksProps): import("react").JSX.Element;
export {};
