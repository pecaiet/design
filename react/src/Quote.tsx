import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'

export type QuoteProps = Omit<ComponentPropsWithRef<'figure'>, 'children'> & {
  /** The words, with a 2px line down their start. */
  children: ReactNode
} & (
  /** Words from someone else. Who said it (semibold), then their role or the source in muted text; the title of a book or a
   *  page goes in a <cite>. An avatar leads the caption for a person people should recognise. */
  | { variant?: never; name?: ReactNode; source?: ReactNode; avatar?: ReactNode }
  /** pull: a line from the page itself set apart to catch the eye, 16px semibold. small: a quoted reply in a comment or a
   *  message, muted 12px, shortened with "…", above the answer. Neither has a caption. */
  | { variant: 'pull' | 'small'; name?: never; source?: never; avatar?: never }
)

export function Quote({ variant, name, source, avatar, children, className, ...figure }: QuoteProps) {
  return (
    <figure {...figure} className={cx('pc-quote', variant && `pc-quote-${variant}`, className)}>
      <blockquote><p>{children}</p></blockquote>
      {(name || source) && (
        <figcaption>
          {avatar}
          <span>
            {name && <span className="pc-quote-name">{name}</span>}
            {name && source && ', '}
            {source}
          </span>
        </figcaption>
      )}
    </figure>
  )
}
