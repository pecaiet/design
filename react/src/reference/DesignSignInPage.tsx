import { Button, Link, SignIn as SignInPage, SignInPassword, TextInput } from '../index'

export function DesignSignInPage() {
  return (
    <SignInPage
      title="Sign in"
      description={
        <>
          New here? <Link href="/design/sign-in">Create an account</Link>
        </>
      }
      onSubmit={event => event.preventDefault()}
    >
      <TextInput label="Email" type="email" autoComplete="email" placeholder="ana@example.com" />
      <SignInPassword forgotHref="/design/sign-in" />
      <Button variant="primary" full type="submit">
        Sign in
      </Button>
    </SignInPage>
  )
}
