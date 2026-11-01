import {
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Pagination,
  PaginationBar,
  PaginationMore,
  ProgressBar,
  ProgressIndicator,
  RowLink,
  Stack,
  Table,
  TableActions,
  TableCheck,
  TableEmpty,
  Td,
  Th,
  Toolbar,
  ToolbarDivider,
} from '../../react/src/index'
import { CalendarDotsIcon, DotsThreeIcon, SortAscendingIcon, TextBIcon, TextItalicIcon } from '@phosphor-icons/react'
import { useState } from 'react'

const USERS = [
  { email: 'ana@example.com', sessions: 2 },
  { email: 'andrei@example.com', sessions: 1 },
  { email: 'alina@example.com', sessions: 4 },
]

export function Data() {
  const [picked, setPicked] = useState<string[]>(['ana@example.com'])
  const [sort, setSort] = useState<'ascending' | 'descending'>('ascending')
  const [chips, setChips] = useState(['1 day before', 'On the day'])
  const rows = [...USERS].sort((a, b) => (sort === 'ascending' ? 1 : -1) * a.email.localeCompare(b.email))
  const toggle = (email: string) =>
    setPicked(picked.includes(email) ? picked.filter(p => p !== email) : [...picked, email])

  return (
    <>
      <Card title="Table" rows>
        <Table>
          <thead>
            <tr>
              <TableCheck
                header
                aria-label="Select all"
                checked={picked.length === USERS.length}
                indeterminate={picked.length > 0 && picked.length < USERS.length}
                onChange={() => setPicked(picked.length === USERS.length ? [] : USERS.map(u => u.email))}
              />
              <Th sort={sort} onSort={() => setSort(sort === 'ascending' ? 'descending' : 'ascending')}>
                Email
              </Th>
              <Th num>Sessions</Th>
              <TableActions header />
            </tr>
          </thead>
          <tbody>
            {rows.map(user => (
              <tr key={user.email} aria-selected={picked.includes(user.email)}>
                <TableCheck
                  aria-label={`Select ${user.email}`}
                  checked={picked.includes(user.email)}
                  onChange={() => toggle(user.email)}
                />
                <Td>
                  <RowLink href="/design">{user.email}</RowLink>
                </Td>
                <Td num>{user.sessions}</Td>
                <TableActions>
                  <Button variant="ghost" size="small" icon={<DotsThreeIcon />} label={`Actions for ${user.email}`} />
                </TableActions>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card title="Table, empty" rows>
        <Table>
          <thead>
            <tr>
              <Th>Job</Th>
              <Th>Failed</Th>
            </tr>
          </thead>
          <tbody>
            <TableEmpty columns={2} title="No failed jobs" description="Jobs that fail show up here." />
          </tbody>
        </Table>
      </Card>

      <Card title="Pagination">
        <Stack gap={4}>
          <Pagination page={5} pages={20} href={page => `/design?page=${page}`} />
          <Pagination compact page={5} pages={20} href={page => `/design?page=${page}`} />
          <PaginationBar count="81–100 of 394">
            <Pagination arrows numbers={false} page={5} pages={20} href={page => `/design?page=${page}`} />
          </PaginationBar>
          <PaginationMore count="40 of 134" onClick={() => {}}>
            Show 20 more
          </PaginationMore>
        </Stack>
      </Card>

      <Card title="Progress">
        <Stack gap={4}>
          <ProgressBar label="Uploading Contract.pdf" value={64} />
          <ProgressBar label="Uploading Plan.png" value={30} error="The upload stopped. Try again." />
          <ProgressBar small aria-label="Loading" />
          <ProgressIndicator
            steps={[{ label: 'Account', state: 'done' }, { label: 'Profile', state: 'current' }, { label: 'Apps' }]}
          />
          <ProgressIndicator
            compact
            steps={[{ label: 'Account', state: 'done' }, { label: 'Profile', state: 'current' }, { label: 'Apps' }]}
          />
        </Stack>
      </Card>

      <Card title="Breadcrumbs, chips, button group, toolbar">
        <Stack gap={4}>
          <Breadcrumbs
            parents={[
              { label: 'Users', href: '/design' },
              { label: 'ana@example.com', href: '/design' },
            ]}
            current="Edit"
          />
          <Stack row>
            {chips.map(label => (
              <Chip
                key={label}
                icon={<CalendarDotsIcon />}
                removeLabel={`Remove reminder ${label}`}
                onRemove={() => setChips(chips.filter(c => c !== label))}
              >
                {label}
              </Chip>
            ))}
          </Stack>
          <ButtonGroup>
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save</Button>
          </ButtonGroup>
          <Toolbar>
            <Button variant="ghost" icon={<TextBIcon />} label="Bold" pressed />
            <Button variant="ghost" icon={<TextItalicIcon />} label="Italic" pressed={false} />
            <ToolbarDivider />
            <Button variant="ghost" icon={<SortAscendingIcon />} label="Sort" />
          </Toolbar>
        </Stack>
      </Card>
    </>
  )
}
