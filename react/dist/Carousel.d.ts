import { type ComponentPropsWithRef, type ReactNode } from 'react';
export type CarouselSlide = {
    /** Names the slide and its dot: "todo" makes the dot "Show todo". */
    label: string;
    /** The app's own content. */
    content: ReactNode;
};
export type CarouselProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
    /** What it shows, for screen readers: "pe caiet apps". */
    label: string;
    slides: CarouselSlide[];
    /** Moves on by itself every this many ms. It waits while the pointer or focus is on it, stops for good once a dot is picked, and
     *  never moves for people who ask for less motion. */
    interval?: number;
    /** Holds it still for now: while an error shows on the page. */
    paused?: boolean;
};
/** One item at a time, with dots under it to pick one: the current dot long and strong. The slide shown fades in. */
export declare function Carousel({ label, slides, interval, paused, onPointerEnter, onPointerLeave, onFocus, onBlur, ...div }: CarouselProps): import("react").JSX.Element;
