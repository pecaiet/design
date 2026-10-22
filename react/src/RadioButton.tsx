import { useContext, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'
import { FieldMessage, useField } from './Field'
import { FieldsetContext } from './Fieldset'

export type RadioButtonProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  /** The choice: "On the day". A long one wraps; the circle stays beside its first line. */
  label: ReactNode
  /** Under the words: the choice's description (Fieldset layout="boxes"), or why it's turned off. */
  hint?: ReactNode
}

/** One of two to five choices that are all in view, in a Fieldset, every radio of the group with the same name. One is chosen
 *  to start with, unless the choice has to be made on purpose. More choices go in a Select; a view chosen right away is a
 *  SegmentedControl. */
export function RadioButton({ label, hint, id, className, ...input }: RadioButtonProps) {
  const group = useContext(FieldsetContext)
  const field = useField(id, hint, undefined, input['aria-describedby'])
  return (
    <div className={cx('pc-field', className)}>
      <label className="pc-check" htmlFor={field.fieldId}>
        <input
          {...input}
          className="pc-radio"
          type="radio"
          id={field.fieldId}
          aria-describedby={field.describedBy}
          aria-invalid={group.invalid ?? input['aria-invalid']}
        />
        <span>{label}</span>
      </label>
      <FieldMessage id={field.messageId} hint={hint} />
    </div>
  )
}
