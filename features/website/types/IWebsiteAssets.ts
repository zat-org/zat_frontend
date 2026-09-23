import type { IYoutubeChannelData } from '~/features/website/types/IYoutubeChannelData'

export interface IPlayerImage {
  id: number
  name: string
  url: string
}

export interface IClientImage {
  id: number
  url: string
  marked: boolean
}

export interface IZatStatistics {
  zat: IYoutubeChannelData | null
  zatPlus: IYoutubeChannelData | null
  visitCount: string | null
}
