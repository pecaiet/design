import { Plus } from '@phosphor-icons/react'
import { useId, useState, type CSSProperties, type HTMLAttributes } from 'react'
import { cx } from './cx'
import type { Labelled } from './Field'

const COLOURS = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink'] as const

type Colour = (typeof COLOURS)[number] | `#${string}`

export type ColorPickerProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> & Labelled & {
  /** The radios' name; one is made up without it. */
  name?: string
  /** A colour from the set ("teal"), the same in light and dark, or any other as a hex ("#c2410c"). */
  value?: Colour
  defaultValue?: Colour
  onChange?: (value: Colour) => void
}

/** A colour from the set, or any colour: the rainbow ring at the end opens the device's own chooser, and the colour picked
 *  there fills its middle. It stays in the ring to go back to when one from the set is chosen. */
export function ColorPicker({ label, name, value, defaultValue, onChange, id, className, ...div }: ColorPickerProps) {
  const auto = useId()
  const labelId = `${id ?? auto}-label`
  const [picked, setPicked] = useState(defaultValue)
  const chosen = value ?? picked
  const [custom, setCustom] = useState(() => (chosen?.startsWith('#') ? chosen : undefined))
  const ring = chosen?.startsWith('#') ? chosen : custom
  const choose = (colour: Colour) => {
    setPicked(colour)
    onChange?.(colour)
  }
  const swatches = (
    <div {...div} className={cx('pc-swatches', !label && className)} id={id} role="radiogroup" aria-labelledby={label ? labelId : undefined}>
      {COLOURS.map(colour => {
        const words = colour[0].toUpperCase() + colour.slice(1)
        return (
          <label key={colour} className={cx('pc-swatch', `pc-colour-${colour}`)} data-pc-tooltip={words}>
            <input type="radio" name={name ?? auto} value={colour} aria-label={words} checked={chosen === colour} onChange={() => choose(colour)} />
          </label>
        )
      })}
      <label
        className="pc-swatch pc-swatch-custom"
        data-pc-tooltip="Custom colour"
        style={ring ? ({ '--pc-colour': ring } as CSSProperties) : undefined}
      >
        <input
          type="color"
          aria-label="Custom colour"
          value={ring ?? '#000000'}
          onChange={event => {
            const hex = event.target.value as `#${string}`
            setCustom(hex)
            choose(hex)
          }}
        />
        {ring && (
          <input type="radio" name={name ?? auto} value={ring} aria-label={`Custom colour ${ring.toUpperCase()}`} checked={chosen === ring} onChange={() => choose(ring)} />
        )}
        <span className="pc-swatch-ring" />
        <Plus />
      </label>
    </div>
  )
  if (!label) return swatches
  return (
    <div className={cx('pc-field', className)}>
      <span className="pc-label" id={labelId}>{label}</span>
      {swatches}
    </div>
  )
}
