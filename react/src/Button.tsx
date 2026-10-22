import { Link as InertiaLink, type InertiaLinkProps } from '@inertiajs/react'
import type { ComponentPropsWithRef, MouseEvent, ReactNode } from 'react'
import { cx } from './cx'
import { Spinner } from './Spinner'

type Look = {
  /** primary: the one main action of a view. outline: secondary actions, Cancel. ghost: quiet actions in rows, menus and
   *  toolbars. destructive: a red outline that opens the dialog confirming something that can't be undone. */
  variant: 'primary' | 'outline' | 'ghost' | 'destructive'
  /** With variant="primary": solid red, the confirming dialog's Delete. */
  destructive?: boolean
  size?: 'small' | 'large'
  /** Stretches it to its container: forms on phones, the sign-in page. */
  full?: boolean
  /** A button that stays on (a filter, a view, Bold). */
  pressed?: boolean
  /** Working: the spinner takes the icon's place and it can't be pressed twice. Change the words too ("Saving…"). */
  busy?: boolean
  /** Can't be used, and says why in its tooltip. It stays focusable and ignores clicks. Use plain `disabled` without a reason. */
  disabledReason?: string
}

type Content =
  /** icon before the words when it adds or does something, iconAfter when it opens a menu or goes to the next step. */
  | { children: ReactNode; icon?: ReactNode; iconAfter?: ReactNode; label?: never }
  /** Icon only: label is its aria-label and its tooltip. */
  | { children?: never; icon: ReactNode; iconAfter?: never; label: string }

type Tag =
  | (Omit<ComponentPropsWithRef<'button'>, 'children'> & { href?: never })
  /** Goes to another page of the app: an Inertia link with the same look. */
  | (Omit<InertiaLinkProps, 'children'> & { href: string })

export type ButtonProps = Look & Content & Tag

export function Button({ variant, destructive, size, full, pressed, busy, disabledReason, icon, iconAfter, label, children, className, ...element }: ButtonProps) {
  const shared = {
    className: cx(
      'pc-btn',
      `pc-btn-${variant}`,
      destructive && 'pc-btn-destructive',
      size && `pc-btn-${size}`,
      label && 'pc-btn-icon',
      full && 'pc-btn-full',
      className,
    ),
    'aria-label': label,
    'aria-pressed': pressed,
    'aria-busy': busy || undefined,
    'aria-disabled': disabledReason ? true : undefined,
    'data-pc-tooltip': disabledReason ?? label,
  }
  const inner = (
    <>
      {busy ? <Spinner label="Working" /> : icon}
      {children}
      {iconAfter}
    </>
  )
  // aria-disabled keeps it focusable, so the click has to be ignored here.
  const ignore = (event: MouseEvent) => event.preventDefault()

  if (element.href !== undefined) {
    // A link that goes nowhere has no href.
    if (disabledReason) return <a {...shared} onClick={ignore}>{inner}</a>
    return <InertiaLink {...element} {...shared}>{inner}</InertiaLink>
  }
  const { type = 'button', onClick, ...button } = element
  return (
    <button {...button} {...shared} type={type} onClick={disabledReason ? ignore : onClick}>
      {inner}
    </button>
  )
}
