import { ImageIcon } from '@phosphor-icons/react'
import { useLayoutEffect, useRef, useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'
import { enter } from './motion'
import { assign } from './popup'

export type ImageProps = Omit<ComponentPropsWithRef<'img'>, 'alt' | 'children'> & {
  /** What's in the picture; "" for a picture that's only decoration. */
  alt: string
  /** 12px muted words under it: it goes in a figure. */
  caption?: ReactNode
}

/** Give it a size or an aspect ratio (width and height, or aspect-ratio) so the page doesn't jump; the picture fills that box.
 *  While it loads, without a src yet, or when it can't load, a muted box with an image icon takes its place, the same size. */
export function Image({ alt, caption, src, width, height, style, onLoad, onError, className, ref, ...img }: ImageProps) {
  const [broken, setBroken] = useState<string>()
  const [loaded, setLoaded] = useState<string>()
  const empty = !src || broken === src
  const named = alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true }
  // Loaded, it takes the muted box's place and fades in, like content after a skeleton.
  const own = useRef<HTMLImageElement>(null)
  useLayoutEffect(() => {
    if (loaded && loaded === src) enter(own.current)
  }, [loaded])
  const photo = (waiting: boolean) => (
    <img
      {...img}
      ref={node => {
        if (!waiting) own.current = node
        assign(ref, node)
      }}
      className={waiting ? undefined : cx('pc-image', !caption && className)}
      src={src}
      alt={waiting ? '' : alt}
      width={width}
      height={height}
      // While it loads it sits unseen over the muted box, so it still loads when it's lazy.
      style={waiting ? { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0 } : style}
      onLoad={event => {
        setLoaded(src)
        onLoad?.(event)
      }}
      onError={event => {
        setBroken(src)
        onError?.(event)
      }}
    />
  )
  const picture = empty || loaded !== src ? (
    <div {...named} className={cx('pc-image', 'pc-image-empty', !caption && className)} style={{ position: 'relative', width, height, ...style }}>
      <ImageIcon />
      {!empty && photo(true)}
    </div>
  ) : photo(false)
  if (!caption) return picture
  return (
    <figure className={cx('pc-figure', className)}>
      {picture}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
