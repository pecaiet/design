import { AppLogo, Card, Footer, Header, PeCaietMark, PeCaietWord, Stack, ThemeSwitch, TodoMark, TodoWord } from '../../react/src/index'

const ACCOUNT = { email: 'ana@example.com', settingsHref: '/design?settings', signOutHref: '/design' }

export function Shell() {
  return (
    <>
      <Card title="App logo">
        <Stack row>
          <AppLogo mark={<PeCaietMark />}>pe caiet</AppLogo>
          <AppLogo mark={<TodoMark />}>todo</AppLogo>
        </Stack>
      </Card>

      <Card title="Header" rows>
        <Header account={ACCOUNT} />
      </Card>

      <Card title="Theme switch">
        <ThemeSwitch />
      </Card>

      <Card title="Footer" rows>
        <Stack gap={6}>
          <Footer
            word={<PeCaietWord />}
            copyright="© 2026 pe caiet"
            language="English"
            groups={[
              {
                heading: 'Apps',
                links: [
                  { label: 'todo', href: '/design' },
                  { label: 'idp', href: '/design' },
                ],
              },
              {
                heading: 'About',
                links: [
                  { label: 'Privacy', href: '/design' },
                  { label: 'Terms', href: '/design' },
                ],
              },
            ]}
          />
          <Footer
            word={<TodoWord />}
            copyright="© 2026 todo"
            links={[
              { label: 'Privacy', href: '/design' },
              { label: 'Help', href: '/design' },
            ]}
          />
        </Stack>
      </Card>
    </>
  )
}
