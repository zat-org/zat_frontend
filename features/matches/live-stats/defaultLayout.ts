import {
  LIVE_MATCH_STATS_CANVAS,
  LIVE_MATCH_STATS_MAX_ROWS,
  type LiveMatchStatsFieldBox,
  type LiveMatchStatsGridOptions,
  type LiveMatchStatsLayout,
  type LiveMatchStatsRowBoxes,
} from '~/features/matches/live-stats/types'

function fieldBox(
  partial: Partial<LiveMatchStatsFieldBox> & Pick<LiveMatchStatsFieldBox, 'x' | 'y' | 'w' | 'h'>,
): LiveMatchStatsFieldBox {
  return {
    fontSize: 28,
    color: '#ffffff',
    bgColor: '',
    align: 'center',
    ...partial,
  }
}

export function createDefaultGridOptions(): LiveMatchStatsGridOptions {
  return {
    x: 631,
    y: 243,
    gapY: 11,
    gapX: 12,
    rowH: 48,
    valueW: 118,
    labelW: 404,
    labelFontSize: 24,
    valueFontSize: 28,
  }
}

/** Exact first-row Y positions from the calibrated match-stats board art. */
const DEFAULT_ROW_YS = [
  244, 295, 347, 407, 467, 529, 586, 646, 706, 765, 824, 885, 947,
] as const

/** Apply grid geometry to every stats row. */
export function reflowLiveMatchStatsGrid(layout: LiveMatchStatsLayout): void {
  const {
    x,
    y,
    gapY,
    gapX,
    rowH,
    valueW,
    labelW,
    labelFontSize,
    valueFontSize,
  } = layout.grid

  const labelX = x + valueW + gapX
  const team2X = labelX + labelW + gapX
  const step = rowH + gapY

  for (let index = 0; index < layout.rows.length; index += 1) {
    const rowY = y + index * step
    const row = layout.rows[index]!

    row.team1Value.x = x
    row.team1Value.y = rowY
    row.team1Value.w = valueW
    row.team1Value.h = rowH
    row.team1Value.fontSize = valueFontSize

    row.label.x = labelX
    row.label.y = rowY
    row.label.w = labelW
    row.label.h = rowH
    row.label.fontSize = labelFontSize

    row.team2Value.x = team2X
    row.team2Value.y = rowY
    row.team2Value.w = valueW
    row.team2Value.h = rowH
    row.team2Value.fontSize = valueFontSize
  }
}

function buildRows(grid: LiveMatchStatsGridOptions, rowYs?: readonly number[]): LiveMatchStatsRowBoxes[] {
  // Calibrated column X from match-stats.png (slightly tighter than pure grid math).
  const team1X = 633
  const labelX = 761
  const team2X = 1175
  const step = grid.rowH + grid.gapY

  return Array.from({ length: LIVE_MATCH_STATS_MAX_ROWS }, (_, index) => {
    const y = rowYs?.[index] ?? (grid.y + index * step)
    return {
      label: fieldBox({
        x: labelX,
        y,
        w: grid.labelW,
        h: grid.rowH,
        fontSize: grid.labelFontSize,
        color: '#f8f8f6',
      }),
      team1Value: fieldBox({
        x: team1X,
        y,
        w: grid.valueW,
        h: grid.rowH,
        fontSize: grid.valueFontSize,
        color: '#ffffff',
      }),
      team2Value: fieldBox({
        x: team2X,
        y,
        w: grid.valueW,
        h: grid.rowH,
        fontSize: grid.valueFontSize,
        color: '#ffffff',
      }),
    }
  })
}

export function createDefaultLiveMatchStatsLayout(): LiveMatchStatsLayout {
  const grid = createDefaultGridOptions()
  return {
    version: 1,
    canvas: { ...LIVE_MATCH_STATS_CANVAS },
    background: '/images/match-stats.png',
    frame: {
      x: 0,
      y: 0,
      w: LIVE_MATCH_STATS_CANVAS.width,
      h: LIVE_MATCH_STATS_CANVAS.height,
    },
    grid,
    logo: fieldBox({
      x: 886,
      y: 33,
      w: 0,
      h: 0,
      fontSize: 16,
    }),
    team1Logo: fieldBox({
      x: 465,
      y: 528,
      w: 125,
      h: 125,
      fontSize: 16,
    }),
    team2Logo: fieldBox({
      x: 1326,
      y: 528,
      w: 125,
      h: 125,
      fontSize: 16,
    }),
    team1Name: fieldBox({
      x: 538,
      y: 194,
      w: 320,
      h: 56,
      fontSize: 28,
      color: '#f8f8f6',
    }),
    team2Name: fieldBox({
      x: 1065,
      y: 189,
      w: 320,
      h: 56,
      fontSize: 28,
      color: '#f8f8f6',
    }),
    rows: buildRows(grid, DEFAULT_ROW_YS),
  }
}

