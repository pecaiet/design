import { type ComponentPropsWithRef, type HTMLAttributes, type ReactNode } from 'react';
export type SliderProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children' | 'value' | 'defaultValue' | 'min' | 'max' | 'step'> & {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    /** The value in words, beside the label: value => `${value}%`, "3 days before". It's read out too. */
    format?: (value: number) => ReactNode;
    /** A mark under it at each step. */
    marks?: boolean;
} & (
/** Over it, with the value in words on the right. aria-label can say more ("Remind me, days before"). */
{
    label: ReactNode;
    'aria-label'?: string;
} | {
    label?: never;
    'aria-label': string;
});
/** "About this much" in a range, by dragging a handle; teal up to the value. For an exact number, a TextInput or a Stepper. */
export declare function Slider({ label, min, max, step, value, defaultValue, format, marks, onChange, id, style, className, ...input }: SliderProps): import("react").JSX.Element;
export type SliderRangeProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> & {
    /** Over it, with the range in words on the right. */
    label: ReactNode;
    min?: number;
    max?: number;
    step?: number;
    /** From and to; the handles can't cross. */
    value?: [number, number];
    defaultValue?: [number, number];
    onChange?: (value: [number, number]) => void;
    /** The range in words: ([from, to]) => `${from} to ${to} days`. */
    format?: (value: [number, number]) => ReactNode;
    disabled?: boolean;
};
/** A range with two handles, From and To, teal between them. */
export declare function SliderRange({ label, min, max, step, value, defaultValue, onChange, format, disabled, style, className, ...div }: SliderRangeProps): import("react").JSX.Element;
