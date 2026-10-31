import { cloneElement, useEffect, useRef, useState, type ComponentPropsWithRef, type CSSProperties, type FormEventHandler, type ReactElement, type ReactNode } from 'react'
import { AppLogo, PeCaietMark, TodoMark } from './AppLogo'
import { cx } from './cx'
import { FieldMessage, useField } from './Field'
import { Label } from './Label'
import { Link } from './Link'
import { enter } from './motion'
import { useDark, usePhone } from './shell'
import { ThemeSwitch } from './ThemeSwitch'

export type SignInApp = {
  /** Its name, for its dot: "Show todo". */
  name: string
  /** The word in "One space for your …": lists, account. */
  word: string
  /** Its square mark: <TodoMark />. */
  mark: ReactElement<{ style?: CSSProperties }>
  /** Its colour, washed over the left half: "#ffd54a". */
  colour: string
}

const APPS: SignInApp[] = [
  { name: 'todo', word: 'lists', mark: <TodoMark />, colour: '#ffd54a' },
  { name: 'pe caiet', word: 'account', mark: <PeCaietMark />, colour: '#0b7a75' },
]

const SMALL: CSSProperties = { fontSize: 'var(--pc-text-12)', lineHeight: 'var(--pc-line-16)' }
const COLUMN: CSSProperties = { display: 'grid', alignContent: 'start', gap: 'var(--pc-space-4)', width: '100%', maxWidth: 'var(--pc-width-400)' }

export type SignedOutProps = Omit<ComponentPropsWithRef<'div'>, 'children' | 'onSubmit'> & {
  /** The apps the left half shows in turn, every 2.8 seconds: todo, then pe caiet. */
  apps?: SignInApp[]
  /** Makes the right half's column a form (Inertia's form.submit). */
  onSubmit?: FormEventHandler<HTMLFormElement>
  /** Keeps the left half on the first app: while an error shows. */
  paused?: boolean
  /** The right half's column, 400px at most, 16px apart. */
  children: ReactNode
}

/** The signed-out layout: the left half shows one pe caiet app at a time, the right half the app's column (a form, a card); on
 *  phones the left half is a bar with the logo. Also the light/dark switch. Use it as the Inertia layout of every signed-out page,
 *  so the left half stays as it is while the right half changes. */
