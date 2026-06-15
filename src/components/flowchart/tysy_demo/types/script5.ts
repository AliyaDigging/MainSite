import type { FlowchartDataNode } from './script3'

export type VariableUsageEntry = {
  type: 'add' | 'set' | 'read'
  blockId: string // node id (NOT currIndex)
  blockType: FlowchartDataNode['type']
  scope: string
  value: unknown // for "read": valueGreater
}

export type VariableUsageListPerVar = {
  name: string
  type: 'string' | 'number'
  usages: Record<string, VariableUsageEntry[]> // the key of the record is a flowchart's currName
}

export type VariableUsage = Record<string, VariableUsageListPerVar>
