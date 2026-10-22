import type { HTMLAttributes } from 'react';
export type SkeletonProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    /** line: a line of text (make a paragraph's last one shorter). title: a title. circle: an avatar. control: a field or a
     *  button. Without one, size the block yourself (a badge, a picture). Widths come from the layout; keep the real layout around
     *  the blocks and give the area that's loading aria-busy="true". */
    shape?: 'line' | 'title' | 'circle' | 'control';
};
export declare function Skeleton({ shape, className, ...span }: SkeletonProps): import("react").JSX.Element;
