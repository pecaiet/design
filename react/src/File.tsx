import { DownloadSimple, FileIcon, FileImage, FilePdf, FileText, FileXls, X } from '@phosphor-icons/react'
import { useEffect, useRef, type ComponentPropsWithoutRef, type ComponentPropsWithRef, type HTMLAttributes, type ReactNode, type Ref } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { enter as grow, leave } from './motion'

const KINDS: [RegExp, ReactNode][] = [
  [/\.pdf$/i, <FilePdf />],
  [/\.(xlsx?|csv|ods|numbers)$/i, <FileXls />],
  [/\.(png|jpe?g|gif|webp|avif|heic|svg)$/i, <FileImage />],
  [/\.(txt|md|rtf|docx?|odt|pages)$/i, <FileText />],
]

export type FilesProps = ComponentPropsWithRef<'div'>

/** FileRows, 2px apart. */
export function Files({ className, ...div }: FilesProps) {
  return <div {...div} className={cx('pc-files', className)} />
}

type Kind =
  /** To download: the whole row is the link, and the download icon shows in place of the size under the pointer and on focus. */
  | (Omit<ComponentPropsWithoutRef<'a'>, 'children'> & { href: string; onRemove?: never })
  /** While editing (attachments in a form): an x at the end, always shown. Called once the row has shrunk out; then drop it from state. */
  | (Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { onRemove: () => void; href?: never })

export type FileRowProps = Kind & {
  /** Cut off with "…" when long. */
  name: string
  /** "240 KB". */
  size: ReactNode
  /** The file's icon: by default from the name's ending (FilePdf, FileXls, FileImage, FileText, FileIcon). */
  icon?: ReactNode
  /** A file the person just added: it grows in, the rows below gliding. Leave it off for what was already on the page. */
  enter?: boolean
}

/** A file as a row, like a task or menu row: its icon, its name and its size. */
export function FileRow({ name, size, icon, enter, className, ...element }: FileRowProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (enter) grow(ref.current)
  }, [])

  const look = cx('pc-file', className)
  const inner = (
    <>
      {icon ?? KINDS.find(([ending]) => ending.test(name))?.[1] ?? <FileIcon />}
      <span className="pc-file-name">{name}</span>
      <span className="pc-file-size">{size}</span>
    </>
  )

  if (element.href !== undefined) {
    const { onRemove, download = true, ...link } = element
    return (
      <a {...link} ref={ref as Ref<HTMLAnchorElement>} className={look} download={download}>
        {inner}
        <DownloadSimple className="pc-file-action" />
      </a>
    )
  }
  const { onRemove, href, ...div } = element
  const remove = async () => {
    await leave(ref.current)
    onRemove()
  }
  return (
    <div {...div} ref={ref as Ref<HTMLDivElement>} className={look}>
      {inner}
      <Button variant="ghost" icon={<X />} label={`Remove ${name}`} onClick={remove} />
    </div>
  )
}
