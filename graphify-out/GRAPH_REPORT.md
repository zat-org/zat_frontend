# Graph Report - zat_frontend  (2026-07-28)

## Corpus Check
- 219 files · ~338,923 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1079 nodes · 1503 edges · 134 communities (112 shown, 22 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `888e02d8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 101|Community 101]]
- [[_COMMUNITY_Community 103|Community 103]]
- [[_COMMUNITY_Community 104|Community 104]]
- [[_COMMUNITY_Community 105|Community 105]]
- [[_COMMUNITY_Community 106|Community 106]]
- [[_COMMUNITY_Community 107|Community 107]]
- [[_COMMUNITY_Community 108|Community 108]]
- [[_COMMUNITY_Community 109|Community 109]]
- [[_COMMUNITY_Community 110|Community 110]]
- [[_COMMUNITY_Community 111|Community 111]]
- [[_COMMUNITY_Community 112|Community 112]]
- [[_COMMUNITY_Community 113|Community 113]]
- [[_COMMUNITY_Community 114|Community 114]]
- [[_COMMUNITY_Community 115|Community 115]]
- [[_COMMUNITY_Community 116|Community 116]]
- [[_COMMUNITY_Community 117|Community 117]]
- [[_COMMUNITY_Community 118|Community 118]]
- [[_COMMUNITY_Community 119|Community 119]]
- [[_COMMUNITY_Community 120|Community 120]]
- [[_COMMUNITY_Community 121|Community 121]]
- [[_COMMUNITY_Community 122|Community 122]]
- [[_COMMUNITY_Community 123|Community 123]]
- [[_COMMUNITY_Community 124|Community 124]]
- [[_COMMUNITY_Community 125|Community 125]]
- [[_COMMUNITY_Community 126|Community 126]]
- [[_COMMUNITY_Community 127|Community 127]]
- [[_COMMUNITY_Community 128|Community 128]]
- [[_COMMUNITY_Community 129|Community 129]]
- [[_COMMUNITY_Community 130|Community 130]]
- [[_COMMUNITY_Community 131|Community 131]]
- [[_COMMUNITY_Community 132|Community 132]]
- [[_COMMUNITY_Community 135|Community 135]]

## God Nodes (most connected - your core abstractions)
1. `FetchFactory` - 32 edges
2. `IChamp` - 22 edges
3. `MatchState` - 21 edges
4. `IMatchLessDetails` - 18 edges
5. `IMatchFullDetails` - 16 edges
6. `ChampionsModule` - 16 edges
7. `MatchesModule` - 15 edges
8. `ICupMatchData` - 13 edges
9. `IApiInstance` - 13 edges
10. `ChampType` - 12 edges

## Surprising Connections (you probably didn't know these)
- `ChampionshipTypeConfig` --references--> `ChampType`  [EXTRACTED]
  utils/championshipTypes.ts → Models/ChampType.ts
- `IApiInstance` --references--> `BlogsModule`  [EXTRACTED]
  types/nuxt.d.ts → Repository/modules/blogs.ts
- `IApiInstance` --references--> `ChampionsModule`  [EXTRACTED]
  types/nuxt.d.ts → Repository/modules/champion.ts
- `IApiInstance` --references--> `ContactUsMessagesModule`  [EXTRACTED]
  types/nuxt.d.ts → Repository/modules/contactUsMessagesModule.ts
- `IApiInstance` --references--> `EstimationsModule`  [EXTRACTED]
  types/nuxt.d.ts → Repository/modules/estimations.ts

## Import Cycles
- None detected.

## Communities (134 total, 22 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (13): day, displayPoints(), isUpcoming, matchDate, month, pointsValue(), props, showScoreHints (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (38): { $api }, userStore, { $api }, countdown, { error, pending, requestOtp, confirmOtp }, FormState, handleClose(), isLoginFormOpened (+30 more)

### Community 2 - "Community 2"
Cohesion: 0.04
Nodes (46): dependencies, apexcharts, chart.js, motion-v, @nuxt/content, @nuxtjs/strapi, pinia, @pinia/nuxt (+38 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (24): activeAccordion, { $api }, champName, countdownParts, displayMatch, endedMatches, error, latestMatch (+16 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (14): activeMatch, activeTab, { $api }, countdown, endedMatches, error, hasContent, matchDate (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (7): props, props, props, IPlayerFullDetails, IPlayerLessDetails, ITeamStatistics, ITransfer

### Community 6 - "Community 6"
Cohesion: 0.22
Nodes (13): getStrapiMediaAltText(), getStrapiMediaAttributes(), getStrapiMediaItem(), getStrapiMediaLargePath(), getStrapiMediaPath(), mapHeroSlides(), MediaUrlFn, StrapiMediaAttributes (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (6): imageErrors, isExpanded, isHovered, playerSlots, props, showMembersPeek

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (11): { $api }, currentDate, emit, IsJudgedBeforeOptions, maxBirthDate, minBirthDate, { pending, error, send: sendJoinAsRefereeRequest }, router (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (13): { $api }, currentDate, { error, pending, send: sendJoinRequest }, IsPlayedBeforeOptions, maxBirthDate, minBirthDate, props, router (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (15): { $api }, checkEstimationStatus(), { data: estimationData, error: estimationError, getData: getUserEstimation }, estimationScore, estimationStatus, fetchFullMatchData(), fullMatchData, handleEstimationSubmitted() (+7 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (16): { $api }, bestPlayerOptions, emit, { error, pending, send: sendEstimation }, getWinner, handleClose(), isEstimationFormOpened, IState (+8 more)

### Community 12 - "Community 12"
Cohesion: 0.26
Nodes (9): HezamTeamSummary, IJoinChamp, LeagueTeamSummary, TeamSummary, { $api }, champType, logosById, props (+1 more)

### Community 13 - "Community 13"
Cohesion: 0.43
Nodes (3): GetPlayerByIdResponse, PlayersModule, createStrapiClient()

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (13): props, rows, selected, selectedId, IStatisticViewData, StatisticOptionName, StatisticOptions, { $api } (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.24
Nodes (4): team1Score, team2Score, IMatchFullDetails, KeyNamePair

### Community 16 - "Community 16"
Cohesion: 0.17
Nodes (10): { $api }, indicator, isFormOpen, jobId, jobs, pageNumber, pgNumStr, route (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (7): emptyClass, groupHeaderClass, headerClass, isUpcoming, listClass, openChampId, props

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (5): { $api }, champs, champType, moreLink, props

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (11): IGetAllChampionsResponse, IGetChampDetailsResponse, IGetChampMatchesResponse, IGetChampStudiosResponse, IGetChampSummaryResponse, IGetChampSummaryWinnerResponse, IGetChampTeamsResponse, IGetRecentChampsResponse (+3 more)

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (13): ui, props, LeagueState, IChamp, props, { $api }, route, { $api } (+5 more)

### Community 22 - "Community 22"
Cohesion: 0.20
Nodes (8): { $api }, blogs, indicator, pageNumber, pgNumStr, route, router, totalBlogsCount

### Community 23 - "Community 23"
Cohesion: 0.28
Nodes (7): emit, fileInput, filename, handleCancelSelection(), handleFileSelection(), props, textInput

### Community 24 - "Community 24"
Cohesion: 0.25
Nodes (7): { height }, isSupported, props, slidesPerView, spaceBetween, SwiperElement, swiperElm

### Community 27 - "Community 27"
Cohesion: 0.29
Nodes (5): paddedHours, paddedMinutes, paddedSeconds, props, sizeClasses

### Community 29 - "Community 29"
Cohesion: 0.33
Nodes (4): colorMode, isDark, isHeaderOpen, { items }

### Community 30 - "Community 30"
Cohesion: 0.33
Nodes (5): { $api }, twitch, visitCount, zatChannel, zatPlusChannel

### Community 31 - "Community 31"
Cohesion: 0.20
Nodes (9): { $api }, emit, { error: errorAtSendApplyRequest, pending: sendApplyRequestPending, send: sendApplyJobRequest }, onSubmit(), props, schema, state, toast (+1 more)

### Community 32 - "Community 32"
Cohesion: 0.22
Nodes (9): { $api }, { error, pending, send: sendContactUsMessage }, MessagesTypes, onSubmit(), resetState(), router, schema, state (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.50
Nodes (3): emit, props, updateModelValue()

### Community 35 - "Community 35"
Cohesion: 0.06
Nodes (39): dateParts, isDone, isUpcoming, props, statusLabel, team1IsWinner, team2IsWinner, activeBreakpoints (+31 more)

### Community 37 - "Community 37"
Cohesion: 0.40
Nodes (4): { $api }, isFormOpen, route, router

### Community 38 - "Community 38"
Cohesion: 0.40
Nodes (4): { $api }, player, route, socialMediaAccounts

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (4): Development Server, Nuxt 3 Minimal Starter, Production, Setup

### Community 40 - "Community 40"
Cohesion: 0.25
Nodes (5): imageBoxRef, isHovered, preferredReducedMotion, reduceMotion, shineRef

### Community 41 - "Community 41"
Cohesion: 0.50
Nodes (3): items, props, ui

### Community 42 - "Community 42"
Cohesion: 0.67
Nodes (3): emit, props, updateModelValue()

### Community 43 - "Community 43"
Cohesion: 0.50
Nodes (3): selected, uiRadio, uiRadioGroup

### Community 44 - "Community 44"
Cohesion: 0.67
Nodes (3): emit, props, updateModelValue()

### Community 46 - "Community 46"
Cohesion: 0.50
Nodes (3): DropdownChild, groupedRows, props

### Community 47 - "Community 47"
Cohesion: 0.50
Nodes (3): availablePages, emit, props

### Community 48 - "Community 48"
Cohesion: 0.50
Nodes (3): attrs, data, masks

### Community 50 - "Community 50"
Cohesion: 0.50
Nodes (3): { $api }, champName, matches

### Community 51 - "Community 51"
Cohesion: 0.50
Nodes (3): { $api }, blog, route

### Community 52 - "Community 52"
Cohesion: 0.23
Nodes (7): emit, ui, IApplyToJobRequest, IJob, IJobsListResult, JobsModule, StrapiJobAttributes

### Community 53 - "Community 53"
Cohesion: 0.18
Nodes (7): { $api }, cards, siteVisits, twitchSubs, visitCount, youtubeViews, zatChannel

### Community 54 - "Community 54"
Cohesion: 0.50
Nodes (3): { $api }, champion, route

### Community 55 - "Community 55"
Cohesion: 0.50
Nodes (3): { $api }, route, team

### Community 56 - "Community 56"
Cohesion: 0.50
Nodes (3): { $api }, route, teams

### Community 57 - "Community 57"
Cohesion: 0.40
Nodes (4): legalLinks, quickLinks, socialLinks, tournamentLinks

### Community 67 - "Community 67"
Cohesion: 0.50
Nodes (3): { $api }, isOverview, route

### Community 78 - "Community 78"
Cohesion: 0.50
Nodes (3): heightClass, pairCount, props

### Community 81 - "Community 81"
Cohesion: 0.20
Nodes (9): attrs, classAttr, fallbackIconClass, hasError, hasExplicitSize, hasObjectFit, imgClass, nonClassAttrs (+1 more)

### Community 87 - "Community 87"
Cohesion: 0.33
Nodes (4): durationSec, trackLogos, trackRef, viewportRef

### Community 88 - "Community 88"
Cohesion: 0.33
Nodes (4): activeIndex, colorMode, images, logoSrc

### Community 101 - "Community 101"
Cohesion: 0.11
Nodes (17): { $api }, champLogoSrc, featuredMatch, hasWinner, pointsDisplay, props, stateMessage, stats (+9 more)

### Community 103 - "Community 103"
Cohesion: 0.13
Nodes (13): { $api }, cardChamps, cardsType, champs, emptyCardsMessage, emptyListMessage, historyParams, isUpcoming (+5 more)

### Community 104 - "Community 104"
Cohesion: 0.08
Nodes (21): props, rows, props, rows, ScoreRow, matchHref, props, detailStats (+13 more)

### Community 105 - "Community 105"
Cohesion: 0.06
Nodes (35): { $api }, champs, champType, route, sectionTitle, dateSource, displayDate, displayDateIso (+27 more)

### Community 106 - "Community 106"
Cohesion: 0.20
Nodes (9): { $api }, champType, estimationRecords, logosById, pending, props, scoreRows, sectionError (+1 more)

### Community 108 - "Community 108"
Cohesion: 0.27
Nodes (7): IClientImage, IPlayerImage, IZatStatistics, IYoutubeChannelData, mapClientImages(), mapPlayerImages(), unwrapStrapiCounter()

### Community 109 - "Community 109"
Cohesion: 0.17
Nodes (10): moreHref, props, rows, ICreateMatchEstimation, IEstimationRecord, IEstimationTable, IMatchEstimation, IUserEstimationsResult (+2 more)

### Community 110 - "Community 110"
Cohesion: 0.21
Nodes (10): availableNavigation, champId, champType, isActive(), navigation, normalizePath(), props, route (+2 more)

### Community 111 - "Community 111"
Cohesion: 0.18
Nodes (8): { $api }, champs, emptyMessage, historyParams, moreLink, timeTab, typeTab, typeTabs

### Community 112 - "Community 112"
Cohesion: 0.23
Nodes (9): matches, offsetOfComingMatch, props, { $api }, offsetOfComingMatch, props, studios, getIndexOfUpcomingEvent() (+1 more)

### Community 113 - "Community 113"
Cohesion: 0.20
Nodes (8): { $api }, { data, error, pending, getData: GetUserEstimationForMatch }, isEstimationFormOpened, isLoginFormOpened, isMatchOpenForEstimations, props, userStore, userSubmittedEstimationCount

### Community 114 - "Community 114"
Cohesion: 0.23
Nodes (9): analystsLabel, displayDate, displayDateIso, props, thumbnail, props, thumbnail, extractYoutubeVideoId() (+1 more)

### Community 115 - "Community 115"
Cohesion: 0.27
Nodes (5): AuthModule, FollowersChampionsModule, ComponentCustomProperties, IApiInstance, NuxtApp

### Community 116 - "Community 116"
Cohesion: 0.29
Nodes (6): useClientImages(), useHeroSlides(), useMediaUrl(), usePlayerImages(), StrapiFindParams, useStrapiCollection()

### Community 117 - "Community 117"
Cohesion: 0.33
Nodes (5): ChampWinText, props, IBlog, IBlogFullDetails, getElapsedTime()

### Community 118 - "Community 118"
Cohesion: 0.33
Nodes (4): props, IJoinAsRefereeRequest, IReferee, RefereesModule

### Community 119 - "Community 119"
Cohesion: 0.36
Nodes (5): IError, ILoginConfirmed, IUser, HttpMethod, RequestBody

### Community 120 - "Community 120"
Cohesion: 0.40
Nodes (4): FALLBACK_SLIDES, IHeroSlide, StrapiEntity, StrapiHeroSlideAttributes

### Community 121 - "Community 121"
Cohesion: 0.24
Nodes (3): FetchFactory, ContactUsMessage, ContactUsMessagesModule

### Community 122 - "Community 122"
Cohesion: 0.19
Nodes (9): open, emit, onSelect(), open, isSmUp, open, timerSize, IMatchLessDetails (+1 more)

### Community 123 - "Community 123"
Cohesion: 0.18
Nodes (9): { $api }, pending, previewMatches, previewStudios, props, sectionError, props, IAnalyst (+1 more)

### Community 124 - "Community 124"
Cohesion: 0.29
Nodes (5): bestPlayer, bestPlayerId, Person, ITeam, ITeamFullDetails

### Community 125 - "Community 125"
Cohesion: 0.33
Nodes (5): IMatchHistoryChamp, IMatchHistoryGroup, IMatchHistoryMatch, IMatchHistoryTeam, MatchHistoryStatus

### Community 126 - "Community 126"
Cohesion: 0.47
Nodes (3): GetAllTeamsResponse, GetTeamByIdResponse, TeamsModule

### Community 128 - "Community 128"
Cohesion: 0.47
Nodes (3): IBlogResponse, IBlogsResponse, BlogsModule

### Community 131 - "Community 131"
Cohesion: 0.40
Nodes (3): props, props, IChampLessDetails

### Community 132 - "Community 132"
Cohesion: 0.50
Nodes (3): ChampWinText, props, ITeamLessDetails

### Community 135 - "Community 135"
Cohesion: 0.40
Nodes (4): IMeta, IPagination, IResponse, StrapiFollowerChampionAttributes

## Knowledge Gaps
- **569 isolated node(s):** `nuxt`, `nuxt-ui`, `SelectOption`, `IJoinChamp`, `IClientsImages` (+564 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `FetchFactory` connect `Community 121` to `Community 128`, `Community 129`, `Community 135`, `Community 107`, `Community 108`, `Community 109`, `Community 13`, `Community 15`, `Community 19`, `Community 115`, `Community 52`, `Community 118`, `Community 119`, `Community 126`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `MatchState` connect `Community 35` to `Community 0`, `Community 130`, `Community 3`, `Community 4`, `Community 101`, `Community 15`, `Community 17`, `Community 122`, `Community 123`, `Community 125`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `IMatchLessDetails` connect `Community 122` to `Community 130`, `Community 3`, `Community 4`, `Community 35`, `Community 104`, `Community 10`, `Community 107`, `Community 12`, `Community 15`, `Community 112`, `Community 19`, `Community 123`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `nuxt`, `nuxt-ui`, `SelectOption` to the rest of the system?**
  _569 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05454545454545454 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07816091954022988 - nodes in this community are weakly interconnected._