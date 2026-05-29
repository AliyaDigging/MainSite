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

export function emitNodeCard(params: {
  gameId: string
  versionId: string
  flowchartName: string
  nodeId: string
  cardTitle: string
  cardBodyHtml: string
}) {
  flowchartBus.emit('node-card:show', params)
}
