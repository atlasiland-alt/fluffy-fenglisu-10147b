import serverEntry from '@tanstack/react-start/server-entry'

export default {
  async fetch(request: Request, env: Record<string, unknown>): Promise<Response> {
    ;(globalThis as Record<string, unknown>).__CF_ENV__ = env
    return serverEntry.fetch(request)
  },
}
