import type { useVueFlow } from '@vue-flow/core'
import { flowchartBus } from '@/utils/flowchartEvents'

export function fitInViewTargetBlock(vueflow: ReturnType<typeof useVueFlow>, targetBlock: string) {
  if (targetBlock) {
    vueflow.fitView({ nodes: [targetBlock] })
  }
}

/** 将视口滚动到指定节点位置 */
export function scrollToNode(
  vueflow: ReturnType<typeof useVueFlow>,
  nodeId: string,
  options?: {
    zoom?: number
    duration?: number
    offsetX?: number
    offsetY?: number
  },
): boolean {
  const node = vueflow.findNode(nodeId)
  if (!node) return false
  const { zoom, duration = 300, offsetX = 110, offsetY = 30 } = options ?? {}
  vueflow.setCenter(node.position.x + offsetX, node.position.y + offsetY, {
    zoom: zoom ?? vueflow.viewport.value.zoom,
    duration,
  })
  return true
}

export function getCorrectFlowchartUrl(currPath: string, flowchartName: string) {
  const temp = currPath.split('/').slice(0, -1)
  temp.push(flowchartName)
  return temp.join('/')
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
