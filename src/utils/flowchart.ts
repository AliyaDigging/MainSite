import type { useVueFlow } from '@vue-flow/core'

export function fitInViewTargetBlock(vueflow: ReturnType<typeof useVueFlow>, targetBlock: string) {
  if (targetBlock) {
    vueflow.fitView({ nodes: [targetBlock] })
  }
}
