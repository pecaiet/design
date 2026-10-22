import { type ReactNode } from 'react';
export type DateRange = {
    start: Date | null;
    end: Date | null;
};
export type QuickPick = {
    /** "Today", "Tomorrow", "Next week". */
    label: string;
    date: Date;
    /** The day at its end; worked out when left out: the weekday for today and tomorrow ("Tue"), with the date further on ("Mon 26"). */
    note?: string;
};
type Choice = 
/** One date: picking a day (or a quick pick) calls onChange with it. */
{
    range?: false;
    value: Date | null;
    onChange: (value: Date) => void;
    quickPicks?: QuickPick[];
}
/** A range: the first day picked starts it, the second ends it, with the days up to the one under the pointer shown on the way.
 *  Clear and Done belong to the popover around it. */
 | {
    range: true;
    value: DateRange;
    onChange: (value: DateRange) => void;
    quickPicks?: never;
};
export type DatepickerProps = Choice & {
    /** Days before it can't be picked (before today: pass today). */
    min?: Date;
    /** Days after it can't be picked. */
    max?: Date;
    /** Other days that can't be picked (fully booked): faded, and the arrow keys skip them. */
    disabledDays?: (day: Date) => boolean;
    /** Moves focus to the chosen day (or today) when it turns true: when the popover around it opens. */
    autoFocus?: boolean;
    /** For the names of months and days; the browser's language by default. */
    locale?: string;
    /** Under the month: reminders as Chips, an Add reminder button. */
    children?: ReactNode;
    /** On the .pc-calendar. */
    className?: string;
};
/** A month to pick a date (or a range) from, weeks starting on Monday: today's number in bold teal, the chosen day filled. The
 *  arrow keys move by day and week, Page Up and Down by month (with Shift, by year), Home and End to the week's ends, Enter picks.
 *  The month's name opens the twelve months. Put it in a Popover, or use the DateInput. */
export declare function Datepicker({ min, max, disabledDays, autoFocus, locale, children, className, ...choice }: DatepickerProps): import("react").JSX.Element;
export {};
