import type { AsyncDataOptions } from '#app'

type StrapiFindParams = Record<string, unknown>

/**
 * Fetch a Strapi collection with useAsyncData + optional mapper.
 * Use this for all CMS content types during the app-wide refactor.
 */
export function useStrapiCollection<TRaw, TMapped = TRaw>(
  key: string,
  contentType: string,
  params: StrapiFindParams,
  mapper?: (response: TRaw) => TMapped,
  options?: AsyncDataOptions<TMapped>,
) {
  const { find } = useStrapi()

  return useAsyncData(
    key,
    async () => {
      const response = await find<TRaw>(contentType, params)
      return mapper ? mapper(response) : (response as unknown as TMapped)
    },
    options,
  )
}
