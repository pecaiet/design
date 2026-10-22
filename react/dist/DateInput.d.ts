import { type ReactNode } from 'react';
import { type QuickPick } from './Datepicker';
import { type Labelled } from './Field';
export type DateInputProps = Labelled & {
    /** The date; null when there's none. */
    value: Date | null;
    onChange: (value: Date | null) => void;
    /** Muted, while there's no date. */
    placeholder?: string;
    /** Picking a day keeps it open (for setting reminders too): Clear date and Done close it. Without it a pick closes it. */
    done?: boolean;
    /** Above the month (todo's due date): Today, Tomorrow, Next week. */
    quickPicks?: QuickPick[];
    /** Under the month: reminders as Chips. */
    children?: ReactNode;
    min?: Date;
    max?: Date;
    /** Days that can't be picked (fully booked). */
    disabledDays?: (day: Date) => boolean;
    /** How the field shows the date: short, “Fri, 23 Oct”, the year only when it isn't this one. */
    format?: (date: Date) => string;
    /** For the names of months and days; the browser's language by default. */
    locale?: string;
    /** Sends the date with a form as yyyy-mm-dd, in a hidden input. */
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
export declare function DateInput({ label, 'aria-label': ariaLabel, value, onChange, placeholder, done, quickPicks, children, min, max, disabledDays, format, locale, name, hint, error, optional, disabled, id, className, }: DateInputProps): import("react").JSX.Element;
