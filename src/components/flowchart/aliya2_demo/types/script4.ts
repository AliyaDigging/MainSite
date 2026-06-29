import type { FlowchartData } from './script3'

export type CatalogMetadataFile = {
  catalog: Record<string, FlowchartData['metadata']> // key is FlowchartData.metadata.currId
  flowchartBeingRefed: Record<string, string[]> // key is FlowchartData.metadata.currId
}
