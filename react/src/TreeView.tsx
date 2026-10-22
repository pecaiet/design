import { router } from '@inertiajs/react'
import { CaretRight } from '@phosphor-icons/react'
import { useRef, useState, type ComponentPropsWithRef, type KeyboardEvent, type ReactNode } from 'react'
import { cx } from './cx'
import { leave } from './motion'
import { assign } from './popup'

export type TreeItem = {
  id: string
  label: ReactNode
  /** 16px, after the caret: a folder, a list. */
  icon?: ReactNode
  /** At the end: 12. */
  count?: ReactNode
  /** Goes there on a click or Enter (an Inertia visit). */
  href?: string
  /** The page you're on: the active sidebar pill. */
  current?: boolean
  /** What's inside: the row opens and closes. */
  children?: TreeItem[]
}

export type TreeViewProps = Omit<ComponentPropsWithRef<'ul'>, 'children' | 'onSelect'> & {
  /** What it holds, for screen readers: "Lists". */
  label: string
  items: TreeItem[]
  /** The ids of the open rows. Leave it out and the tree keeps them, starting from defaultExpanded. */
  expanded?: string[]
  defaultExpanded?: string[]
  onExpandedChange?: (expanded: string[]) => void
  /** A row without an href was chosen (a click or Enter). Without it, a click on a row that opens opens or closes it. */
  onSelect?: (item: TreeItem) => void
}

type Row = { item: TreeItem; level: number; size: number; position: number }

/** Things inside things (folders of lists) as sidebar rows that open and close, each level 24px further in. Up and Down move,
 *  Right opens or goes in, Left closes or goes back to its folder, Home and End, Enter chooses. */
export function TreeView({ label, items, expanded, defaultExpanded = [], onExpandedChange, onSelect, className, ref, ...ul }: TreeViewProps) {
  const [own, setOwn] = useState(defaultExpanded)
  const [focused, setFocused] = useState<string>()
  const list = useRef<HTMLUListElement>(null)
  const open = expanded ?? own

  const rows: Row[] = []
  const walk = (level: number, children: TreeItem[]) => children.forEach((item, i) => {
    rows.push({ item, level, size: children.length, position: i + 1 })
    if (item.children?.length && open.includes(item.id)) walk(level + 1, item.children)
  })
  walk(1, items)
  const tabbable = rows.find(row => row.item.id === focused) ?? rows.find(row => row.item.current) ?? rows[0]
  const element = (index: number) => list.current?.children[index] as HTMLElement | undefined

  const toggle = async (index: number) => {
    const { item, level } = rows[index]
    const opening = !open.includes(item.id)
    if (!opening) {
      // Its rows shrink out first, the rows below gliding up; opening, pecaiet.js grows the new rows in by itself.
      const inside: Promise<void>[] = []
      for (let i = index + 1; i < rows.length && rows[i].level > level; i++) inside.push(leave(element(i) ?? null))
      await Promise.all(inside)
    }
    const next = opening ? [...open, item.id] : open.filter(id => id !== item.id)
    if (expanded === undefined) setOwn(next)
    onExpandedChange?.(next)
  }
  const choose = (index: number) => {
    const { item } = rows[index]
    if (item.href) router.visit(item.href)
    else if (onSelect) onSelect(item)
    else if (item.children?.length) toggle(index)
  }

  const keys = (event: KeyboardEvent<HTMLUListElement>) => {
    const at = rows.findIndex((_, i) => element(i) === document.activeElement)
    if (at < 0) return
    const { item, level } = rows[at]
    const opens = Boolean(item.children?.length)
    const isOpen = opens && open.includes(item.id)
    if (event.key === 'ArrowDown') element(at + 1)?.focus()
    else if (event.key === 'ArrowUp') element(at - 1)?.focus()
    else if (event.key === 'Home') element(0)?.focus()
    else if (event.key === 'End') element(rows.length - 1)?.focus()
    else if (event.key === 'ArrowRight' && opens) {
      if (isOpen) element(at + 1)?.focus()
      else toggle(at)
    } else if (event.key === 'ArrowLeft') {
      if (isOpen) toggle(at)
      else element(rows.findLastIndex((row, i) => i < at && row.level < level))?.focus()
    } else if (event.key === 'Enter') choose(at)
    else return
    event.preventDefault()
  }

  return (
    <ul
      {...ul}
      ref={node => {
        list.current = node
        assign(ref, node)
      }}
      className={cx('pc-tree', className)}
      role="tree"
      aria-label={label}
      onKeyDown={keys}
    >
      {rows.map((row, index) => {
        const opens = Boolean(row.item.children?.length)
        return (
          <li
            key={row.item.id}
            className="pc-tree-item"
            role="treeitem"
            aria-level={row.level}
            aria-setsize={row.size}
            aria-posinset={row.position}
            aria-expanded={opens ? open.includes(row.item.id) : undefined}
            aria-current={row.item.current ? 'page' : undefined}
            tabIndex={row === tabbable ? 0 : -1}
            onFocus={() => setFocused(row.item.id)}
            onClick={event => {
              if (opens && (event.target as Element).closest('.pc-tree-caret')) toggle(index)
              else choose(index)
            }}
          >
            {/* At the top level a row with nothing inside keeps an empty caret, so its icon lines up with the folders'. */}
            {opens ? <span className="pc-tree-caret"><CaretRight /></span> : row.level === 1 && <span className="pc-tree-caret" />}
            {row.item.icon}
            <span className="pc-tree-label">{row.item.label}</span>
            {row.item.count !== undefined && <span className="pc-tree-count">{row.item.count}</span>}
          </li>
        )
      })}
    </ul>
  )
}
