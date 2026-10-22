import { type HTMLAttributes, type ReactNode } from 'react';
export type ChipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    /** A chosen value: "1 day before", with a <span className="pc-muted"> for what's quieter ("9:00"). */
    children: ReactNode;
    /** 16px, first. */
    icon?: ReactNode;
    /** Something the person just added: it fades in when it appears. Leave it off for what was already on the page. */
    enter?: boolean;
} & ({
    onRemove?: never;
    removeLabel?: never;
}
/** Shows the x. Called once the chip has faded out; then drop it from state. removeLabel is the x's name and tooltip, saying
 *  which: "Remove reminder 1 day before". */
 | {
    onRemove: () => void;
    removeLabel: string;
});
export declare function Chip({ icon, enter, onRemove, removeLabel, children, className, ...span }: ChipProps): import("react").JSX.Element;
