import mitt from 'mitt'

type FlowchartEvents = {
  'fit-in-view': { nodeId: string }
  'node-card:show': {
    gameId: string
    versionId: string
    flowchartName: string
    nodeId: string
    cardTitle: string
    cardBodyHtml: string
  }
}

export const flowchartBus = mitt<FlowchartEvents>()
