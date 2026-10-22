import { useEffect, useState, type ComponentPropsWithRef, type ReactNode } from 'react'

export type CarouselSlide = {
  /** Names the slide and its dot: "todo" makes the dot "Show todo". */
  label: string
  /** The app's own content. */
  content: ReactNode
}

export type CarouselProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** What it shows, for screen readers: "pe caiet apps". */
  label: string
  slides: CarouselSlide[]
  /** Moves on by itself every this many ms. It waits while the pointer or focus is on it, stops for good once a dot is picked, and
   *  never moves for people who ask for less motion. */
  interval?: number
  /** Holds it still for now: while an error shows on the page. */
  paused?: boolean
}

/** One item at a time, with dots under it to pick one: the current dot long and strong. The slide shown fades in. */
export function Carousel({ label, slides, interval, paused, onPointerEnter, onPointerLeave, onFocus, onBlur, ...div }: CarouselProps) {
  const [shown, setShown] = useState(0)
  const [picked, setPicked] = useState(false)
  const [pointer, setPointer] = useState(false)
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    const still = window.Pecaiet ? window.Pecaiet.motion() === 'off' : matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!interval || picked || paused || pointer || focus || still || slides.length < 2) return
    const timer = window.setInterval(() => setShown(i => (i + 1) % slides.length), interval)
    return () => window.clearInterval(timer)
  }, [interval, picked, paused, pointer, focus, slides.length])

  return (
    <div
      {...div}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={event => {
        setPointer(true)
        onPointerEnter?.(event)
      }}
      onPointerLeave={event => {
        setPointer(false)
        onPointerLeave?.(event)
      }}
      onFocus={event => {
        setFocus(true)
        onFocus?.(event)
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocus(false)
        onBlur?.(event)
      }}
    >
      {slides.map((slide, i) => (
        <div key={i} className="pc-carousel-slide" role="group" aria-roledescription="slide" aria-label={slide.label} hidden={i !== shown % slides.length}>
          {slide.content}
        </div>
      ))}
      <div className="pc-carousel-dots">
        {slides.map((slide, i) => (
          <button
            key={i}
            className="pc-carousel-dot"
            type="button"
            aria-label={`Show ${slide.label}`}
            aria-current={i === shown % slides.length}
            onClick={() => {
              setShown(i)
              setPicked(true)
            }}
          />
        ))}
      </div>
    </div>
  )
}
