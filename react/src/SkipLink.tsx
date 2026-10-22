import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'

export type SkipLinkProps = Omit<ComponentPropsWithRef<'a'>, 'href' | 'children'> & {
  /** The place it skips to; give that element the id and tabIndex={-1}, so focus lands there. */
  href: `#${string}`
  /** Where it goes: "Skip to tasks", "Skip to settings". */
  children: ReactNode
}

/** The first thing in the page, out of sight until the first Tab. A page with two places to skip to has two, one after the other. */
export function SkipLink({ className, ...link }: SkipLinkProps) {
  return <a {...link} className={cx('pc-skip-link', className)} />
}
