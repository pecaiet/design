import { User } from '@phosphor-icons/react'
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from './cx'

export type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** One or two letters, upper case. Without letters or a photo it shows nobody (a person icon). */
  initials?: string
  /** A photo filling the circle; the letters show if it doesn't load. */
  src?: string
  /** 32px beside two lines, 48px at the top of a person's page; 24px beside one line by default. */
  size?: 'medium' | 'large'
  /** A team, an app or a client. */
  square?: boolean
  /** The teal dot. Say it in the label too ("ana@example.com, online"). */
  online?: boolean
  /** A small badge at the bottom right, on a 32 or 48px avatar: <Badge small variant="primary">Pro</Badge>. */
  badge?: ReactNode
  /** On its own (a stack, an assignee): who it is, read out and shown as a tooltip. Beside the name or email, leave it out. */
  label?: string
}

export function Avatar({ initials, src, size, square, online, badge, label, className, ...span }: AvatarProps) {
  const [broken, setBroken] = useState<string>()
  const photo = src && broken !== src
  const nobody = !photo && !initials
  const named = label ? { role: 'img', 'aria-label': label, 'data-pc-tooltip': label } : { 'aria-hidden': true }
  return (
    <span
      {...span}
      {...named}
      className={cx('pc-avatar', size && `pc-avatar-${size}`, nobody && 'pc-avatar-none', square && 'pc-avatar-square', className)}
    >
      {photo ? <img src={src} alt="" onError={() => setBroken(src)} /> : nobody ? <User /> : initials}
      {online && <span className="pc-avatar-status" />}
      {badge}
    </span>
  )
}

export type AvatarsProps = HTMLAttributes<HTMLSpanElement> & {
  /** Who's in it: "Ana, Andrei, Alina and 3 more". */
  label: string
  /** How many more there are than the avatars shown: "+3". */
  more?: number
}

/** Several people, overlapping, each ringed in the colour behind it. */
export function Avatars({ label, more, children, className, ...span }: AvatarsProps) {
  return (
    <span {...span} className={cx('pc-avatars', className)} role="group" aria-label={label}>
      {children}
      {more ? <span className="pc-avatar pc-avatar-more" role="img" aria-label={`${more} more`}>+{more}</span> : null}
    </span>
  )
}
