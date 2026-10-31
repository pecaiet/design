import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { leave } from './motion'

/** Ids that tie a field to its label and to its hint or error (aria-describedby), and aria-invalid when there's an error. */
export function useField(id: string | undefined, message: ReactNode, error: ReactNode, ...describedBy: (string | undefined)[]) {
  const auto = useId()
  const fieldId = id ?? auto
  const messageId = `${fieldId}-message`
  return {
    fieldId,
    messageId,
    describedBy: [message ? messageId : undefined, ...describedBy].filter(Boolean).join(' ') || undefined,
    invalid: error ? true : undefined,
  }
}

/** The error under a field, or its hint when there's no error. An error takes the hint's line, turning red; with no hint it's new,
 *  and pecaiet.js grows it in. Gone with no hint to take its line, it shrinks out while what's below glides up. */
export function FieldMessage({ id, hint, error }: { id: string; hint?: ReactNode; error?: ReactNode }) {
  // The error that just went, kept on screen while it shrinks (worked out while rendering, so it never blinks out first).
  const [last, setLast] = useState(error)
  const [leaving, setLeaving] = useState<ReactNode>()
  if (error !== last) {
    setLast(error)
    setLeaving(error || hint ? undefined : last)
  }
  const own = useRef<HTMLParagraphElement>(null)
  useLayoutEffect(() => {
    const el = own.current
    if (!leaving || !el) return
    let live = true
    leave(el).then(() => (live ? setLeaving(undefined) : el.style.removeProperty('display')))
    // An error that comes back before it's gone stays.
    return () => {
      live = false
      el.getAnimations().forEach(a => a.cancel())
    }
  }, [leaving])
  if (error) return <p ref={own} className="pc-field-error" id={id}>{error}</p>
  if (hint) return <p ref={own} className="pc-field-hint" id={id}>{hint}</p>
  if (leaving) return <p ref={own} className="pc-field-error" id={id}>{leaving}</p>
  return null
}

/** A field shows either its visible label or, without one (quick add), an aria-label. */
export type Labelled = { label: ReactNode; 'aria-label'?: never } | { label?: never; 'aria-label': string }
