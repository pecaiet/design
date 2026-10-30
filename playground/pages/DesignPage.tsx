import { Heading, SkipLink, Stack } from '../../react/src/index'
import type { ReactNode } from 'react'
import { Basics } from './Basics'
import { Content } from './Content'
import { Data } from './Data'
import { Forms } from './Forms'
import { Motion } from './Motion'
import { Overlays } from './Overlays'
import { Shell } from './Shell'

const SECTIONS: { id: string; title: string; body: ReactNode }[] = [
  { id: 'basics', title: 'Basics', body: <Basics /> },
  { id: 'content', title: 'Content', body: <Content /> },
  { id: 'forms', title: 'Forms', body: <Forms /> },
  { id: 'data', title: 'Data', body: <Data /> },
  { id: 'overlays', title: 'Overlays', body: <Overlays /> },
  { id: 'shell', title: 'App shell', body: <Shell /> },
  { id: 'motion', title: 'Motion', body: <Motion /> },
]

// Every component of @pecaiet/design, as a living reference.
export function DesignPage() {
  return (
    <main style={{ maxWidth: 'var(--pc-width-960)', marginInline: 'auto', padding: 'var(--pc-space-8)' }}>
      <SkipLink href="#basics">Skip to the components</SkipLink>
      <Stack gap={6}>
        <Heading page>Design</Heading>
        <Stack row>
          {/* Jumps within the page stay plain links: an Inertia visit would ask the server again. */}
          {SECTIONS.map(section => (
            <a key={section.id} className="pc-link" href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </Stack>
        {SECTIONS.map(section => (
          <section key={section.id} id={section.id} tabIndex={-1}>
            <Stack gap={6}>
              <Heading>{section.title}</Heading>
              {section.body}
            </Stack>
          </section>
        ))}
      </Stack>
    </main>
  )
}
