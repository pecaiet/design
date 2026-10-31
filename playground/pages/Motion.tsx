import { Alert, Badge, Button, Card, DropdownMenu, leave, Link, MenuItem, Stack, Table, Td, Th, Toggle } from '../../react/src/index'
import { Info } from '@phosphor-icons/react'
import { useState, type CSSProperties, type ReactNode } from 'react'

type Row = {
  what: string
  looks: string
  time: string
  /** Where to watch it: a section of this page (#…), another playground page, or what to do. */
  tryIt?: [string, string] | string
  /** An exception to the rule its kind follows. */
  bends?: boolean
}

const KINDS: { title: string; description: string; rows: Row[] }[] = [
  {
    title: 'Change: a colour or a small mark',
    description: 'Hover, focus, a tick, an icon swapped in a button.',
    rows: [
      { what: 'Hover and focus', looks: 'Buttons, links, fields, rows, tabs and chips fade their fill, text, border and ring to the new colour. Error red, disabled dimming and a quiet link’s underline fade the same way.', time: '120ms', tryIt: ['Basics', '#basics'] },
      { what: 'Checkbox and radio tick', looks: 'The tick, a checkbox’s “some” dash and a radio’s dot fade in, and out again.', time: '120ms', tryIt: ['Basics', '#basics'] },
      { what: 'Icon swapped in a button', looks: 'A copy turning into a tick, an icon turning into the spinner, a sort arrow, a file row’s download icon, a search’s spinner and ×: the new icon fades in.', time: '120ms', tryIt: ['Basics', '#basics'] },
      { what: 'Arrows', looks: 'The accordion’s, the tree’s, the Select’s and the Combobox’s arrow turns. A place picker’s up-down caret stays.', time: '120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Carousel dots', looks: 'The chosen dot widens and turns teal.', time: '120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Rating stars, colour swatches', looks: 'The star fills in; the swatch’s ring fades.', time: '120ms', tryIt: ['Forms', '#forms'] },
    ],
  },
  {
    title: 'Fade: something appears in place',
    description: 'Menus, popovers, dialogs, tooltips, tab panels, chips.',
    rows: [
      { what: 'Menu, popover', looks: 'Fades in, and out when closed. On phones it’s a sheet that slides up instead.', time: '120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Modal, settings window, search window', looks: 'Fades in while the page dims behind it. On phones a sheet (the search window: full screen).', time: '120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Tooltip', looks: 'Fades in after a wait under the pointer; at once on keyboard focus.', time: '120ms, after 120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Tab panel, carousel slide', looks: 'The new one fades in.', time: '120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Content replacing a skeleton', looks: 'Fades in where the skeleton was.', time: '120ms' },
      { what: 'Image loaded', looks: 'The picture fades in over its grey box.', time: '120ms', tryIt: ['Content', '#content'] },
      { what: 'Video play button', looks: 'Fades out, with the length, when the video starts.', time: '120ms' },
      { what: 'Chip added or removed', looks: 'Fades in or out in place; the chips after it jump.', time: '120ms', tryIt: ['Data', '#data'], bends: true },
      { what: 'Table row added or removed', looks: 'Fades; the rows below jump. A table row can’t shrink.', time: '120ms', bends: true },
    ],
  },
  {
    title: 'Grow: something takes room or gives it back',
    description: 'It fades as it grows or shrinks, in one motion, and what’s below glides.',
    rows: [
      { what: 'Row, file, sidebar or menu item, alert being added', looks: 'Grows from nothing while it fades in; what’s below glides down. Only when the app says it’s new, so a page drawn again never moves row by row.', time: '120ms', tryIt: ['Forms', '#forms'] },
      { what: 'Anything removed', looks: 'An alert’s ×, a toast’s ×, a row, a fixed field’s error: shrinks to nothing while it fades out; what’s below glides up.', time: '120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Toast, field error', looks: 'Always grow in when they appear: they’re news. An error that replaces a hint takes its line and fades to red.', time: '120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Accordion answer, tree branch', looks: 'Grows open and shrinks closed; the rows below glide. One open at a time: the open one shrinks while the new one grows.', time: '120ms', tryIt: ['Overlays', '#overlays'] },
    ],
  },
  {
    title: 'Slide: from an edge, or to a new place',
    description: 'The drawer, sheets, the sidebar, the switch, the tab line.',
    rows: [
      { what: 'Drawer', looks: 'In from the right edge while the page dims; out the same way.', time: '120ms', tryIt: ['Overlays', '#overlays'] },
      { what: 'Drawer beside the page', looks: 'Slides in from the right while the page narrows, and out while it widens.', time: '120ms' },
      { what: 'Sidebar', looks: 'Slides out to the left while the page widens, and back.', time: '120ms', tryIt: ['The app', '/design/app'] },
      { what: 'Phone sheets', looks: 'Menus, popovers, dialogs and the date picker slide up from the bottom, and back down.', time: '120ms', tryIt: 'Any menu, in a narrow window' },
      { what: 'Phone sidebar, settings menu', looks: 'Slide in from the left.', time: '120ms', tryIt: ['The app', '/design/app'] },
      { what: 'Skip link', looks: 'Slides down into view on the first Tab.', time: '120ms', tryIt: 'Tab, from the top of this page' },
      { what: 'Switch knob, segmented pill, tab line', looks: 'Slide to the new choice.', time: '120ms', tryIt: ['Forms', '#forms'] },
      { what: 'Progress bar', looks: 'The teal part grows to the new value.', time: '120ms', tryIt: ['Data', '#data'] },
    ],
  },
  {
    title: 'Loading and pages',
    description: 'The loops, and the whole page.',
    rows: [
      { what: 'Spinner', looks: 'Turns, without easing.', time: '0.84s a turn (×7)', tryIt: ['Basics', '#basics'] },
      { what: 'Skeleton', looks: 'Pulses to half strength and back.', time: '1.56s (×13)', tryIt: ['Content', '#content'] },
      { what: 'Unknown progress', looks: 'A bar slides across, again and again.', time: '1.44s (×12)', tryIt: ['Data', '#data'] },
      { what: 'Light ↔ dark', looks: 'The whole page crossfades. Firefox changes at once.', time: '120ms', tryIt: ['App shell', '#shell'], bends: true },
      { what: 'Page to page', looks: 'Shows at once, going back the same as forward.', time: '0', tryIt: ['The app', '/design/app'] },
      { what: 'Same view, new data', looks: 'A new month in the date picker, rows sorted or filtered again: shows at once.', time: '0', tryIt: ['Overlays', '#overlays'] },
      { what: 'Jump to a section', looks: 'A # link or the skip link scrolls smoothly.', time: 'the browser’s', tryIt: 'The links at the top' },
      { what: 'Motion off', looks: 'Settings, or a device that asks for less: everything is instant, and the spinner still turns, slowly.', time: '0 (spinner 2.4s)', tryIt: ['The app’s settings', '/design/app'] },
    ],
  },
]

