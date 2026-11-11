export type LiveTableAlign = 'start' | 'center' | 'end'

export type LiveTableFieldBox = {
  x: number
  y: number
  w: number
  h: number
  fontSize: number
  color: string
  /** CSS background color; empty/transparent = none */
  bgColor: string
  align: LiveTableAlign
}

/** Absolute box for the decorative frame image inside the canvas. */
export type LiveTableFrameBox = {
  x: number
  y: number
  w: number
  h: number
}

export type LiveTableColumnKey =
  | 'rank'
  | 'team'
  | 'play'
  | 'win'
  | 'draw'
  | 'lost'
  | 'streak'
  | 'points'
  | 'abnat'

export type LiveTableColumnDef = {
  key: LiveTableColumnKey
  label: string
}

export type LiveTableOptions = {
  /** Table origin X (left edge of first column) */
  x: number
  /** Header row Y */
  y: number
  gapX: number
  gapY: number
  cellW: number
  cellH: number
  headerH: number
  /** Vertical space between header and first data row */
  headerGap: number
  /** Default background for data cells */
  cellBgColor: string
  /** Default background for header cells */
  headerBgColor: string
}

export type LiveTableLayout = {
  version: 1
  canvas: {
    width: number
    height: number
  }
  background: string
  /** Position/size of the frame image (allows shrinking to leave room for logo). */
  frame: LiveTableFrameBox
  table: LiveTableOptions
  columns: LiveTableColumnDef[]
  logo: LiveTableFieldBox
  headers: Record<string, LiveTableFieldBox>
  /** rows[rowIndex][columnKey] */
  cells: Array<Record<string, LiveTableFieldBox>>
}

export const LIVE_TABLE_LAYOUT_STORAGE_KEY = 'zat:live-table-layout:v7'
export const LIVE_TABLE_MAX_ROWS = 8
export const LIVE_TABLE_CANVAS = { width: 1920, height: 1080 } as const
