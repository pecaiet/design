import { Button, ErrorPage } from '../index'

export function DesignErrorPage() {
  return (
    <ErrorPage
      title="Can’t sign in to this app"
      description="The app sent you here with a request we don’t accept."
      code="invalid_redirect_uri"
      codeDescription="The redirect URI isn’t one of the app’s."
      action={
        <Button variant="outline" href="/design">
          Back to the design
        </Button>
      }
    />
  )
}
