import { createInertiaApp } from '@inertiajs/react'
import { useEffect, useState, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import '../pecaiet.js'
import { SegmentedControl, ToastProvider } from '../react/src/index'
import './app.css'
import { DesignPage } from './pages'
import { page } from './routes'

const PAGES: Record<string, ComponentType> = {
  Design: DesignPage,
}

const SPEED = 'pc-playground-speed'
type Speed = 'normal' | '5s'

/** Every motion reads one token, so 5s in place of 120ms slows them all, and what's worked out from it (a tooltip's wait, the
 *  loops) with them. Motion off still wins: it's set on <body>. Remembered in this browser only. */
function MotionSpeed() {
  const [speed, setSpeed] = useState<Speed>(() => {
    try {
      return localStorage.getItem(SPEED) === '5s' ? '5s' : 'normal'
    } catch {
      return 'normal'
    }
  })
  useEffect(() => {
    if (speed === '5s') document.documentElement.style.setProperty('--pc-motion', '5s')
    else document.documentElement.style.removeProperty('--pc-motion')
    try {
      localStorage.setItem(SPEED, speed)
    } catch {}
  }, [speed])
  return (
    <div
      style={{
        position: 'fixed',
        left: 'var(--pc-space-4)',
        bottom: 'var(--pc-space-4)',
        zIndex: 'var(--pc-layer-toast)',
        padding: 'var(--pc-space-2) var(--pc-space-3)',
        border: 'var(--pc-border) solid var(--border)',
        borderRadius: 'var(--pc-radius-lg)',
        background: 'var(--card)',
        boxShadow: 'var(--pc-raise-lg)',
      }}
    >
      <SegmentedControl<Speed>
        aria-label="Motion speed"
        value={speed}
        onChange={setSpeed}
        options={[
          { value: 'normal', label: 'Normal' },
          { value: '5s', label: '5s' },
        ]}
      />
    </div>
  )
}

// No Rails here: the first page comes from the address, and vite.config.ts answers the visits after it.
createInertiaApp({
  page: page(location.pathname + location.search),
  resolve: name => PAGES[name],
  setup({ el, App, props }) {
    createRoot(el).render(
      <ToastProvider>
        <App {...props} />
        <MotionSpeed />
      </ToastProvider>,
    )
  },
})
