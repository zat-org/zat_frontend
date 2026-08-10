import type { IPlayerImage } from '~/features/website/types/IWebsiteAssets'
import { mapPlayerImages } from '~/features/shared/utils/strapiMappers'

export function usePlayerImages() {
  const toMediaUrl = useMediaUrl()

  return useStrapiCollection(
    'website:players-images',
    'players-images',
    { populate: '*' },
    response => mapPlayerImages(response, toMediaUrl),
  )
}

export type { IPlayerImage }
