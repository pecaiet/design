import { Link as InertiaLink } from '@inertiajs/react'
import { createContext, useContext, useEffect, useId, useRef, type ComponentPropsWithRef, type KeyboardEvent, type ReactNode } from 'react'
import { cx } from './cx'

type Look = {
  /** A noun: "Account", "Sessions". */
  label: ReactNode
  /** 16px, before the words. */
  icon?: ReactNode
  /** After the words, in a small pill: 12. */
  count?: ReactNode
}

export type Tab<V extends string = string> = Look & {
  value: V
  disabled?: boolean
}

export type TabLink = Look & {
  href: string
  /** The page you're on. */
  current?: boolean
}

// When the tabs don't fit (a phone) the row scrolls sideways: keep the current one in view, without scrolling the page.
const keepInView = (row: HTMLElement | null) => {
  const tab = row?.querySelector<HTMLElement>(':scope > [aria-selected="true"], :scope > [aria-current="page"]')
  if (!row || !tab) return
  if (tab.offsetLeft < row.scrollLeft) row.scrollLeft = tab.offsetLeft
  else if (tab.offsetLeft + tab.offsetWidth > row.scrollLeft + row.clientWidth) row.scrollLeft = tab.offsetLeft + tab.offsetWidth - row.clientWidth
}

const Chosen = createContext<{ id: string; value: string; values: string[] } | null>(null)

export type TabsProps<V extends string = string> = Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'children'> & {
  /** What the parts belong to, for screen readers: "Account". */
  label: string
  /** Two to six. */
  tabs: Tab<V>[]
  value: V
  onChange: (value: V) => void
  /** A TabPanel for each tab, anywhere under it. */
  children?: ReactNode
}

/** Switching between parts of one page: words over a line, the current one with a teal line under it (it slides there with
 *  pecaiet.js). Only the current tab is in the Tab order; the arrow keys, Home and End move between tabs and show their part. */
export function Tabs<V extends string = string>({ label, tabs, value, onChange, children, className, ...div }: TabsProps<V>) {
  const id = useId()
  const row = useRef<HTMLDivElement>(null)
  useEffect(() => keepInView(row.current), [value])

  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    const open = tabs.filter(tab => !tab.disabled)
    const at = open.findIndex(tab => tab.value === value)
    const to = event.key === 'ArrowRight' ? at + 1 : event.key === 'ArrowLeft' ? at - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? open.length - 1 : undefined
    if (to === undefined || !open.length) return
    event.preventDefault()
    const next = open[(to + open.length) % open.length]
    row.current?.querySelectorAll<HTMLElement>('[role="tab"]')[tabs.indexOf(next)]?.focus()
    onChange(next.value)
  }

  return (
    <Chosen value={{ id, value, values: tabs.map(tab => tab.value) }}>
      <div {...div} ref={row} className={cx('pc-tabs', className)} role="tablist" aria-label={label} onKeyDown={keys}>
        {tabs.map((tab, i) => {
          const selected = tab.value === value
          return (
            <button
              key={tab.value}
              id={`${id}-tab-${i}`}
              className="pc-tab"
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => onChange(tab.value)}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && <span className="pc-tab-count">{tab.count}</span>}
            </button>
          )
        })}
      </div>
      {children}
    </Chosen>
  )
}

export type TabPanelProps = ComponentPropsWithRef<'div'> & {
  /** The tab it belongs to. */
  value: string
}

/** One tab's part: shown while its tab is the current one (it fades in), hidden otherwise. */
export function TabPanel({ value, className, ...div }: TabPanelProps) {
  const chosen = useContext(Chosen)
  const i = chosen?.values.indexOf(value) ?? -1
  return (
    <div
      tabIndex={0}
      {...div}
      className={cx('pc-tab-panel', className)}
      role="tabpanel"
      id={`${chosen?.id}-panel-${i}`}
      aria-labelledby={`${chosen?.id}-tab-${i}`}
      hidden={chosen?.value !== value}
    />
  )
}

export type TabLinksProps = Omit<ComponentPropsWithRef<'nav'>, 'children'> & {
  /** What the pages belong to, for screen readers: "Settings". */
  label: string
  tabs: TabLink[]
}

/** Tabs whose parts each have their own address: Inertia links, the page you're on marked current. */
export function TabLinks({ label, tabs, className, ...nav }: TabLinksProps) {
  const row = useRef<HTMLElement>(null)
  useEffect(() => keepInView(row.current), [tabs.findIndex(tab => tab.current)])
  return (
    <nav {...nav} ref={row} className={cx('pc-tabs', className)} aria-label={label}>
      {tabs.map(tab => (
        <InertiaLink key={tab.href} href={tab.href} className="pc-tab" aria-current={tab.current ? 'page' : undefined}>
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && <span className="pc-tab-count">{tab.count}</span>}
        </InertiaLink>
      ))}
    </nav>
  )
}
