import type { FetchOptions } from 'ofetch';
import FetchFactory from '../factory';
import type { IResponse } from '~/Models/IResponse';
import type { IClientsImages } from '~/Models/IClientsImages';
import type { IYoutubeChannelData } from '~/Models/IYoutubeChannelData';
const ZAT_ID = "UCWZxxMNzoPwxfwuWfjqmjSA";
const ZAT_PLUS_ID = "UCMH_VRnwuXWL9pnMTDIKN0A";
interface IWebsiteCounter {
    id: number,
    attributes: {
        counter: string,
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date
    }
}
class WebsiteAssetsModule extends FetchFactory {
    async addOneToVisitorCounter() {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call(
                    'POST',
                    `/api/website-visits-counter/add-one/`,
                    undefined, // body
                    fetchOptions
                )
            }
        )
    }

    async getClientsImages() {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IResponse<IClientsImages>>(
                    'GET',
                    `/api/clients-image?populate=*`,
                    undefined, // body
                    fetchOptions
                )
            }
        )
    }

    async getPlayersImages() {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IResponse<any>>(
                    'GET',
                    `/api/players-images?populate=*`,
                    undefined, // body
                    fetchOptions
                )
            }
        )
    }

    getYoutubeUrl(channelId: string, key: string) {
        return `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${key}`
    }
    getYoutubeChannelData(channelId: string, youtubeKey: string) {
        return this.call<IYoutubeChannelData>("GET", this.getYoutubeUrl(channelId, youtubeKey), undefined, { baseURL: "" });
    }
    async getZatStatistics(youtubeKey: string) {
        return useAsyncData(
            async () => {
                const [zat, zatPlus, websiteCounter] = await Promise.all([
                    this.getYoutubeChannelData(ZAT_ID, youtubeKey),
                    this.getYoutubeChannelData(ZAT_PLUS_ID, youtubeKey),
                    this.call<IResponse<IWebsiteCounter>>(
                        'GET', `/api/website-visits-counter`,
                        undefined, // body
                    )])
                return { zat, zatPlus, websiteCounter }
            }
        )

    }
}

export default WebsiteAssetsModule;