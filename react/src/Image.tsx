import { ImageIcon } from '@phosphor-icons/react'
import { useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'

export type ImageProps = Omit<ComponentPropsWithRef<'img'>, 'alt' | 'children'> & {
  /** What's in the picture; "" for a picture that's only decoration. */
  alt: string
  /** 12px muted words under it: it goes in a figure. */
  caption?: ReactNode
}

/** Give it a size or an aspect ratio (width and height, or aspect-ratio) so the page doesn't jump; the picture fills that box.
 *  Without a src yet, or when it can't load, a muted box with an image icon takes its place, the same size. */
export function Image({ alt, caption, src, width, height, style, onError, className, ...img }: ImageProps) {
  const [broken, setBroken] = useState<string>()
  const empty = !src || broken === src
  const named = alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true }
  const picture = empty ? (
    <div {...named} className={cx('pc-image', 'pc-image-empty', !caption && className)} style={{ width, height, ...style }}>
      <ImageIcon />
    </div>
  ) : (
    <img
      {...img}
      className={cx('pc-image', !caption && className)}
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      onError={event => {
        setBroken(src)
        onError?.(event)
      }}
    />
  )
  if (!caption) return picture
  return (
    <figure className={cx('pc-figure', className)}>
      {picture}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
