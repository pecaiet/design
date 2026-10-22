import { Check, Copy, Eye, EyeSlash } from '@phosphor-icons/react'
import { useEffect, useRef, useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { FieldMessage, useField, type Labelled } from './Field'
import { Label } from './Label'

type Field = Omit<ComponentPropsWithRef<'input'>, 'children'> & {
  /** Under the field, until there's an error. */
  hint?: ReactNode
  /** Says how to fix it; turns the edge red. Takes Inertia's form.errors.field as is. */
  error?: ReactNode
  optional?: boolean
  /** A machine value (a secret, a key): the monospace at 12px. */
  mono?: boolean
}

type Inside =
  /** icon: 16px, first (MagnifyingGlass, Plus for quick add). end: a <Kbd> hint, a ghost icon Button with its tooltip (clear,
   *  copy) or a Spinner while it checks. */
  | { icon?: ReactNode; end?: ReactNode; before?: never; after?: never }
  /** Words before or after the value, inside the field and muted (https://, kg, @pecaiet.ro): the group then draws the edge,
   *  the focus ring and the error. */
  | { before?: ReactNode; after?: ReactNode; icon?: never; end?: never }

export type InputGroupProps = Field & Labelled & Inside

/** A text field with something inside it. Without a label, hint or error it's the bare group, ready for an InputRow. */
export function InputGroup({ label, hint, error, optional, mono, icon, end, before, after, id, className, ...input }: InputGroupProps) {
  const field = useField(id, error || hint, error, input['aria-describedby'])
  const wrapped = Boolean(label || hint || error)
  const group = (
    <div className={cx('pc-input-group', !wrapped && className)}>
      {icon}
      {before && <span className="pc-input-addon">{before}</span>}
      <input
        {...input}
        className={cx('pc-input', mono && 'pc-input-mono')}
        id={field.fieldId}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid ?? input['aria-invalid']}
      />
      {after && <span className="pc-input-addon">{after}</span>}
      {end && <span className="pc-input-group-end">{end}</span>}
    </div>
  )
  if (!wrapped) return group
  return (
    <div className={cx('pc-field', className)}>
      {label && <Label htmlFor={field.fieldId} optional={optional}>{label}</Label>}
      {group}
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}

export type PasswordInputProps = Omit<Field, 'type' | 'mono'> & Labelled & {
  /** current-password to sign in, new-password to set one. */
  autoComplete: 'current-password' | 'new-password'
}

/** A password with the eye at its end: it shows the password, and the eye with a slash hides it again. */
export function PasswordInput(props: PasswordInputProps) {
  const [shown, setShown] = useState(false)
  return (
    <InputGroup
      {...props}
      type={shown ? 'text' : 'password'}
      end={
        <Button
          variant="ghost"
          icon={shown ? <EyeSlash /> : <Eye />}
          label={shown ? 'Hide password' : 'Show password'}
          onClick={() => setShown(!shown)}
        />
      }
    />
  )
}

export type CopyInputProps = Omit<Field, 'value' | 'defaultValue' | 'readOnly'> & Labelled & {
  /** What can be selected and copied but not changed: an ID, a key. */
  value: string
  /** The copy button's name and tooltip: "Copy client ID". */
  copyLabel: string
}

/** A read-only value (the muted fill, no border) with a copy button at its end. After a click its icon turns into a tick and
 *  its tooltip says "Copied" for two seconds. No toast. */
export function CopyInput({ copyLabel, value, ...props }: CopyInputProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }
  return (
    <InputGroup
      {...props}
      value={value}
      readOnly
      end={<Button variant="ghost" icon={copied ? <Check /> : <Copy />} label={copied ? 'Copied' : copyLabel} onClick={copy} />}
    />
  )
}

export type InputRowProps = ComponentPropsWithRef<'div'>

/** A field and its button side by side (Invite, Add), 8px apart, each its own shape. The field takes the room: a bare InputGroup or
 *  SearchInput (no label, hint or error). */
export function InputRow({ className, ...div }: InputRowProps) {
  return <div {...div} className={cx('pc-input-row', className)} />
}
