import { useId, type ReactNode } from 'react'

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

/** The error under a field, or its hint when there's no error. */
export function FieldMessage({ id, hint, error }: { id: string; hint?: ReactNode; error?: ReactNode }) {
  if (error) return <p className="pc-field-error" id={id}>{error}</p>
  if (hint) return <p className="pc-field-hint" id={id}>{hint}</p>
  return null
}

/** A field shows either its visible label or, without one (quick add), an aria-label. */
export type Labelled = { label: ReactNode; 'aria-label'?: never } | { label?: never; 'aria-label': string }
