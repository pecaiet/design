import { Paperclip } from '@phosphor-icons/react'
import { Children, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'
import { FieldMessage, useField } from './Field'

export type FileUploadProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  /** Over the button, in a form: "Attachments". */
  label?: ReactNode
  /** What's allowed: "PDF or image, up to 10 MB each." */
  hint?: ReactNode
  /** A file that isn't allowed. Takes Inertia's form.errors.field as is. */
  error?: ReactNode
  optional?: boolean
  /** The button's words: "Attach files", or "Attach file" without multiple. */
  buttonLabel?: ReactNode
  /** The chosen files, under it: FileRows with onRemove. The button stays, to add more. */
  children?: ReactNode
}

/** An outline button that opens the device's file picker: add multiple for more than one file and accept for the kinds allowed.
 *  The chosen files come in onChange (event.target.files). No drop area for now. */
export function FileUpload({ label, hint, error, optional, buttonLabel, children, id, className, ...input }: FileUploadProps) {
  const field = useField(id, error || hint, error, input['aria-describedby'])
  return (
    <div className={cx('pc-field', className)}>
      {label && (
        // Not a <label>: the button is the input's label.
        <span className="pc-label">
          {label}
          {optional && <> <span className="pc-label-optional">(optional)</span></>}
        </span>
      )}
      <label className="pc-btn pc-btn-outline pc-file-upload" htmlFor={field.fieldId}>
        <Paperclip />
        {buttonLabel ?? (input.multiple ? 'Attach files' : 'Attach file')}
        <input {...input} type="file" id={field.fieldId} aria-describedby={field.describedBy} aria-invalid={field.invalid ?? input['aria-invalid']} />
      </label>
      <FieldMessage id={field.messageId} hint={hint} error={error} />
      {Children.toArray(children).length > 0 && <div className="pc-files">{children}</div>}
    </div>
  )
}
