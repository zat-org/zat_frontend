import ChampType from '~/features/championships/types/ChampType'
import {
  LIVE_TABLE_CANVAS,
  LIVE_TABLE_MAX_ROWS,
  type LiveTableColumnDef,
  type LiveTableFieldBox,
  type LiveTableFrameBox,
  type LiveTableLayout,
  type LiveTableOptions,
} from '~/features/championships/live-table/types'

function box(
  x: number,
  y: number,
  w: number,
  h: number,
  fontSize: number,
  color: string,
  align: LiveTableFieldBox['align'] = 'center',
  bgColor = '',
): LiveTableFieldBox {
  return { x, y, w, h, fontSize, color, bgColor, align }
}

export function columnsForChampType(champType: ChampType): LiveTableColumnDef[] {
  // LTR placement order: left → right, so rank ends on the right (matches frame).
  if (champType === ChampType.HEZAM) {
    return [
      { key: 'abnat', label: 'ابناط' },
      { key: 'lost', label: 'خسر' },
      { key: 'streak', label: 'فوز متتالي' },
      { key: 'win', label: 'فاز' },
      { key: 'play', label: 'لعب' },
      { key: 'team', label: 'الفريق' },
      { key: 'rank', label: '' },
    ]
  }

  return [
    { key: 'abnat', label: 'ابناط' },
    { key: 'points', label: 'نقاط' },
    { key: 'lost', label: 'خسر' },
    { key: 'draw', label: 'تعادل' },
    { key: 'win', label: 'فاز' },
    { key: 'play', label: 'لعب' },
    { key: 'team', label: 'الفريق' },
    { key: 'rank', label: '' },
  ]
}

/** Tuned frame from live-editor export. */
export function createDefaultFrameBox(): LiveTableFrameBox {
  return {
    x: 181,
    y: 83,
    w: 1482,
    h: 990,
  }
}

export function createDefaultTableOptions(_columnCount: number): LiveTableOptions {
  return {
    x: 311,
    y: 241,
    gapX: 19,
    gapY: 10,
    cellW: 124,
    cellH: 73,
    headerH: 86,
    headerGap: 18,
    cellBgColor: '#ffffff',
    headerBgColor: '',
  }
}

/**
 * Recompute absolute x/y/w/h for headers + cells from table options.
 * Preserves fontSize, color, bgColor, align.
 */
export function reflowLiveTableLayout(layout: LiveTableLayout): void {
  const {
    x: tableX,
    y: headerY,
    gapX,
    gapY,
    cellW,
    cellH,
    headerH,
    headerGap,
  } = layout.table

  let cursorX = tableX
  for (const column of layout.columns) {
    const header = layout.headers[column.key]
    if (header) {
      header.x = cursorX
      header.y = headerY
      header.w = cellW
      header.h = headerH
    }
    else {
      layout.headers[column.key] = box(
        cursorX,
        headerY,
        cellW,
        headerH,
        column.key === 'rank' ? 0 : 32,
        '#ffffff',
        'center',
        layout.table.headerBgColor,
      )
    }
    cursorX += cellW + gapX
  }

  const rowStartY = headerY + headerH + headerGap
  for (let row = 0; row < layout.cells.length; row += 1) {
    const y = rowStartY + row * (cellH + gapY)
    let x = tableX
    const rowCells = layout.cells[row]
    for (const column of layout.columns) {
      const cell = rowCells[column.key]
      if (cell) {
        cell.x = x
        cell.y = y
        cell.w = cellW
        cell.h = cellH
      }
      else {
        const isRank = column.key === 'rank'
        rowCells[column.key] = box(
          x,
          y,
          cellW,
          cellH,
          isRank ? 40 : column.key === 'team' ? 0 : 36,
          isRank ? '#ffffff' : '#111111',
          'center',
          layout.table.cellBgColor,
        )
      }
      x += cellW + gapX
    }
  }
}

/** Paint all headers/cells from table.headerBgColor / table.cellBgColor. */
export function applyTableBackgrounds(layout: LiveTableLayout): void {
  for (const column of layout.columns) {
    const header = layout.headers[column.key]
    if (header) header.bgColor = layout.table.headerBgColor
  }
  for (const row of layout.cells) {
    for (const column of layout.columns) {
      const cell = row[column.key]
      if (cell) cell.bgColor = layout.table.cellBgColor
    }
  }
}

