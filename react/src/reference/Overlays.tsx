import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Carousel,
  Combobox,
  DateInput,
  Datepicker,
  type DateRange,
  Drawer,
  DropdownMenu,
  Link,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  Modal,
  Popover,
  SearchWindow,
  Select,
  Stack,
  TabLinks,
  TabPanel,
  Tabs,
  TextInput,
  Tooltip,
  TreeView,
  useToast,
  Video,
} from '../index'
import { Archive, CheckSquare, DotsThree, Folder, ListChecks, PencilSimple, Trash } from '@phosphor-icons/react'
import { useState } from 'react'

const COLOURS = [
  { value: 'red', label: 'Red', colour: 'red' as const },
  { value: 'green', label: 'Green', colour: 'green' as const },
  { value: 'blue', label: 'Blue', colour: 'blue' as const },
]
const LABELS = ['Home', 'Work', 'Errands', 'Health'].map(label => ({ value: label.toLowerCase(), label }))

export function Overlays() {
  const toast = useToast()
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [search, setSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [colour, setColour] = useState<string | null>('green')
  const [list, setList] = useState<string | null>('work')
  const [labels, setLabels] = useState<string[]>(['home'])
  const [day, setDay] = useState<Date | null>(new Date())
  const [due, setDue] = useState<Date | null>(null)
  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  const [tab, setTab] = useState('open')
  const [view, setView] = useState('List')

  return (
    <>
      <Card title="Tooltip, menu, popover">
        <Stack row>
          <Tooltip text="Sort by date" side="bottom">
            <Link onClick={() => {}}>Hover me</Link>
          </Tooltip>
          <DropdownMenu
            trigger={<Button variant="ghost" icon={<DotsThree />} label="List actions" />}
            title="Birthday present"
          >
            <MenuItem icon={<PencilSimple />} onClick={() => toast({ text: 'Rename' })}>
              Rename
            </MenuItem>
            <MenuItem icon={<Archive />} onClick={() => toast({ text: 'Archived', tone: 'success' })}>
              Archive
            </MenuItem>
            <MenuSeparator />
            <MenuLabel>View</MenuLabel>
            {['List', 'Board'].map(option => (
              <MenuItem key={option} checked={view === option} onClick={() => setView(option)}>
                {option}
              </MenuItem>
            ))}
            <MenuSeparator />
            <MenuItem destructive icon={<Trash />} onClick={() => toast({ text: 'Deleted', tone: 'error' })}>
              Delete
            </MenuItem>
          </DropdownMenu>
          <Popover
            trigger={<Button variant="outline">What’s this?</Button>}
            title="Shared lists"
            text="Everyone you share a list with can add and tick tasks."
          />
        </Stack>
      </Card>

      <Card title="Modal, drawer, search window, toast">
        <Stack row>
          <Button variant="outline" onClick={() => setModal(true)}>
            Open modal
          </Button>
          <Button variant="outline" onClick={() => setDrawer(true)}>
            Open drawer
          </Button>
          <Button variant="outline" onClick={() => setSearch(true)}>
            Open search
          </Button>
          <Button
            variant="outline"
            onClick={() => toast({ text: 'Task added', tone: 'success', action: { label: 'Undo', onClick: () => {} } })}
          >
            Show a toast
          </Button>
        </Stack>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          title="Rename list"
          description="Everyone it’s shared with sees the new name."
          actions={
            <>
              <Button variant="outline" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setModal(false)}>
                Rename
              </Button>
            </>
          }
        >
          <TextInput label="Name" defaultValue="Birthday present" />
        </Modal>
        <Drawer
          open={drawer}
          onClose={() => setDrawer(false)}
          title="Task"
          footer={
            <Button variant="primary" onClick={() => setDrawer(false)}>
              Done
            </Button>
          }
        >
          <TextInput label="Title" defaultValue="Buy a cake" />
        </Drawer>
        <SearchWindow
          open={search}
          onClose={() => setSearch(false)}
          query={query}
          onQueryChange={setQuery}
          placeholder="Search tasks"
          groups={
            query
              ? [
                  {
                    label: 'Tasks',
                    count: 2,
                    results: [
                      { id: '1', title: `${query} for Ana`, href: '/design' },
                      { id: '2', title: `Plan ${query}`, href: '/design' },
                    ],
                  },
                ]
              : []
          }
        />
      </Card>

      <Card title="Select, combobox">
        <Stack>
          <Select label="Colour" options={COLOURS} value={colour} onChange={setColour} none="No colour" />
          <Combobox label="List" search="Search lists" options={LABELS} value={list} onChange={setList} />
          <Combobox
            multiple
            label="Labels"
            search="Search labels"
            placeholder="Add a label"
            options={LABELS}
            value={labels}
            onChange={setLabels}
          />
          <Select
            label="Priority"
            options={[{ value: 'high', label: 'High' }]}
            value={null}
            onChange={() => {}}
            placeholder="Pick one"
            error="Pick a priority."
          />
        </Stack>
      </Card>

      <Card title="Datepicker, date input">
        <Stack gap={4}>
          <Datepicker value={day} onChange={setDay} />
          <DateInput label="Due" value={due} onChange={setDue} name="due_on" />
          <Popover trigger={<Button variant="outline">Pick a range</Button>} title="Dates">
            <Datepicker range value={range} onChange={setRange} />
          </Popover>
        </Stack>
      </Card>

      <Card title="Tabs, accordion, tree">
        <Stack gap={4}>
          <Tabs
            label="Tasks"
            value={tab}
            onChange={setTab}
            tabs={[
              { value: 'open', label: 'Open', count: 3 },
              { value: 'done', label: 'Done' },
            ]}
          >
            <TabPanel value="open">Three open tasks.</TabPanel>
            <TabPanel value="done">Nothing done yet.</TabPanel>
          </Tabs>
          <TabLinks
            label="Settings"
            tabs={[
              { href: '/design', label: 'Account', current: true },
              { href: '/design', label: 'Sessions' },
            ]}
          />
          <Accordion>
            <AccordionItem summary="Who can see my lists?">Only the people you share them with.</AccordionItem>
            <AccordionItem summary="Can I undo a delete?">Tasks come back with Undo; lists don’t.</AccordionItem>
          </Accordion>
          <TreeView
            label="Lists"
            defaultExpanded={['home']}
            items={[
              {
                id: 'home',
                label: 'Home',
                icon: <Folder />,
                count: 3,
                children: [
                  { id: 'groceries', label: 'Groceries', icon: <ListChecks />, count: 2 },
                  { id: 'garden', label: 'Garden', icon: <CheckSquare /> },
                ],
              },
              { id: 'work', label: 'Work', icon: <Folder />, count: 1 },
            ]}
          />
        </Stack>
      </Card>

      <Card title="Carousel, video">
        <Stack gap={4}>
          <Carousel
            label="Apps"
            slides={[
              { label: 'todo', content: <p>Lists and tasks.</p> },
              { label: 'pe caiet', content: <p>Notes.</p> },
            ]}
          />
          <Video title="A tour of todo" duration={125} />
        </Stack>
      </Card>
    </>
  )
}
