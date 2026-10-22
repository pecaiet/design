import { X } from '@phosphor-icons/react'
import { useEffect, useRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { cx } from './cx'
import { enter as fadeIn, leave } from './motion'

export type ChipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** A chosen value: "1 day before", with a <span className="pc-muted"> for what's quieter ("9:00"). */
  children: ReactNode
  /** 16px, first. */
  icon?: ReactNode
  /** Something the person just added: it fades in when it appears. Leave it off for what was already on the page. */
  enter?: boolean
} & (
  | { onRemove?: never; removeLabel?: never }
  /** Shows the x. Called once the chip has faded out; then drop it from state. removeLabel is the x's name and tooltip, saying
   *  which: "Remove reminder 1 day before". */
  | { onRemove: () => void; removeLabel: string }
)

export function Chip({ icon, enter, onRemove, removeLabel, children, className, ...span }: ChipProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (enter) fadeIn(ref.current)
  }, [])

  const remove = async (event: MouseEvent) => {
    // Handled here, so pecaiet.js doesn't remove an element React still owns.
    event.preventDefault()
    await leave(ref.current)
    onRemove?.()
  }
  return (
    <span {...span} ref={ref} className={cx('pc-chip', className)}>
      {icon}
      {children}
      {onRemove && (
        <button className="pc-chip-remove" type="button" aria-label={removeLabel} data-pc-tooltip={removeLabel} onClick={remove}>
          <X />
        </button>
      )}
    </span>
  )
}
