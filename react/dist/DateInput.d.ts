import { type ReactNode } from 'react';
import { type DateRange, type QuickPick } from './Datepicker';
import { type Labelled } from './Field';
type Choice = {
    range?: false;
    /** The date; null when there's none. */
    value: Date | null;
    onChange: (value: Date | null) => void;
    /** Picking a day keeps it open (for setting reminders too): Clear date and Done close it. Without it a pick closes it. */
    done?: boolean;
    /** Above the month (todo's due date): Today, Tomorrow, Next week. */
    quickPicks?: QuickPick[];
}
/** A range: the first day picked starts it, the second ends it. It stays open: Clear empties it, Done closes it. */
 | {
    range: true;
    value: DateRange;
    onChange: (value: DateRange) => void;
    done?: never;
    quickPicks?: never;
};
export type DateInputProps = Labelled & Choice & {
    /** Muted, while there's no date: "No date", or "No dates" for a range. */
    placeholder?: string;
    /** Under the month: reminders as Chips. */
    children?: ReactNode;
    min?: Date;
    max?: Date;
    /** Days that can't be picked (fully booked). */
    disabledDays?: (day: Date) => boolean;
    /** How the field shows a date: short, “Fri, 23 Oct”, the year only when it isn't this one. A range shows both, with a dash. */
    format?: (date: Date) => string;
    /** For the names of months and days; the browser's language by default. */
    locale?: string;
    /** Sends the date with a form as yyyy-mm-dd, in a hidden input; a range as name[start] and name[end]. */
    name?: string;
    hint?: ReactNode;
    /** Says what to do; turns the border red. Takes Inertia's form.errors.field as is. */
    error?: ReactNode;
    optional?: boolean;
    disabled?: boolean;
    id?: string;
    className?: string;
};
/** A date in a form: a button that looks like a field and opens the Datepicker under it (a sheet on phones). No typing. Picking a
 *  day fills it, closes it and puts focus back on the button; Esc closes it without a change; the x clears it. */
export declare function DateInput({ label, 'aria-label': ariaLabel, placeholder, children, min, max, disabledDays, format, locale, name, hint, error, optional, disabled, id, className, ...choice }: DateInputProps): import("react").JSX.Element;
export {};
