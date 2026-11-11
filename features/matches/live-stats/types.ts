export type LiveMatchStatsAlign = 'start' | 'center' | 'end'

export type LiveMatchStatsFieldBox = {
  x: number
  y: number
  w: number
  h: number
  fontSize: number
  color: string
  /** CSS background color; empty/transparent = none */
  bgColor: string
  align: LiveMatchStatsAlign
}

export type LiveMatchStatsFrameBox = {
  x: number
  y: number
  w: number
  h: number
}

export type LiveMatchStatsColumnKey = 'label' | 'team1Value' | 'team2Value'

export type LiveMatchStatsRowBoxes = {
  label: LiveMatchStatsFieldBox
  team1Value: LiveMatchStatsFieldBox
  team2Value: LiveMatchStatsFieldBox
}

/** Geometry for the entire stats grid (all rows). */
export type LiveMatchStatsGridOptions = {
  /** Left edge of team1 value column */
  x: number
  /** Top of first row */
  y: number
  /** Extra vertical space between rows (step = rowH + gapY) */
  gapY: number
  /** Horizontal gap between value and label columns */
  gapX: number
  rowH: number
  valueW: number
  labelW: number
  labelFontSize: number
  valueFontSize: number
}

export type LiveMatchStatsLayout = {
  version: 1
  canvas: {
    width: number
    height: number
  }
  background: string
  frame: LiveMatchStatsFrameBox
  grid: LiveMatchStatsGridOptions
  logo: LiveMatchStatsFieldBox
  team1Logo: LiveMatchStatsFieldBox
  team2Logo: LiveMatchStatsFieldBox
  team1Name: LiveMatchStatsFieldBox
  team2Name: LiveMatchStatsFieldBox
  rows: LiveMatchStatsRowBoxes[]
}

export const LIVE_MATCH_STATS_COLUMN_KEYS: LiveMatchStatsColumnKey[] = [
  'team1Value',
  'label',
  'team2Value',
]

export const LIVE_MATCH_STATS_COLUMN_LABELS: Record<LiveMatchStatsColumnKey, string> = {
  team1Value: 'قيم الفريق 1',
  label: 'التسميات',
  team2Value: 'قيم الفريق 2',
}

export const LIVE_MATCH_STATS_LAYOUT_STORAGE_KEY = 'zat:live-match-stats-layout:v7'
export const LIVE_MATCH_STATS_MAX_ROWS = 13
export const LIVE_MATCH_STATS_KABABIT_HAKAM_LABEL = 'عدد الكبابيت حكم'
export const LIVE_MATCH_STATS_CANVAS = { width: 1920, height: 1080 } as const