function normalizeBox(
  box: Partial<LiveMatchStatsFieldBox> | null | undefined,
  fallback: LiveMatchStatsFieldBox,
): LiveMatchStatsFieldBox {
  const w = typeof box?.w === 'number' && Number.isFinite(box.w) ? box.w : fallback.w
  const h = typeof box?.h === 'number' && Number.isFinite(box.h) ? box.h : fallback.h
  return fieldBox({
    x: typeof box?.x === 'number' ? box.x : fallback.x,
    y: typeof box?.y === 'number' ? box.y : fallback.y,
    w: w >= 0 ? w : fallback.w,
    h: h >= 0 ? h : fallback.h,
    fontSize: typeof box?.fontSize === 'number' ? box.fontSize : fallback.fontSize,
    color: typeof box?.color === 'string' ? box.color : fallback.color,
    bgColor: typeof box?.bgColor === 'string' ? box.bgColor : fallback.bgColor,
    align: box?.align === 'start' || box?.align === 'end' || box?.align === 'center'
      ? box.align
      : fallback.align,
  })
}

function normalizeGrid(
  grid: Partial<LiveMatchStatsGridOptions> | null | undefined,
  fallback: LiveMatchStatsGridOptions,
): LiveMatchStatsGridOptions {
  return {
    x: typeof grid?.x === 'number' ? grid.x : fallback.x,
    y: typeof grid?.y === 'number' ? grid.y : fallback.y,
    gapY: typeof grid?.gapY === 'number' ? grid.gapY : fallback.gapY,
    gapX: typeof grid?.gapX === 'number' ? grid.gapX : fallback.gapX,
    rowH: typeof grid?.rowH === 'number' && grid.rowH > 0 ? grid.rowH : fallback.rowH,
    valueW: typeof grid?.valueW === 'number' && grid.valueW > 0 ? grid.valueW : fallback.valueW,
    labelW: typeof grid?.labelW === 'number' && grid.labelW > 0 ? grid.labelW : fallback.labelW,
    labelFontSize: typeof grid?.labelFontSize === 'number' ? grid.labelFontSize : fallback.labelFontSize,
    valueFontSize: typeof grid?.valueFontSize === 'number' ? grid.valueFontSize : fallback.valueFontSize,
  }
}

export function normalizeLiveMatchStatsLayout(
  layout: LiveMatchStatsLayout,
): LiveMatchStatsLayout {
  const defaults = createDefaultLiveMatchStatsLayout()
  const rows = Array.from({ length: LIVE_MATCH_STATS_MAX_ROWS }, (_, index) => {
    const row = layout.rows?.[index]
    const fallback = defaults.rows[index]!
    return {
      label: normalizeBox(row?.label, fallback.label),
      team1Value: normalizeBox(row?.team1Value, fallback.team1Value),
      team2Value: normalizeBox(row?.team2Value, fallback.team2Value),
    }
  })

  return {
    version: 1,
    canvas: {
      width: layout.canvas?.width || defaults.canvas.width,
      height: layout.canvas?.height || defaults.canvas.height,
    },
    background: typeof layout.background === 'string' && layout.background
      ? layout.background.replace(/match-statics\.png$/, 'match-stats.png')
      : defaults.background,
    frame: {
      x: typeof layout.frame?.x === 'number' ? layout.frame.x : defaults.frame.x,
      y: typeof layout.frame?.y === 'number' ? layout.frame.y : defaults.frame.y,
      w: typeof layout.frame?.w === 'number' ? layout.frame.w : defaults.frame.w,
      h: typeof layout.frame?.h === 'number' ? layout.frame.h : defaults.frame.h,
    },
    grid: normalizeGrid(layout.grid, defaults.grid),
    logo: normalizeBox(layout.logo, defaults.logo),
    team1Logo: normalizeBox(layout.team1Logo, defaults.team1Logo),
    team2Logo: normalizeBox(layout.team2Logo, defaults.team2Logo),
    team1Name: normalizeBox(layout.team1Name, defaults.team1Name),
    team2Name: normalizeBox(layout.team2Name, defaults.team2Name),
    rows,
  }
}
