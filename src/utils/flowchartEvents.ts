import mitt from 'mitt'

type FlowchartEvents = {
  'fit-in-view': { nodeId: string; highlighted?: boolean; highlightDuration?: number }
  'jump-to-other': {
    flowchartName: string
    nodeId: string
    gameId?: string
    versionId?: string
    highlighted?: boolean
    highlightDuration?: number
  }
  'open-flowchart': {
    flowchartName: string
    gameId?: string
    versionId?: string
  }
  'node-card:show': {
    gameInfo: {
      gameId: string
      versionId: string
      flowchartName: string
    }
    origin: {
      node: string
      flowchart: string
    }
    target: {
      node: string
      flowchart: string
    }
  }
  'node-popover:toggle': {
    varName: string
    originTriggerNodeId: string
    browserEvent: Event
  }
}

export const flowchartBus = mitt<FlowchartEvents>()
