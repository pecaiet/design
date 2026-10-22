import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'
import { FieldMessage, useField, type Labelled } from './Field'

export type ProgressBarProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & Labelled & {
  /** How much is done, 0–100, shown as "64%" beside the label. Leave it out when it can't tell how long: a third of the bar slides
   *  along it. Done is 100, and the label says so ("Uploaded"). */
  value?: number
  /** Stopped by an error: the fill turns red where it stopped and this says what to do. */
  error?: ReactNode
  /** 4px, inside a row (a file uploading), with an aria-label. */
  small?: boolean
}

/** How far a long task has got. label is what's happening, over the bar: "Uploading Contract draft.pdf". For steps someone goes
 *  through, a ProgressIndicator; for a short wait with nothing to measure, a Spinner. */
export function ProgressBar({ label, value, error, small, id, className, ...div }: ProgressBarProps) {
  const field = useField(id, error, error, div['aria-describedby'])
  const labelId = `${field.fieldId}-label`
  const known = value !== undefined
  const bar = (
    <div
      {...div}
      className={cx('pc-progress', error && 'pc-progress-error', small && 'pc-progress-small', !label && !error && className)}
      id={id}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={known ? 0 : undefined}
      aria-valuemax={known ? 100 : undefined}
      aria-labelledby={label ? labelId : undefined}
      aria-describedby={field.describedBy}
    >
      <span className="pc-progress-fill" style={known ? { width: `${value}%` } : undefined} />
    </div>
  )
  if (!label && !error) return bar
  return (
    <div className={cx('pc-field', className)}>
      {label && (
        <div className="pc-progress-head">
          <span id={labelId}>{label}</span>
          {known && <span className="pc-progress-value">{Math.round(value)}%</span>}
        </div>
      )}
      {bar}
      <FieldMessage id={field.messageId} error={error} />
    </div>
  )
}
