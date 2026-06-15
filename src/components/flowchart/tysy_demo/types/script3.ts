/**
 * extraAction parse result
 */

/**
 * This kind of extraAction value follows the format:
 * `[varName]@[value]`
 */
export type BlockData_ExtraAction_VarAdd = {
  type: 'VarAdd'
  scope: 'pv'
  varName: string
  value: number
}
/**
 * This kind of extraAction value follows the format:
 * `[anything]@['pv'|'gv']@[varName]@['add'|'set']@[value]`
 * To auto detect, check if there's 4 `@` (or, to fallback safely, `>2` is fine as well)
 */
export type BlockData_ExtraAction_VarGeneral = {
  type: 'VarGeneral'
  scope: 'pv' | 'gv'
  varName: string
  value: string | number
  action: 'add' | 'set'
}
/**
 * This kind of extraAction value follows the format:
 * `['ACH'|'ach']@[achId]`
 * To auto detect, check if it starts with `ACH` or `ach`; for safer fallback,
 * first convert the first part (split by `@`) to lower-case then check if it
 * matches "ach".
 */
export type BlockData_ExtraAction_Achievement = {
  type: 'Achievement'
  achId: string
}
/**
 * This kind of extraAction value follows the format:
 * `['ACH'|'ach']@[achId]`
 * To auto detect, check if it starts with `ACH` or `ach`; for safer fallback,
 * first convert the first part (split by `@`) to lower-case then check if it
 * matches "ach".
 */
export type BlockData_ExtraAction_GameReStart = {
  type: 'GameReStart'
}

export type BlockData_ExtraAction =
  | BlockData_ExtraAction_VarAdd
  | BlockData_ExtraAction_VarGeneral
  | BlockData_ExtraAction_Achievement
  | BlockData_ExtraAction_GameReStart

/**
 * FLOWCHART NOTE
 */

