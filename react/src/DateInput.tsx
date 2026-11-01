import { CalendarDotsIcon, XIcon } from '@phosphor-icons/react'
import { useRef, useState, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { Datepicker, type DateRange, type QuickPick } from './Datepicker'
import { FieldMessage, useField, type Labelled } from './Field'
import { useOutside } from './popup'

type Choice =
  | {
      range?: false
      /** The date; null when there's none. */
      value: Date | null
      onChange: (value: Date | null) => void
      /** Picking a day keeps it open (for setting reminders too): Clear date and Done close it. Without it a pick closes it. */
      done?: boolean
      /** Above the month (todo's due date): Today, Tomorrow, Next week. */
      quickPicks?: QuickPick[]
    }
  /** A range: the first day picked starts it, the second ends it. It stays open: Clear empties it, Done closes it. */
  | { range: true; value: DateRange; onChange: (value: DateRange) => void; done?: never; quickPicks?: never }

export type DateInputProps = Labelled & Choice & {
  /** Muted, while there's no date: "No date", or "No dates" for a range. */
  placeholder?: string
  /** Under the month: reminders as Chips. */
  children?: ReactNode
  min?: Date
  max?: Date
  /** Days that can't be picked (fully booked). */
  disabledDays?: (day: Date) => boolean
  /** How the field shows a date: short, “Fri, 23 Oct”, the year only when it isn't this one. A range shows both, with a dash. */
  format?: (date: Date) => string
  /** For the names of months and days; the browser's language by default. */
  locale?: string
  /** Sends the date with a form as yyyy-mm-dd, in a hidden input; a range as name[start] and name[end]. */
  name?: string
  hint?: ReactNode
  /** Says what to do; turns the border red. Takes Inertia's form.errors.field as is. */
  error?: ReactNode
  optional?: boolean
  disabled?: boolean
  id?: string
  className?: string
}

const iso = (date: Date | null) =>
  date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : ''

/** A date in a form: a button that looks like a field and opens the Datepicker under it (a sheet on phones). No typing. Picking a
 *  day fills it, closes it and puts focus back on the button; Esc closes it without a change; the x clears it. */
export function DateInput({
  label, 'aria-label': ariaLabel, placeholder, children, min, max, disabledDays, format, locale, name, hint, error, optional, disabled, id,
  className, ...choice
}: DateInputProps) {
  const field = useField(id, error || hint, error)
  const [open, setOpen] = useState(false)
  // Each opening starts the calendar afresh, on the chosen month.
  const [opened, setOpened] = useState(0)
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const labelId = `${field.fieldId}-label`

  const close = () => {
    setOpen(false)
    button.current?.focus()
  }
  useOutside(open, panel, button, () => setOpen(false))

  const short = (date: Date) => format ? format(date) : `${new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)}, ${new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
  }).format(date)}`
  // A range on its way shows its start and a dash.
  const shown = choice.range
    ? choice.value.start && `${short(choice.value.start)} – ${choice.value.end ? short(choice.value.end) : '…'}`
    : choice.value && short(choice.value)
  const clear = () => (choice.range ? choice.onChange({ start: null, end: null }) : choice.onChange(null))
  const calendar = { min, max, disabledDays, locale, autoFocus: open, children }

  return (
    <div className={cx('pc-field', className)}>
      {label && (
        <span className="pc-label" id={labelId}>
          {label}
          {optional && <> <span className="pc-label-optional">(optional)</span></>}
        </span>
      )}
      <div
        className="pc-picker pc-date"
        onKeyDown={event => {
          if (event.key !== 'Escape' || !open) return
          // Prevented, so a dialog around it stays open.
          event.preventDefault()
          event.stopPropagation()
          close()
        }}
      >
        <button
          ref={button}
          id={field.fieldId}
          className="pc-picker-button"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={`${field.fieldId}-popover`}
          aria-labelledby={label ? `${labelId} ${field.fieldId}` : undefined}
          aria-label={ariaLabel && (shown ? `${ariaLabel}: ${shown}` : ariaLabel)}
          aria-describedby={field.describedBy}
          aria-invalid={field.invalid}
          disabled={disabled}
          onClick={() => {
            if (!open) setOpened(opened + 1)
            setOpen(!open)
          }}
        >
          <CalendarDotsIcon />
          {shown ? <span>{shown}</span> : <span className="pc-picker-placeholder">{placeholder ?? (choice.range ? 'No dates' : 'No date')}</span>}
        </button>
        {shown && !disabled && (
          <Button variant="ghost" icon={<XIcon />} label={choice.range ? 'Clear dates' : 'Clear date'} className="pc-date-clear" onClick={() => {
            clear()
            button.current?.focus()
          }} />
        )}
        <div className="pc-popover-backdrop" />
        <div
          ref={panel}
          id={`${field.fieldId}-popover`}
          className="pc-popover"
          role="dialog"
          aria-labelledby={label ? labelId : undefined}
          aria-label={ariaLabel}
          hidden={!open}
        >
          {choice.range ? (
            <Datepicker key={opened} {...calendar} range value={choice.value} onChange={choice.onChange} />
          ) : (
            <Datepicker
              key={opened}
              {...calendar}
              value={choice.value}
              onChange={date => {
                choice.onChange(date)
                if (!choice.done) close()
              }}
              quickPicks={choice.quickPicks}
            />
          )}
          {(choice.range || choice.done) && (
            <div className="pc-dialog-actions">
              <Button variant="outline" onClick={() => {
                clear()
                // A range stays open to be picked again; one date is done.
                if (!choice.range) close()
              }}>{choice.range ? 'Clear' : 'Clear date'}</Button>
              <Button variant="primary" onClick={close}>Done</Button>
            </div>
          )}
        </div>
        {name && (choice.range ? (
          <>
            <input type="hidden" name={`${name}[start]`} value={iso(choice.value.start)} />
            <input type="hidden" name={`${name}[end]`} value={iso(choice.value.end)} />
          </>
        ) : <input type="hidden" name={name} value={iso(choice.value)} />)}
      </div>
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}