/** Ensure older saved layouts get table options + frame + bgColor fields. */
export function normalizeLiveTableLayout(layout: LiveTableLayout): LiveTableLayout {
  const next = JSON.parse(JSON.stringify(layout)) as LiveTableLayout
  if (!next.table) {
    next.table = createDefaultTableOptions(next.columns?.length || 8)
  }
  else {
    const defaults = createDefaultTableOptions(next.columns?.length || 8)
    next.table = { ...defaults, ...next.table }
  }

  if (!next.frame || typeof next.frame.w !== 'number') {
    next.frame = createDefaultFrameBox()
  }

  const ensureBox = (field: LiveTableFieldBox | undefined, fallbackBg = '') => {
    if (!field) return
    if (typeof field.bgColor !== 'string') field.bgColor = fallbackBg
  }

  ensureBox(next.logo)
  for (const column of next.columns || []) {
    ensureBox(next.headers?.[column.key], next.table.headerBgColor)
  }
  for (const row of next.cells || []) {
    for (const column of next.columns || []) {
      ensureBox(row[column.key], next.table.cellBgColor)
    }
  }

  return next
}

/** Pixel-tuned league default from live-editor export. */
const LEAGUE_DEFAULT_LAYOUT: LiveTableLayout = {
  "version": 1,
  "canvas": {
    "width": 1920,
    "height": 1080
  },
  "background": "/images/table-champion.png",
  "table": {
    "x": 311,
    "y": 241,
    "gapX": 19,
    "gapY": 10,
    "cellW": 124,
    "cellH": 73,
    "headerH": 86,
    "headerGap": 18,
    "cellBgColor": "#ffffff",
    "headerBgColor": ""
  },
  "columns": [
    {
      "key": "abnat",
      "label": "ابناط"
    },
    {
      "key": "points",
      "label": "نقاط"
    },
    {
      "key": "lost",
      "label": "خسر"
    },
    {
      "key": "draw",
      "label": "تعادل"
    },
    {
      "key": "win",
      "label": "فاز"
    },
    {
      "key": "play",
      "label": "لعب"
    },
    {
      "key": "team",
      "label": "الفريق"
    },
    {
      "key": "rank",
      "label": ""
    }
  ],
  "logo": {
    "x": 824,
    "y": 6,
    "w": 200,
    "h": 200,
    "fontSize": 0,
    "color": "#ffffff",
    "bgColor": "",
    "align": "center"
  },
  "headers": {
    "abnat": {
      "x": 431,
      "y": 237,
      "w": 116,
      "h": 86,
      "fontSize": 40,
      "color": "#ffffff",
      "bgColor": "",
      "align": "center"
    },
    "points": {
      "x": 559,
      "y": 237,
      "w": 116,
      "h": 86,
      "fontSize": 40,
      "color": "#ffffff",
      "bgColor": "",
      "align": "center"
    },
    "lost": {
      "x": 686,
      "y": 237,
      "w": 116,
      "h": 86,
      "fontSize": 40,
      "color": "#ffffff",
      "bgColor": "",
      "align": "center"
    },
    "draw": {
      "x": 812,
      "y": 237,
      "w": 116,
      "h": 86,
      "fontSize": 40,
      "color": "#ffffff",
      "bgColor": "",
      "align": "center"
    },
    "win": {
      "x": 941,
      "y": 237,
      "w": 116,
      "h": 86,
      "fontSize": 40,
      "color": "#ffffff",
      "bgColor": "",
      "align": "center"
    },
    "play": {
      "x": 1071,
      "y": 237,
      "w": 116,
      "h": 86,
      "fontSize": 40,
      "color": "#ffffff",
      "bgColor": "",
      "align": "center"
    },
    "team": {
      "x": 1203,
      "y": 232,
      "w": 116,
      "h": 86,
      "fontSize": 32,
      "color": "#ffffff",
      "bgColor": "",
      "align": "center"
    },
    "rank": {
      "x": 1332,
      "y": 241,
      "w": 79,
      "h": 86,
      "fontSize": 0,
      "color": "#ffffff",
      "bgColor": "",
      "align": "center"
    }
  },
  "cells": [
    {
      "abnat": {
        "x": 431,
        "y": 333,
        "w": 116,
        "h": 73,
        "fontSize": 35,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "points": {
        "x": 559,
        "y": 333,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "lost": {
        "x": 686,
        "y": 333,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "draw": {
        "x": 812,
        "y": 333,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "win": {
        "x": 941,
        "y": 333,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "play": {
        "x": 1071,
        "y": 333,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "team": {
        "x": 1197,
        "y": 333,
        "w": 116,
        "h": 73,
        "fontSize": 32,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "rank": {
        "x": 1332,
        "y": 333,
        "w": 79,
        "h": 73,
        "fontSize": 40,
        "color": "#ffffff",
        "bgColor": "",
        "align": "center"
      }
    },
    {
      "abnat": {
        "x": 431,
        "y": 418,
        "w": 116,
        "h": 73,
        "fontSize": 35,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "points": {
        "x": 559,
        "y": 418,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "lost": {
        "x": 686,
        "y": 418,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "draw": {
        "x": 812,
        "y": 418,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "win": {
        "x": 941,
        "y": 418,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "play": {
        "x": 1071,
        "y": 418,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "team": {
        "x": 1197,
        "y": 418,
        "w": 116,
        "h": 73,
        "fontSize": 32,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "rank": {
        "x": 1332,
        "y": 418,
        "w": 79,
        "h": 73,
        "fontSize": 40,
        "color": "#ffffff",
        "bgColor": "",
        "align": "center"
      }
    },
    {
      "abnat": {
        "x": 431,
        "y": 502,
        "w": 116,
        "h": 73,
        "fontSize": 35,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "points": {
        "x": 559,
        "y": 502,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "lost": {
        "x": 686,
        "y": 502,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "draw": {
        "x": 812,
        "y": 502,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "win": {
        "x": 941,
        "y": 502,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "play": {
        "x": 1071,
        "y": 502,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "team": {
        "x": 1197,
        "y": 502,
        "w": 116,
        "h": 73,
        "fontSize": 32,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "rank": {
        "x": 1332,
        "y": 502,
        "w": 79,
        "h": 73,
        "fontSize": 40,
        "color": "#ffffff",
        "bgColor": "",
        "align": "center"
      }
    },
    {
      "abnat": {
        "x": 431,
        "y": 587,
        "w": 116,
        "h": 73,
        "fontSize": 35,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "points": {
        "x": 559,
        "y": 587,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "lost": {
        "x": 686,
        "y": 587,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "draw": {
        "x": 812,
        "y": 587,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "win": {
        "x": 941,
        "y": 587,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "play": {
        "x": 1071,
        "y": 587,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "team": {
        "x": 1197,
        "y": 587,
        "w": 116,
        "h": 73,
        "fontSize": 32,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "rank": {
        "x": 1332,
        "y": 587,
        "w": 79,
        "h": 73,
        "fontSize": 40,
        "color": "#ffffff",
        "bgColor": "",
        "align": "center"
      }
    },
    {
      "abnat": {
        "x": 431,
        "y": 673,
        "w": 116,
        "h": 73,
        "fontSize": 35,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "points": {
        "x": 559,
        "y": 673,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "lost": {
        "x": 686,
        "y": 673,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "draw": {
        "x": 812,
        "y": 673,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "win": {
        "x": 941,
        "y": 673,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "play": {
        "x": 1071,
        "y": 673,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "team": {
        "x": 1197,
        "y": 673,
        "w": 116,
        "h": 73,
        "fontSize": 32,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "rank": {
        "x": 1332,
        "y": 673,
        "w": 79,
        "h": 73,
        "fontSize": 40,
        "color": "#ffffff",
        "bgColor": "",
        "align": "center"
      }
    },
    {
      "abnat": {
        "x": 431,
        "y": 758,
        "w": 116,
        "h": 73,
        "fontSize": 35,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "points": {
        "x": 559,
        "y": 758,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "lost": {
        "x": 686,
        "y": 758,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "draw": {
        "x": 812,
        "y": 758,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "win": {
        "x": 941,
        "y": 758,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "play": {
        "x": 1071,
        "y": 758,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "team": {
        "x": 1197,
        "y": 758,
        "w": 116,
        "h": 73,
        "fontSize": 32,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "rank": {
        "x": 1332,
        "y": 758,
        "w": 79,
        "h": 73,
        "fontSize": 40,
        "color": "#ffffff",
        "bgColor": "",
        "align": "center"
      }
    },
    {
      "abnat": {
        "x": 431,
        "y": 842,
        "w": 116,
        "h": 73,
        "fontSize": 35,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "points": {
        "x": 559,
        "y": 842,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "lost": {
        "x": 686,
        "y": 842,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "draw": {
        "x": 812,
        "y": 842,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "win": {
        "x": 941,
        "y": 842,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "play": {
        "x": 1071,
        "y": 842,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "team": {
        "x": 1197,
        "y": 842,
        "w": 116,
        "h": 73,
        "fontSize": 32,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "rank": {
        "x": 1332,
        "y": 842,
        "w": 79,
        "h": 73,
        "fontSize": 40,
        "color": "#ffffff",
        "bgColor": "",
        "align": "center"
      }
    },
    {
      "abnat": {
        "x": 431,
        "y": 925,
        "w": 116,
        "h": 73,
        "fontSize": 35,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "points": {
        "x": 559,
        "y": 925,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "lost": {
        "x": 686,
        "y": 925,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "draw": {
        "x": 812,
        "y": 925,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "win": {
        "x": 941,
        "y": 925,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "play": {
        "x": 1071,
        "y": 925,
        "w": 116,
        "h": 73,
        "fontSize": 45,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "team": {
        "x": 1197,
        "y": 925,
        "w": 116,
        "h": 73,
        "fontSize": 32,
        "color": "#111111",
        "bgColor": "#ffffff",
        "align": "center"
      },
      "rank": {
        "x": 1332,
        "y": 925,
        "w": 79,
        "h": 73,
        "fontSize": 40,
        "color": "#ffffff",
        "bgColor": "",
        "align": "center"
      }
    }
  ],
  "frame": {
    "x": 181,
    "y": 83,
    "w": 1482,
    "h": 990
  }
} as LiveTableLayout

/**
 * Default absolute layout for a 1920×1080 OBS canvas over the frame JPG/PNG.
 * League uses the tuned editor export; Hezam reuses frame/logo/table and reflows columns.
 */
export function createDefaultLiveTableLayout(champType: ChampType = ChampType.LEAGUE): LiveTableLayout {
  if (champType !== ChampType.HEZAM) {
    return JSON.parse(JSON.stringify(LEAGUE_DEFAULT_LAYOUT)) as LiveTableLayout
  }

  const columns = columnsForChampType(ChampType.HEZAM)
  const table = createDefaultTableOptions(columns.length)
  const headers: LiveTableLayout['headers'] = {}
  for (const column of columns) {
    headers[column.key] = box(
      0,
      0,
      table.cellW,
      table.headerH,
      column.key === 'rank' ? 0 : 32,
      '#ffffff',
      'center',
      table.headerBgColor,
    )
  }

  const cells: LiveTableLayout['cells'] = []
  for (let row = 0; row < LIVE_TABLE_MAX_ROWS; row += 1) {
    const rowCells: Record<string, LiveTableFieldBox> = {}
    for (const column of columns) {
      const isRank = column.key === 'rank'
      rowCells[column.key] = box(
        0,
        0,
        table.cellW,
        table.cellH,
        isRank ? 40 : column.key === 'team' ? 0 : 36,
        isRank ? '#ffffff' : '#111111',
        'center',
        table.cellBgColor,
      )
    }
    cells.push(rowCells)
  }

  const layout: LiveTableLayout = {
    version: 1,
    canvas: { ...LIVE_TABLE_CANVAS },
    background: '/images/table-champion.png',
    frame: createDefaultFrameBox(),
    table,
    columns,
    logo: box(824, 6, 200, 200, 0, '#ffffff', 'center'),
    headers,
    cells,
  }

  reflowLiveTableLayout(layout)
  return layout
}