export type FlowchartDataNode_Message = {
  id: string
  position: { x: number; y: number }
  type: 'Message' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1
    waitTime: number // pos=3, wait before display
    senderId: string // pos=4
    chatScene: string // pos=6; if not string or empty string, defaults to `C804`
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_OpenOption = {
  id: string
  position: { x: number; y: number }
  type: 'OpenOption' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=8
    waitTime: number // normally pos=3; if value at pos=3 is 0 or empty string, use value at pos=7
    chatScene: string // pos=6; if not string or empty string, defaults to `C804`
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

/**
 * THIS NODE IS DERIVED FROM OpenOption.
 * When a OpenOption node has a value > 0 at pos=7, this node should be created
 * at the same time to isolate the special "default node to jump" when players
 * timed out (failing to choose an option within the timeout time.)
 */
export type FlowchartDataNode_OpenOptionDefault = {
  id: string // specifically named to "${currIndex}_Default"
  position: { x: number; y: number }
  type: 'OpenOption_Default' // pos=2
  data: {
    currIndex: number // pos=0; from parent OpenOption node
    nextIndex: number // pos=1; from parent OpenOption node
    timeout: number // pos=7; in seconds
  }
}

export type FlowchartDataNode_Waiting = {
  id: string
  position: { x: number; y: number }
  type: 'Waiting' // // pos=2; original type may also be `Waitting`
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1
    waitTime: number // pos=3, in seconds
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_System = {
  id: string
  position: { x: number; y: number }
  type: 'System' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1
    waitTime: number // pos=3; in seconds
    senderId: 'System'
    chatScene: string // pos=6; if not string or empty string, defaults to `C804`
    highlightTimeout: number // pos=7; in ms; time before de-highlighting the system msg
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_Check = {
  id: string
  position: { x: number; y: number }
  type: 'Check' // pos=2
  data: {
    currIndex: number // pos=0

    // Check nodes do have a `nextIndex` at pos=1, however due to
    // the fact that they also have success/failure index (that
    // they can jump to if comparison succeeds/fails,) the pos=1
    // value is obsolete.

    variableScope: 'gv' | 'pv' // pos=3; if empty string, defaults to `pv`
    variableName: string // pos=4
    // It's worth noting that POS=5 can sometimes have description text.
    // However, the description text is together saved into a unified L10N dictionary.
    valueGreater: number // pos=6; when compared, it uses `var >= value` syntax under the hood
    successIndex: number // pos=8; node index if comparison is true
    failureIndex: number // pos=9; node index if comparison is false
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_SwitchFile = {
  id: string
  position: { x: number; y: number }
  type: 'SwitchFile' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1; IGNORED IF SWITCHED SUCCESSFULLY
    targetFile: string // pos=3; jumps to the idx=2 node
  }
}

export type FlowchartDataNode_ShowPoint = {
  id: string
  position: { x: number; y: number }
  type: 'ShowPoint' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1;
    pointId: string // pos=3; could be non-pure-number id, so all converts to strings
    show: boolean // pos=4; converts from number to boolean
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_Set804Position = {
  id: string
  position: { x: number; y: number }
  type: 'Set804Position' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1;
    targetPointId: string // pos=3; the target position the character C804 icon on the map that
    // needs to move to (see also: ShowPoint)
    runtime: number // pos=4; in seconds; time needed to move on the map (for transition animation)
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_Photo = {
  id: string
  position: { x: number; y: number }
  type: 'Photo' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1;
    waitTime: number // pos=3, wait before display
    senderId: string // pos=4
    imageId: {
      'zh-cn': [string, 'V' | 'H'] // pos=5; split by "|"
      'en-us': [string, 'V' | 'H'] // pos=11; split by "|"
      'ja-jp': [string, 'V' | 'H'] // pos=12; split by "|"
    }
    chatScene: string // pos=6; if not string or empty string, defaults to `C804`
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_Empty = {
  id: string
  position: { x: number; y: number }
  type: 'Empty' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1;
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_DefaultNode = {
  id: string
  position: { x: number; y: number }
  type: 'DefaultNode' // pos=2; may also be empty string
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1;
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

export type FlowchartDataNode_WeatherEffect = {
  id: string
  position: { x: number; y: number }
  type: 'WeatherEffect' // pos=2
  data: {
    currIndex: number // pos=0
    nextIndex: number // pos=1;
    weatherType: string // pos=3
    duration: number // pos=4; in seconds
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null
  }
}

// ---------------------------------

export type FlowchartDataNode =
  | FlowchartDataNode_Message
  | FlowchartDataNode_OpenOption
  | FlowchartDataNode_OpenOptionDefault
  | FlowchartDataNode_Waiting
  | FlowchartDataNode_System
  | FlowchartDataNode_Check
  | FlowchartDataNode_SwitchFile
  | FlowchartDataNode_ShowPoint
  | FlowchartDataNode_Set804Position
  | FlowchartDataNode_Photo
  | FlowchartDataNode_Empty
  | FlowchartDataNode_DefaultNode
  | FlowchartDataNode_WeatherEffect

/**
 * FLOWCHART EDGE
 */
export type FlowchartDataEdge = {
  id: string // usually, just do `${origin}->${target}`
  type: 'default'
  source: string
  target: string
  markerEnd: 'arrow'
  animated: boolean // defaults to `false`

  /**
   * SPECIAL LABEL & COLORS list for different note type and different jump relations:
   * - OpenOptionDefault: `comp.flowchart.2361_playtest.flow.openoption_timeout`, `orange`
   * - Check (`successIndex`): `comp.flowchart.2361_playtest.flow.check_success`, `green`
   * - Check (`failureIndex`): `comp.flowchart.2361_playtest.flow.check_failure`, `red`
   * ONLY FILL THE FOLLOWING OPTIONALS IF IT MEETS ABOVE CONDITIONS
   */
  label?: string
  style?: { stroke: 'green' | 'red' | 'orange' }
  labelBgStyle?: { fill: 'green' | 'red' | 'orange' } // same with `style.stroke`
}

/**
 * FLOWCHART DATA
 */
export type FlowchartData = {
  metadata: {
    counts: {
      node: number
      edge: number
      otherFlowcharts: number
    }
    variableNames: Record<
      string, // variable name
      {
        key: string // variable name
        type: 'string' | 'number' // auto-detect across the entire flowchart; defaults to `number` if uncertain
        scope: 'pv' | 'gv' // auto-detect via the usage across the entire flowchart
      }
    > // 变量 fileId -> key (name) string
    flowchartRefs: string[] // all the files that SwitchFile switches to
    currName: string
  }
  data: {
    nodes: FlowchartDataNode[]
    edges: FlowchartDataEdge[]
  }
}
