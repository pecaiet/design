import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'
import { FieldMessage, useField } from './Field'

export type ToggleProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'role' | 'children'> & (
  /** Its words beside it, with an optional hint under them. */
  | { label: ReactNode; hint?: ReactNode; error?: ReactNode; 'aria-label'?: never }
  /** At the end of a settings row: the row is the app's <label>, with the words at its start. */
  | { label?: never; hint?: never; error?: never; 'aria-label': string }
)

/** A switch for a setting that takes effect straight away, with no Save button. Something saved with the form's Save is a
 *  Checkbox. */
export function Toggle({ label, hint, error, id, className, ...input }: ToggleProps) {
  const field = useField(id, error || hint, error, input['aria-describedby'])
  const toggle = (
    <input
      {...input}
      className={cx('pc-switch', !label && className)}
      type="checkbox"
      role="switch"
      id={field.fieldId}
      aria-describedby={field.describedBy}
      aria-invalid={field.invalid ?? input['aria-invalid']}
    />
  )
  if (!label) return toggle
  return (
    <div className={cx('pc-field', className)}>
      <label className="pc-check" htmlFor={field.fieldId}>
        {toggle}
        <span>{label}</span>
      </label>
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}
