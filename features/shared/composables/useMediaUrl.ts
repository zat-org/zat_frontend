import { joinURL } from 'ufo'

export function useMediaUrl() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.strapi?.url ?? config.public.apiBaseUrl

  return (path?: string | null) => {
    if (!path) {
      return ''
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    return joinURL(baseUrl, path)
  }
}
