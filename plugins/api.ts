import { $fetch, type FetchOptions } from 'ofetch';
import RefereesModule from '~/Repository/modules/referees';
import ContactUsMessagesModule from '~/Repository/modules/contactUsMessagesModule';
import JobsModule from '~/Repository/modules/jobs';
import BlogsModule from '~/Repository/modules/blogs';
import TeamsModule from '~/Repository/modules/teams';
import PlayersModule from '~/Repository/modules/players';
import FollowerChampionModule from '~/Repository/modules/followersChampions';
import WebsiteAssetsModule from '~/Repository/modules/websiteAssets';
import ChampionsModule from '~/Repository/modules/champion';
import MatchesModule from '~/Repository/modules/matches';


interface IApiInstance {
    referees: RefereesModule;
    contactUsMessage: ContactUsMessagesModule;
    jobs: JobsModule,
    blogs: BlogsModule,
    teams: TeamsModule,
    players: PlayersModule,
    followersChampions: FollowerChampionModule,
    websiteAssets: WebsiteAssetsModule,
    champions: ChampionsModule,
    matches: MatchesModule
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const fetchOptions: FetchOptions = {
        baseURL: config.public.apiBaseUrl
    };

    // Create a new instance of $fetcher with custom option
    const apiFetcher = $fetch.create(fetchOptions);

    // An object containing all repositories we need to expose
    const modules: IApiInstance = {
        referees: new RefereesModule(apiFetcher),
        contactUsMessage: new ContactUsMessagesModule(apiFetcher),
        jobs: new JobsModule(apiFetcher),
        blogs: new BlogsModule(apiFetcher),
        teams: new TeamsModule(apiFetcher),
        players: new PlayersModule(apiFetcher),
        followersChampions: new FollowerChampionModule(apiFetcher),
        websiteAssets: new WebsiteAssetsModule(apiFetcher),
        champions: new ChampionsModule(apiFetcher),
        matches: new MatchesModule(apiFetcher)
    };

    return {
        provide: {
            api: modules
        }
    };
});