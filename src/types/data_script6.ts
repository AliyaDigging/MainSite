export type VueFlowCatalogEntry = {
  filename: string
  metadata: {
    counts: {
      node: number
      edge: number
      otherFlowcharts: number
    }
    variableNames: Record<string, { key: string; type: 'string' | 'number' }> // 变量 fileId -> key (name) string
    flowchartRefs: string[]
    currName: string
  }
}
export type VueFlowCatalog = VueFlowCatalogEntry[]