export function SignedOut({ apps = APPS, onSubmit, paused, children, style, ...div }: SignedOutProps) {
  const phone = usePhone()
  const dark = useDark()
  const aside = useRef<HTMLElement>(null)
  const fade = useRef(false)
  const [shown, setShown] = useState(0)
  const [picked, setPicked] = useState(false)
  const current = shown % apps.length
  const app = apps[current]

  useEffect(() => {
    if (paused) setShown(0)
  }, [paused])

  // Every 2.8 seconds the next app, until a dot is picked; never while an error shows or with motion off.
  useEffect(() => {
    const still = window.Pecaiet ? window.Pecaiet.motion() === 'off' : matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || picked || still || apps.length < 2) return
    const timer = window.setInterval(() => {
      fade.current = true
      setShown(i => (i + 1) % apps.length)
    }, 2800)
    return () => window.clearInterval(timer)
  }, [paused, picked, apps.length])

  // The app shown fades in where it is (its wash, marks and word: every part marked data-app); nothing slides.
  useEffect(() => {
    if (!fade.current) return
    fade.current = false
    aside.current?.querySelectorAll(`[data-app="${current}"]`).forEach(part => enter(part))
  }, [current])

  const pick = (i: number) => {
    fade.current = i !== current
    setShown(i)
    setPicked(true)
  }
  const fill = (mark: SignInApp['mark']) => cloneElement(mark, { style: { display: 'block', width: '100%', height: '100%', ...mark.props.style } })
  // The words share one spot, the others only invisible, so the line keeps the longest one's width.
  const words = (
    <span style={{ display: 'inline-grid', textAlign: 'left' }}>
      {apps.map((each, i) => (
        <span key={each.name} data-app={i} style={{ gridArea: '1 / 1', visibility: i === current ? undefined : 'hidden' }}>{each.word}</span>
      ))}
    </span>
  )

  return (
    <div {...div} style={{ position: 'relative', display: 'grid', minHeight: '100dvh', ...(phone ? { gridTemplateRows: 'auto 1fr auto' } : { gridTemplateColumns: '1fr 1fr' }), ...style }}>
      <aside
        ref={aside}
        style={{
          position: 'relative',
          isolation: 'isolate',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--sidebar)',
          // Desktop: the hero ends 7% of the window (40–120px) before the divider, as far as the form starts after it.
          padding: phone ? '12px 16px' : '24px clamp(40px, 7vw, 120px) 24px 24px',
        }}
      >
        <div key={current} data-app={current} style={{ position: 'absolute', inset: 0, zIndex: -10, background: `color-mix(in srgb, ${app.colour} ${dark ? 16 : 22}%, transparent)` }} />
        {!phone && (
          <div aria-hidden="true" style={{ position: 'absolute', right: '-300px', bottom: '-320px', zIndex: -5, width: '900px', height: '900px', opacity: dark ? 0.1 : 0.14 }}>
            <div key={current} data-app={current} style={{ width: '100%', height: '100%', rotate: '-14deg' }}>{fill(app.mark)}</div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--pc-space-3)' }}>
          <AppLogo mark={<PeCaietMark />}>pe caiet</AppLogo>
          {phone && (
            <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 'var(--pc-space-2)', minWidth: 0, fontSize: 'var(--pc-text-16)', lineHeight: 'var(--pc-line-24)', fontWeight: 'var(--pc-weight-semibold)', whiteSpace: 'nowrap' }}>
              <span key={current} data-app={current} className="pc-app-logo-mark">{app.mark}</span>
              <span><span className="pc-muted" style={{ fontWeight: 'var(--pc-weight-regular)' }}>for your</span> {words}</span>
            </span>
          )}
        </div>
        {!phone && (
          <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--pc-space-4)', width: '100%', maxWidth: 'var(--pc-width-400)', margin: 'auto 0', alignSelf: 'flex-end', textAlign: 'center' }}>
            <div key={current} data-app={current} aria-hidden="true" style={{ width: 'var(--pc-width-160)', height: 'var(--pc-width-160)', borderRadius: '23.4%', boxShadow: 'var(--pc-raise-lg)' }}>
              {fill(app.mark)}
            </div>
            <h2 className="pc-visually-hidden">One space for everything in pe caiet.</h2>
            <div className="pc-page-title" aria-hidden="true">
              <p>One space for</p>
              <p>your {words}</p>
            </div>
            <p className="pc-muted">Sign in once and move between every pe caiet app.</p>
            <div className="pc-carousel-dots">
              {apps.map((each, i) => (
                <button key={each.name} className="pc-carousel-dot" type="button" aria-label={`Show ${each.name}`} aria-current={i === current} onClick={() => pick(i)} />
              ))}
            </div>
          </div>
        )}
        {!phone && <p className="pc-muted" style={SMALL}>© pe caiet</p>}
      </aside>
      <ThemeSwitch style={{ position: 'absolute', ...(phone ? { top: '60px', right: '12px' } : { top: '20px', right: '24px' }) }} />
      <main style={phone ? { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' } : { display: 'flex', alignItems: 'center', padding: '96px 40px 96px clamp(40px, 7vw, 120px)' }}>
        {onSubmit ? <form style={COLUMN} onSubmit={onSubmit}>{children}</form> : <div style={COLUMN}>{children}</div>}
      </main>
      {phone && <p className="pc-muted" style={{ ...SMALL, padding: '0 16px 16px' }}>© pe caiet</p>}
    </div>
  )
}

export type SignInPasswordProps = Omit<ComponentPropsWithRef<'input'>, 'children' | 'type'> & {
  /** "Password" unless you say otherwise. */
  label?: ReactNode
  /** "Forgot password?", at the right end of the label's row: the reset page. */
  forgotHref: string
  /** Under the field, until there's an error. */
  hint?: ReactNode
  /** Says how to fix it; turns the border red. */
  error?: ReactNode
}

/** The sign-in form's password: its label row ends in "Forgot password?". */
export function SignInPassword({ label = 'Password', forgotHref, hint, error, id, className, autoComplete = 'current-password', ...input }: SignInPasswordProps) {
  const field = useField(id, error || hint, error, input['aria-describedby'])
  return (
    <div className={cx('pc-field', className)}>
      <Label htmlFor={field.fieldId} action={<Link href={forgotHref}>Forgot password?</Link>}>{label}</Label>
      <input
        {...input}
        type="password"
        autoComplete={autoComplete}
        className="pc-input"
        id={field.fieldId}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid ?? input['aria-invalid']}
      />
      <FieldMessage id={field.messageId} hint={hint} error={error} />
    </div>
  )
}
