import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'
import { FieldMessage, useField } from './Field'

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  /** What turning it on means: "Admin", "Confidential client". */
  label: ReactNode
  hint?: ReactNode
  error?: ReactNode
  /** Half: a "pick all" box over a group when only some are ticked. */
  indeterminate?: boolean
}

export function Checkbox({ label, hint, error, indeterminate, id, className, ref, ...input }: CheckboxProps) {
  const field = useField(id, error || hint, error, input['aria-describedby'])
  return (
    <div className={cx('pc-field', className)}>
      <label className="pc-check" htmlFor={field.fieldId}>
        <input
          {...input}
          ref={element => {
            // Half can only be set from script.
            if (element) element.indeterminate = Boolean(indeterminate)
            if (typeof ref === 'function') ref(element)
            else if (ref) ref.current = element
          }}
          className="pc-checkbox"
          type="checkbox"
          id={field.fieldId}
          aria-describedby={field.describedBy}
          aria-invalid={field.invalid ?? input['aria-invalid']}
        />
        <span>{label}</span>
      </label>
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}
