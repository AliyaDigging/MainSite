import type { useVueFlow } from '@vue-flow/core'

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
