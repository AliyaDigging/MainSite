/**
 * FLOWCHART NODE
 * The data for very node in the flowchart directly comes from
 * the specified  `Articy_Conversation_Dialogue_Entry`
 */

import type { Artisy_VariableOps } from './script3_var'

/** 由于我们合并了部分小流程图，因而还需要额外的数据用于指示“实际应当跳转到哪里”
 * 查找的方式方法如下（对于 script9.ts）：
 * 0. 先根据既有信息，创建出一个完整的FOF流程图，作为修改的基础
 * 1. 读入所有处理好的 flowchart (data/flowcharts/vueflow/*.json；除了 catalog_* 和 flowchart_of_flowcharts 三个 json)
 * 2. 在每个流程图中查找node id为 `${FlowchartNode_FOF_Flowchart.data.flowchartId}_1` 的节点
 * 3. 如果找到，则【不】修改原来的 `FlowchartNode_FOF_Flowchart.data.flowchartId` ，而是在 `actualJumpInfo` 标记实际出现的流程图ID和node ID
 * 4. 如果没有找到，默认fallback `actualJumpInfo` 的数据为：
 *    - actualJumpInfo.flowchartId = FlowchartNode_FOF_Flowchart.data.flowchartId
 *    - nodeId = "1"
 * 5. 按常规方式处理并写入最终的FOF文件
 */
export type General_ActualJumpInfo = {
  flowchartId: string
  nodeId: string
}

export type NodeData_Articy_Internal = {
  dialogueId: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`

  /* ALL THE DATA FIELDS BELOW DIRECTLY COME FROM
   * `Articy_Conversation_Dialogue_Entry.fields`'s values */
  title: string // Title
  dialogueText: string // "Dialogue Text"
  menuText: string // "Menu Text"
  articyId: string // "Articy Id"
}

export type NodeData_SpecifiedTime = {
  /* ALL THE DATA FIELDS BELOW DIRECTLY COME FROM
   * `Articy_Conversation_Dialogue_Entry.fields`'s values */
  seconds: number // Seconds
  minutes: number // Minutes
  hours: number // Hours
  days: number // Days
}

export type NodeData_General = {
  /** from `Articy_Conversation_Dialogue_Entry.conditionsString` */
  conditionString: string | null // keep as is for now
  /** from `Articy_Conversation_Dialogue_Entry.userScript` */
  userScript: string | null // keep as is for now

  /** 结构化变量操作（从 userScript / conditionString 解析） */
  variableOps?: Artisy_VariableOps

  /* ALL THE DATA FIELDS BELOW DIRECTLY COME FROM
   * `Articy_Conversation_Dialogue_Entry.fields`'s values */
  actorId: string // Actor
  channelId: string // ChannelId
  conversantId: string // Conversant
  articyInternal: NodeData_Articy_Internal
}

export const NodeData_Aliya_JudgementType = {
  'JudgmentType.Equal': 'Equal',
  'JudgmentType.NotEqual': 'NotEqual',
  'JudgmentType.Greater': 'Greater',
  'JudgmentType.Less': 'Less',
  'JudgmentType.GreaterOrEqual': 'GreaterOrEqual',
  'JudgmentType.LessOrEqual': 'LessOrEqual',
} as const
export type NodeData_Aliya_JudgementType =
  (typeof NodeData_Aliya_JudgementType)[keyof typeof NodeData_Aliya_JudgementType]

/** 一个非玩家消息entry
 * 判断方法：
 * 1. fields里存在 zh-CN/en 键，且：
 * 2. 无 `ChoiceType` field
 */
export type FlowchartNode_Message = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'Message'
  data: {
    sendTime: NodeData_SpecifiedTime
    autoSendTime: boolean // AutoWaitToSend
  } & NodeData_General
}
/** 一个所谓的“ambient message”
 * 判断方法：
 * 1. fields里存在 zh-CN/en 键，且：
 * 2. zh-CN/en中存在以`$md`开头的内容
 */
export type FlowchartNode_AmbientMessage = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'AmbientMessage'
  data: {
    sendTime: NodeData_SpecifiedTime
    autoSendTime: boolean // AutoWaitToSend
    ambientType: number | 'NULL' // this is by reading the number after `$ma` like `$md1`; if no number, do "NULL"
  } & NodeData_General
}
/** 一个玩家选项entry
 * 判断方法：
 * 1. fields里存在 `ChoiceType` field，且：
 * 2. ChoiceType="PlayeChoice"|"PlayerChoice"
 */
export type FlowchartNode_PlayerChoice = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'PlayerChoice'
  data: {} & NodeData_General
}
/** 一个非玩家选项entry
 * 判断方法：
 * 1. ChoiceType="DefaultChoice"
 */
export type FlowchartNode_DefaultChoice = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'DefaultChoice'
  data: {
    timeoutTime: NodeData_SpecifiedTime
  } & NodeData_General
}
/** 一个对话等待
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.WaitTime"
 *
 * DOCUMENTATION FOR `AliyaFunc.WaitTime()`:
 * - Receives as much as 4 arguments, being `fromSeconds`, `fromMinutes`, `fromHours`, `fromDays`
 */
export type FlowchartNode_WaitTime = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'WaitTime'
  data: {
    waitTime: NodeData_SpecifiedTime // parsed from `userScript``
  } & NodeData_General
}
/** 一个条件等待
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.WaitForCondition"
 *
 * DOCUMENTATION FOR `AliyaFunc.WaitForCondition()`:
 * - Must receive 3 arguments.
 *   - 1st: Variable Name (in quotes)
 *   - 2nd: Compared Value
 *   - 3rd: Condition (via `Variable["JudgmentType.XXXXX"]`)
 */
