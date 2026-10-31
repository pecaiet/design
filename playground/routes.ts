// Where each address goes: main.tsx builds the first page from it, vite.config.ts answers the visits after it.
export const ROUTES: Record<string, string> = {
  '/': 'Design',
  '/design': 'Design',
}

/** The page Inertia expects for an address, as Rails would send it: no props, no flash, nothing remembered. */
export const page = (url: string) => ({
  component: ROUTES[url.split('?')[0]] ?? 'Design',
  props: { errors: {} },
  url,
  version: null,
  rescuedProps: [],
  flash: {},
  rememberedState: {},
})
