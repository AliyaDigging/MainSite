import type { FlowchartData } from './script3'

/** FOR `catalog.json` FILE */
export type CatalogData = {
  catalog: Record<
    string, // flowchart name's `currName`
    FlowchartData['metadata']
  >
  flowchartBeingRefed: Record<
    string, // flowchart name's `currName`
    string[] // auto calculate via each flowchart's `metadata.flowchartRefs`
  >
}
