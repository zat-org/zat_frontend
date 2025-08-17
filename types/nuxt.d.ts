import type RefereesModule from '~/Repository/modules/referees';
import type ContactUsMessagesModule from '~/Repository/modules/contactUsMessagesModule';
import type JobsModule from '~/Repository/modules/jobs';
import type BlogsModule from '~/Repository/modules/blogs';
import type TeamsModule from '~/Repository/modules/teams';
import type PlayersModule from '~/Repository/modules/players';
import type FollowerChampionModule from '~/Repository/modules/followersChampions';
import type WebsiteAssetsModule from '~/Repository/modules/websiteAssets';
import type ChampionsModule from '~/Repository/modules/champion';
import type MatchesModule from '~/Repository/modules/matches';
import type AuthModule from '~/Repository/modules/auth';
import type EstimationsModule from "~/Repository/modules/estimations";

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
    matches: MatchesModule,
    auth: AuthModule,
    estimation: EstimationsModule
}

declare module '#app' {
  interface NuxtApp {
    $api: IApiInstance
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: IApiInstance
  }
}

export { IApiInstance }
