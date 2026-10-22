import { CaretDown, Check, MagnifyingGlass } from '@phosphor-icons/react'
import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { cx } from './cx'
import { FieldMessage, useField, type Labelled } from './Field'
import { InputGroup } from './InputGroup'
import { moveFocus, typeAhead, useOutside } from './popup'

type Value = string | number

export type SelectOption<V extends Value = string> = {
  value: V
  /** Its words: what the button shows, and what search and typing look for. */
  label: string
  /** A colour dot before the words. */
  colour?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink'
  /** A 16px icon before the words. */
  icon?: ReactNode
  /** Its group's heading ("Food"); keep a group's options together. */
  group?: string
  /** Can't be picked: half strength, skipped by the arrow keys, and it says why at its end ("Needs a team plan"). */
  disabledReason?: ReactNode
}

/** What the Select and the Combobox share, besides their label. */
export type PickerProps<V extends Value> = {
  options: SelectOption<V>[]
  /** The chosen value; null while nothing is chosen. */
  value: V | null
  onChange: (value: V | null) => void
  /** Muted, while nothing is chosen: "Choose a space". */
  placeholder?: string
  /** A first, muted option that clears the choice: "No colour". */
  none?: string
  /** A search first in the list, with these words in it ("Search categories"): typing filters the options. */
  search?: string
  /** The line when nothing matches the search; “Nothing matches “zzz”.” by default. */
  empty?: (query: string) => ReactNode
  /** What the phone sheet shows first, where there's no label above it; the label by default. */
  title?: ReactNode
  /** Sends the value with a form, in a hidden input. */
  name?: string
  /** Under the field, until there's an error. */
  hint?: ReactNode
  /** Says what to do; turns the border red. Takes Inertia's form.errors.field as is. */
  error?: ReactNode
  optional?: boolean
  disabled?: boolean
  id?: string
  className?: string
}

export type SelectProps<V extends Value = string> = Labelled & PickerProps<V>

/** Choosing one value from a list: a button that looks like a field and opens our own list (a sheet on phones). Up and Down move,
 *  Enter picks and puts focus back on the button, Esc or the dimmed page close it without a change. Two to five choices that
 *  should all be seen are radios; typing to find in a long list is the Combobox. */
