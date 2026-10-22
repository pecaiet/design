import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './Button';
import { cx } from './cx';
// The grid's rows leave their cells in the grid itself, so pecaiet.css's seven columns and the week's edges (7n) still apply.
const ROW = { display: 'contents' };
// No class in pecaiet.css yet for the quick picks' column and the line under them (edge to edge in the popover).
const PICKS = { display: 'grid', gap: 'var(--pc-space-0-5)' };
const EDGE = { margin: '0 calc(-1 * var(--pc-space-4))' };
const DAY_STEPS = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
const MONTH_STEPS = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 };
const midnight = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const addDays = (date, count) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + count);
const addMonths = (date, count) => {
    const length = new Date(date.getFullYear(), date.getMonth() + count + 1, 0).getDate();
    return new Date(date.getFullYear(), date.getMonth() + count, Math.min(date.getDate(), length));
};
const monday = (date) => addDays(date, -((date.getDay() + 6) % 7));
const firstOf = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const sameMonth = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
const sameDay = (a, b) => Boolean(a && b && sameMonth(a, b) && a.getDate() === b.getDate());
/** A month to pick a date (or a range) from, weeks starting on Monday: today's number in bold teal, the chosen day filled. The
 *  arrow keys move by day and week, Page Up and Down by month (with Shift, by year), Home and End to the week's ends, Enter picks.
 *  The month's name opens the twelve months. Put it in a Popover, or use the DateInput. */
