import RefereesModule from '~/Repository/modules/referees'
import ContactUsMessagesModule from '~/Repository/modules/contactUsMessagesModule'
import JobsModule from '~/Repository/modules/jobs'
import BlogsModule from '~/Repository/modules/blogs'
import TeamsModule from '~/Repository/modules/teams'
import PlayersModule from '~/Repository/modules/players'
import FollowerChampionModule from '~/Repository/modules/followersChampions'
import WebsiteAssetsModule from '~/Repository/modules/websiteAssets'
import ChampionsModule from '~/Repository/modules/champion'
import MatchesModule from '~/Repository/modules/matches'
import AuthModule from '~/Repository/modules/auth'
import EstimationsModule from '~/Repository/modules/estimations'
import { createStrapiClient } from '~/utils/createStrapiClient'
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
