import { Star } from '@phosphor-icons/react'
import { useId, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from './cx'
import type { Labelled } from './Field'

const STARS = [1, 2, 3, 4, 5]

export type RatingProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** The average out of 5: 4.2 fills the fifth star a fifth of the way. */
  value: number
} & (
  /** How many rated, or what the number means: "128 ratings", "Not rated yet". */
  | { compact?: false; count?: ReactNode }
  /** In a row: one star and the number. */
  | { compact: true; count?: never }
)

/** How something was rated: teal stars, empty ones outlined, and the number. */
export function Rating({ value, count, compact, className, ...span }: RatingProps) {
  const number = value.toFixed(1)
  return (
    <span {...span} className={cx('pc-rating', compact && 'pc-rating-compact', className)}>
      <span className="pc-rating-stars" role="img" aria-label={`${number} out of 5`}>
        {(compact ? [1] : STARS).map(star => {
          const fill = compact ? 100 : Math.round(Math.min(Math.max(value - star + 1, 0), 1) * 100)
          return (
            <span key={star} className="pc-rating-star" style={fill < 100 ? ({ '--fill': `${fill}%` } as CSSProperties) : undefined}>
              <Star />
              <Star weight="fill" />
            </span>
          )
        })}
      </span>
      <span className="pc-rating-value">{number}</span>
      {count && <span className="pc-rating-count">{count}</span>}
    </span>
  )
}

export type RatingInputProps = Omit<HTMLAttributes<HTMLSpanElement>, 'onChange' | 'defaultValue' | 'children'> & Labelled & {
  /** The radios' name; one is made up without it. */
  name?: string
  /** 1 to 5 stars; nothing chosen when it's left out. */
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  /** What the chosen number means, beside the stars: "Good", "Not rated yet". */
  description?: ReactNode
  disabled?: boolean
}

/** Setting a rating: five stars, each a radio. The chosen star and those before it fill; under the pointer they fill lighter
 *  until clicked; the arrow keys move it, as in any radio group. */
export function RatingInput({ label, name, value, defaultValue, onChange, description, disabled, id, className, ...span }: RatingInputProps) {
  const auto = useId()
  const labelId = `${id ?? auto}-label`
  const rating = (
    <span className={cx('pc-rating', !label && className)}>
      <span {...span} className="pc-rating-input" id={id} role="radiogroup" aria-labelledby={label ? labelId : undefined}>
        {STARS.map(star => (
          <label key={star} className="pc-rating-star">
            <input
              type="radio"
              name={name ?? auto}
              value={star}
              aria-label={star === 1 ? '1 star' : `${star} stars`}
              checked={value === undefined ? undefined : value === star}
              defaultChecked={value === undefined ? defaultValue === star : undefined}
              disabled={disabled}
              onChange={() => onChange?.(star)}
            />
            <Star />
            <Star weight="fill" />
          </label>
        ))}
      </span>
      {description && <span className="pc-rating-count">{description}</span>}
    </span>
  )
  if (!label) return rating
  return (
    <div className={cx('pc-field', className)}>
      <span className="pc-label" id={labelId}>{label}</span>
      {rating}
    </div>
  )
}
