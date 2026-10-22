import { Info } from '@phosphor-icons/react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'
import { CopyInput } from './InputGroup'

export type CodeProps = ComponentPropsWithRef<'code'>

/** A machine value in running text: an ID, an error code. */
export function Code({ className, ...code }: CodeProps) {
  return <code {...code} className={cx('pc-code', className)} />
}

export type CodeBlockProps = ComponentPropsWithRef<'pre'>

/** A block of output (a backtrace): it scrolls inside itself and never widens the page. */
export function CodeBlock({ className, ...pre }: CodeBlockProps) {
  return <pre {...pre} className={cx('pc-code-block', className)} />
}

export type KbdProps = ComponentPropsWithRef<'span'>

/** A keyboard key: "/", "Esc", "⌘K". */
export function Kbd({ className, ...span }: KbdProps) {
  return <span {...span} className={cx('pc-kbd', className)} />
}

export type SecretProps = {
  /** The secret: a read-only field in the monospace, with a copy button at its end. */
  value: string
  /** The warning over it: "Copy the secret now. It won't be shown again." */
  children: ReactNode
  className?: string
}

/** A secret shown once: the warning and the value together in one notice, with no separate label. */
export function Secret({ value, children, className }: SecretProps) {
  return (
    <div className={cx('pc-alert', 'pc-alert-notice', className)} role="status">
      <Info />
      {/* pecaiet.css has no class for this column: the warning over the field, 8px apart, taking the rest of the row. */}
      <div style={{ display: 'grid', gap: 'var(--pc-space-2)', flex: 1, minWidth: 0 }}>
        <span>{children}</span>
        <CopyInput mono value={value} aria-label="Secret" copyLabel="Copy secret" />
      </div>
    </div>
  )
}
