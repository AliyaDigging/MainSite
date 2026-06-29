import { onMounted, ref } from 'vue'
import { flowchartBus } from '@/utils/flowchartEvents'
import { useFlowchartStore } from '@/stores/flowchart'
import { useFlowchartManager } from '@/composables/useFlowchartManager'

export function useNodeCardOrchestrator() {
  const store = useFlowchartStore()
  const { onFlowchartReady } = useFlowchartManager()

  type PendingJump = {
    targetKey: string
    nodeId: string
    highlighted: boolean
    highlightDuration: number
  } | null
  const pendingJump = ref<PendingJump>(null)

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

    flowchartBus.on('jump-to-other', (payload) => {
      const gameId = payload.gameId ?? store.activeTab?.gameId
      const versionId = payload.versionId ?? store.activeTab?.versionId
      if (!gameId || !versionId) {
        console.warn('[jump-to-other] 无法确定 gameId/versionId，请提供参数或先打开一个流程图')
        return
      }

      const targetKey = store.makeKey(gameId, versionId, payload.flowchartName)
      const highlighted = payload.highlighted ?? true
      const highlightDuration = payload.highlightDuration ?? 3000

      store.openTab(gameId, versionId, payload.flowchartName)

      if (store.lastReadyKey === targetKey) {
        flowchartBus.emit('fit-in-view', { nodeId: payload.nodeId, highlighted, highlightDuration })
      } else {
        pendingJump.value = { targetKey, nodeId: payload.nodeId, highlighted, highlightDuration }
      }
    })

    flowchartBus.on('open-flowchart', (payload) => {
      const gameId = payload.gameId ?? store.activeTab?.gameId
      const versionId = payload.versionId ?? store.activeTab?.versionId
      if (!gameId || !versionId) {
        console.warn('[open-flowchart] 无法确定 gameId/versionId，请提供参数或先打开一个流程图')
        return
      }

      store.openTab(gameId, versionId, payload.flowchartName)
    })
  })

  onFlowchartReady((key) => {
    const cardPending = store.pendingNodeCard
    if (cardPending && cardPending.targetKey === key) {
      flowchartBus.emit('fit-in-view', { nodeId: cardPending.targetNode })
      store.flushNodeCard()
    }

    const jumpPending = pendingJump.value
    if (jumpPending && jumpPending.targetKey === key) {
      flowchartBus.emit('fit-in-view', {
        nodeId: jumpPending.nodeId,
        highlighted: jumpPending.highlighted,
        highlightDuration: jumpPending.highlightDuration,
      })
      pendingJump.value = null
    }
  })
}
