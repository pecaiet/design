import { WarningCircle } from '@phosphor-icons/react'
import { Button, Code, SignedOut } from '../../react/src/index'

// An error page as an app builds it (idp's "Can't sign in to this app"): SignedOut, paused on the first app, with one card.
export function DesignErrorPage() {
  return (
    <SignedOut paused>
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
          <h1 className="pc-page-title">Can’t sign in to this app</h1>
          <p className="pc-page-description">The app sent you here with a request we don’t accept.</p>
        </div>
        <div className="pc-card-content">
          <p>
            Error code: <Code>invalid_redirect_uri</Code>
          </p>
          <p className="pc-muted">The redirect URI isn’t one of the app’s.</p>
          <div>
            <Button variant="outline" href="/design">
              Back to the design
            </Button>
          </div>
        </div>
      </div>
    </SignedOut>
  )
}
