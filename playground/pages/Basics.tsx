import {
  Alert,
  Avatar,
  Avatars,
  Badge,
  Button,
  Card,
  Checkbox,
  Link,
  Separator,
  Spinner,
  Stack,
  Textarea,
  TextInput,
} from '../../react/src/index'
import { CaretDown, CaretRight, Copy, DotsThree, DownloadSimple, Plus, TextB } from '@phosphor-icons/react'
import { useState } from 'react'

export function Basics() {
  const [saving, setSaving] = useState(false)
  const [bold, setBold] = useState(false)
  const [alerts, setAlerts] = useState(['Your password was changed.'])
  const [email, setEmail] = useState('ana@example')
  const [notes, setNotes] = useState('A short note.')

  const save = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 2000)
  }
  const addAlert = () => setAlerts([...alerts, `Saved at ${new Date().toLocaleTimeString()}.`])

  return (
    <>
      <Card title="Button" description="Styles, sizes, icons and states.">
        <Stack>
          <Stack row>
            <Button variant="primary">Save email</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="ghost">Sign out</Button>
            <Button variant="destructive">Delete account</Button>
            <Button variant="primary" destructive>
              Delete user
            </Button>
          </Stack>
          <Stack row>
            <Button variant="outline" size="small">
              Small
            </Button>
            <Button variant="outline">Default</Button>
            <Button variant="outline" size="large">
              Large
            </Button>
            <Button variant="primary" icon={<Plus />}>
              New list
            </Button>
            <Button variant="outline" iconAfter={<CaretDown />}>
              Sort
            </Button>
            <Button variant="ghost" icon={<DotsThree />} label="More" />
            <Button variant="outline" icon={<Copy />} label="Copy" />
          </Stack>
          <Stack row>
            <Button variant="primary" busy={saving} onClick={save}>
              {saving ? 'Saving…' : 'Save (2s)'}
            </Button>
            <Button variant="ghost" icon={<TextB />} label="Bold" pressed={bold} onClick={() => setBold(!bold)} />
            <Button variant="outline" disabled>
              Disabled
            </Button>
            <Button variant="primary" disabledReason="Fill in your email first">
              Save email
            </Button>
            <Button variant="outline" href="/" iconAfter={<CaretRight />}>
              Inertia link to /
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Card
        title="Alert"
        description="Dismiss one: it shrinks out, then leaves state."
        action={
          <Button variant="outline" size="small" onClick={addAlert}>
            Add one
          </Button>
        }
      >
        <Stack>
          {alerts.map(text => (
            <Alert key={text} kind="notice" enter onDismiss={() => setAlerts(alerts.filter(a => a !== text))}>
              {text}
            </Alert>
          ))}
          <Alert kind="warning">Your session ends in 5 minutes. Save your changes.</Alert>
          <Alert kind="error" title="Couldn’t save the list">
            Something went wrong on our side. Try again in a minute.
          </Alert>
          <Alert
            kind="error"
            items={['Email: enter an email like name@example.com.', 'Password: at least 12 characters.']}
          >
            Fix these 2 fields to create your account:
          </Alert>
          <Alert kind="notice" action={{ label: 'Unarchive', onClick: () => {} }}>
            This list is archived.
          </Alert>
        </Stack>
      </Card>

      <Card
        title="Email address"
        description="Used to sign in and for password resets."
        footerNote="Changed 3 days ago"
        footer={
          <>
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save email</Button>
          </>
        }
      >
        <Stack>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            error={email.includes('.') ? undefined : 'Enter an email like name@example.com.'}
          />
          <TextInput label="Website" optional placeholder="https://example.com" hint="Shown on your profile." />
          <TextInput label="Client ID" defaultValue="pc_7f3a9c2e41" readOnly />
          <Textarea
            label="Notes"
            limit={20}
            value={notes}
            onChange={event => setNotes(event.target.value)}
            hint="Only you can see these."
          />
          <Checkbox label="Confidential client" hint="Can keep a secret, like a server-side app." />
          <Checkbox label="All lists" indeterminate />
          <Checkbox label="I agree to the terms" error="Tick this to continue." />
        </Stack>
      </Card>

      <Card title="Badge, Avatar, Spinner">
        <Stack>
          <Stack row>
            <Badge>3 open</Badge>
            <Badge variant="primary">Admin</Badge>
            <Badge variant="soft">Admin</Badge>
            <Badge variant="outline">User</Badge>
            <Badge variant="warning">Expires soon</Badge>
            <Badge variant="destructive">Failed</Badge>
            <Badge variant="primary" small>
              Pro
            </Badge>
          </Stack>
          <Stack row>
            <Avatar initials="AC" />
            <Avatar initials="AC" size="medium" online label="ana@example.com, online" />
            <Avatar
              initials="AC"
              size="large"
              badge={
                <Badge variant="primary" small>
                  Pro
                </Badge>
              }
            />
            <Avatar />
            <Avatar initials="TD" square size="medium" />
            <Avatars label="Ana, Andrei, Alina and 3 more" more={3}>
              <Avatar initials="AN" label="ana@example.com" />
              <Avatar initials="AD" label="andrei@example.com" />
              <Avatar initials="AL" label="alina@example.com" />
            </Avatars>
            <Avatars label="Ana, Andrei and 5 more" more={5} size="medium">
              <Avatar initials="AN" size="medium" label="ana@example.com" />
              <Avatar initials="AD" size="medium" label="andrei@example.com" />
            </Avatars>
            <Avatar initials="AC" size="medium" label="Assigned to ana@example.com. Change" onClick={() => {}} />
          </Stack>
          <Stack row>
            <Spinner size="small" />
            <Spinner />
            <Spinner size="large" />
          </Stack>
        </Stack>
      </Card>

      <Card title="Link and Separator">
        <Stack>
          <p>
            Forgot your password? <Link href="/">Reset it by email</Link>.
          </p>
          <p>
            <Link href="/" iconAfter={<CaretRight />}>
              View all
            </Link>
          </p>
          <p>
            Read the{' '}
            <Link href="https://example.com" external>
              privacy policy
            </Link>{' '}
            before you start.
          </p>
          <p>
            <Link href="/" icon={<DownloadSimple />}>
              Download as CSV
            </Link>
          </p>
          <p>
            Didn’t get the code? <Link onClick={() => {}}>Send it again</Link>
          </p>
          <Stack row>
            <Link href="/" quiet>
              Privacy
            </Link>
            <Link href="/" quiet>
              Terms
            </Link>
          </Stack>
          <Separator />
          <Stack row>
            Edited 2 hours ago
            <Separator vertical />3 comments
            <Separator vertical />
            Shared with Ana
          </Stack>
          <Separator>or</Separator>
          <Separator bleed />
        </Stack>
      </Card>
    </>
  )
}