export type FlowchartNode_WaitForCondition = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'WaitForCondition'
  data: {
    compareCondition: {
      varName: string
      compareValue: unknown
      condition: NodeData_Aliya_JudgementType // convert to defined type
    }
  } & NodeData_General
}
/** 切换BGM（淡入淡出）
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.ChangeBGM"
 *
 * DOCUMENTATION FOR `AliyaFunc.WaitForCondition()`:
 * - Must receive 1 argument.
 *   - 1st: BGM ID
 */
export type FlowchartNode_ChangeBGM = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'ChangeBGM'
  data: {
    bgmId: string
  } & NodeData_General
}
/** 重启游戏
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.RestartGame"
 *
 * DOCUMENTATION FOR `AliyaFunc.RestartGame()`:
 * - No arguments. Just direct function call.
 */
export type FlowchartNode_RestartGame = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'RestartGame'
  data: {} & NodeData_General
}
/** 推送新闻
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.PushNews"
 *
 * DOCUMENTATION FOR `AliyaFunc.PushNews()`:
 * - Must receive 1 argument.
 *   - 1st: NewsId
 */
export type FlowchartNode_PushNews = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'PushNews'
  data: { newsId: string } & NodeData_General
}
/** 推送文档
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.PushDoc"
 *
 * DOCUMENTATION FOR `AliyaFunc.PushDoc()`:
 * - Must receive 1 argument.
 *   - 1st: DocumentId
 */
export type FlowchartNode_PushDoc = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'PushDoc'
  data: { documentId: string } & NodeData_General
}
/** 开始新聊天
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.StartConversation"
 *
 * DOCUMENTATION FOR `AliyaFunc.StartConversation()`:
 * - Must receive 1 argument.
 *   - 1st: channelId
 */
export type FlowchartNode_StartConversation = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'StartConversation'
  data: {
    channelId: string

    actualJumpInfo: General_ActualJumpInfo
  } & NodeData_General
}
/** 永久等待（聊天已结束）
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.WaitForever"
 *
 * DOCUMENTATION FOR `AliyaFunc.StartConversation()`:
 * - No argument.
 */
export type FlowchartNode_WaitForever = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'WaitForever'
  data: {} & NodeData_General
}
/** 永久等待（聊天已结束）
 * 判断方法：
 * 1. userScript starts with "AliyaFunc.PlayerInput"
 *
 * DOCUMENTATION FOR `AliyaFunc.PlayerInput()`:
 * - Must receive 1 argument.
 *   - 1st: varName
 */
export type FlowchartNode_PlayerInput = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'PlayerInput'
  data: { varName: string } & NodeData_General
}
/** 纯判断语句
 * 判断方法：
 * 1. no `zh-CN` and `en` fields
 * 2. field `conditionsString` is not empty string or null
 */
export type FlowchartNode_ConditionCheck = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'ConditionCheck'
  data: {} & NodeData_General
}
/** 纯判断语句
 * 判断方法：
 * 1. no `zh-CN` and `en` fields
 * 2. field `userScript` is not empty string or null
 */
export type FlowchartNode_CustomScript = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'CustomScript'
  data: {} & NodeData_General
}
/** 跳转到其他流程图 (relay node)
 * 此 node 一般随 edge 的创建而创建。
 * 简单来说，对于一个 destinationConversationID 不等于当前
 * conversationID (即当前流程图名称) 的，则创建。
 * 创建时使用的ID格式如下文所述。创建完后，将该条edge连接的node id
 * 转为连接到该node上。
 * 注意：创建该node前应先检查node list中是否已有同样id的node，防止
 * 重复创建。
 */
