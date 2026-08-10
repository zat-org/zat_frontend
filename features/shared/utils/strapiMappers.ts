import type { IPagination } from '~/features/shared/types/IResponse'

export type StrapiEntity<T extends Record<string, unknown>> = {
  id: number
  attributes: T
}

export type MediaUrlFn = (path?: string | null) => string

export function unwrapStrapiEntity<T extends Record<string, unknown>>(
  entity: StrapiEntity<T> | null | undefined,
): ({ id: number } & T) | null {
  if (!entity?.attributes) {
    return null
  }

  return { id: entity.id, ...entity.attributes }
}

export function unwrapStrapiCollection<T extends Record<string, unknown>>(
  response: { data?: StrapiEntity<T>[] | null } | null | undefined,
): Array<{ id: number } & T> {
  const list = response?.data
  if (!Array.isArray(list)) {
    return []
  }

  return list
    .map(item => unwrapStrapiEntity(item))
    .filter((item): item is { id: number } & T => item !== null)
}

export function unwrapStrapiSingle<T extends Record<string, unknown>>(
  response: { data?: StrapiEntity<T> | StrapiEntity<T>[] | null } | null | undefined,
): ({ id: number } & T) | null {
  const data = response?.data
  if (!data || Array.isArray(data)) {
    return null
  }

  return unwrapStrapiEntity(data)
}

export type StrapiMediaAttributes = {
  url?: string
  alternativeText?: string | null
  formats?: {
    large?: { url?: string }
    medium?: { url?: string }
    small?: { url?: string }
  }
}

export type StrapiMediaRelation = {
  data?:
    | { attributes?: StrapiMediaAttributes }
    | Array<{ attributes?: StrapiMediaAttributes }>
    | null
} | null

function getStrapiMediaItem(
  relation?: StrapiMediaRelation,
): { attributes?: StrapiMediaAttributes } | undefined {
  const data = relation?.data
  if (!data) {
    return undefined
  }

  if (Array.isArray(data)) {
    return data[0]
  }

  return data
}

function getStrapiMediaAttributes(relation?: StrapiMediaRelation): StrapiMediaAttributes | undefined {
  return getStrapiMediaItem(relation)?.attributes
}

export function getStrapiMediaPath(relation?: StrapiMediaRelation): string | undefined {
  return getStrapiMediaAttributes(relation)?.url
}

export function getStrapiMediaLargePath(relation?: StrapiMediaRelation): string | undefined {
  const attrs = getStrapiMediaAttributes(relation)
  return attrs?.formats?.large?.url ?? attrs?.url
}

export function getStrapiMediaAltText(relation?: StrapiMediaRelation, fallback = ''): string {
  return getStrapiMediaItem(relation)?.attributes?.alternativeText ?? fallback
}

export function mapPlayerImages(
  response: { data?: StrapiEntity<Record<string, unknown>> | StrapiEntity<Record<string, unknown>>[] | null },
  toMediaUrl: MediaUrlFn,
): Array<{ id: number, name: string, url: string }> {
  const raw = response?.data
  const entries = Array.isArray(raw) ? raw : raw ? [raw] : []

  return entries.flatMap((entry) => {
    const attributes = entry.attributes as {
      playerName?: string
      playerImage?: { data?: { attributes?: { url?: string } } | null }
    }
    const imagePath = getStrapiMediaPath(attributes?.playerImage)
    if (!imagePath) {
      return []
    }

    return [{
      id: entry.id,
      name: attributes?.playerName ?? '',
      url: toMediaUrl(imagePath),
    }]
  })
}

export function mapClientImages(
  response: {
    data?: {
      attributes?: {
        images?: { data?: Array<{ id: number, attributes?: { url?: string } }> }
      }
    } | null
  },
  toMediaUrl: MediaUrlFn,
): Array<{ id: number, url: string }> {
  const imageList = response?.data?.attributes?.images?.data
  if (!Array.isArray(imageList)) {
    return []
  }

  return imageList.flatMap((image) => {
    const path = image.attributes?.url
    if (!path) {
      return []
    }

    return [{ id: image.id, url: toMediaUrl(path) }]
  })
}

export function unwrapStrapiCounter(
  response: { data?: { attributes?: { counter?: string } } | null } | null | undefined,
): string | null {
  return response?.data?.attributes?.counter ?? null
}

export function unwrapStrapiPaginatedCollection<T extends Record<string, unknown>>(
  response: {
    data?: StrapiEntity<T>[] | null
    meta?: { pagination?: IPagination }
  } | null | undefined,
): { items: Array<{ id: number } & T>, pagination: IPagination } {
  return {
    items: unwrapStrapiCollection(response),
    pagination: response?.meta?.pagination ?? {
      page: 1,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  }
}

export type StrapiHeroSlideAttributes = {
  title: string
  description: string
  Image?: StrapiMediaRelation
  buttonCTA?: string | null
  buttonIconName?: string | null
  url?: string | null
}

export function mapHeroSlides(
  response: { data?: StrapiEntity<StrapiHeroSlideAttributes>[] | null },
  toMediaUrl: MediaUrlFn,
): Array<{
  id: number
  title: string
  description: string
  image: string
  largeUrl: string | null
  alt: string
  buttonCTA: string | null
  buttonIconName: string | null
  url: string | null
}> {
  return unwrapStrapiCollection<StrapiHeroSlideAttributes>(response).flatMap((slide) => {
    const imagePath = getStrapiMediaPath(slide.Image)
    if (!imagePath) {
      return []
    }

    const largePath = getStrapiMediaAttributes(slide.Image)?.formats?.large?.url
    const largeUrl = largePath ? toMediaUrl(largePath) : null

    return [{
      id: slide.id,
      title: slide.title,
      description: slide.description,
      image: toMediaUrl(imagePath),
      largeUrl,
      alt: getStrapiMediaAltText(slide.Image, slide.title),
      buttonCTA: slide.buttonCTA ?? null,
      buttonIconName: slide.buttonIconName ?? null,
      url: slide.url ?? null,
    }]
  })
}
