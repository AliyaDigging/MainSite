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
  }
  data: {
    nodes: FlowchartDataNode[]
    edges: FlowchartDataEdge[]
  }
}

// By Grok 3
// Enum definitions copied from script2.ts to avoid external references
export const BlockData_EChooseRule = {
  NULL: 0,
  OnClickEOG: 1,
  OnClickEH: 2,
  OnClickRadio: 3,
} as const
export type BlockData_EChooseRule =
  (typeof BlockData_EChooseRule)[keyof typeof BlockData_EChooseRule]

export const BlockData_EButtonType = {
  HRMBtn: 0,
  EOGBtn: 1,
  EHBtn: 2,
  RadioBtn: 3,
  TabInput: 4,
} as const
export type BlockData_EButtonType =
  (typeof BlockData_EButtonType)[keyof typeof BlockData_EButtonType]

export const BlockData_EHeartRateLevel = {
  Fixed_0: 0,
  Base_60: 1,
  Base_72: 2,
  Base_85: 3,
  Base_91: 4,
  Base_98: 5,
  Base_107: 6,
  Base_115: 7,
  Base_126: 8,
} as const
export type BlockData_EHeartRateLevel =
  (typeof BlockData_EHeartRateLevel)[keyof typeof BlockData_EHeartRateLevel]

export const FungusData_VariableCondition_AnyOrAll = {
  AnyOf_OR: 0,
  AllOf_AND: 1,
} as const
export type FungusData_VariableCondition_AnyOrAll =
  (typeof FungusData_VariableCondition_AnyOrAll)[keyof typeof FungusData_VariableCondition_AnyOrAll]

export const FungusData_CompareOperator = {
  Equals: 0,
  NotEquals: 1,
  LessThan: 2,
  GreaterThan: 3,
  LessThanOrEquals: 4,
  GreaterThanOrEquals: 5,
} as const
export type FungusData_CompareOperator =
  (typeof FungusData_CompareOperator)[keyof typeof FungusData_CompareOperator]

export const FungusData_SetOperator = {
  Assign: 0,
  Negate: 1,
  Add: 2,
  Subtract: 3,
  Multiply: 4,
  Divide: 5,
} as const
export type FungusData_SetOperator =
  (typeof FungusData_SetOperator)[keyof typeof FungusData_SetOperator]

export type FungusData_AnyVariableAndDataPair = {
  integerData: {
    integerRef: string
    integerVal: number
  }
  stringData: {
    stringRef: string
    stringVal: string | null
  }
}

