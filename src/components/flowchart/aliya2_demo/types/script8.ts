import type { FlowchartDataNode } from './script3'
import type { Artisy_VariableOp_Compare } from './script3_var'

/**
 * To search for variable usages, read the files in
 * `data/flowcharts/vueflow` (type="FlowchartData")
 */
export type VariableUsage_PerVariable_UsageEntry = {
  type: 'read' | 'write'
  nodeId: string // `FlowchartDataNode.id`
  nodeType: FlowchartDataNode['type']

  /** FIELD `value` DOCUMENTATION:
   * if 'read', then `Artisy_VariableOp_Compare.valueAgainst`,
   * if `write`, then `Artisy_VariableOp_Assign.valueAssigned`
   */
  value: boolean | string | number | { variableName: string }
  compareOp?: Artisy_VariableOp_Compare['compareOp'] // only do this if type="read"
}

export type VariableUsage_PerVariable_Entry = {
  // "name", "initialValue", "type" can ALL be sourced from
  // `data/external_index/variables.json` (VariableData)
  name: string
  initialValue: unknown
  type: string // `Variable_Entry["type"]`

  usages: Record<
    string, // key is `FlowchartData`'s filename (as ID, without extension name)
    VariableUsage_PerVariable_UsageEntry[]
  >
}

export type VariableUsage = Record<
  string, // key is variable name
  VariableUsage_PerVariable_Entry
>
