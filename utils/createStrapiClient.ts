import type { $Fetch, FetchOptions } from 'ofetch'

/**
 * Wraps useStrapiClient for repository modules.
 * Normalizes legacy `/api/...` paths and keeps Accept-Language + Pinia JWT fallback.
 */
export function createStrapiClient(): $Fetch {
  const client = useStrapiClient()

  const fetcher = ((url: string, options?: FetchOptions) => {
    const normalizedUrl = url.startsWith('/api/') ? url.slice(4) : url

    const headers = new Headers(options?.headers as HeadersInit)
    if (!headers.has('Accept-Language')) {
      headers.set('Accept-Language', 'en-US')
    }

    const userStore = useUserStore()
    if (userStore.jwtToken && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${userStore.jwtToken}`)
    }

    return client(normalizedUrl, { ...options, headers })
  }) as $Fetch

  return fetcher
}
