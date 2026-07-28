import type { IYoutubeChannelData } from '~/Models/IYoutubeChannelData'

export interface IPlayerImage {
  id: number
  name: string
  url: string
}

export interface IClientImage {
  id: number
  url: string
}

export interface IZatStatistics {
  zat: IYoutubeChannelData | null
  zatPlus: IYoutubeChannelData | null
  visitCount: string | null
}
