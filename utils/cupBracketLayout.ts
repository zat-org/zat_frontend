import type { Edge, Node } from '@vue-flow/core'
import type { ICupMatchData } from '@/Models/ICupSummary'

export const CUP_BRACKET_NODE_WIDTH = 360
export const CUP_BRACKET_NODE_HEIGHT = 96
export const CUP_BRACKET_COLUMN_GAP = 64
export const CUP_BRACKET_ROW_GAP = 40

export type CupBracketNodeData = {
    match: ICupMatchData
    roundLabel: string
    roundIndex: number
    matchIndex: number
}

export function cupRoundLabel(levelIndex: number, totalRounds: number): string {
    if (totalRounds <= 1) return 'النهائي'
    if (levelIndex === totalRounds - 1) return 'النهائي'
    if (levelIndex === totalRounds - 2) return 'نصف النهائي'
    if (levelIndex === totalRounds - 3) return 'ربع النهائي'

    const labels = ['الجولة الأولى', 'الجولة الثانية', 'الجولة الثالثة', 'الجولة الرابعة']
    return labels[levelIndex] ?? `الجولة ${levelIndex + 1}`
}

/**
 * Build Vue Flow nodes/edges from cup rounds.
 * Matches Figma RTL bracket: earliest round on the right, final on the left.
 * Edges connect match i in round r → match floor(i / 2) in round r + 1.
 */
export function buildCupBracketGraph(table: ICupMatchData[][]): {
    nodes: Node<CupBracketNodeData>[]
    edges: Edge[]
} {
    const nodes: Node<CupBracketNodeData>[] = []
    const edges: Edge[] = []

    if (!table.length) return { nodes, edges }

    const totalRounds = table.length
    const firstRoundCount = Math.max(table[0]?.length ?? 1, 1)
    const columnStride = CUP_BRACKET_NODE_WIDTH + CUP_BRACKET_COLUMN_GAP
    const rowStride = CUP_BRACKET_NODE_HEIGHT + CUP_BRACKET_ROW_GAP
    const totalHeight = firstRoundCount * rowStride - CUP_BRACKET_ROW_GAP

    for (let roundIndex = 0; roundIndex < totalRounds; roundIndex++) {
        const round = table[roundIndex] ?? []
        const matchCount = Math.max(round.length, 1)
        const blockHeight = totalHeight / matchCount
        // Final (last round) sits at x=0; earliest round furthest right.
        const columnFromRight = totalRounds - 1 - roundIndex

        for (let matchIndex = 0; matchIndex < round.length; matchIndex++) {
            const match = round[matchIndex]
            if (!match) continue

            const id = nodeId(roundIndex, matchIndex)
            const y = matchIndex * blockHeight + (blockHeight - CUP_BRACKET_NODE_HEIGHT) / 2

            nodes.push({
                id,
                type: 'match',
                position: {
                    x: columnFromRight * columnStride,
                    y: Math.max(0, y),
                },
                data: {
                    match,
                    roundLabel: cupRoundLabel(roundIndex, totalRounds),
                    roundIndex,
                    matchIndex,
                },
                draggable: false,
                selectable: false,
                connectable: false,
            })

            if (roundIndex < totalRounds - 1) {
                const targetMatchIndex = Math.floor(matchIndex / 2)
                const targetId = nodeId(roundIndex + 1, targetMatchIndex)
                edges.push({
                    id: `e-${id}-${targetId}`,
                    source: id,
                    target: targetId,
                    sourceHandle: 'out',
                    targetHandle: 'in',
                    type: 'smoothstep',
                    animated: false,
                    style: {
                        stroke: '#B9B9B9',
                        strokeWidth: 1.5,
                    },
                })
            }
        }
    }

    return { nodes, edges }
}

function nodeId(roundIndex: number, matchIndex: number) {
    return `r${roundIndex}-m${matchIndex}`
}
