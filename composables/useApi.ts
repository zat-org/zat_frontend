import type { IApiInstance } from '~/types/nuxt'

export function useApi(): IApiInstance {
  return useNuxtApp().$api
}
