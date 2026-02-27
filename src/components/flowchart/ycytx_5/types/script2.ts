import type {
  JsonOut_StoryData_GameBE,
  JsonOut_StoryData_GameEnd,
  JsonOut_StoryData_GameHE,
  JsonOut_StoryData_MikoPhoto,
  JsonOut_StoryData_MikoText,
  JsonOut_StoryData_SystemStatusTips,
  JsonOut_StoryData_SystemTimeline,
} from './script1'

export type VFOutNode_Shared = {
  id: string
  position: {
    x: 0
    y: 0
  }
}

export type VFOutNode_SystemTimeline = VFOutNode_Shared & {
  type: 'SystemTimeline'
  data: Omit<JsonOut_StoryData_SystemTimeline, 'type'>
}
export type VFOutNode_SystemStatusTips = VFOutNode_Shared & {
  type: 'SystemStatusTips'
  data: Omit<JsonOut_StoryData_SystemStatusTips, 'type'>
}
export type VFOutNode_ChoiceText = VFOutNode_Shared & {
  type: 'ChoiceText'
  data: {
    text: string
    nextId: string
    choicePos: number
    day: string
    id: string
    delayTime: number
  } // 即第几个选择
}
export type VFOutNode_MikoText = VFOutNode_Shared & {
  type: 'MikoText'
  data: Omit<JsonOut_StoryData_MikoText, 'type'>
}
export type VFOutNode_MikoPhoto = VFOutNode_Shared & {
  type: 'MikoPhoto'
  data: Omit<JsonOut_StoryData_MikoPhoto, 'type'>
}
export type VFOutNode_GameBE = VFOutNode_Shared & {
  type: 'GameBe'
  data: Omit<JsonOut_StoryData_GameBE, 'type'>
}
export type VFOutNode_GameHE = VFOutNode_Shared & {
  type: 'GameHe'
  data: Omit<JsonOut_StoryData_GameHE, 'type'>
}
export type VFOutNode_GameEnd = VFOutNode_Shared & {
  type: 'GameEnd'
  data: Omit<JsonOut_StoryData_GameEnd, 'type'>
}
// CUSTOM NODES
export type VFOutNode_VFJumpNext = VFOutNode_Shared & {
  type: 'VF_JumpNext'
  data: {
    targetFlowchartName: string
  }
}
export type VFOutNode_VFJumpPrev = VFOutNode_Shared & {
  type: 'VF_JumpPrev'
  data: {
    targetFlowchartName: string
  }
}
export type VFOutNode_VFJumpBE = VFOutNode_Shared & {
  type: 'VF_JumpBe'
  data: { targetFlowchartName: string }
}

export type VFOutNode =
  | VFOutNode_SystemTimeline
  | VFOutNode_SystemStatusTips
  | VFOutNode_ChoiceText
  | VFOutNode_MikoText
  | VFOutNode_MikoPhoto
  | VFOutNode_GameBE
  | VFOutNode_GameHE
  | VFOutNode_GameEnd
  | VFOutNode_VFJumpNext
  | VFOutNode_VFJumpPrev
  | VFOutNode_VFJumpBE

export type VFOutEdge = {
  id: string
  type: 'default'
  source: string
  target: string
  markerEnd: 'arrow'
  animated: boolean
}

export type VFOutData = {
  metadata: {
    counts: {
      node: number
      edge: number
      dictKeyword: number
    }
    dictKeywordId: string[]
    currName: string
    version: number
    specialNodes: {
      start: string[]
      end: string[]
    }
  }
  data: {
    nodes: VFOutNode[]
    edges: VFOutEdge[]
    dayIndex: string[]
  }
}
