export type VueFlowCatalogEntry = {
  filename: string
  metadata: {
    counts: {
      node: number
      edge: number
      otherFlowcharts: number
    }
    variableNames: Record<string, { key: string; type: 'string' | 'number' }> // 变量 fileId -> key (name) string
    flowchartRefs: string[] // 从这里跳到（引用）了谁【self->others】
    currName: string
  }
}
export type VueFlowCatalog = {
  catalog: Record<string, VueFlowCatalogEntry>
  flowchartBeingRefed: Record<string, string[]>
}