const CHECKS: { ok: boolean; title: string; detail: string }[] = [
  { ok: true, title: 'One speed and one curve everywhere.', detail: 'A tooltip waits 120ms too. Only the loops take longer, as fixed multiples of 120ms.' },
  { ok: true, title: 'The same kind of thing moves the same way everywhere.', detail: 'Every menu and popover fades on desktop and is a sliding sheet on phones; every slide comes from its own edge.' },
  { ok: false, title: 'Chips and table rows fade, then the rest jumps.', detail: 'Everything else that’s removed shrinks while what’s below glides. Chips: kept by choice. Table rows: HTML can’t shrink them.' },
  { ok: false, title: 'The light ↔ dark crossfade needs Chrome, Edge or Safari.', detail: 'Firefox has no view transitions, so its theme changes at once.' },
  { ok: false, title: 'A file list jumps 6px when its first file comes or its last goes.', detail: 'The row grows or shrinks, but the gap above the list comes and goes with the list itself, at once.' },
]

// Jumps within the page stay plain links: an Inertia visit would ask the server again.
const tryIt = (where: Row['tryIt']): ReactNode => {
  if (!where || typeof where === 'string') return where
  const [label, href] = where
  return href.startsWith('#') ? <a className="pc-link" href={href}>{label}</a> : <Link href={href}>{label}</Link>
}

