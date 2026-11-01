import { CircleNotchIcon } from '@phosphor-icons/react'
import { cx } from './cx'

export type SpinnerProps = {
  /** Read out instead of the turning circle: "Loading", "Working". */
  label?: string
  /** small 12px in tight spots, large 20px on its own; 16px beside text by default. */
  size?: 'small' | 'large'
  className?: string
}

export function Spinner({ label = 'Loading', size, className }: SpinnerProps) {
  return (
    <span className={cx('pc-spinner', size && `pc-spinner-${size}`, className)} role="status" aria-label={label}>
      <CircleNotchIcon aria-hidden="true" />
    </span>
  )
}
