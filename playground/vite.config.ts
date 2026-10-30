import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { page, ROUTES } from './routes'

// No Rails here: an Inertia visit (a request with the X-Inertia header) to one of the routes gets its page back as JSON, the way
// Rails would answer it. Every other request, a reload too, gets index.html, and main.tsx reads the address.
const inertia: Plugin = {
  name: 'pecaiet-inertia',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url ?? '/'
      if (!req.headers['x-inertia'] || !ROUTES[url.split('?')[0]]) return next()
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Vary', 'X-Inertia')
      res.setHeader('X-Inertia', 'true')
      res.end(JSON.stringify(page(url)))
    })
  },
}

export default defineConfig({ plugins: [react(), tailwindcss(), inertia] })
