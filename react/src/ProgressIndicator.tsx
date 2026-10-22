import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'

export type ProgressIndicatorProps = Omit<ComponentPropsWithRef<'ol'>, 'children'> & {
  /** Three to five, named with a noun or a short verb ("Account", "Add your profile"). current: the one they're on (teal, its
   *  name bold). done: behind them (teal). error: a step with a problem (red, a ! before its name). The rest stay grey. */
  steps: { label: ReactNode; state?: 'current' | 'done' | 'error' }[]
} & (
  /** vertical: down the page, for a checklist, the bar beside each name. */
  | { compact?: false; vertical?: boolean }
  /** On phones and in narrow places: the step's name and "Step 2 of 4" over the bars; the names are kept for screen readers. */
  | { compact: true; vertical?: never }
)

/** Where someone is in a few steps. It only shows where they are: moving between steps is the page's own buttons. */
export function ProgressIndicator({ steps, compact, vertical, className, ...ol }: ProgressIndicatorProps) {
  const list = (
    <ol aria-label="Steps" {...ol} className={cx('pc-steps', vertical && 'pc-steps-vertical', !compact && className)}>
      {steps.map(({ label, state }, i) => (
        <li
          key={i}
          className="pc-step"
          aria-current={state === 'current' ? 'step' : undefined}
          data-state={state === 'current' ? undefined : state}
        >
          <span className="pc-step-label">{label}</span>
        </li>
      ))}
    </ol>
  )
  if (!compact) return list
  const found = steps.findIndex(step => step.state !== 'done')
  const now = found === -1 ? steps.length - 1 : found
  return (
    <div className={cx('pc-steps-compact', className)}>
      <div className="pc-steps-head">
        <span className="pc-steps-now">{steps[now]?.label}</span>
        <span className="pc-steps-count">Step {now + 1} of {steps.length}</span>
      </div>
      {list}
    </div>
  )
}
