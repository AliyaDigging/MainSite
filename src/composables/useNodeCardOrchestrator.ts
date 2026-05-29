import { onMounted } from 'vue'
import { flowchartBus } from '@/utils/flowchartEvents'
import { useFlowchartStore } from '@/stores/flowchart'
import { useFlowchartManager } from '@/composables/useFlowchartManager'

export function useNodeCardOrchestrator() {
  const store = useFlowchartStore()
  const { onFlowchartReady } = useFlowchartManager()

  onMounted(() => {
    flowchartBus.on('node-card:show', (payload) => {
      const targetKey = store.makeKey(payload.gameId, payload.versionId, payload.flowchartName)

      store.openTab(payload.gameId, payload.versionId, payload.flowchartName)

      store.setPendingNodeCard({
        nodeId: payload.nodeId,
        cardTitle: payload.cardTitle,
        cardBodyHtml: payload.cardBodyHtml,
        targetKey,
      })

      if (store.lastReadyKey === targetKey) {
        flowchartBus.emit('fit-in-view', { nodeId: payload.nodeId })
        store.flushNodeCard()
      }
    })
  })

  onFlowchartReady((key) => {
    const pending = store.pendingNodeCard
    if (pending && pending.targetKey === key) {
      flowchartBus.emit('fit-in-view', { nodeId: pending.nodeId })
      store.flushNodeCard()
    }
  })
}
