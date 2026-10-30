import {
  Button,
  Card,
  IdpMark,
  Navigation,
  PageHeader,
  PeCaietMark,
  SettingsModal,
  SidebarItem,
  SidebarSection,
  Stack,
  TextInput,
  TodoMark,
} from '../../react/src/index'
import { usePhone } from '../../react/src/shell'
import { CalendarDots, Devices, Gear, Palette, Plus, Tray, UserCircle } from '@phosphor-icons/react'
import { useState } from 'react'

const ACCOUNT = { email: 'ana@example.com', settingsHref: '/design/app', signOutHref: '/design', adminHref: '/design' }

// The app shell: sidebar, page header and the settings window, as an Inertia app would use them.
export function DesignAppPage() {
  const [settings, setSettings] = useState(false)
  const [section, setSection] = useState('Account')
  const phone = usePhone()

  return (
    <Navigation
      switcher={{
        current: 'todo',
        home: { name: 'pe caiet', href: '/design', mark: <PeCaietMark /> },
        apps: [
          { name: 'todo', href: '/design/app', mark: <TodoMark /> },
          { name: 'idp', href: '/design/app', mark: <IdpMark /> },
        ],
      }}
      actions={
        <SidebarItem icon={<Plus />} onClick={() => {}}>
          New list
        </SidebarItem>
      }
      items={
        <>
          <SidebarItem href="/design/app" icon={<Tray />} detail={2} current>
            Inbox
          </SidebarItem>
          <SidebarItem href="/design/app" icon={<CalendarDots />} detail={4} alert>
            Today
          </SidebarItem>
          <SidebarSection heading="Lists">
            <SidebarItem href="/design/app" mark="H" detail={3}>
              Home
            </SidebarItem>
            <SidebarItem href="/design/app" mark="W">
              Work
            </SidebarItem>
          </SidebarSection>
        </>
      }
      account={ACCOUNT}
    >
      <div style={{ padding: phone ? 'var(--pc-space-4)' : 'var(--pc-space-8)' }}>
        <Stack gap={6}>
          <PageHeader
            title="Inbox"
            description="Everything that isn’t in a list yet."
            breadcrumbs={{ parents: [{ label: 'Design', href: '/design' }], current: 'Inbox' }}
            actions={
              <Button variant="outline" icon={<Gear />} onClick={() => setSettings(true)}>
                Settings
              </Button>
            }
          />
          <Card title="Two tasks" description="Open the settings window from the page header.">
            <p>Buy a cake · Call Dan</p>
          </Card>
        </Stack>
      </div>

      <SettingsModal
        open={settings}
        onClose={() => setSettings(false)}
        email={ACCOUNT.email}
        sections={[
          { label: 'Account', href: '/design/app', icon: <UserCircle />, current: section === 'Account' },
          { label: 'Sessions', href: '/design/app', icon: <Devices />, current: section === 'Sessions' },
          { label: 'Preferences', href: '/design/app', icon: <Palette />, current: section === 'Preferences' },
        ]}
        onClickCapture={event => {
          // The demo has no settings pages behind these links: switch the section here instead of visiting.
          const link = (event.target as Element).closest('a')
          if (link?.textContent) {
            event.preventDefault()
            setSection(link.textContent.trim())
          }
        }}
      >
        <Card title={section}>
          <TextInput label="Email" defaultValue={ACCOUNT.email} />
        </Card>
      </SettingsModal>
    </Navigation>
  )
}
