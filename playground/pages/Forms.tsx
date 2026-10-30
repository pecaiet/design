import {
  Button,
  Card,
  ColorPicker,
  type ColorPickerProps,
  CopyInput,
  Fieldset,
  FileRow,
  Files,
  FileUpload,
  InputGroup,
  InputRow,
  Kbd,
  Label,
  Link,
  PasswordInput,
  RadioButton,
  Rating,
  RatingInput,
  SearchInput,
  SegmentedControl,
  Slider,
  SliderRange,
  Stack,
  Stepper,
  Toggle,
} from '../../react/src/index'
import todo from '../../todo.svg'
import { Kanban, List as ListIcon, Plus } from '@phosphor-icons/react'
import { useState } from 'react'

export function Forms() {
  const [query, setQuery] = useState('')
  const [weekly, setWeekly] = useState(true)
  const [reminders, setReminders] = useState(2)
  const [range, setRange] = useState<[number, number]>([2, 7])
  const [view, setView] = useState('list')
  const [colour, setColour] = useState<ColorPickerProps['value']>('teal')
  const [stars, setStars] = useState(4)
  const [files, setFiles] = useState(['Contract.pdf', 'Plan.png'])
  const [added, setAdded] = useState('')

  return (
    <>
      <Card title="Radio, fieldset, toggle">
        <Stack gap={4}>
          <Fieldset legend="Plan" layout="boxes">
            <RadioButton name="plan" value="free" label="Free" hint="One list, one person." defaultChecked />
            <RadioButton name="plan" value="team" label="Team" hint="Shared lists for everyone." />
          </Fieldset>
          <Fieldset legend="Theme" layout="row" error="Pick one to continue.">
            <RadioButton name="look" value="light" label="Light" />
            <RadioButton name="look" value="dark" label="Dark" />
          </Fieldset>
          <Toggle
            label="Weekly summary"
            hint="An email every Monday."
            checked={weekly}
            onChange={event => setWeekly(event.target.checked)}
          />
        </Stack>
      </Card>

      <Card title="Label, input group, password, copy, search">
        <Stack>
          <div className="pc-field">
            <Label htmlFor="design-recovery" optional action={<Link href="/design">Why we ask</Link>}>
              Recovery email
            </Label>
            <input id="design-recovery" className="pc-input" type="email" placeholder="ana@example.com" />
          </div>
          <InputGroup label="Website" before="https://" placeholder="example.com" />
          <InputGroup
            icon={<Plus />}
            aria-label="New task"
            placeholder="Add a task"
            end={<Kbd>⌘K</Kbd>}
            onAdd={setAdded}
            hint={added && `Added “${added}”.`}
          />
          <PasswordInput label="Password" autoComplete="current-password" defaultValue="correct-horse-7" />
          <CopyInput label="Client ID" value="pc_7f3a9c2e41" copyLabel="Copy client ID" />
          <InputRow>
            <InputGroup aria-label="Email to invite" placeholder="ana@example.com" />
            <Button variant="outline">Invite</Button>
          </InputRow>
          <SearchInput aria-label="Search users" value={query} onChange={event => setQuery(event.target.value)} />
        </Stack>
      </Card>

      <Card title="Slider, stepper, segmented, colour, rating">
        <Stack gap={4}>
          <Slider label="Volume" defaultValue={60} format={value => `${value}%`} />
          <Slider
            label="Remind me"
            max={7}
            step={1}
            defaultValue={3}
            marks
            ends={['On the day', 'A week before']}
            format={days => (days === 0 ? 'On the day' : `${days} days before`)}
          />
          <SliderRange
            label="Due in"
            max={14}
            value={range}
            onChange={setRange}
            format={([from, to]) => `${from} to ${to} days`}
          />
          <Stepper
            label="Reminders"
            min={0}
            max={5}
            value={reminders}
            onChange={event => setReminders(Number(event.target.value))}
            hint="Up to 5"
          />
          <SegmentedControl
            aria-label="View"
            value={view}
            onChange={setView}
            options={[
              { value: 'list', label: 'List', icon: <ListIcon /> },
              { value: 'board', label: 'Board', icon: <Kanban /> },
            ]}
          />
          <ColorPicker label="Colour" value={colour} onChange={setColour} />
          <Rating value={4.6} count="128 ratings" />
          <RatingInput label="Rate this app" value={stars} onChange={setStars} />
        </Stack>
      </Card>

      <Card title="Files">
        <Stack>
          <Files>
            <FileRow href={todo} name="Brand guide.pdf" size="240 KB" />
          </Files>
          <FileUpload label="Attachments" hint="PDF or image" multiple>
            <Files>
              {files.map(name => (
                <FileRow key={name} name={name} size="12 KB" onRemove={() => setFiles(files.filter(f => f !== name))} />
              ))}
            </Files>
          </FileUpload>
        </Stack>
      </Card>
    </>
  )
}
