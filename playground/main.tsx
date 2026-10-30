import { createInertiaApp } from '@inertiajs/react'
import type { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import '../pecaiet.js'
import { ToastProvider } from '../react/src/index'
import './app.css'
import { DesignAppPage, DesignErrorPage, DesignPage, DesignSignInPage } from './pages'
import { page } from './routes'

const PAGES: Record<string, ComponentType> = {
  Design: DesignPage,
  'Design/App': DesignAppPage,
  'Design/SignIn': DesignSignInPage,
  'Design/Error': DesignErrorPage,
}

// No Rails here: the first page comes from the address, and vite.config.ts answers the visits after it.
createInertiaApp({
  page: page(location.pathname + location.search),
  resolve: name => PAGES[name],
  setup({ el, App, props }) {
    createRoot(el).render(
      <ToastProvider>
        <App {...props} />
      </ToastProvider>,
    )
  },
})
