import { useId, type HTMLAttributes, type ReactNode, type SVGProps } from 'react'
import { cx } from './cx'

export type AppLogoProps = HTMLAttributes<HTMLSpanElement> & {
  /** The app's square mark (PeCaietMark), or a letter as a stand-in. */
  mark: ReactNode
  /** The app's name: "pe caiet". */
  children: ReactNode
}

/** The app's mark and name, as at the top of the sign-in page and the Header. */
export function AppLogo({ mark, children, className, ...span }: AppLogoProps) {
  return (
    <span {...span} className={cx('pc-app-logo', className)}>
      <span className="pc-app-logo-mark">{mark}</span>
      {children}
    </span>
  )
}

export type MarkProps = SVGProps<SVGSVGElement>

// The marks clip to their rounded square; each copy needs its own clip id (and one a url() can name).
const useClip = () => `pc-mark-${useId().replace(/[^\w-]/g, '')}`

/** pe caiet's square mark (appicons/pecaiet.svg). It fills a .pc-app-logo-mark slot. */
export function PeCaietMark(props: MarkProps) {
  const clip = useClip()
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false" {...props}>
      <g clipPath={`url(#${clip})`}>
        <rect width="100" height="100" fill="#0B7A75" />
        <path d="M10 -3.28312H39.8591C47.6955 -6.86289 56.3259 -8.44775 64.9524 -7.89119C73.5789 -7.33463 81.923 -4.65462 89.2135 -0.0989084C96.5039 4.4568 102.505 10.7412 106.663 18.1732C110.82 25.6052 113 33.9451 113 42.4217C113 50.8983 110.82 59.2382 106.663 66.6702C102.505 74.1022 96.5039 80.3866 89.2135 84.9423C81.923 89.498 73.5789 92.178 64.9524 92.7346C56.3259 93.2911 47.6955 91.7063 39.8591 88.1265V127H10V-3.28312ZM89.6243 42.4217C89.6243 35.0883 86.6532 28.0553 81.3646 22.8698C76.076 17.6843 68.9032 14.7711 61.424 14.7711C53.9449 14.7711 46.772 17.6843 41.4834 22.8698C36.1948 28.0553 33.2238 35.0883 33.2238 42.4217C33.2238 49.7551 36.1948 56.7881 41.4834 61.9736C46.772 67.1591 53.9449 70.0723 61.424 70.0723C68.9032 70.0723 76.076 67.1591 81.3646 61.9736C86.6532 56.7881 89.6243 49.7551 89.6243 42.4217Z" fillRule="evenodd" clipRule="evenodd" fill="white" />
      </g>
      <defs>
        <clipPath id={clip}>
          <rect width="100" height="100" rx="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

/** todo's square mark (appicons/todo.svg). */
export function TodoMark(props: MarkProps) {
  const clip = useClip()
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false" {...props}>
      <g clipPath={`url(#${clip})`}>
        <rect width="100" height="100" fill="#FFD54A" />
        <path d="M35.0488 77C32.0075 77.0051 29.0836 75.7871 26.9353 73.6132L-6.63595 39.8017C-11.1214 35.2842 -11.1214 27.9658 -6.63595 23.4479C-2.15564 18.9355 5.1159 18.9355 9.59647 23.4479L35.0489 49.0825L83.4039 0.386803C85.5573 -1.78195 88.4761 -3 91.5174 -3C94.5637 -3 97.4826 -1.78198 99.6359 0.386803C104.121 4.9043 104.121 12.2227 99.6359 16.7406L43.1674 73.6132C41.0191 75.7871 38.0952 77.0051 35.0488 77Z" fill="#1C2733" />
      </g>
      <defs>
        <clipPath id={clip}>
          <rect width="100" height="100" rx="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

/** accounts' square mark (appicons/accounts.svg). */
export function AccountsMark(props: MarkProps) {
  const clip = useClip()
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false" {...props}>
      <g clipPath={`url(#${clip})`}>
        <rect width="100" height="100" fill="#6CB0FF" />
        <path d="M87.376 56.813H84.251V47.438C84.251 34.516 73.735 24 60.813 24C47.891 24 37.375 34.516 37.375 47.438V56.813H34.25C30.7969 56.813 28 59.6099 28 63.063V105.251C28 108.704 30.7969 111.501 34.25 111.501H87.375C90.8281 111.501 93.625 108.704 93.625 105.251V63.063C93.625 59.6099 90.8291 56.813 87.376 56.813ZM63.938 84.079V92.7509C63.938 94.4697 62.5318 95.8759 60.813 95.8759C59.0942 95.8759 57.688 94.4697 57.688 92.7509V84.079C52.9536 81.5009 53.7818 73.891 59.313 72.626C66.4692 71.0322 70.016 80.5479 63.938 84.079ZM74.876 56.813H46.751V47.438C46.751 39.688 53.0635 33.376 60.813 33.376C68.5625 33.376 74.875 39.6885 74.875 47.438L74.876 56.813Z" fillRule="evenodd" clipRule="evenodd" fill="#1C2733" />
      </g>
      <defs>
        <clipPath id={clip}>
          <rect width="100" height="100" rx="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
