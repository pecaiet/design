import { Link as InertiaLink, router } from '@inertiajs/react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Fragment, useEffect, useId, useState, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { EmptyState } from './EmptyState'
import { Dialog } from './Modal'
import { Spinner } from './Spinner'

export type SearchResult = {
  id: string
  /** Its name. As words, the ones that match the search turn semibold. */
  title: ReactNode
  /** The mark before it: open, done or a note; clock-counter-clockwise for a recent search. */
  icon?: ReactNode
  /** Where it lives, on the right: "Work › America" (hidden on phones). */
  place?: ReactNode
  /** 16px, before the place. */
  placeIcon?: ReactNode
  /** Done: the title muted and struck through. */
  done?: boolean
  /** Opens this page (Enter or a click); without it, onSelect. */
  href?: string
}

export type SearchGroup = {
  /** "Tasks", "Recent searches". */
  label: ReactNode
  /** After the name: how many. */
  count?: number
  /** At the end of the heading: Clear, for recent searches. */
  action?: { label: ReactNode; onClick: () => void }
  results: SearchResult[]
}

export type SearchWindowProps = {
  /** Open while true; Esc, Cancel (phones), a click on the dimmed page or a choice ask to close it through onClose. */
  open: boolean
  onClose: () => void
  query: string
  onQueryChange: (query: string) => void
  /** The field's words and name: "Search tasks". */
  placeholder: string
  /** Grouped results; before typing, the recent searches. */
  groups: SearchGroup[]
  /** Looking: a spinner at the end of the field. */
  busy?: boolean
  /** Nothing found: words that repeat the search ("No tasks match “passport”") and say what search looks at. */
  empty?: { title: ReactNode; description?: ReactNode }
  /** The keys under the results: ↑ ↓ to move, Enter to open, Esc to close. On by default. */
  keys?: boolean
  /** A result was chosen (after its href, if it has one). */
  onSelect?: (result: SearchResult) => void
  className?: string
}

// The words that match, in semibold.
function highlight(text: string, query: string) {
  const words = query.trim().toLocaleLowerCase()
  if (!words) return text
  const lower = text.toLocaleLowerCase()
  const parts: ReactNode[] = []
  let from = 0
  for (let at = lower.indexOf(words); at >= 0; at = lower.indexOf(words, from)) {
    parts.push(text.slice(from, at), <mark key={at} className="pc-search-match">{text.slice(at, at + words.length)}</mark>)
    from = at + words.length
  }
  parts.push(text.slice(from))
  return parts
}

/** The search window over everything (⌘K): the field on top, the results grouped under it, the highlighted one opened by Enter.
 *  Focus stays in the field; Up and Down move the highlight. On phones it fills the screen, with Cancel at the field's end. */
export function SearchWindow({ open, onClose, query, onQueryChange, placeholder, groups, busy, empty, keys = true, onSelect, className }: SearchWindowProps) {
  const id = useId()
  const [active, setActive] = useState(0)
  const results = groups.flatMap(group => group.results)
  const current = results[Math.min(active, results.length - 1)]

  useEffect(() => {
    if (current) document.getElementById(`${id}-${current.id}`)?.scrollIntoView({ block: 'nearest' })
  }, [current?.id])

  const choose = (result: SearchResult) => {
    if (result.href) router.visit(result.href)
    onSelect?.(result)
    onClose()
  }

  return (
    <Dialog kind="dialog" open={open} onClose={onClose} className={cx('pc-search', className)} aria-label="Search">
      <div className="pc-search-field">
        <MagnifyingGlass />
        <input
          type="search"
          value={query}
          placeholder={placeholder}
          aria-label={placeholder}
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={`${id}-results`}
          aria-autocomplete="list"
          aria-activedescendant={current ? `${id}-${current.id}` : undefined}
          onChange={event => {
            setActive(0)
            onQueryChange(event.target.value)
          }}
          onKeyDown={event => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              const at = results.indexOf(current)
              setActive(Math.max(0, Math.min(results.length - 1, at + (event.key === 'ArrowDown' ? 1 : -1))))
            } else if (event.key === 'Enter' && current) {
              event.preventDefault()
              choose(current)
            }
          }}
        />
        {busy && <Spinner label="Searching" />}
        <Button variant="ghost" className="pc-search-cancel" onClick={onClose}>Cancel</Button>
      </div>
      {results.length > 0 && (
        <div className="pc-search-results" role="listbox" id={`${id}-results`} aria-label={placeholder}>
          {groups.map((group, g) => group.results.length > 0 && (
            <Fragment key={g}>
              <div className="pc-search-group">
                {group.label}
                {group.count !== undefined && <span className="pc-search-count">{group.count}</span>}
                {group.action && <button className="pc-search-group-action" type="button" onClick={group.action.onClick}>{group.action.label}</button>}
              </div>
              {group.results.map(result => {
                const row = {
                  id: `${id}-${result.id}`,
                  className: 'pc-search-result',
                  role: 'option',
                  tabIndex: -1,
                  'aria-selected': result === current || undefined,
                  'data-done': result.done ? '' : undefined,
                  onMouseMove: () => setActive(results.indexOf(result)),
                }
                const inside = (
                  <>
                    {result.icon}
                    <span className="pc-search-title">{typeof result.title === 'string' ? highlight(result.title, query) : result.title}</span>
                    {result.place && <span className="pc-search-place">{result.placeIcon}<span>{result.place}</span></span>}
                  </>
                )
                return result.href ? (
                  <InertiaLink key={result.id} {...row} href={result.href} onClick={() => {
                    onSelect?.(result)
                    onClose()
                  }}>
                    {inside}
                  </InertiaLink>
                ) : (
                  <div key={result.id} {...row} onClick={() => choose(result)}>{inside}</div>
                )
              })}
            </Fragment>
          ))}
        </div>
      )}
      {!results.length && query.trim() && !busy && empty && <EmptyState title={empty.title} description={empty.description} />}
      {keys && results.length > 0 && (
        <div className="pc-search-footer">
          <span><span className="pc-kbd">↑</span> <span className="pc-kbd">↓</span> to move</span>
          <span><span className="pc-kbd">Enter</span> to open</span>
          <span><span className="pc-kbd">Esc</span> to close</span>
        </div>
      )}
    </Dialog>
  )
}
