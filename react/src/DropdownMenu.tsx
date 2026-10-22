import { Link as InertiaLink, type InertiaLinkProps } from '@inertiajs/react'
import { Check } from '@phosphor-icons/react'
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type ComponentPropsWithRef,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cx } from './cx'
import { moveFocus, typeAhead, useOpen, useOutside, withTrigger, type TriggerProps } from './popup'

// Below 48rem a popping-up menu is the sheet pecaiet.css draws, so it isn't placed beside its button there.
const PHONE = '(max-width: 47.99rem)'
const watchPhone = (notify: () => void) => {
  const query = matchMedia(PHONE)
  query.addEventListener('change', notify)
  return () => query.removeEventListener('change', notify)
}

const items = (menu: HTMLElement | null) =>
  [...(menu?.querySelectorAll<HTMLElement>('[role^="menuitem"]:not(:disabled):not([aria-disabled="true"])') ?? [])]

/** Closes the menu and puts focus back on its button. */
const CloseMenu = createContext(() => {})

type Placement =
  /** Where it drops: 4px under its button, lined up with the button's start or end; up opens it above. A sheet on phones. */
  | { align?: 'start' | 'end'; up?: boolean; menuClassName?: never }
  /** Placed by a class of its own instead (pc-sidebar-account-menu, pc-sidebar-apps-menu), with className on the wrapper that
   *  holds it (pc-sidebar-account, pc-sidebar-apps). */
  | { menuClassName: string; align?: never; up?: never }

export type DropdownMenuProps = Placement & {
  /** The button that opens it: a Button (a ⋯ icon button), a sidebar row. It gets aria-haspopup, aria-expanded (it keeps its hover
   *  fill while open) and the click; its own ref and handlers stay. */
  trigger: ReactElement<TriggerProps>
  /** MenuItems, with MenuSeparator and MenuLabel between groups. Delete last, after a separator. */
  children: ReactNode
  /** Names the thing acted on ("Birthday present"), first in the phone sheet only; also the menu's name. */
  title?: string
  /** A menu of places (lists, workspaces, apps): link items, the one you're on marked current. */
  places?: boolean
  /** A sheet at the bottom of the screen at any width, not only on phones. */
  sheet?: boolean
  /** Leave both out and it opens and closes by itself. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** On the wrapper around the menu and its button. */
  className?: string
}

/** A short list of actions or choices that opens over the page from a button. It closes on Esc, a click outside (the dimmed page on
 *  phones), Tab or a choice; focus goes back to the button. Arrow keys, Home, End and a letter move through the items. */
export function DropdownMenu({ trigger, children, title, places, sheet, open: shown, onOpenChange, align, up, menuClassName, className }: DropdownMenuProps) {
  const [open, setOpen] = useOpen(shown, onOpenChange)
  const menu = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLElement>(null)
  const last = useRef(false)
  const id = useId()
  const buttonId = trigger.props.id ?? `${id}-button`
  const phone = useSyncExternalStore(watchPhone, () => matchMedia(PHONE).matches, () => false)

  const close = () => {
    setOpen(false)
    button.current?.focus()
  }
  useOutside(open, menu, button, () => setOpen(false))

  // Opening moves focus to the first item (the last, from the Up arrow).
  useEffect(() => {
    if (!open) return
    const list = items(menu.current)
    const first = last.current ? list.at(-1) : list[0]
    first?.focus()
    last.current = false
  }, [open])

  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = items(menu.current)
    if (event.key === 'Tab') setOpen(false)
    else if (moveFocus(list, event.key, true) || typeAhead(list, event)) event.preventDefault()
  }

  const placed: CSSProperties | undefined = menuClassName || sheet || phone ? undefined : {
    position: 'absolute',
    zIndex: 'var(--pc-layer-menu)',
    [up ? 'bottom' : 'top']: 'calc(100% + var(--pc-space-1))',
    [align === 'end' ? 'right' : 'left']: 0,
  }

  return (
    <CloseMenu value={close}>
      <div
        className={className}
        style={menuClassName ? undefined : { position: 'relative', display: 'inline-block' }}
        onKeyDown={event => {
          if (event.key !== 'Escape' || !open) return
          // Prevented, so a dialog around it stays open.
          event.preventDefault()
          event.stopPropagation()
          close()
        }}
      >
        <div className="pc-menu-backdrop" />
        <div
          ref={menu}
          id={`${id}-menu`}
          className={cx('pc-menu', sheet ? 'pc-menu-sheet' : 'pc-menu-pop', places && 'pc-menu-places', menuClassName)}
          role="menu"
          aria-label={title}
          aria-labelledby={title ? undefined : buttonId}
          hidden={!open}
          style={placed}
          onKeyDown={keys}
        >
          {title && <div className="pc-menu-label pc-menu-title">{title}</div>}
          {children}
        </div>
        {withTrigger(trigger, {
          ref: button,
          id: buttonId,
          'aria-haspopup': 'menu',
          'aria-expanded': open,
          'aria-controls': `${id}-menu`,
          onClick: () => setOpen(!open),
          onKeyDown: event => {
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
            event.preventDefault()
            const list = items(menu.current)
            if (open) return (event.key === 'ArrowUp' ? list.at(-1) : list[0])?.focus()
            last.current = event.key === 'ArrowUp'
            setOpen(true)
          },
        })}
      </div>
    </CloseMenu>
  )
}

