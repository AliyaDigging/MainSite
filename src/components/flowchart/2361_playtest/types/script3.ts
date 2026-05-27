type RawStoryScriptEntry = {
  persistentId: string
  sourceRow: number
  label: string
  command: string
  arg: string
  speaker: string
  content: string
  voice: string
  hasCustomVoiceDuration: boolean
  voiceDuration: number
  hasCustomDelay: boolean
  delay: number
}

export type FlowchartDataNode_Data_ConditionGroup = {
  comparer: 'and' | 'or'
  conditions: {
    variableLeft: string
    compareOp: 'eq' | 'ne' | 'gt' | 'ge' | 'lt' | 'le'
    variableRight: string
  }[]
}
export type FlowchartDataNode_Data_SetVariables = {
  varName: string
  varValue: string | boolean | number // auto detection, don't generalize all into strings
}[]
export type FlowchartDataNode_Data_AddVariables = {
  varName: string
  varAddValue: number
}[]

export type FlowchartDataNode_if = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'if'
  data: {
    arg: { conditions: FlowchartDataNode_Data_ConditionGroup }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_elseif = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'elseif'
  data: {
    arg: { conditions: FlowchartDataNode_Data_ConditionGroup }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_else = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'else'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_endif = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'endif'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_chat = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'chat'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_wait = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'wait'
  data: {
    arg: { time: number } // in seconds
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_nowait = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'nowait'
  data: {
    arg: { time: number } // in seconds
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_set = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'set'
  data: {
    arg: { vars: FlowchartDataNode_Data_SetVariables }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_jump = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'jump'
  data: {
    // if the `arg` do not represent a key-value pair, then extract
    // the content and put it into the following type
    arg: { goto: string }
  } & FlowchartDataNode_Data_RawShared
}

// TO AI: BE EXTRA CARE WITH THIS ONE!
// In order to make the selection more "pure", I decided to move the
// `defaultgoto` into a new type of block called `defaultselection`.
// See explanation and type definition below.
export type FlowchartDataNode_selection = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'selection'
  data: {
    // DO NOT PUT `timeout` and `defaultgoto` into this!
    // Instead, make a new `defaultselection` block. It should be at the same level
    // with this selection block.
    arg: {
      goto: string
      showif: string | null
      chain: boolean | null
    }
  } & FlowchartDataNode_Data_RawShared
}

// TO AI: THIS TYPE OF NODE DOESN'T EXIST IN THE OG CODE.
// Instead, it is derived from `selection` node with `defaultgoto`.
// Basically, we want `selection` to be more like a *dedicated* selection, instead of
// taking care of two selections (normal (goto)/default (defaultgoto)).
export type FlowchartDataNode_defaultselection = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'defaultselection'
  data: {
    arg: {
      timeout: number | null
      defaultgoto: number | null
    }
  } & FlowchartDataNode_Data_RawShared // for the RawShared part, just directly inherit the original selection block
}

export type FlowchartDataNode_se = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'se'
  data: {
    // sometimes the `arg` may not represent a key-value pair and just straight up
    // SE filename; in this case, rewrite it into the following defined type.
    arg: {
      action: 'play'
      clip: string
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_sys = {
  id: string
  position: { x: number; y: number }
  type: 'sys'
  data: FlowchartDataNode_Data_RawShared // no additional args provided
}

export type FlowchartDataNode_bgm = {
  id: string
  position: { x: number; y: number }
  type: 'bgm'
  data: {
    arg: {
      // sometimes the `arg` may not represent a key-value pair and just straight up
      // BGM filename; in this case, rewrite it into {action: 'play', clip: arg}.
      action: 'play' | 'pause' | 'stop' | 'resume'
      clip: string
      fadeout: number | null
      wait: boolean
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_shin = {
  id: string
  position: { x: number; y: number }
  type: 'shin'
  data: {
    arg: {
      color: string
      alpha: number
      interval: number
      count: number
      wait: boolean
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_externalcall = {
  id: string
  position: { x: number; y: number }
  type: 'externalcall'
  data: {
    arg: {
      provider: string
      id: string
      [key: string]: unknown
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_add = {
  id: string
  position: { x: number; y: number }
  type: 'add'
  data: {
    arg: {
      vars: FlowchartDataNode_Data_AddVariables
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_insertresume = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'insertresume'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_toggle = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'toggle'
  data: {
    arg: { vars: string[] }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_installapp = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'installapp'
  data: {
    arg: { target: string }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_waitany = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'waitany'
  data: {
    arg: {
      // for all the aliases, just normalize them all into `runOnEnd` d(god damnit)
      runOnEnd: boolean
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_waitcase = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'waitcase'
  data: {
    arg: {
      if: FlowchartDataNode_Data_ConditionGroup
      goto: string
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_waitend = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'waitend'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_bg = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'bg'
  data: {
    arg: { id: string; show: boolean; path: string; order: number }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_waituntil = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'waituntil'
  data: {
    arg: {
      // conditions are directly declared in the original `arg` field
      conditions: FlowchartDataNode_Data_ConditionGroup
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_shot = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'shot'
  data: {
    arg: {
      // img are directly declared in the original `arg` field
      img: string
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_watchstart = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'watchstart'
  data: {
    arg: {
      condition: FlowchartDataNode_Data_ConditionGroup | null // null when type != "condition"
      id: string
      once: boolean
      pause: boolean // defaults to false
      priority: number | null
      runOnEnd: boolean // defaults to false
      seconds: number | null // null when type != "timer"
      target: string
      type: 'condition' | 'timer'
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_watchstop = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'watchstop'
  data: {
    arg: {
      id: string
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_watchpendingstart = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'watchpendingstart'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_watchpendingend = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'watchpendingend'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_recall = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'recall'
  data: {
    arg: { text: string | null }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_end = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'end'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_checkpoint = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'checkpoint'
  data: {
    arg: { title: string; action: 'unlock'; id: string }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_img = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'img'
  data: {
    arg: {
      // directly extracted from `content` field
      img: string
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_musicapp = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'musicapp'
  data: {
    arg: {
      action: string
      name: string | null
      showApp: boolean | null
      loop: boolean | null // alias: `keep`
      fade: number | null
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_showdialogue = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'showdialogue'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_hidedialogue = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'hidedialogue'
  data: FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_monitor = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'monitor'
  data: {
    arg: { action: 'disconnect'; id: string }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_album = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'album'
  data: {
    arg: { id: string }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_otherblock = {
  id: string // format: `to_other_{label}`
  position: { x: number; y: number }
  type: 'otherblock'
  data: {
    targetId: string // extracted from args like `goto`, etc. (as defined in other blocks)
  }
}

export type FlowchartDataNode_radarpuzzle = {
  id: string // persistent ID
  position: { x: number; y: number }
  type: 'radarpuzzle'
  data: {
    arg: {
      action: string
      [key: string]: unknown
    }
  } & FlowchartDataNode_Data_RawShared
}

export type FlowchartDataNode_Data_RawShared = Omit<
  RawStoryScriptEntry,
  'arg' | 'hasCustomDelay' | 'delay'
> & {
  ogArg: string // directly used from RawStoryScriptEntry
  delay: number // if doesn't have a value, defaults to 0.5 seconds
  // `nowait` indicates there's a "nowait" command before this. In this case, keep the OG
  // delay but change type to `nowait`
  delayType: 'base' | 'nowait'
}

export type FlowchartDataNode =
  | FlowchartDataNode_if
  | FlowchartDataNode_elseif
  | FlowchartDataNode_else
  | FlowchartDataNode_endif
  | FlowchartDataNode_wait
  | FlowchartDataNode_nowait
  | FlowchartDataNode_set
  | FlowchartDataNode_jump
  | FlowchartDataNode_selection
  | FlowchartDataNode_defaultselection
  | FlowchartDataNode_se
  | FlowchartDataNode_sys
  | FlowchartDataNode_bgm
  | FlowchartDataNode_shin
  | FlowchartDataNode_externalcall
  | FlowchartDataNode_add
  | FlowchartDataNode_insertresume
  | FlowchartDataNode_toggle
  | FlowchartDataNode_installapp
  | FlowchartDataNode_waitany
  | FlowchartDataNode_waitcase
  | FlowchartDataNode_waitend
  | FlowchartDataNode_bg
  | FlowchartDataNode_waituntil
  | FlowchartDataNode_shot
  | FlowchartDataNode_watchstart
  | FlowchartDataNode_watchstop
  | FlowchartDataNode_watchpendingstart
  | FlowchartDataNode_watchpendingend
  | FlowchartDataNode_recall
  | FlowchartDataNode_end
  | FlowchartDataNode_checkpoint
  | FlowchartDataNode_img
  | FlowchartDataNode_musicapp
  | FlowchartDataNode_showdialogue
  | FlowchartDataNode_hidedialogue
  | FlowchartDataNode_monitor
  | FlowchartDataNode_album
  | FlowchartDataNode_radarpuzzle
  | FlowchartDataNode_otherblock
  | FlowchartDataNode_chat

export type FlowchartDataEdge = {
  id: string // just do `{origin}->{target}`
  type: 'default'
  source: string
  target: string
  markerEnd: 'arrow'
  animated?: boolean
  label?: string
  style?: {
    stroke: string
  }
  labelBgStyle?: {
    fill: string // usually be the same with style.stroke
  }
}

export type FlowchartData = {
  metadata: {
    counts: {
      node: number
      edge: number
    }
    currName: string
  }
  data: {
    nodes: FlowchartDataNode[]
    edges: FlowchartDataEdge[]
  }
}
