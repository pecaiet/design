import { CaretLeft, X } from '@phosphor-icons/react'
import { useId, useLayoutEffect, useRef, type ComponentPropsWithRef, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { Dialog, type DialogProps } from './Modal'
import { enter, leave } from './motion'
import { assign } from './popup'

type Parts = {
  /** What it's for: "Edit task". The drawer is labelled by it. */
  title: ReactNode
  /** The fields, 12px apart; it scrolls when they don't fit. */
  children: ReactNode
  /** Cancel (outline), then the action named for what it does ("Save", "Create list"), under a line. A <form id> in the body is
   *  sent by <Button type="submit" form="its id">. */
  footer?: ReactNode
}

type Kind =
  /** Over the dimmed page, from the right edge, full height; full screen on phones. For one edit the page waits on: the x, Esc or
   *  the dimmed page close it. */
  | ({ beside?: false; back?: never } & Omit<DialogProps, 'kind' | 'title' | 'children'>)
  /** Beside the page, the last thing in the page's row (as tall as the page); nothing is dimmed, so the next row can be opened.
   *  Show it or leave it out yourself: it slides in from the right while the page narrows, and its x or back slides it out before
   *  onClose. On phones it fills the screen and back ("Back to America") shows in place of the x. */
  | ({ beside: true; back: string; onClose: () => void } & Omit<ComponentPropsWithRef<'aside'>, 'title' | 'children'>)

export type DrawerProps = Parts & Kind

/** A panel from the right with a form or a record's details. A yes/no question stays a Modal. */
export function Drawer({ title, children, footer, ...props }: DrawerProps) {
  const id = useId()
  // Beside the page it slides in and out as the sidebar does (pecaiet.js); one that comes with the page itself (a load, a visit) is
  // simply there, like the rest of the page.
  const panel = useRef<HTMLElement>(null)
  const sideways = props.beside ? props : undefined
  useLayoutEffect(() => {
    if (sideways && document.documentElement.hasAttribute('data-pc-ready')) enter(panel.current)
  }, [])
  const close = sideways ? async () => { await leave(panel.current); sideways.onClose() } : props.onClose
  const parts = (
    <>
      <div className="pc-drawer-head">
        {props.back && (
          <Button variant="ghost" icon={<CaretLeft />} label={props.back} className="pc-drawer-back" data-pc-tooltip-side="bottom" onClick={close} />
        )}
        <h2 className="pc-drawer-title" id={id}>{title}</h2>
        <Button variant="ghost" icon={<X />} label="Close" className="pc-drawer-close" data-pc-tooltip-side="bottom" onClick={close} />
      </div>
      <div className="pc-drawer-body">{children}</div>
      {footer && <div className="pc-drawer-footer">{footer}</div>}
    </>
  )

  if (props.beside) {
    const { beside, back, onClose, className, ref, ...aside } = props
    return (
      <aside
        aria-labelledby={id}
        {...aside}
        ref={node => {
          panel.current = node
          assign(ref, node)
        }}
        className={cx('pc-drawer', 'pc-drawer-beside', className)}
      >
        {parts}
      </aside>
    )
  }
  const { beside, back, ...dialog } = props
  return <Dialog aria-labelledby={id} {...dialog} kind="drawer">{parts}</Dialog>
}
