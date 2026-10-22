import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'

export type DateRange = { start: Date | null; end: Date | null }

export type QuickPick = {
  /** "Today", "Tomorrow", "Next week". */
  label: string
  date: Date
  /** The day at its end; worked out when left out: the weekday for today and tomorrow ("Tue"), with the date further on ("Mon 26"). */
  note?: string
}

type Choice =
  /** One date: picking a day (or a quick pick) calls onChange with it. */
  | { range?: false; value: Date | null; onChange: (value: Date) => void; quickPicks?: QuickPick[] }
  /** A range: the first day picked starts it, the second ends it, with the days up to the one under the pointer shown on the way.
   *  Clear and Done belong to the popover around it. */
  | { range: true; value: DateRange; onChange: (value: DateRange) => void; quickPicks?: never }

export type DatepickerProps = Choice & {
  /** Days before it can't be picked (before today: pass today). */
  min?: Date
  /** Days after it can't be picked. */
  max?: Date
  /** Other days that can't be picked (fully booked): faded, and the arrow keys skip them. */
  disabledDays?: (day: Date) => boolean
  /** Moves focus to the chosen day (or today) when it turns true: when the popover around it opens. */
  autoFocus?: boolean
  /** For the names of months and days; the browser's language by default. */
  locale?: string
  /** Under the month: reminders as Chips, an Add reminder button. */
  children?: ReactNode
  /** On the .pc-calendar. */
  className?: string
}

// The grid's rows leave their cells in the grid itself, so pecaiet.css's seven columns and the week's edges (7n) still apply.
const ROW: CSSProperties = { display: 'contents' }
// No class in pecaiet.css yet for the quick picks' column and the line under them (edge to edge in the popover).
const PICKS: CSSProperties = { display: 'grid', gap: 'var(--pc-space-0-5)' }
const EDGE: CSSProperties = { margin: '0 calc(-1 * var(--pc-space-4))' }
const DAY_STEPS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }
const MONTH_STEPS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 }

const midnight = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const addDays = (date: Date, count: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + count)
const addMonths = (date: Date, count: number) => {
  const length = new Date(date.getFullYear(), date.getMonth() + count + 1, 0).getDate()
  return new Date(date.getFullYear(), date.getMonth() + count, Math.min(date.getDate(), length))
}
const monday = (date: Date) => addDays(date, -((date.getDay() + 6) % 7))
const firstOf = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)
const sameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
const sameDay = (a: Date | null | undefined, b: Date | null | undefined) => Boolean(a && b && sameMonth(a, b) && a.getDate() === b.getDate())

/** A month to pick a date (or a range) from, weeks starting on Monday: today's number in bold teal, the chosen day filled. The
 *  arrow keys move by day and week, Page Up and Down by month (with Shift, by year), Home and End to the week's ends, Enter picks.
 *  The month's name opens the twelve months. Put it in a Popover, or use the DateInput. */
