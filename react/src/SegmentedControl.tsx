import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from './cx'

type Option<T> = { value: T; label: ReactNode; icon?: ReactNode; disabled?: boolean }

export type SegmentedControlProps<T extends string> = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> & {
  /** What's being chosen: "Theme", "View". */
  'aria-label': string
  /** The radios' name; one is made up without it. */
  name?: string
  /** The chosen one; one is always chosen (the first, to start with, when neither is given). */
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  /** Turns every option off: the words go grey; the chosen one keeps its pill. */
  disabled?: boolean
} & (
  /** Two to five, in short words, each with an optional 16px icon before them. Six or more, or long words, are a Select.
   *  full stretches it to its container: in a card, on a phone. */
  | { iconsOnly?: false; full?: boolean; options: Option<T>[] }
  /** Icons only: label is the radio's name and the tooltip. They keep their square, so it doesn't stretch. */
  | { iconsOnly: true; full?: never; options: (Omit<Option<T>, 'label' | 'icon'> & { label: string; icon: ReactNode })[] }
)

/** Choosing exactly one of two to five options that are always in view: Dark, Light or System; List, Board or Calendar. The
 *  chosen one lifts as a raised pill that slides to the next. Separate tools that each do their own thing are a Toolbar. */
export function SegmentedControl<T extends string>({ name, value, defaultValue, onChange, full, disabled, iconsOnly, options, className, ...div }: SegmentedControlProps<T>) {
  const auto = useId()
  const list: Option<T>[] = options
  const [picked, setPicked] = useState(() => defaultValue ?? list[0]?.value)
  const chosen = value ?? picked
  return (
    <div {...div} className={cx('pc-segmented', full && 'pc-segmented-full', className)} role="radiogroup">
      {list.map(option => (
        <label
          key={option.value}
          className={cx('pc-btn', 'pc-btn-ghost', iconsOnly && 'pc-btn-icon')}
          data-pc-tooltip={iconsOnly ? (option.label as string) : undefined}
        >
          <input
            type="radio"
            name={name ?? auto}
            value={option.value}
            checked={option.value === chosen}
            disabled={disabled || option.disabled}
            aria-label={iconsOnly ? (option.label as string) : undefined}
            onChange={() => {
              setPicked(option.value)
              onChange?.(option.value)
            }}
          />
          {option.icon}
          {!iconsOnly && option.label}
        </label>
      ))}
    </div>
  )
}
