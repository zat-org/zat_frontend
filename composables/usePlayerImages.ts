import type { IPlayerImage } from '~/Models/IWebsiteAssets'
import { mapPlayerImages } from '~/utils/strapiMappers'

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
