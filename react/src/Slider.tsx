import { useId, useState, type ComponentPropsWithRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from './cx'

export type SliderProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children' | 'value' | 'defaultValue' | 'min' | 'max' | 'step'> & {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  /** The value in words, beside the label: value => `${value}%`, "3 days before". It's read out too. */
  format?: (value: number) => ReactNode
  /** A mark under it at each step. */
  marks?: boolean
} & (
  /** Over it, with the value in words on the right. aria-label can say more ("Remind me, days before"). */
  | { label: ReactNode; 'aria-label'?: string }
  | { label?: never; 'aria-label': string }
)

/** "About this much" in a range, by dragging a handle; teal up to the value. For an exact number, a TextInput or a Stepper. */
export function Slider({ label, min = 0, max = 100, step, value, defaultValue, format, marks, onChange, id, style, className, ...input }: SliderProps) {
  const auto = useId()
  const labelId = `${id ?? auto}-label`
  const [moved, setMoved] = useState(() => defaultValue ?? min + (max - min) / 2)
  const current = value ?? moved
  const words = format?.(current)
  const slider = (
    <input
      {...input}
      className={cx('pc-slider', !label && !marks && className)}
      type="range"
      id={id}
      min={min}
      max={max}
      step={step}
      value={value}
      defaultValue={value === undefined ? defaultValue : undefined}
      style={{ '--value': `${((current - min) / (max - min)) * 100}%`, ...style } as CSSProperties}
      aria-labelledby={label && !input['aria-label'] ? labelId : undefined}
      aria-valuetext={typeof words === 'string' ? words : undefined}
      onChange={event => {
        setMoved(Number(event.target.value))
        onChange?.(event)
      }}
    />
  )
  if (!label && !marks) return slider
  return (
    <div className={cx('pc-field', className)}>
      {label && (
        <div className="pc-progress-head">
          <span className="pc-label" id={labelId}>{label}</span>
          {words !== undefined && <span className="pc-progress-value">{words}</span>}
        </div>
      )}
      {slider}
      {marks && (
        <div className="pc-slider-marks" aria-hidden="true">
          {Array.from({ length: Math.round((max - min) / (step ?? 1)) + 1 }, (_, i) => <span key={i} />)}
        </div>
      )}
    </div>
  )
}

export type SliderRangeProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> & {
  /** Over it, with the range in words on the right. */
  label: ReactNode
  min?: number
  max?: number
  step?: number
  /** From and to; the handles can't cross. */
  value?: [number, number]
  defaultValue?: [number, number]
  onChange?: (value: [number, number]) => void
  /** The range in words: ([from, to]) => `${from} to ${to} days`. */
  format?: (value: [number, number]) => ReactNode
  disabled?: boolean
}

/** A range with two handles, From and To, teal between them. */
export function SliderRange({ label, min = 0, max = 100, step, value, defaultValue, onChange, format, disabled, style, className, ...div }: SliderRangeProps) {
  const [moved, setMoved] = useState<[number, number]>(() => defaultValue ?? [min, max])
  const [from, to] = value ?? moved
  const percent = (n: number) => `${((n - min) / (max - min)) * 100}%`
  const change = (next: [number, number]) => {
    setMoved(next)
    onChange?.(next)
  }
  return (
    <div className={cx('pc-field', className)}>
      <div className="pc-progress-head">
        <span className="pc-label">{label}</span>
        {format && <span className="pc-progress-value">{format([from, to])}</span>}
      </div>
      <div {...div} className="pc-slider-range" style={{ '--from': percent(from), '--to': percent(to), ...style } as CSSProperties}>
        <input
          className="pc-slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={from}
          disabled={disabled}
          aria-label="From"
          onChange={event => change([Math.min(Number(event.target.value), to), to])}
        />
        <input
          className="pc-slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={to}
          disabled={disabled}
          aria-label="To"
          onChange={event => change([from, Math.max(Number(event.target.value), from)])}
        />
      </div>
    </div>
  )
}
