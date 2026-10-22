import { type HTMLAttributes, type ReactNode } from 'react';
export type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    /** One or two letters, upper case. Without letters or a photo it shows nobody (a person icon). */
    initials?: string;
    /** A photo filling the circle; the letters show if it doesn't load. */
    src?: string;
    /** 32px beside two lines, 48px at the top of a person's page; 24px beside one line by default. */
    size?: 'medium' | 'large';
    /** A team, an app or a client. */
    square?: boolean;
    /** The teal dot. Say it in the label too ("ana@example.com, online"). */
    online?: boolean;
    /** A small badge at the bottom right, on a 32 or 48px avatar: <Badge small variant="primary">Pro</Badge>. */
    badge?: ReactNode;
    /** On its own (a stack, an assignee): who it is, read out and shown as a tooltip. Beside the name or email, leave it out. */
    label?: string;
};
export declare function Avatar({ initials, src, size, square, online, badge, label, className, ...span }: AvatarProps): import("react").JSX.Element;
export type AvatarsProps = HTMLAttributes<HTMLSpanElement> & {
    /** Who's in it: "Ana, Andrei, Alina and 3 more". */
    label: string;
    /** How many more there are than the avatars shown: "+3". */
    more?: number;
};
/** Several people, overlapping, each ringed in the colour behind it. */
export declare function Avatars({ label, more, children, className, ...span }: AvatarsProps): import("react").JSX.Element;
