import RefereesModule from '~/features/referees/api/referees'
import ContactUsMessagesModule from '~/features/shared/api/contactUsMessagesModule'
import JobsModule from '~/features/jobs/api/jobs'
import BlogsModule from '~/features/blogs/api/blogs'
import TeamsModule from '~/features/teams/api/teams'
import PlayersModule from '~/features/teams/api/players'
import FollowerChampionModule from '~/features/followers/api/followersChampions'
import WebsiteAssetsModule from '~/features/website/api/websiteAssets'
import ChampionsModule from '~/features/championships/api/champion'
import MatchesModule from '~/features/matches/api/matches'
import AuthModule from '~/features/auth/api/auth'
import EstimationsModule from '~/features/matches/api/estimations'
import { createStrapiClient } from '~/features/shared/utils/createStrapiClient'
import type { IApiInstance } from '~/types/nuxt'

export default defineNuxtPlugin(() => {
  const apiFetcher = createStrapiClient()

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
    matches: new MatchesModule(apiFetcher),
    auth: new AuthModule(apiFetcher),
    estimation: new EstimationsModule(apiFetcher),
  }

  return {
    provide: {
      api: modules,
    },
  }
})
