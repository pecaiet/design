import { Play, Video as VideoMark } from '@phosphor-icons/react'
import { useEffect, useRef, useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'
import { assign } from './popup'

export type VideoProps = Omit<ComponentPropsWithRef<'video'>, 'title' | 'controls'> & {
  /** What it is: the play button says “Play “How sign-in works”, 2 minutes”. */
  title: string
  /** Its length in seconds: 2:05 at the bottom right until it plays. */
  duration?: number
  /** Under it, in a figure. */
  caption?: ReactNode
}

const clock = (seconds: number) => {
  const s = Math.round(seconds)
  const mm = String(Math.floor((s % 3600) / 60))
  const ss = String(s % 60).padStart(2, '0')
  return s >= 3600 ? `${Math.floor(s / 3600)}:${mm.padStart(2, '0')}:${ss}` : `${mm}:${ss}`
}

/** A video in the page (16:9 unless given another aspect-ratio): its first frame, a white play button and its length, then the
 *  browser's own controls once it plays. It never starts on its own; one with speech gets captions (a <track kind="captions">
 *  child). Without a src or sources, or when it can't play, the muted box with a video icon. */
export function Video({ title, duration, caption, src, children, className, ref, onError, ...video }: VideoProps) {
  const [playing, setPlaying] = useState(false)
  const [broken, setBroken] = useState(false)
  const own = useRef<HTMLVideoElement>(null)
  const whole = Math.round(duration === undefined || duration < 60 ? duration ?? 0 : duration / 60)
  const play = `Play “${title}”${duration ? `, ${whole} ${duration < 60 ? 'seconds' : whole === 1 ? 'minute' : 'minutes'}` : ''}`

  // The button goes once it plays, so focus moves on to the video and its controls.
  useEffect(() => {
    if (playing) own.current?.focus()
  }, [playing])

  const box = broken || (!src && !children) ? (
    <div className={cx('pc-video', 'pc-video-empty', !caption && className)} role="img" aria-label={`“${title}” can’t play`}>
      <VideoMark />
    </div>
  ) : (
    <div className={cx('pc-video', !caption && className)} data-state={playing ? 'playing' : undefined}>
      <video
        preload="none"
        playsInline
        {...video}
        ref={node => {
          own.current = node
          assign(ref, node)
        }}
        src={src}
        controls={playing}
        aria-label={playing ? title : undefined}
        onError={event => {
          setBroken(true)
          onError?.(event)
        }}
      >
        {children}
      </video>
      <button
        className="pc-video-play"
        type="button"
        aria-label={play}
        data-pc-tooltip={play}
        onClick={() => {
          setPlaying(true)
          own.current?.play().catch(() => {})
        }}
      >
        <Play weight="fill" />
      </button>
      {duration !== undefined && <span className="pc-video-length" aria-hidden="true">{clock(duration)}</span>}
    </div>
  )

  if (!caption) return box
  return (
    <figure className={cx('pc-figure', className)}>
      {box}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
