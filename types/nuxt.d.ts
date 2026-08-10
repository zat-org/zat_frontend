import type RefereesModule from '~/features/referees/api/referees'
import type ContactUsMessagesModule from '~/features/shared/api/contactUsMessagesModule'
import type JobsModule from '~/features/jobs/api/jobs'
import type BlogsModule from '~/features/blogs/api/blogs'
import type TeamsModule from '~/features/teams/api/teams'
import type PlayersModule from '~/features/teams/api/players'
import type FollowerChampionModule from '~/features/followers/api/followersChampions'
import type WebsiteAssetsModule from '~/features/website/api/websiteAssets'
import type ChampionsModule from '~/features/championships/api/champion'
import type MatchesModule from '~/features/matches/api/matches'
import type AuthModule from '~/features/auth/api/auth'
import type EstimationsModule from '~/features/matches/api/estimations'

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
    estimation: EstimationsModule,
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
