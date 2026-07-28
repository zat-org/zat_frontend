import type { IClientImage } from '~/Models/IWebsiteAssets'
import { mapClientImages } from '~/utils/strapiMappers'

export function useClientImages() {
  const toMediaUrl = useMediaUrl()

  return useStrapiCollection(
    'website:clients-images',
    'clients-image',
    { populate: '*' },
    response => mapClientImages(response, toMediaUrl),
  )
}

export type { IClientImage }
