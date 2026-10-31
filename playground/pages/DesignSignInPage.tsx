import { Button, Link, SignedOut, SignInPassword, TextInput } from '../../react/src/index'

// A signed-out page as an app builds it: SignedOut for the two halves, the app's own column inside. In an app, SignedOut is the
// pages' Inertia layout, so moving between sign in and sign up keeps the left half as it is.
export function DesignSignInPage() {
  return (
    <SignedOut onSubmit={event => event.preventDefault()}>
      <div style={{ display: 'grid', gap: 'var(--pc-space-1)' }}>
        <h1 className="pc-page-title">Sign in</h1>
        <p className="pc-muted">
          New here? <Link href="/design/sign-in">Create an account</Link>
        </p>
      </div>
      <TextInput label="Email" type="email" autoComplete="email" placeholder="ana@example.com" />
      <SignInPassword forgotHref="/design/sign-in" />
      <Button variant="primary" full type="submit">
        Sign in
      </Button>
    </SignedOut>
  )
}