export function Datepicker({ min, max, disabledDays, autoFocus, locale, children, className, ...choice }: DatepickerProps) {
  const today = midnight(new Date())
  const anchor = (choice.range ? choice.value.start : choice.value) ?? today
  const [month, setMonth] = useState(() => firstOf(anchor))
  const [focus, setFocus] = useState(() => midnight(anchor))
  const [view, setView] = useState<'days' | 'months'>('days')
  const [preview, setPreview] = useState<Date | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const moved = useRef(false)

  const names = useMemo(() => ({
    weekday: new Intl.DateTimeFormat(locale, { weekday: 'short' }),
    weekdayLong: new Intl.DateTimeFormat(locale, { weekday: 'long' }),
    weekdayDay: new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric' }),
    day: new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    month: new Intl.DateTimeFormat(locale, { month: 'long' }),
    monthShort: new Intl.DateTimeFormat(locale, { month: 'short' }),
    monthYear: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
    year: new Intl.DateTimeFormat(locale, { year: 'numeric' }),
  }), [locale])

  const off = (date: Date) =>
    (min !== undefined && date < midnight(min)) || (max !== undefined && date > midnight(max)) || Boolean(disabledDays?.(date))

  // After a key (or a view change) moved it, the day or month that takes focus gets it.
  useEffect(() => {
    if (!moved.current) return
    moved.current = false
    root.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus()
  })
  useEffect(() => {
    if (autoFocus) root.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus()
  }, [autoFocus])

  const range = choice.range ? choice.value : null
  const picking = Boolean(range?.start && !range.end)
  const other = range?.end ?? (picking ? preview : null)
  const [from, to] = range?.start && other ? (other < range.start ? [other, range.start] : [range.start, other]) : [null, null]

  const go = (date: Date) => {
    setFocus(date)
    if (!sameMonth(date, month)) setMonth(firstOf(date))
  }
  const pick = (date: Date) => {
    if (off(date)) return
    go(date)
    setPreview(null)
    if (!choice.range) {
      choice.onChange(date)
      return
    }
    const { start, end } = choice.value
    if (!start || end) choice.onChange({ start: date, end: null })
    else choice.onChange(date < start ? { start: date, end: start } : { start, end: date })
  }

  const dayKeys = (event: KeyboardEvent) => {
    const step = DAY_STEPS[event.key]
    let next: Date
    if (step) {
      // Days that can't be picked are skipped.
      next = addDays(focus, step)
      for (let tries = 0; off(next) && tries < 60; tries++) next = addDays(next, step)
    } else if (event.key === 'Home') next = monday(focus)
    else if (event.key === 'End') next = addDays(monday(focus), 6)
    else if (event.key === 'PageUp' || event.key === 'PageDown') next = addMonths(focus, (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1))
    else return
    event.preventDefault()
    if (step && off(next)) return
    moved.current = true
    go(next)
    if (picking && !off(next)) setPreview(next)
  }

  const monthKeys = (event: KeyboardEvent) => {
    const step = MONTH_STEPS[event.key]
    const next = step ? month.getMonth() + step : event.key === 'Home' ? 0 : event.key === 'End' ? 11 : undefined
    if (next === undefined) return
    event.preventDefault()
    if (next < 0 || next > 11) return
    moved.current = true
    setMonth(new Date(month.getFullYear(), next, 1))
  }
  const chooseMonth = (index: number) => {
    const length = new Date(month.getFullYear(), index + 1, 0).getDate()
    setFocus(new Date(month.getFullYear(), index, Math.min(focus.getDate(), length)))
    setMonth(new Date(month.getFullYear(), index, 1))
    setView('days')
    moved.current = true
  }

  const step = view === 'days' ? 1 : 12
  const before = addMonths(month, -step)
  const after = addMonths(month, step)
  const name = (date: Date) => (view === 'days' ? names.month : names.year).format(date)

  const weeks: Date[][] = []
  const last = addDays(monday(new Date(month.getFullYear(), month.getMonth() + 1, 0)), 6)
  for (let start = monday(month); start <= last; start = addDays(start, 7)) weeks.push(Array.from({ length: 7 }, (_, i) => addDays(start, i)))
  const tabbable = sameMonth(focus, month) ? focus : month

  return (
    <>
      {choice.quickPicks && (
        <>
          <div style={PICKS}>
            {choice.quickPicks.map(quick => (
              <button key={quick.label} className="pc-menu-item" type="button" onClick={() => pick(midnight(quick.date))}>
                {quick.label}
                <span className="pc-menu-note">
                  {quick.note ?? (Math.round((midnight(quick.date).getTime() - today.getTime()) / 864e5) < 2 ? names.weekday : names.weekdayDay).format(quick.date)}
                </span>
              </button>
            ))}
          </div>
          <div className="pc-menu-separator" style={EDGE} />
        </>
      )}
      <div ref={root} className={cx('pc-calendar', className)}>
        <div className="pc-calendar-head">
          <Button variant="ghost" icon={<CaretLeft />} label={name(before)} onClick={() => {
            setMonth(before)
            setFocus(addMonths(focus, -step))
          }} />
          {view === 'days' ? (
            <button className="pc-calendar-title" type="button" aria-label="Choose a month" onClick={() => {
              setView('months')
              moved.current = true
            }}>
              {names.monthYear.format(month)}
            </button>
          ) : (
            <span>{names.year.format(month)}</span>
          )}
          <Button variant="ghost" icon={<CaretRight />} label={name(after)} onClick={() => {
            setMonth(after)
            setFocus(addMonths(focus, step))
          }} />
        </div>
        {view === 'days' ? (
          <div className="pc-calendar-grid" role="grid" aria-label={names.monthYear.format(month)} onKeyDown={dayKeys} onMouseLeave={() => setPreview(null)}>
            <div role="row" style={ROW}>
              {weeks[0].map(date => (
                <span key={date.getDay()} className="pc-calendar-weekday" role="columnheader" aria-label={names.weekdayLong.format(date)}>
                  {names.weekday.format(date).slice(0, 2)}
                </span>
              ))}
            </div>
            {weeks.map(week => (
              <div key={week[0].getTime()} role="row" style={ROW}>
                {week.map(date => {
                  const selected = choice.range ? sameDay(date, choice.value.start) || sameDay(date, choice.value.end) : sameDay(date, choice.value)
                  const band = !from || !to || sameDay(from, to) ? undefined
                    : sameDay(date, from) ? 'start' : sameDay(date, to) ? 'end' : date > from && date < to ? 'mid' : undefined
                  return (
                    <button
                      key={date.getTime()}
                      className={cx('pc-calendar-day', !sameMonth(date, month) && 'pc-calendar-day-outside')}
                      type="button"
                      role="gridcell"
                      tabIndex={sameDay(date, tabbable) ? 0 : -1}
                      aria-label={names.day.format(date)}
                      aria-current={sameDay(date, today) ? 'date' : undefined}
                      aria-selected={selected || undefined}
                      aria-disabled={off(date) || undefined}
                      data-range={band}
                      data-range-preview={picking && sameDay(date, preview) && !sameDay(date, range?.start) ? '' : undefined}
                      onClick={() => pick(date)}
                      onFocus={() => {
                        if (sameMonth(date, month) && !sameDay(date, focus)) setFocus(date)
                        if (picking && !off(date)) setPreview(date)
                      }}
                      onMouseEnter={() => {
                        if (picking && !off(date)) setPreview(date)
                      }}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="pc-calendar-months" role="grid" aria-label={names.year.format(month)} onKeyDown={monthKeys}>
            {[0, 3, 6, 9].map(row => (
              <div key={row} role="row" style={ROW}>
                {[row, row + 1, row + 2].map(index => {
                  const date = new Date(month.getFullYear(), index, 1)
                  const current = index === month.getMonth()
                  return (
                    <button
                      key={index}
                      className="pc-calendar-month"
                      type="button"
                      role="gridcell"
                      tabIndex={current ? 0 : -1}
                      aria-label={names.monthYear.format(date)}
                      aria-selected={current || undefined}
                      onClick={() => chooseMonth(index)}
                    >
                      {names.monthShort.format(date)}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>
      {children}
    </>
  )
}
