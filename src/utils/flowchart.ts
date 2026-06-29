import type { useVueFlow } from '@vue-flow/core'
import { flowchartBus } from '@/utils/flowchartEvents'

export function fitInViewTargetBlock(vueflow: ReturnType<typeof useVueFlow>, targetBlock: string) {
  if (targetBlock) {
    vueflow.fitView({ nodes: [targetBlock] })
  }
}

export function getCorrectFlowchartUrl(currPath: string, flowchartName: string) {
  const temp = currPath.split('/').slice(0, -1)
  temp.push(flowchartName)
  return temp.join('/')
}

export function emitJumpToOther(params: {
  flowchartName: string
  nodeId: string
  gameId?: string
  versionId?: string
  highlighted?: boolean
  highlightDuration?: number
}) {
  flowchartBus.emit('jump-to-other', params)
}

export function emitOpenFlowchart(params: {
  flowchartName: string
  gameId?: string
  versionId?: string
}) {
  flowchartBus.emit('open-flowchart', params)
}

export function emitNodeCard(params: {
  gameId: string
  versionId: string
  flowchartName: string
  originFlowchart: string
  originNodeId: string
  targetNodeId: string
  browserEvent: Event
}) {
  flowchartBus.emit('node-card:show', {
    gameInfo: {
      gameId: params.gameId,
      versionId: params.versionId,
      flowchartName: params.flowchartName,
    },
    origin: {
      node: params.originNodeId,
      flowchart: params.originFlowchart,
    },
    target: {
      node: params.targetNodeId,
      flowchart: params.flowchartName,
    },
  })
}