export function Select<V extends Value = string>({
  label, 'aria-label': ariaLabel, options, value, onChange, placeholder, none, search, empty, title, name, hint, error, optional, disabled, id, className,
}: SelectProps<V>) {
  const field = useField(id, error || hint, error)
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const chosen = options.find(option => option.value === value)
  const labelId = `${field.fieldId}-label`

  const close = () => {
    setOpen(false)
    button.current?.focus()
  }
  useOutside(open, menu, button, () => setOpen(false))

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
          close()
        }}
      >
        <button
          ref={button}
          id={field.fieldId}
          className="pc-picker-button"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${field.fieldId}-menu`}
          aria-labelledby={label ? `${labelId} ${field.fieldId}` : undefined}
          aria-label={ariaLabel && (chosen ? `${ariaLabel}: ${chosen.label}` : ariaLabel)}
          aria-describedby={field.describedBy}
          aria-invalid={field.invalid}
          disabled={disabled}
          onClick={() => setOpen(!open)}
          onKeyDown={event => {
            if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !open) {
              event.preventDefault()
              setOpen(true)
            }
          }}
        >
          {chosen ? <span>{chosen.label}</span> : <span className="pc-picker-placeholder">{placeholder ?? none}</span>}
          <CaretDown />
        </button>
        <PickerMenu
          menu={menu}
          id={`${field.fieldId}-menu`}
          open={open}
          labelledBy={label ? labelId : undefined}
          label={ariaLabel}
          title={title ?? label ?? ariaLabel}
          options={options}
          picked={candidate => candidate === value}
          onPick={option => {
            onChange(option.value)
            close()
          }}
          none={none === undefined ? undefined : {
            label: none,
            picked: value === null,
            onPick: () => {
              onChange(null)
              close()
            },
          }}
          search={search}
          empty={empty}
        />
        {name && <input type="hidden" name={name} value={value ?? ''} />}
      </div>
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}

const choices = (menu: HTMLElement | null) => [...(menu?.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])') ?? [])]

type PickerMenuProps<V extends Value> = {
  menu: RefObject<HTMLDivElement | null>
  id: string
  open: boolean
  /** The list's name: the label's id, or the field's aria-label. */
  labelledBy?: string
  label?: string
  title: ReactNode
  options: SelectOption<V>[]
  picked: (value: V) => boolean
  onPick: (option: SelectOption<V>) => void
  none?: { label: string; picked: boolean; onPick: () => void }
  search?: string
  empty?: (query: string) => ReactNode
  /** Several values: a checkbox starts each row, and the list stays open. */
  multiple?: boolean
  /** Backspace in the empty search. */
  onBackspace?: () => void
}

/** The list a picker opens: the phone sheet's title, the search, the options in their groups, and the keys that move through them.
 *  With a search, focus starts there and Down moves into the list; a letter typed on an option goes on into the search. */
export function PickerMenu<V extends Value>({ menu, id, open, labelledBy, label, title, options, picked, onPick, none, search, empty, multiple, onBackspace }: PickerMenuProps<V>) {
  const [query, setQuery] = useState('')
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setQuery('')
  }
  const field = useRef<HTMLInputElement>(null)
  const typed = query.trim()
  const words = typed.toLocaleLowerCase()
  const shown = words ? options.filter(option => option.label.toLocaleLowerCase().includes(words)) : options

  // Opening moves focus to the search, else to the chosen option (or the first).
  useEffect(() => {
    if (!open) return
    if (search) {
      field.current?.focus()
      return
    }
    const rows = choices(menu.current)
    const first = rows.find(row => row.getAttribute('aria-selected') === 'true') ?? rows[0]
    first?.focus()
  }, [open])

  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    const rows = choices(menu.current)
    if (event.target === field.current) {
      if (event.key === 'Backspace' && !query) onBackspace?.()
      if (event.key === 'ArrowDown') rows[0]?.focus()
      // Enter picks the first match, and never sends a form around it.
      else if (event.key === 'Enter') {
        if (typed) rows[0]?.click()
      } else return
      event.preventDefault()
      return
    }
    if (!search) {
      if (moveFocus(rows, event.key, false) || typeAhead(rows, event)) event.preventDefault()
    } else if (event.key === 'ArrowUp' && rows.indexOf(document.activeElement as HTMLElement) === 0) {
      event.preventDefault()
      field.current?.focus()
    } else if (moveFocus(rows, event.key, false)) {
      event.preventDefault()
    } else if (!event.ctrlKey && !event.metaKey && !event.altKey && ((event.key.length === 1 && event.key !== ' ') || event.key === 'Backspace')) {
      // Left to go on, a letter (or Backspace) lands in the search.
      field.current?.focus()
    }
  }

  return (
    <>
      <div className="pc-menu-backdrop" />
      <div
        ref={menu}
        id={id}
        className="pc-menu pc-picker-menu pc-menu-pop"
        role="listbox"
        aria-labelledby={labelledBy}
        aria-label={label}
        aria-multiselectable={multiple || undefined}
        hidden={!open}
        onKeyDown={keys}
      >
        <div className="pc-menu-label pc-menu-title">{title}</div>
        {search && (
          <InputGroup
            ref={field}
            icon={<MagnifyingGlass />}
            type="search"
            placeholder={search}
            aria-label={search}
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        )}
        {none && !words && (
          <button className="pc-menu-item pc-menu-none" type="button" role="option" aria-selected={none.picked} tabIndex={-1} onClick={none.onPick}>
            {none.label}
            {none.picked && <Check className="pc-menu-check" />}
          </button>
        )}
        {shown.map((option, i) => {
          const on = picked(option.value)
          return (
            <Fragment key={option.value}>
              {option.group && option.group !== shown[i - 1]?.group && <div className="pc-menu-label">{option.group}</div>}
              <button
                className="pc-menu-item"
                type="button"
                role="option"
                aria-selected={on}
                aria-disabled={option.disabledReason ? true : undefined}
                tabIndex={-1}
                onClick={() => {
                  if (!option.disabledReason) onPick(option)
                }}
              >
                {multiple && <input className="pc-checkbox" type="checkbox" tabIndex={-1} aria-hidden="true" checked={on} readOnly />}
                {option.colour && <span className={cx('pc-menu-dot', `pc-colour-${option.colour}`)} />}
                {option.icon}
                {option.label}
                {option.disabledReason && <span className="pc-menu-note">{option.disabledReason}</span>}
                {!multiple && on && <Check className="pc-menu-check" />}
              </button>
            </Fragment>
          )
        })}
        {words && !shown.length && <p className="pc-menu-empty">{empty ? empty(typed) : `Nothing matches “${typed}”.`}</p>}
      </div>
    </>
  )
}
