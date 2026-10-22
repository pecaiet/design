import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'
import { FieldMessage, useField, type Labelled } from './Field'
import { Label } from './Label'

export type TextInputProps = Omit<ComponentPropsWithRef<'input'>, 'children'> & Labelled & {
  /** Under the field, until there's an error. */
  hint?: ReactNode
  /** Says how to fix it; turns the border red. Takes Inertia's form.errors.field as is. */
  error?: ReactNode
  optional?: boolean
}

export function TextInput({ label, hint, error, optional, id, className, ...input }: TextInputProps) {
  const field = useField(id, error || hint, error, input['aria-describedby'])
  return (
    <div className={cx('pc-field', className)}>
      {label && <Label htmlFor={field.fieldId} optional={optional}>{label}</Label>}
      <input {...input} className="pc-input" id={field.fieldId} aria-describedby={field.describedBy} aria-invalid={field.invalid ?? input['aria-invalid']} />
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}