export type FlowchartNode_OtherFlowchart = {
  id: string // `${destinationConversationID}_${destinationDialogueID}`
  position: { x: number; y: number }
  type: 'OtherFlowchart'
  data: {
    /** 显示用数据，跳转到“应当跳转到的node”的信息 */
    displayData: { conversationId: string; dialogueId: string }
    /** 跳转用数据，用于显示一个按钮，跳转到指定流程图的指定node上
     * 该nodeId准确来说为 FlowchartNode_FOF_JumpFrom 的 id，参见
     * 该类型node的类型注释。
     */
    actualJumpData: { conversationId: string; nodeId: string }
  }
}
/** 默认节点
 * 用于出于某些原因以上判断全部失效的情况。兜底类型。
 */
export type FlowchartNode_DefaultNode = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'DefaultNode'
  data: {} & NodeData_General
}

/** 用于标识一个节点从哪里跳转而来
 * 当创建 `JumpFrom->其他Node` 的edge时，edge使用以下参数：
 * - animated=true
 * - label='comp.flowchart.aliya2_demo.node.fof.JumpFrom.edge.label'
 * - style.stroke='orange'
 * - labelBgStyle.fill='orange'
 * data 中的两个字段来自于 `Block->OtherFlowchart` 关系中的 `Block` 本身的
 * conversationID 和 dialogueID。
 */
export type FlowchartNode_FOF_JumpFrom = {
  id: string // 基于此object的data字段组合为 `${conversationId}_${dialogueId}`
  position: { x: number; y: number }
  type: 'FOF_JumpFrom'
  data: {
    displayInfo: { conversationId: string; dialogueId: string }
    actualJumpInfo: General_ActualJumpInfo
  }
}

/** 文件已移除节点
 * 【该节点并不实际存在，仅作为类型之一提供】
 * 【该节点是手工编辑文件得到的】
 */
export type FlowchartNode_FileRemoved = {
  id: string // `${Articy_Conversation_Entry.id}_${Articy_Conversation_Dialogue_Entry.id}`
  position: { x: number; y: number }
  type: 'FileRemoved'
  data: { reason: string }
}

/**
 * 以下定义的以 FOF 开头的node为特殊node，与上面的node无关。
 */
export type FlowchartNode_FOF_Channel = {
  id: string // channelId
  position: { x: number; y: number }
  type: 'FOF_Channel'
  data: {
    channelId: string

    /** set to true if this is created solely for edge connections */
    virtual: boolean
  }
}
export type FlowchartNode_FOF_Flowchart = {
  id: string // channelId
  position: { x: number; y: number }
  type: 'FOF_Flowchart'
  data: {
    flowchartId: string
    channelId: string | null
    /** set to true if this is created solely for edge connections */
    virtual: boolean

    actualJumpInfo: General_ActualJumpInfo

    // FOR ALL THE CUSTOMIZATION CONFIG, REFER TO THE NODE'S
    // TYPE DEFINITION FOR MORE INFO.
    label?: string
    style?: { stroke: string }
    labelBgStyle?: { fill: string } // 带 label 时必须要有
  }
}

export type FlowchartDataNode =
  | FlowchartNode_Message
  | FlowchartNode_AmbientMessage
  | FlowchartNode_PlayerChoice
  | FlowchartNode_DefaultChoice
  | FlowchartNode_WaitTime
  | FlowchartNode_WaitForCondition
  | FlowchartNode_ChangeBGM
  | FlowchartNode_RestartGame
  | FlowchartNode_PushNews
  | FlowchartNode_PushDoc
  | FlowchartNode_StartConversation
  | FlowchartNode_WaitForever
  | FlowchartNode_PlayerInput
  | FlowchartNode_ConditionCheck
  | FlowchartNode_CustomScript
  | FlowchartNode_OtherFlowchart
  | FlowchartNode_DefaultNode
  | FlowchartNode_FileRemoved
  | FlowchartNode_FOF_Channel
  | FlowchartNode_FOF_Flowchart
  | FlowchartNode_FOF_JumpFrom

export type FlowchartDataEdge = {
  id: string // usually just `${source}->${target}`
  source: string
  target: string
  markerEnd: 'arrow'
  animated: boolean // default to false unless specified
  label?: string
  style?: { stroke: string }
  labelBgStyle?: { fill: string }
}

export type FlowchartData = {
  metadata: {
    counts: {
      node: number
      edge: number
      otherFlowcharts: number
    }
    variableNames: Record<string, { key: string; type: 'string' | 'number' | 'boolean' }> // 变量 varName -> key (name) string
    flowchartRefs: string[]
    currName: string
    currId: string // from conversation.id

    articyInternal: {
      // all of the below are extracted from `Articy_Conversation_Dialogue_Entry.fields`
      title: string // Title
      description: string // Description
      articyId: string // "Articy Id"
      channelId: string | null // "ChannelId"; if not found then do null
    }
  }
  data: {
    nodes: FlowchartDataNode[]
    edges: FlowchartDataEdge[]
  }
}
