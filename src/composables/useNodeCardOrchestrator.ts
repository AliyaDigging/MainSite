import { onMounted } from 'vue'
import { flowchartBus } from '@/utils/flowchartEvents'
import { useFlowchartStore } from '@/stores/flowchart'
import { useFlowchartManager } from '@/composables/useFlowchartManager'

export function useNodeCardOrchestrator() {
  const store = useFlowchartStore()
  const { onFlowchartReady } = useFlowchartManager()

  onMounted(() => {
    flowchartBus.on('node-card:show', (payload) => {
      const targetKey = store.makeKey(
        payload.gameInfo.gameId,
        payload.gameInfo.versionId,
        payload.gameInfo.flowchartName,
      )

      store.openTab(
        payload.gameInfo.gameId,
        payload.gameInfo.versionId,
        payload.gameInfo.flowchartName,
      )

      store.setPendingNodeCard({
        originNode: payload.origin.node,
        originFlowchart: payload.origin.flowchart,
        targetNode: payload.target.node,
        targetFlowchart: payload.target.flowchart,
        targetKey,
      })

      if (store.lastReadyKey === targetKey) {
        flowchartBus.emit('fit-in-view', { nodeId: payload.target.node })
        store.flushNodeCard()
      }
    })
  })

  onFlowchartReady((key) => {
    const pending = store.pendingNodeCard
    if (pending && pending.targetKey === key) {
      flowchartBus.emit('fit-in-view', { nodeId: pending.targetNode })
      store.flushNodeCard()
    }
  })
}
