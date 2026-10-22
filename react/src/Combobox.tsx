import { CaretDown, X } from '@phosphor-icons/react'
import { useRef, useState } from 'react'
import { cx } from './cx'
import { FieldMessage, useField, type Labelled } from './Field'
import { enter, leave } from './motion'
import { useOutside } from './popup'
import { PickerMenu, Select, type PickerProps } from './Select'

type Value = string | number

type One<V extends Value> = Labelled & Omit<PickerProps<V>, 'search'> & {
  multiple?: false
  /** The search first in its list, with these words in it: "Search lists". Typing only filters. */
  search: string
}

type Several<V extends Value> = Labelled & Omit<PickerProps<V>, 'value' | 'onChange' | 'placeholder' | 'none' | 'search' | 'name'> & {
  /** Several values (labels on a task, people, filters, scopes): chips in the field, each with its x; a checkbox on each row. A click
   *  or Enter picks or unpicks and the list stays open; Backspace in the empty search takes off the last chip. */
  multiple: true
  value: V[]
  onChange: (value: V[]) => void
  /** What to do, muted, while none are picked: "Add a label". */
  placeholder: string
  search: string
  /** Sends each value with a form, in hidden inputs (name it labels[] for Rails); with none, one empty value, so the server can tell
   *  it was emptied. */
  name?: string
}

export type ComboboxProps<V extends Value = string> = One<V> | Several<V>

/** Picking from a long list by typing: the Select with a search at the top of its list. Only values from the list. */
export function Combobox<V extends Value = string>(props: ComboboxProps<V>) {
  if (!props.multiple) return <Select {...props} />
  return <Chips {...props} />
}

function Chips<V extends Value>({
  label, 'aria-label': ariaLabel, options, value, onChange, placeholder, search, empty, title, name, hint, error, optional, disabled, id, className,
}: Several<V>) {
  const field = useField(id, error || hint, error)
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const chips = useRef(new Map<V, HTMLElement>())
  const added = useRef(new Set<V>())
  const picked = value.map(one => options.find(option => option.value === one)).filter(option => option !== undefined)
  const labelId = `${field.fieldId}-label`

  useOutside(open, menu, box, () => setOpen(false))

  // A chip just picked fades in where it lands; one taken off fades out where it is, then goes.
  const add = (one: V) => {
    added.current.add(one)
    onChange([...value, one])
  }
  const remove = async (one: V) => {
    await leave(chips.current.get(one) ?? null)
    onChange(value.filter(other => other !== one))
  }

  return (
    <div className={cx('pc-field', className)}>
      {label && (
        <span className="pc-label" id={labelId}>
          {label}
          {optional && <> <span className="pc-label-optional">(optional)</span></>}
        </span>
      )}
      <div
        className="pc-picker"
        onKeyDown={event => {
          if (event.key !== 'Escape' || !open) return
          // Prevented, so a dialog around it stays open.
          event.preventDefault()
          event.stopPropagation()
          setOpen(false)
          box.current?.focus()
        }}
      >
        <div
          ref={box}
          id={field.fieldId}
          className="pc-picker-field"
          role="combobox"
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${field.fieldId}-menu`}
          aria-labelledby={label ? labelId : undefined}
          aria-label={ariaLabel}
          aria-describedby={field.describedBy}
          aria-invalid={field.invalid}
          aria-disabled={disabled || undefined}
          onClick={() => {
            if (!disabled) setOpen(!open)
          }}
          onKeyDown={event => {
            if (event.target !== event.currentTarget || disabled) return
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
            } else if (event.key === 'Backspace' && picked.length) remove(picked[picked.length - 1].value)
          }}
        >
          {picked.map(option => (
            <span
              key={option.value}
              ref={element => {
                if (!element) return
                chips.current.set(option.value, element)
                if (added.current.delete(option.value)) enter(element)
                return () => {
                  chips.current.delete(option.value)
                }
              }}
              className="pc-chip"
            >
              {option.label}
              <button
                className="pc-chip-remove"
                type="button"
                aria-label={`Remove ${option.label}`}
                data-pc-tooltip={`Remove ${option.label}`}
                tabIndex={disabled ? -1 : undefined}
                onClick={event => {
                  // Not a click on the field: it doesn't open the list.
                  event.stopPropagation()
                  if (disabled) return
                  remove(option.value)
                  box.current?.focus()
                }}
              >
                <X />
              </button>
            </span>
          ))}
          <span className="pc-picker-placeholder">{placeholder}</span>
          <CaretDown />
        </div>
        <PickerMenu
          menu={menu}
          id={`${field.fieldId}-menu`}
          open={open}
          labelledBy={label ? labelId : undefined}
          label={ariaLabel}
          title={title ?? label ?? ariaLabel}
          options={options}
          picked={one => value.includes(one)}
          onPick={option => (value.includes(option.value) ? remove(option.value) : add(option.value))}
          search={search}
          empty={empty}
          multiple
          onBackspace={() => {
            if (picked.length) remove(picked[picked.length - 1].value)
          }}
        />
        {name && (value.length
          ? value.map(one => <input key={one} type="hidden" name={name} value={one} />)
          : <input type="hidden" name={name} value="" />)}
      </div>
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}