// BlockData types copied from script2.ts
export type BlockData_ActivateEH = {
  itemId: number
}
export type BlockData_ActivateEOG = {
  itemId: number
}
export type BlockData_ActivateRadio = {
  itemId: number
}
export type BlockData_BanEOGControl = {
  itemId: number
}
export type BlockData_BanEHControl = {
  itemId: number
}
export type BlockData_BanRadioControl = {
  itemId: number
}
export type BlockData_SetEHValue = {
  itemId: number
  setValue: boolean
}
export type BlockData_SetRadioValue = {
  itemId: number
  setValue: boolean
}
export type BlockData_If = {
  itemId: number
  anyOrAllConditions: FungusData_VariableCondition_AnyOrAll
  conditions: {
    compareOperator: FungusData_CompareOperator
    anyVar: {
      variable: string
      data: FungusData_AnyVariableAndDataPair
    }
  }[]
}
export type BlockData_Else = {
  itemId: number
}
export type BlockData_EndIf = {
  itemId: number
}
export type BlockData_AliyaMessage = {
  itemId: number
  autoWaitTime: boolean
  waitSeconds: number
  messageText: string
  imageId: string | null
}
export type BlockData_PlayerChoice = {
  itemId: number
  text: string
  targetBlock: string
  customMsgText: string | null
  customImgMsg: number | null
  additionalEvents: string | null
}
export type BlockData_InvisibleChoice = {
  itemId: number
  rule: BlockData_EChooseRule
  targetBlock: string
}
export type BlockData_DefaultChoice = {
  itemId: number
  waitHours: number
  waitMinutes: number
  waitSeconds: number
  targetBlock: string
  SendToast: boolean
}
export type BlockData_GroupBlock = {
  itemId: number
  blockName: string
  description: string
  eventHandler: string
  commandList: string[]
  suppressAllAutoSelections: boolean
}
export type BlockData_CallFlowchart = {
  itemId: number
  flowchartName: string
}
export type BlockData_CallBlock = {
  itemId: number
  targetBlock: string
}
export type BlockData_WaitTime = {
  itemId: number
  waitHours: number
  waitMinutes: number
  waitSeconds: number
  SendToast: boolean
}
export type BlockData_WaitPreciseTime = {
  itemId: number
  hourNum: number
  minuteNum: number
  needNewDay: boolean
  sendToast: boolean
  isFirstWaitPreciseTime: boolean
}
export type BlockData_SetVariable = {
  itemId: number
  setOperator: FungusData_SetOperator
  anyVar: {
    variable: string
    data: FungusData_AnyVariableAndDataPair
  }
}
export type BlockData_DefineVariable = {
  itemId: -1
  key: string
  value: null | string
}
export type BlockData_PlayerInput = {
  itemId: number
  variable: {
    fileId: string
  }
  sendMessage: boolean
}
export type BlockData_ClampO2Res = {
  itemId: number
  maxValue: number
  minValue: number
}
export type BlockData_ClampWaterRes = {
  itemId: number
  maxValue: number
  minValue: number
}
export type BlockData_FlowchartStart = {
  components: string[]
  m_Name: string
}
export type BlockData_EnableRadioMusic = {
  itemId: number
  musicId: string
  initQuality: number
  finalPosPercentOffset: number
}
export type BlockData_DisableRadioMusic = {
  itemId: number
}
export type BlockData_ChangeRadioMusic = {
  itemId: number
  musicId: string
}
export type BlockData_ChangeBGMusic = {
  itemId: number
  musicId: string
}
export type BlockData_SetHeartRate = {
  itemId: number
  targetLevel: BlockData_EHeartRateLevel
}
export type BlockData_SetENGRes = {
  itemId: number
  minusValue: number
  duration: number
}
export type BlockData_SetO2ConsumeFactor = {
  itemId: number
  targetValue: number
}
export type BlockData_ToggleWarningAni = {
  itemId: number
  targetValue: boolean
}
export type BlockData_HighlightButton = {
  itemId: number
  buttonType: BlockData_EButtonType
}
export type BlockData_GetAchievement = {
  itemId: number
  achievementId: string
}
export type BlockData_RestartGame = {
  itemId: number
}
export type BlockData_ConfigSpecialEnd = {
  itemId: number
  o2RunOutFlowchartName: string
  setCanTrigger: boolean
}
export type BlockData_CallDailyPart = {
  itemId: number
}
export type BlockData_ExitDailyInsert = {
  itemId: number
}
export type BlockData_Transform = {
  itemId: number
}
export type BlockData_MonoBehavior = {
  itemId: number
  m_Script: { fileID: string; guid: string; type: number }
}

// FlowchartDataNode types based on ParserBlock (from script4.ts) and excluding Block_Transform and Block_ContextBlock (from script3.ts)
export type FlowchartDataNode_ActivateEH = {
  id: string
  position: { x: number; y: number }
  type: 'ActivateEH'
  data: {
    fileId: string
  } & BlockData_ActivateEH
}

export type FlowchartDataNode_ActivateEOG = {
  id: string
  position: { x: number; y: number }
  type: 'ActivateEOG'
  data: {
    fileId: string
  } & BlockData_ActivateEOG
}

export type FlowchartDataNode_ActivateRadio = {
  id: string
  position: { x: number; y: number }
  type: 'ActivateRadio'
  data: {
    fileId: string
  } & BlockData_ActivateRadio
}

export type FlowchartDataNode_BanEOGControl = {
  id: string
  position: { x: number; y: number }
  type: 'BanEOGControl'
  data: {
    fileId: string
  } & BlockData_BanEOGControl
}

export type FlowchartDataNode_BanEHControl = {
  id: string
  position: { x: number; y: number }
  type: 'BanEHControl'
  data: {
    fileId: string
  } & BlockData_BanEHControl
}

export type FlowchartDataNode_BanRadioControl = {
  id: string
  position: { x: number; y: number }
  type: 'BanRadioControl'
  data: {
    fileId: string
  } & BlockData_BanRadioControl
}

export type FlowchartDataNode_SetEHValue = {
  id: string
  position: { x: number; y: number }
  type: 'SetEHValue'
  data: {
    fileId: string
  } & BlockData_SetEHValue
}

