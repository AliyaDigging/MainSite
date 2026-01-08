// 这里的会直接同步到 MainSite repo 下，作为类型标注使用
export type FlowchartDataEdge = {
  id: string // usually, just do `${origin}->${target}`
  type: 'default'
  source: string
  target: string
  markerEnd: 'arrow' | 'arrowclosed'
  animated: boolean // 仅 virtual node 需要用
  label?: string // 边缘的label i18n key，仅用于 `if_true` `if_else` 等用于解释
  style?: { stroke: 'green' | 'red' }
  labelBgStyle?: { fill: 'green' | 'red' } // 带 label 时必须要有
}
export type FlowchartData = {
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
  data: {
    nodes: FlowchartDataNode[]
    edges: FlowchartDataEdge[]
  }
}

// By Grok 3
/**
 * Types copied from script2.ts for BlockData_ and related.
 */

// Copied from script2.ts: FungusData types
export type FungusData_SetOperator = number
export type FungusData_VariableCondition_AnyOrAll = number
export type FungusData_AnyVariableAndDataPair = {
  stringData: {
    stringRef: string
    stringVal: string
  }
  integerData: {
    integerRef: string
    integerVal: number
  }
}

// Copied from script2.ts: Existing BlockData_ types
export type BlockData_If = {
  itemId: number
  anyOrAllConditions: FungusData_VariableCondition_AnyOrAll
  conditions: Array<{
    compareOperator: number
    anyVar: {
      variable: string
      data: FungusData_AnyVariableAndDataPair
    }
  }>
}

export type BlockData_WaitTimeForCondition = {
  itemId: number
  waitHours: number
  waitMinutes: number
  waitSeconds: number
  SendToast: boolean
  anyOrAllConditions: FungusData_VariableCondition_AnyOrAll
  conditions: Array<{
    compareOperator: number
    anyVar: {
      variable: string
      data: FungusData_AnyVariableAndDataPair
    }
  }>
}

// Additional BlockData_ types defined based on script2.ts inline data for consistency
export type BlockData_FlowchartStart = {
  components: string[]
  m_Name: string
}

export type BlockData_Else = {
  itemId: number
}

export type BlockData_EndIf = {
  itemId: number
}

export type BlockData_AliyaMessage = {
  autoWaitTime: boolean
  waitSeconds: number
  messageText: string
  imageId: string
  itemId: number
}

export type BlockData_PlayerChoice = {
  text: string
  targetBlock: string
  customMsgText: string
  customImgMsg: string
  additionalEvents: string
  itemId: number
}

export type BlockData_DefaultChoice = {
  itemId: number
  waitHours: number
  waitMinutes: number
  waitSeconds: number
  targetBlock: string
  SendToast: boolean
}

export type BlockData_CallFlowchart = {
  flowchartName: string
  itemId: number
}

export type BlockData_CallBlock = {
  itemId: number
  targetBlock: string
}

export type BlockData_StartAnCharacterChart = {
  itemId: number
  targetFlowchartName: string
  targetBlockName: string
}

export type BlockData_InterruptChartAndCallCommand = {
  itemId: number
  windowKeyOfStopping: string
  flowchartName: string
  blockName: string
  commandIndex: number
}

export type BlockData_WaitTime = {
  itemId: number
  waitHours: number
  waitMinutes: number
  waitSeconds: number
  SendToast: boolean
}

export type BlockData_EndWaitTimeForCondition = {
  itemId: number
}

export type BlockData_SetVariable = {
  itemId: number
  setOperator: FungusData_SetOperator
  anyVar: {
    variable: string
    data: FungusData_AnyVariableAndDataPair
  }
}

export type BlockData_PlayerInputWithOutDeleteField = {
  itemId: number
  variable: {
    fileId: string
  }
  sendMessage: boolean
}

export type BlockData_TextFileCommand = {
  itemId: number
  textFileKey: string
}

export type BlockData_GroupBlock = {
  itemId: number
  blockName: string
  description: string
  eventHandler: string
  commandList: string[]
  suppressAllAutoSelections: boolean
}

export type BlockData_DefineVariable = {
  itemId: number
  key: string
  value: unknown
}

export type BlockData_MonoBehavior = {
  itemId: number
  m_Script: string
}

// Additional for "Then" added in script4.ts
export type BlockData_Then = {
  itemId: number
}

// FlowchartDataNode types based on requirements
export type FlowchartDataNode_FlowchartStart = {
  id: string
  position: { x: number; y: number }
  type: 'FlowchartStart'
  data: {
    fileId: string
  } & BlockData_FlowchartStart
}

export type FlowchartDataNode_If = {
  id: string
  position: { x: number; y: number }
  type: 'If'
  data: {
    fileId: string
  } & BlockData_If
}

export type FlowchartDataNode_Then = {
  id: string
  position: { x: number; y: number }
  type: 'Then'
  data: {
    fileId: string
  } & BlockData_Then
}

export type FlowchartDataNode_Else = {
  id: string
  position: { x: number; y: number }
  type: 'Else'
  data: {
    fileId: string
  } & BlockData_Else
}

