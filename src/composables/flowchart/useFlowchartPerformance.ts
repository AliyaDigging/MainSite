export type FlowchartSizeTier = 'small' | 'medium' | 'large' | 'huge'

export const FLOWCHART_SIZE_THRESHOLDS = {
  mediumNodeCount: 150,
  largeNodeCount: 500,
  hugeNodeCount: 1000,
  mediumEdgeCount: 220,
  largeEdgeCount: 700,
  hugeEdgeCount: 1200,
} as const

export function getFlowchartSizeTier(nodeCount: number, edgeCount: number): FlowchartSizeTier {
  if (
    nodeCount > FLOWCHART_SIZE_THRESHOLDS.hugeNodeCount ||
    edgeCount > FLOWCHART_SIZE_THRESHOLDS.hugeEdgeCount
  ) {
    return 'huge'
  }

  if (
    nodeCount > FLOWCHART_SIZE_THRESHOLDS.largeNodeCount ||
    edgeCount > FLOWCHART_SIZE_THRESHOLDS.largeEdgeCount
  ) {
    return 'large'
  }

  if (
    nodeCount > FLOWCHART_SIZE_THRESHOLDS.mediumNodeCount ||
    edgeCount > FLOWCHART_SIZE_THRESHOLDS.mediumEdgeCount
  ) {
    return 'medium'
  }

  return 'small'
}

export function isLargeFlowchartTier(tier: FlowchartSizeTier) {
  return tier === 'large' || tier === 'huge'
}

export function shouldShowMiniMapByDefault(
  tier: FlowchartSizeTier,
  viewportWidth: number,
): boolean {
  return viewportWidth > 700 && !isLargeFlowchartTier(tier)
}