export type FlowchartDataNode_SetRadioValue = {
  id: string
  position: { x: number; y: number }
  type: 'SetRadioValue'
  data: {
    fileId: string
  } & BlockData_SetRadioValue
}

export type FlowchartDataNode_If = {
  id: string
  position: { x: number; y: number }
  type: 'If'
  data: {
    fileId: string
  } & BlockData_If
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

export type FlowchartDataNode_InvisibleChoice = {
  id: string
  position: { x: number; y: number }
  type: 'InvisibleChoice'
  data: {
    fileId: string
  } & BlockData_InvisibleChoice
}

export type FlowchartDataNode_DefaultChoice = {
  id: string
  position: { x: number; y: number }
  type: 'DefaultChoice'
  data: {
    fileId: string
  } & BlockData_DefaultChoice
}

export type FlowchartDataNode_GroupBlock = {
  id: string
  position: { x: number; y: number }
  type: 'GroupBlock'
  data: {
    fileId: string
  } & BlockData_GroupBlock
}

export type FlowchartDataNode_CallBlock = {
  id: string
  position: { x: number; y: number }
  type: 'CallBlock'
  data: {
    fileId: string
  } & BlockData_CallBlock
}

export type FlowchartDataNode_CallFlowchart = {
  id: string
  position: { x: number; y: number }
  type: 'CallFlowchart'
  data: {
    fileId: string
  } & BlockData_CallFlowchart
}

export type FlowchartDataNode_WaitTime = {
  id: string
  position: { x: number; y: number }
  type: 'WaitTime'
  data: {
    fileId: string
  } & BlockData_WaitTime
}

export type FlowchartDataNode_WaitPreciseTime = {
  id: string
  position: { x: number; y: number }
  type: 'WaitPreciseTime'
  data: {
    fileId: string
  } & BlockData_WaitPreciseTime
}

export type FlowchartDataNode_SetVariable = {
  id: string
  position: { x: number; y: number }
  type: 'SetVariable'
  data: {
    fileId: string
  } & BlockData_SetVariable
}

export type FlowchartDataNode_DefineVariable = {
  id: string
  position: { x: number; y: number }
  type: 'DefineVariable'
  data: {
    fileId: string
  } & BlockData_DefineVariable
}

export type FlowchartDataNode_PlayerInput = {
  id: string
  position: { x: number; y: number }
  type: 'PlayerInput'
  data: {
    fileId: string
  } & BlockData_PlayerInput
}

export type FlowchartDataNode_ClampO2Res = {
  id: string
  position: { x: number; y: number }
  type: 'ClampO2Res'
  data: {
    fileId: string
  } & BlockData_ClampO2Res
}

export type FlowchartDataNode_ClampWaterRes = {
  id: string
  position: { x: number; y: number }
  type: 'ClampWaterRes'
  data: {
    fileId: string
  } & BlockData_ClampWaterRes
}

export type FlowchartDataNode_FlowchartStart = {
  id: string
  position: { x: number; y: number }
  type: 'FlowchartStart'
  data: {
    fileId: string
  } & BlockData_FlowchartStart
}

export type FlowchartDataNode_EnableRadioMusic = {
  id: string
  position: { x: number; y: number }
  type: 'EnableRadioMusic'
  data: {
    fileId: string
  } & BlockData_EnableRadioMusic
}

export type FlowchartDataNode_DisableRadioMusic = {
  id: string
  position: { x: number; y: number }
  type: 'DisableRadioMusic'
  data: {
    fileId: string
  } & BlockData_DisableRadioMusic
}

export type FlowchartDataNode_ChangeRadioMusic = {
  id: string
  position: { x: number; y: number }
  type: 'ChangeRadioMusic'
  data: {
    fileId: string
  } & BlockData_ChangeRadioMusic
}

export type FlowchartDataNode_ChangeBGMusic = {
  id: string
  position: { x: number; y: number }
  type: 'ChangeBGMusic'
  data: {
    fileId: string
  } & BlockData_ChangeBGMusic
}

export type FlowchartDataNode_SetHeartRate = {
  id: string
  position: { x: number; y: number }
  type: 'SetHeartRate'
  data: {
    fileId: string
  } & BlockData_SetHeartRate
}

export type FlowchartDataNode_SetENGRes = {
  id: string
  position: { x: number; y: number }
  type: 'SetENGRes'
  data: {
    fileId: string
  } & BlockData_SetENGRes
}

export type FlowchartDataNode_SetO2ConsumeFactor = {
  id: string
  position: { x: number; y: number }
  type: 'SetO2ConsumeFactor'
  data: {
    fileId: string
  } & BlockData_SetO2ConsumeFactor
}

export type FlowchartDataNode_ToggleWarningAni = {
  id: string
  position: { x: number; y: number }
  type: 'ToggleWarningAni'
  data: {
    fileId: string
  } & BlockData_ToggleWarningAni
}

export type FlowchartDataNode_HighlightButton = {
  id: string
  position: { x: number; y: number }
  type: 'HighlightButton'
  data: {
    fileId: string
  } & BlockData_HighlightButton
}

export type FlowchartDataNode_GetAchievement = {
  id: string
  position: { x: number; y: number }
  type: 'GetAchievement'
  data: {
    fileId: string
  } & BlockData_GetAchievement
}

export type FlowchartDataNode_RestartGame = {
  id: string
  position: { x: number; y: number }
  type: 'RestartGame'
  data: {
    fileId: string
  } & BlockData_RestartGame
}

export type FlowchartDataNode_ConfigSpecialEnd = {
  id: string
  position: { x: number; y: number }
  type: 'ConfigSpecialEnd'
  data: {
    fileId: string
  } & BlockData_ConfigSpecialEnd
}

export type FlowchartDataNode_CallDailyPart = {
  id: string
  position: { x: number; y: number }
  type: 'CallDailyPart'
  data: {
    fileId: string
  } & BlockData_CallDailyPart
}

export type FlowchartDataNode_ExitDailyInsert = {
  id: string
  position: { x: number; y: number }
  type: 'ExitDailyInsert'
  data: {
    fileId: string
  } & BlockData_ExitDailyInsert
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

export type FlowchartDataNode_Then = {
  id: string
  position: { x: number; y: number }
  type: 'Then'
  data: { fileId: string; itemId: string }
}

// Union type for all FlowchartDataNode types
export type FlowchartDataNode =
  | FlowchartDataNode_ActivateEH
  | FlowchartDataNode_ActivateEOG
  | FlowchartDataNode_ActivateRadio
  | FlowchartDataNode_BanEOGControl
  | FlowchartDataNode_BanEHControl
  | FlowchartDataNode_BanRadioControl
  | FlowchartDataNode_SetEHValue
  | FlowchartDataNode_SetRadioValue
  | FlowchartDataNode_If
  | FlowchartDataNode_Else
  | FlowchartDataNode_EndIf
  | FlowchartDataNode_AliyaMessage
  | FlowchartDataNode_PlayerChoice
  | FlowchartDataNode_InvisibleChoice
  | FlowchartDataNode_DefaultChoice
  | FlowchartDataNode_GroupBlock
  | FlowchartDataNode_CallBlock
  | FlowchartDataNode_CallFlowchart
  | FlowchartDataNode_WaitTime
  | FlowchartDataNode_WaitPreciseTime
  | FlowchartDataNode_SetVariable
  | FlowchartDataNode_DefineVariable
  | FlowchartDataNode_PlayerInput
  | FlowchartDataNode_ClampO2Res
  | FlowchartDataNode_ClampWaterRes
  | FlowchartDataNode_FlowchartStart
  | FlowchartDataNode_EnableRadioMusic
  | FlowchartDataNode_DisableRadioMusic
  | FlowchartDataNode_ChangeRadioMusic
  | FlowchartDataNode_ChangeBGMusic
  | FlowchartDataNode_SetHeartRate
  | FlowchartDataNode_SetENGRes
  | FlowchartDataNode_SetO2ConsumeFactor
  | FlowchartDataNode_ToggleWarningAni
  | FlowchartDataNode_HighlightButton
  | FlowchartDataNode_GetAchievement
  | FlowchartDataNode_RestartGame
  | FlowchartDataNode_ConfigSpecialEnd
  | FlowchartDataNode_CallDailyPart
  | FlowchartDataNode_ExitDailyInsert
  | FlowchartDataNode_MonoBehavior
  | FlowchartDataNode_FlowchartBlock
  | FlowchartDataNode_Then
