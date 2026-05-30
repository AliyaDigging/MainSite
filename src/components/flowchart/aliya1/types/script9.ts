import type { FungusData_CompareOperator, FlowchartData } from './script5_vueflow_prod'

export type VariableUsageEntry_Aliya1 = {
  type: 'read' | 'write' | 'define'
  blockId: string // fileId of the block that references the variable
  blockType: FlowchartData['data']['nodes'][number]['type']
  valueAssigned?: string | number | null // extracted from SetVariable's `anyVar.data`'s `stringData.stringVal` or `integerData.integerVal`
  ifCondition?: {
    operator: FungusData_CompareOperator
    valueAgainst: string | number | null // extracted from `BlockData_If.conditions[number].anyVar.data`'s `stringData.stringVal` or `integerData.integerVal`
  }
}
export type VariableUsageListPerVar_Aliya1 = {
  name: string // in read/write operations only FileId is given; FileId can be back-traced to name via `FlowchartData.metadata.variableNames[string].key`, where the `string` in `...Names[string]` is FileId
  fileId: string
  type: 'string' | 'number'
  usages: Record<string, VariableUsageEntry_Aliya1[]> // the key of the record is the flowchart name (`FlowchartData.metadata.currName`)
}
export type VariableUsage_Aliya1 = Record<string, VariableUsageListPerVar_Aliya1> // the key of the record is the variable's name (not FileId)
