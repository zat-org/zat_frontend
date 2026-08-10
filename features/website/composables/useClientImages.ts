import type { IClientImage } from '~/features/website/types/IWebsiteAssets'
import { mapClientImages } from '~/features/shared/utils/strapiMappers'

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
