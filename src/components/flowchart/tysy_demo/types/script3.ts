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
 * `GameReStart`
 */
export type BlockData_ExtraAction_GameReStart = {
  type: 'GameReStart'
}
/**
 * This kind of extraAction value follows the format:
 * `[anything]@sfx@[name]`
 * To auto-detect, check if the 2nd "@" split is "sfx".
 */
export type BlockData_ExtraAction_Sfx = {
  type: 'sfx'
  sfxGroupName: string // [name]
}
/**
 * This kind of extraAction value follows the format:
 * `[anything]@Change804HeadImage@[version]`
 * To auto-detect, check if the 2nd "@" split is "Change804HeadImage".
 */
export type BlockData_ExtraAction_Change804HeadImage = {
  type: 'Change804HeadImage'
  version: string
}

export type BlockData_ExtraAction =
  | BlockData_ExtraAction_VarAdd
  | BlockData_ExtraAction_VarGeneral
  | BlockData_ExtraAction_Achievement
  | BlockData_ExtraAction_GameReStart
  | BlockData_ExtraAction_Sfx
  | BlockData_ExtraAction_Change804HeadImage

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
    /**
     * The col=1 represents other OpenOption within a same "group."
     * A "group" of OpenOption present when one or multiple OpenOption present
     * in a row, before another type of node (most commonly, a `Waiting` node)
     * present.
     * //////////// NOTES ON EDGE CONNECTIONS
     * For the OpenOption that exist within the same group, make them at the
     * same level. I.e.
     * - DO NOT: `Block->OpenOption->OpenOption`
     * - BUT DO: `Block->OpenOption&OpenOption`
     * ////////////
     *
     * THIS IS BECAUSE THE OpoenOption ITSELF ISN'T BLOCKING THE FLOW OF THE
     * DIALOGUE SYSTEM ITSELF. Or, in other terms, the OPTIONS are NOT BLOCKING.
     * As the name suggests, it just "adds" an option to the player option list
     * for players to choose from; and when the timeout is reached, it just
     * removes itself from the list.
     *
     * However, it's worth pointing out that very frequently, the `Waiting` node
     * that follows the last node in the entire OpenOption group, has the SAME
     * waiting time as the timeout time. This means that, from a player's
     * perspective, the dialogue is still *blocked* by options.
     * For the sake of simplicity while keeping the "unblocked" nature stays
     * noticeable when the two time do NOT match, we introduce a new field named
     * `blocking`, to tell the users that this whether this OpenOption node
     * "feels like" blocking or not.
     * When it feels like blocking (i.e. having the same timeout time as the waiting
     * time), we display it normally; when it is NOT, we explicitly tell the users
     * that this is NOT blocking, with a different display name attached to it.
     * And when it feels like blocking, we make the `Waiting` node a good old
     * `OpenOptionDefault` node.
     *
     * WARNING: there COULD be times when a `Waiting` node doesn't appear. In that
     * case, treat the waiting time as 0, and console.warn a message saying that
     * no Waiting node is found, with information of the node's currIndex.
     */

    currIndex: number // pos=0
    nextIndex: number // pos=8; the actual branch target when option is selected

    timeout: number // pos=7

    waitTime: number // normally pos=3; if value at pos=3 is 0 or empty string, use value at pos=7
    chatScene: string // pos=6; if not string or empty string, defaults to `C804`
    extraAction: BlockData_ExtraAction | null // pos=10; if empty string then defaults to null

    /** ONLY SET TO true IF OpenOptionDefault creation condition is met as well.
     * See above for detailed explanation.
     */
    blocking: boolean
  }
}

/**
 * THIS NODE CAN ONLY BE USED IN A LIMITED SITUATION.
 * Only if the `Waiting` node after a group of OpenOption has the
 * same waiting time as the grouped OpenOption's timeout time (if
 * in the grouped OpenOption, different timeout times are present, then
 * the `Waiting` node should be kept as is.)
 * See OpenOption type definition for more details.
 */
export type FlowchartDataNode_OpenOptionDefault = {
  id: string // keeps the original Waiting node's ID (numeric, so timeoutIndex references remain valid)
  position: { x: number; y: number }
  type: 'OpenOption_Default' // pos=2
  data: {
    currIndex: number // pos=0;
    nextIndex: number // pos=1;
    timeout: number // pos=3; in seconds (fundamentally a `Waiting` block in this case)
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
   * SPECIAL LABEL & COLORS list for different node type and different jump relations:
   * - OpenOption_Default (sequential edge): `comp.flowchart.2361_playtest.flow.openoption_timeout`, `orange`
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
