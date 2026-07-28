import FetchFactory from '../factory'
import type { IResponse } from '~/Models/IResponse'
import type { IYoutubeChannelData } from '~/Models/IYoutubeChannelData'
import type { IZatStatistics } from '~/Models/IWebsiteAssets'
import { unwrapStrapiCounter } from '~/utils/strapiMappers'

const ZAT_ID = 'UCWZxxMNzoPwxfwuWfjqmjSA'
const ZAT_PLUS_ID = 'UCMH_VRnwuXWL9pnMTDIKN0A'

class WebsiteAssetsModule extends FetchFactory {
  async addOneToVisitorCounter() {
    return this.asyncData(
      'website:visitor-counter-increment',
      () => this.post('/api/website-visits-counter/add-one/'),
    )
  }

  getYoutubeUrl(channelId: string, key: string) {
    return `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${key}`
  }

  getYoutubeChannelData(channelId: string, youtubeKey: string) {
    return this.get<IYoutubeChannelData>(
      this.getYoutubeUrl(channelId, youtubeKey),
      { baseURL: '' },
    )
  }

  async getZatStatistics(youtubeKey: string) {
    return this.asyncData<IZatStatistics>('website:zat-statistics', async () => {
      const [zatResult, zatPlusResult, websiteCounterResult] = await Promise.allSettled([
        youtubeKey ? this.getYoutubeChannelData(ZAT_ID, youtubeKey) : Promise.reject(new Error('Missing YouTube API key')),
        youtubeKey ? this.getYoutubeChannelData(ZAT_PLUS_ID, youtubeKey) : Promise.reject(new Error('Missing YouTube API key')),
        this.get<IResponse<{ attributes: { counter: string } }>>('/api/website-visits-counter'),
      ])

      return {
        zat: zatResult.status === 'fulfilled' ? zatResult.value : null,
        zatPlus: zatPlusResult.status === 'fulfilled' ? zatPlusResult.value : null,
        visitCount: websiteCounterResult.status === 'fulfilled'
          ? unwrapStrapiCounter(websiteCounterResult.value)
          : null,
      }
    })
  }
}

export default WebsiteAssetsModule
