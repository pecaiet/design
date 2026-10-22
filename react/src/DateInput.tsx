import { CalendarDots, X } from '@phosphor-icons/react'
import { useRef, useState, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { Datepicker, type QuickPick } from './Datepicker'
import { FieldMessage, useField, type Labelled } from './Field'
import { useOutside } from './popup'

export type DateInputProps = Labelled & {
  /** The date; null when there's none. */
  value: Date | null
  onChange: (value: Date | null) => void
  /** Muted, while there's no date. */
  placeholder?: string
  /** Picking a day keeps it open (for setting reminders too): Clear date and Done close it. Without it a pick closes it. */
  done?: boolean
  /** Above the month (todo's due date): Today, Tomorrow, Next week. */
  quickPicks?: QuickPick[]
  /** Under the month: reminders as Chips. */
  children?: ReactNode
  min?: Date
  max?: Date
  /** Days that can't be picked (fully booked). */
  disabledDays?: (day: Date) => boolean
  /** How the field shows the date: short, “Fri, 23 Oct”, the year only when it isn't this one. */
  format?: (date: Date) => string
  /** For the names of months and days; the browser's language by default. */
  locale?: string
  /** Sends the date with a form as yyyy-mm-dd, in a hidden input. */
  name?: string
  hint?: ReactNode
  /** Says what to do; turns the border red. Takes Inertia's form.errors.field as is. */
  error?: ReactNode
  optional?: boolean
  disabled?: boolean
  id?: string
  className?: string
}

/** A date in a form: a button that looks like a field and opens the Datepicker under it (a sheet on phones). No typing. Picking a
 *  day fills it, closes it and puts focus back on the button; Esc closes it without a change; the x clears it. */
export function DateInput({
  label, 'aria-label': ariaLabel, value, onChange, placeholder = 'No date', done, quickPicks, children, min, max, disabledDays, format, locale, name,
  hint, error, optional, disabled, id, className,
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

  const shown = value && (format ? format(value) : `${new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(value)}, ${new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: value.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
  }).format(value)}`)

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
          <CalendarDots />
          {shown ? <span>{shown}</span> : <span className="pc-picker-placeholder">{placeholder}</span>}
        </button>
        {value && !disabled && (
          <Button variant="ghost" icon={<X />} label="Clear date" className="pc-date-clear" onClick={() => {
            onChange(null)
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
          <Datepicker
            key={opened}
            value={value}
            onChange={date => {
              onChange(date)
              if (!done) close()
            }}
            quickPicks={quickPicks}
            min={min}
            max={max}
            disabledDays={disabledDays}
            locale={locale}
            autoFocus={open}
          >
            {children}
          </Datepicker>
          {done && (
            <div className="pc-dialog-actions">
              <Button variant="outline" onClick={() => {
                onChange(null)
                close()
              }}>Clear date</Button>
              <Button variant="primary" onClick={close}>Done</Button>
            </div>
          )}
        </div>
        {name && (
          <input
            type="hidden"
            name={name}
            value={value ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}` : ''}
          />
        )}
      </div>
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}