export type FlowchartDataNode_EndIf = {
  id: string
  position: { x: number; y: number }
  type: 'EndIf'
  data: {
    fileId: string
  } & BlockData_EndIf
}

export type FlowchartDataNode_AliyaMessage = {
  id: string
  position: { x: number; y: number }
  type: 'AliyaMessage'
  data: {
    fileId: string
  } & BlockData_AliyaMessage
}

export type FlowchartDataNode_PlayerChoice = {
  id: string
  position: { x: number; y: number }
  type: 'PlayerChoice'
  data: {
    fileId: string
  } & BlockData_PlayerChoice
}

export type FlowchartDataNode_DefaultChoice = {
  id: string
  position: { x: number; y: number }
  type: 'DefaultChoice'
  data: {
    fileId: string
  } & BlockData_DefaultChoice
}

export type FlowchartDataNode_CallFlowchart = {
  id: string
  position: { x: number; y: number }
  type: 'CallFlowchart'
  data: {
    fileId: string
  } & BlockData_CallFlowchart
}

export type FlowchartDataNode_CallBlock = {
  id: string
  position: { x: number; y: number }
  type: 'CallBlock'
  data: {
    fileId: string
  } & BlockData_CallBlock
}

export type FlowchartDataNode_StartAnCharacterChart = {
  id: string
  position: { x: number; y: number }
  type: 'StartAnCharacterChart'
  data: {
    fileId: string
  } & BlockData_StartAnCharacterChart
}

export type FlowchartDataNode_InterruptChartAndCallCommand = {
  id: string
  position: { x: number; y: number }
  type: 'InterruptChartAndCallCommand'
  data: {
    fileId: string
  } & BlockData_InterruptChartAndCallCommand
}

export type FlowchartDataNode_WaitTime = {
  id: string
  position: { x: number; y: number }
  type: 'WaitTime'
  data: {
    fileId: string
  } & BlockData_WaitTime
}

export type FlowchartDataNode_WaitTimeForCondition = {
  id: string
  position: { x: number; y: number }
  type: 'WaitTimeForCondition'
  data: {
    fileId: string
  } & BlockData_WaitTimeForCondition
}

export type FlowchartDataNode_EndWaitTimeForCondition = {
  id: string
  position: { x: number; y: number }
  type: 'EndWaitTimeForCondition'
  data: {
    fileId: string
  } & BlockData_EndWaitTimeForCondition
}

export type FlowchartDataNode_SetVariable = {
  id: string
  position: { x: number; y: number }
  type: 'SetVariable'
  data: {
    fileId: string
  } & BlockData_SetVariable
}

export type FlowchartDataNode_PlayerInputWithOutDeleteField = {
  id: string
  position: { x: number; y: number }
  type: 'PlayerInputWithOutDeleteField'
  data: {
    fileId: string
  } & BlockData_PlayerInputWithOutDeleteField
}

export type FlowchartDataNode_TextFileCommand = {
  id: string
  position: { x: number; y: number }
  type: 'TextFileCommand'
  data: {
    fileId: string
  } & BlockData_TextFileCommand
}

export type FlowchartDataNode_GroupBlock = {
  id: string
  position: { x: number; y: number }
  type: 'GroupBlock'
  data: {
    fileId: string
  } & BlockData_GroupBlock
}

export type FlowchartDataNode_DefineVariable = {
  id: string
  position: { x: number; y: number }
  type: 'DefineVariable'
  data: {
    fileId: string
  } & BlockData_DefineVariable
}

export type FlowchartDataNode_MonoBehavior = {
  id: string
  position: { x: number; y: number }
  type: 'MonoBehavior'
  data: {
    fileId: string
  } & BlockData_MonoBehavior
}

export type FlowchartDataNode_FlowchartBlock = {
  id: string
  position: { x: number; y: number }
  type: 'FlowchartBlock'
  data: { fileId: string; flowchartName: string }
}

// Union type for all FlowchartDataNode_*
export type FlowchartDataNode =
  | FlowchartDataNode_FlowchartStart
  | FlowchartDataNode_If
  | FlowchartDataNode_Then
  | FlowchartDataNode_Else
  | FlowchartDataNode_EndIf
  | FlowchartDataNode_AliyaMessage
  | FlowchartDataNode_PlayerChoice
  | FlowchartDataNode_DefaultChoice
  | FlowchartDataNode_CallFlowchart
  | FlowchartDataNode_CallBlock
  | FlowchartDataNode_StartAnCharacterChart
  | FlowchartDataNode_InterruptChartAndCallCommand
  | FlowchartDataNode_WaitTime
  | FlowchartDataNode_WaitTimeForCondition
  | FlowchartDataNode_EndWaitTimeForCondition
  | FlowchartDataNode_SetVariable
  | FlowchartDataNode_PlayerInputWithOutDeleteField
  | FlowchartDataNode_TextFileCommand
  | FlowchartDataNode_GroupBlock
  | FlowchartDataNode_DefineVariable
  | FlowchartDataNode_MonoBehavior
  | FlowchartDataNode_FlowchartBlock
