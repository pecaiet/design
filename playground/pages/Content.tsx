import {
  Avatar,
  Card,
  Code,
  CodeBlock,
  Details,
  EmptyState,
  Heading,
  Image,
  Kbd,
  List,
  Quote,
  Secret,
  Skeleton,
  Stack,
  VisuallyHidden,
} from '../../react/src/index'
import todo from '../../appicons/todo.svg'

export function Content() {
  return (
    <>
      <Card title="Heading">
        <Stack>
          <Heading page>Account</Heading>
          <Heading description="How you get into pe caiet.">Sign-in</Heading>
        </Stack>
      </Card>

      <Card title="Code">
        <Stack>
          <p>
            Your client ID is <Code>pc_7f3a9c2e41</Code>. Press <Kbd>Esc</Kbd> to close.
          </p>
          <CodeBlock>{'Started GET "/up" for 127.0.0.1\nCompleted 200 OK in 2ms'}</CodeBlock>
          <Secret value="sk_live_9f8e7d6c5b4a">Copy the secret now. It won’t be shown again.</Secret>
        </Stack>
      </Card>

      <Card title="Quote">
        <Stack gap={4}>
          <Quote name="Ana Pop" source="Head of IT" avatar={<Avatar initials="AP" />}>
            One account for every app saved us a week of setup.
          </Quote>
          <Quote variant="pull">Roomy, soft and calm.</Quote>
        </Stack>
      </Card>

      <Card title="List and details">
        <Stack gap={4}>
          <List items={['Open the app', 'Sign in with pe caiet', 'Pick a list']} />
          <List numbered items={['Regenerate the secret', 'Put it in the app']} />
          <Details
            items={[
              { label: 'Client ID', value: <Code>pc_7f3a9c2e41</Code> },
              { label: 'Created', value: '14 Oct 2026' },
              { label: 'Website', value: null },
            ]}
          />
        </Stack>
      </Card>

      <Card title="Image">
        <Stack row>
          <Image src={todo} alt="The todo mark" width={96} height={96} caption="The todo mark" />
          <Image alt="Nothing yet" width={96} height={72} />
        </Stack>
      </Card>

      <Card title="Empty state and skeleton">
        <Stack gap={4}>
          <EmptyState title="No tasks yet" description="Tasks you add show up here." />
          <Stack gap={2} aria-busy="true">
            <Skeleton shape="title" style={{ width: '40%' }} />
            <Skeleton shape="line" style={{ width: '90%' }} />
            <Skeleton shape="line" style={{ width: '70%' }} />
          </Stack>
        </Stack>
      </Card>

      <Card title="Visually hidden">
        <p>
          3<VisuallyHidden> open tasks</VisuallyHidden> (a screen reader hears “3 open tasks”).
        </p>
      </Card>
    </>
  )
}
