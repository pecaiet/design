import { useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'
import { FieldMessage, useField, type Labelled } from './Field'
import { Label } from './Label'

export type TextareaProps = Omit<ComponentPropsWithRef<'textarea'>, 'children'> & Labelled & {
  hint?: ReactNode
  error?: ReactNode
  optional?: boolean
  /** Shows "13 / 200" under it, red and invalid when it's over. Typing past it is allowed, so nothing is cut off. */
  limit?: number
}

export function Textarea({ label, hint, error, optional, limit, id, className, onChange, ...textarea }: TextareaProps) {
  const [typed, setTyped] = useState(() => String(textarea.defaultValue ?? '').length)
  const length = textarea.value === undefined ? typed : String(textarea.value).length
  const over = limit !== undefined && length > limit
  const field = useField(id, error || hint, error || over, textarea['aria-describedby'])
  const countId = `${field.fieldId}-count`
  return (
    <div className={cx('pc-field', className)}>
      {label && <Label htmlFor={field.fieldId} optional={optional}>{label}</Label>}
      <textarea
        {...textarea}
        className="pc-textarea"
        id={field.fieldId}
        aria-describedby={cx(field.describedBy, limit !== undefined && countId) || undefined}
        aria-invalid={field.invalid ?? textarea['aria-invalid']}
        onChange={event => {
          setTyped(event.target.value.length)
          onChange?.(event)
        }}
      />
      {limit !== undefined && (
        <span className="pc-field-count" id={countId} data-state={over ? 'over' : undefined}>{length} / {limit}</span>
      )}
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}
