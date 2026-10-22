import { WarningCircle } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { Code } from './Code'
import { SignedOut, type SignedOutProps } from './SignIn'

type ErrorCode =
  /** The machine's code ("invalid_redirect_uri"), with its description muted under it. */
  | { code: string; codeDescription?: ReactNode }
  | { code?: never; codeDescription?: never }

export type ErrorPageProps = Omit<SignedOutProps, 'paused' | 'onSubmit' | 'children' | 'title'> & ErrorCode & {
  /** What went wrong: "Can't sign in to this app". */
  title: ReactNode
  /** What happened and what to do, in one or two sentences. */
  description: ReactNode
  /** The one way back: <Button variant="outline" href="/">Back to your account</Button>. */
  action: ReactNode
}

/** A signed-out page that says something went wrong and what to do: the sign-in layout with one card. */
export function ErrorPage({ title, description, code, codeDescription, action, ...layout }: ErrorPageProps) {
  return (
    <SignedOut {...layout} paused>
      <div className="pc-card">
        <div className="pc-card-header">
          {/* pecaiet.css has no class for the round warning mark. */}
          <span
            aria-hidden="true"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 'var(--pc-size-48)',
              height: 'var(--pc-size-48)',
              marginBottom: 'var(--pc-space-2)',
              borderRadius: 'var(--pc-radius-full)',
              background: 'var(--destructive-soft)',
              color: 'var(--destructive)',
            }}
          >
            <WarningCircle style={{ width: 'var(--pc-size-24)', height: 'var(--pc-size-24)' }} />
          </span>
          <h1 className="pc-page-title">{title}</h1>
          <p className="pc-page-description">{description}</p>
        </div>
        <div className="pc-card-content">
          {code && <p>Error code: <Code>{code}</Code></p>}
          {codeDescription && <p className="pc-muted">{codeDescription}</p>}
          <div>{action}</div>
        </div>
      </div>
    </SignedOut>
  )
}