// No class in pecaiet.css for a grid of cards, or for the box a sample sits in.
const GRID: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--pc-space-3)' }
const STAGE: CSSProperties = { display: 'grid', placeItems: 'center', minHeight: 'calc(2 * var(--pc-size-48))' }

/** One sample of each kind, on the real components, so they move exactly as the apps do. */
function Samples() {
  const [pressed, setPressed] = useState(false)
  const [added, setAdded] = useState(false)
  const [on, setOn] = useState(false)
  // Play's second press removes the alert the way its × does: it shrinks out, then it leaves the state.
  const remove = async () => {
    await leave(document.getElementById('motion-grow-added'))
    setAdded(false)
  }
  return (
    <div style={GRID}>
      <Card title="Change" description="A colour or a small mark changes.">
        <Stack>
          <div style={STAGE}>
            <Button variant="outline" pressed={pressed} onClick={() => setPressed(!pressed)}>
              Bold
            </Button>
          </div>
          <Button variant="outline" onClick={() => setPressed(!pressed)}>
            Play
          </Button>
        </Stack>
      </Card>
      <Card title="Fade" description="Something appears in place.">
        <Stack>
          <div style={STAGE}>
            <DropdownMenu trigger={<Button variant="outline">Play</Button>} title="Actions">
              <MenuItem>Edit</MenuItem>
              <MenuItem>Archive</MenuItem>
              <MenuItem destructive>Delete</MenuItem>
            </DropdownMenu>
          </div>
          <p className="pc-muted">The menu fades in and out.</p>
        </Stack>
      </Card>
      <Card title="Grow" description="Something takes room or gives it back.">
        <Stack>
          <Stack gap={2}>
            <Alert kind="warning">Your trial ends Friday.</Alert>
            {added && (
              <Alert id="motion-grow-added" kind="notice" enter onDismiss={() => setAdded(false)}>
                Task added. Remove it with Play or its ×.
              </Alert>
            )}
            <Alert kind="notice" icon={<Info />}>
              Synced 2 minutes ago.
            </Alert>
          </Stack>
          <Button variant="outline" onClick={added ? remove : () => setAdded(true)}>
            Play
          </Button>
        </Stack>
      </Card>
      <Card title="Slide" description="Something travels to a new place.">
        <Stack>
          <div style={STAGE}>
            <Toggle aria-label="A sample switch" checked={on} onChange={event => setOn(event.target.checked)} />
          </div>
          <Button variant="outline" onClick={() => setOn(!on)}>
            Play
          </Button>
        </Stack>
      </Card>
    </div>
  )
}

// Every animation, by kind: one speed (120ms), one curve (ease out). The speed control at the bottom left slows them all to 5s.
export function Motion() {
  return (
    <>
      <p className="pc-muted">One speed, 120ms, and one curve, ease out. Switch to 5s at the bottom left to watch each one frame by frame.</p>
      <Samples />
      {KINDS.map(kind => (
        <Card key={kind.title} title={kind.title} description={kind.description} rows>
          <Table>
            <thead>
              <tr>
                <Th>What</Th>
                <Th>How it looks</Th>
                <Th>Time</Th>
                <Th>Try it</Th>
              </tr>
            </thead>
            <tbody>
              {kind.rows.map(row => (
                <tr key={row.what}>
                  <Td>
                    {row.what}
                    {row.bends && (
                      <>
                        {' '}
                        <Badge variant="warning" small>
                          Bends
                        </Badge>
                      </>
                    )}
                  </Td>
                  <Td muted>{row.looks}</Td>
                  <Td>{row.time}</Td>
                  <Td>{tryIt(row.tryIt)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      ))}
      <Card title="Is it consistent?">
        <Stack>
          {CHECKS.map(check => (
            <Stack key={check.title} gap={1}>
              <Stack row>
                <Badge variant={check.ok ? 'primary' : 'warning'}>{check.ok ? 'Consistent' : 'Bends'}</Badge>
                <span>{check.title}</span>
              </Stack>
              <p className="pc-muted">{check.detail}</p>
            </Stack>
          ))}
        </Stack>
      </Card>
    </>
  )
}