type ItemLook = {
  /** A verb ("Edit", "Archive"); one that opens another choice ends in "…" ("Move to list…"). */
  children: ReactNode
  /** 16px, muted, before the words. */
  icon?: ReactNode
  /** Delete: red, last, after a separator. */
  destructive?: boolean
  /** A muted icon or words pushed to the end of the row (the app switcher's squares-four). */
  end?: ReactElement<{ className?: string }>
}

type ItemTag =
  /** Does something; the menu closes after onClick. */
  | (Omit<ComponentPropsWithRef<'button'>, 'children'> & { href?: never; checked?: never; current?: never })
  /** One of several choices (menuitemradio): the current one gets the tick at its end. */
  | (Omit<ComponentPropsWithRef<'button'>, 'children'> & { checked: boolean; href?: never; current?: never })
  /** Goes to a page of the app (an Inertia link). current: where you are, in a menu of places. */
  | (Omit<InertiaLinkProps, 'children'> & { href: string; current?: boolean; checked?: never })

export type MenuItemProps = ItemLook & ItemTag

export function MenuItem({ icon, destructive, end, children, className, ...element }: MenuItemProps) {
  const close = useContext(CloseMenu)
  const look = cx('pc-menu-item', destructive && 'pc-menu-item-destructive', className)
  const after = end && cloneElement(end, { className: cx('pc-menu-end', end.props.className) })

  if (element.href !== undefined) {
    const { current, checked, onClick, ...link } = element
    return (
      <InertiaLink
        {...link}
        className={look}
        role="menuitem"
        tabIndex={-1}
        aria-current={current ? 'page' : undefined}
        onClick={event => {
          onClick?.(event)
          close()
        }}
      >
        {icon}
        {children}
        {after}
      </InertiaLink>
    )
  }
  const { checked, current, href, type = 'button', onClick, ...button } = element
  return (
    <button
      {...button}
      type={type}
      className={look}
      role={checked === undefined ? 'menuitem' : 'menuitemradio'}
      aria-checked={checked}
      tabIndex={-1}
      onClick={event => {
        onClick?.(event)
        close()
      }}
    >
      {icon}
      {children}
      {after}
      {checked && <Check className="pc-menu-check" />}
    </button>
  )
}

/** A line between groups, from edge to edge. */
export function MenuSeparator() {
  return <div className="pc-menu-separator" role="separator" />
}

export type MenuLabelProps = { children: ReactNode }

/** A group's heading, muted and small ("Move to"). */
export function MenuLabel({ children }: MenuLabelProps) {
  return <div className="pc-menu-label">{children}</div>
}
