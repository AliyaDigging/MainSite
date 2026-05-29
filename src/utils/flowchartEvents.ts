import mitt from 'mitt'

type FlowchartEvents = {
  'fit-in-view': { nodeId: string }
}

export const flowchartBus = mitt<FlowchartEvents>()