export function Datepicker({ min, max, disabledDays, autoFocus, locale, children, className, ...choice }) {
    const today = midnight(new Date());
    const anchor = (choice.range ? choice.value.start : choice.value) ?? today;
    const [month, setMonth] = useState(() => firstOf(anchor));
    const [focus, setFocus] = useState(() => midnight(anchor));
    const [view, setView] = useState('days');
    const [preview, setPreview] = useState(null);
    const root = useRef(null);
    const moved = useRef(false);
    const names = useMemo(() => ({
        weekday: new Intl.DateTimeFormat(locale, { weekday: 'short' }),
        weekdayLong: new Intl.DateTimeFormat(locale, { weekday: 'long' }),
        weekdayDay: new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric' }),
        day: new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        month: new Intl.DateTimeFormat(locale, { month: 'long' }),
        monthShort: new Intl.DateTimeFormat(locale, { month: 'short' }),
        monthYear: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
        year: new Intl.DateTimeFormat(locale, { year: 'numeric' }),
    }), [locale]);
    const off = (date) => (min !== undefined && date < midnight(min)) || (max !== undefined && date > midnight(max)) || Boolean(disabledDays?.(date));
    // After a key (or a view change) moved it, the day or month that takes focus gets it.
    useEffect(() => {
        if (!moved.current)
            return;
        moved.current = false;
        root.current?.querySelector('[tabindex="0"]')?.focus();
    });
    useEffect(() => {
        if (autoFocus)
            root.current?.querySelector('[tabindex="0"]')?.focus();
    }, [autoFocus]);
    const range = choice.range ? choice.value : null;
    const picking = Boolean(range?.start && !range.end);
    const other = range?.end ?? (picking ? preview : null);
    const [from, to] = range?.start && other ? (other < range.start ? [other, range.start] : [range.start, other]) : [null, null];
    const go = (date) => {
        setFocus(date);
        if (!sameMonth(date, month))
            setMonth(firstOf(date));
    };
    const pick = (date) => {
        if (off(date))
            return;
        go(date);
        setPreview(null);
        if (!choice.range) {
            choice.onChange(date);
            return;
        }
        const { start, end } = choice.value;
        if (!start || end)
            choice.onChange({ start: date, end: null });
        else
            choice.onChange(date < start ? { start: date, end: start } : { start, end: date });
    };
    const dayKeys = (event) => {
        const step = DAY_STEPS[event.key];
        let next;
        if (step) {
            // Days that can't be picked are skipped.
            next = addDays(focus, step);
            for (let tries = 0; off(next) && tries < 60; tries++)
                next = addDays(next, step);
        }
        else if (event.key === 'Home')
            next = monday(focus);
        else if (event.key === 'End')
            next = addDays(monday(focus), 6);
        else if (event.key === 'PageUp' || event.key === 'PageDown')
            next = addMonths(focus, (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1));
        else
            return;
        event.preventDefault();
        if (step && off(next))
            return;
        moved.current = true;
        go(next);
        if (picking && !off(next))
            setPreview(next);
    };
    const monthKeys = (event) => {
        const step = MONTH_STEPS[event.key];
        const next = step ? month.getMonth() + step : event.key === 'Home' ? 0 : event.key === 'End' ? 11 : undefined;
        if (next === undefined)
            return;
        event.preventDefault();
        if (next < 0 || next > 11)
            return;
        moved.current = true;
        setMonth(new Date(month.getFullYear(), next, 1));
    };
    const chooseMonth = (index) => {
        const length = new Date(month.getFullYear(), index + 1, 0).getDate();
        setFocus(new Date(month.getFullYear(), index, Math.min(focus.getDate(), length)));
        setMonth(new Date(month.getFullYear(), index, 1));
        setView('days');
        moved.current = true;
    };
    const step = view === 'days' ? 1 : 12;
    const before = addMonths(month, -step);
    const after = addMonths(month, step);
    const name = (date) => (view === 'days' ? names.month : names.year).format(date);
    const weeks = [];
    const last = addDays(monday(new Date(month.getFullYear(), month.getMonth() + 1, 0)), 6);
    for (let start = monday(month); start <= last; start = addDays(start, 7))
        weeks.push(Array.from({ length: 7 }, (_, i) => addDays(start, i)));
    const tabbable = sameMonth(focus, month) ? focus : month;
    return (_jsxs(_Fragment, { children: [choice.quickPicks && (_jsxs(_Fragment, { children: [_jsx("div", { style: PICKS, children: choice.quickPicks.map(quick => (_jsxs("button", { className: "pc-menu-item", type: "button", onClick: () => pick(midnight(quick.date)), children: [quick.label, _jsx("span", { className: "pc-menu-note", children: quick.note ?? (Math.round((midnight(quick.date).getTime() - today.getTime()) / 864e5) < 2 ? names.weekday : names.weekdayDay).format(quick.date) })] }, quick.label))) }), _jsx("div", { className: "pc-menu-separator", style: EDGE })] })), _jsxs("div", { ref: root, className: cx('pc-calendar', className), children: [_jsxs("div", { className: "pc-calendar-head", children: [_jsx(Button, { variant: "ghost", icon: _jsx(CaretLeft, {}), label: name(before), onClick: () => {
                                    setMonth(before);
                                    setFocus(addMonths(focus, -step));
                                } }), view === 'days' ? (_jsx("button", { className: "pc-calendar-title", type: "button", "aria-label": "Choose a month", onClick: () => {
                                    setView('months');
                                    moved.current = true;
                                }, children: names.monthYear.format(month) })) : (_jsx("span", { children: names.year.format(month) })), _jsx(Button, { variant: "ghost", icon: _jsx(CaretRight, {}), label: name(after), onClick: () => {
                                    setMonth(after);
                                    setFocus(addMonths(focus, step));
                                } })] }), view === 'days' ? (_jsxs("div", { className: "pc-calendar-grid", role: "grid", "aria-label": names.monthYear.format(month), onKeyDown: dayKeys, onMouseLeave: () => setPreview(null), children: [_jsx("div", { role: "row", style: ROW, children: weeks[0].map(date => (_jsx("span", { className: "pc-calendar-weekday", role: "columnheader", "aria-label": names.weekdayLong.format(date), children: names.weekday.format(date).slice(0, 2) }, date.getDay()))) }), weeks.map(week => (_jsx("div", { role: "row", style: ROW, children: week.map(date => {
                                    const selected = choice.range ? sameDay(date, choice.value.start) || sameDay(date, choice.value.end) : sameDay(date, choice.value);
                                    const band = !from || !to || sameDay(from, to) ? undefined
                                        : sameDay(date, from) ? 'start' : sameDay(date, to) ? 'end' : date > from && date < to ? 'mid' : undefined;
                                    return (_jsx("button", { className: cx('pc-calendar-day', !sameMonth(date, month) && 'pc-calendar-day-outside'), type: "button", role: "gridcell", tabIndex: sameDay(date, tabbable) ? 0 : -1, "aria-label": names.day.format(date), "aria-current": sameDay(date, today) ? 'date' : undefined, "aria-selected": selected || undefined, "aria-disabled": off(date) || undefined, "data-range": band, "data-range-preview": picking && sameDay(date, preview) && !sameDay(date, range?.start) ? '' : undefined, onClick: () => pick(date), onFocus: () => {
                                            if (sameMonth(date, month) && !sameDay(date, focus))
                                                setFocus(date);
                                            if (picking && !off(date))
                                                setPreview(date);
                                        }, onMouseEnter: () => {
                                            if (picking && !off(date))
                                                setPreview(date);
                                        }, children: date.getDate() }, date.getTime()));
                                }) }, week[0].getTime())))] })) : (_jsx("div", { className: "pc-calendar-months", role: "grid", "aria-label": names.year.format(month), onKeyDown: monthKeys, children: [0, 3, 6, 9].map(row => (_jsx("div", { role: "row", style: ROW, children: [row, row + 1, row + 2].map(index => {
                                const date = new Date(month.getFullYear(), index, 1);
                                const current = index === month.getMonth();
                                return (_jsx("button", { className: "pc-calendar-month", type: "button", role: "gridcell", tabIndex: current ? 0 : -1, "aria-label": names.monthYear.format(date), "aria-selected": current || undefined, onClick: () => chooseMonth(index), children: names.monthShort.format(date) }, index));
                            }) }, row))) }))] }), children] }));
}
