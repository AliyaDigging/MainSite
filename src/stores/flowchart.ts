import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface FlowchartTab {
  key: string
  gameId: string
  versionId: string
  flowchartName: string
}

export interface CachedFlowchartState {
  nodes: any[]
  edges: any[]
  metadata: any
  viewport: { x: number; y: number; zoom: number }
}

export interface PendingNodeCard {
  nodeId: string
  cardTitle: string
  cardBodyHtml: string
  targetKey: string
}

export interface NodeCardData {
  title: string
  bodyHtml: string
}

export const useFlowchartStore = defineStore('flowchart', () => {
  const tabs = ref<FlowchartTab[]>([])
  const activeKey = ref<string | null>(null)
  const lastReadyKey = ref<string | null>(null)
  const isSearchPanelVisible = ref(false)

  const pendingNodeCard = ref<PendingNodeCard | null>(null)
  const nodeCard = ref<NodeCardData | null>(null)

  const stateCache = ref<Record<string, CachedFlowchartState>>({})

  const activeTab = computed(() => tabs.value.find((t) => t.key === activeKey.value) ?? null)

  function makeKey(gameId: string, versionId: string, flowchartName: string) {
    return `${gameId}/${versionId}/${flowchartName}`
  }

  function openTab(gameId: string, versionId: string, flowchartName: string) {
    const key = makeKey(gameId, versionId, flowchartName)
    isSearchPanelVisible.value = false
    clearNodeCard()

    if (!tabs.value.find((t) => t.key === key)) {
      tabs.value.push({ key, gameId, versionId, flowchartName })
    }
    activeKey.value = key
  }

  function closeTab(key: string) {
    const idx = tabs.value.findIndex((t) => t.key === key)
    if (idx === -1) return

    isSearchPanelVisible.value = false
    clearNodeCard()
    tabs.value.splice(idx, 1)

    if (activeKey.value === key) {
      activeKey.value =
        tabs.value.length > 0 ? tabs.value[Math.min(idx, tabs.value.length - 1)].key : null
    }
  }

  function switchTab(key: string) {
    isSearchPanelVisible.value = false
    clearNodeCard()
    activeKey.value = key
  }

  function setReady(key: string) {
    lastReadyKey.value = key
  }

  function reorderTabs(fromIndex: number, toIndex: number) {
    if (
      fromIndex < 0 ||
      fromIndex >= tabs.value.length ||
      toIndex < 0 ||
      toIndex >= tabs.value.length ||
      fromIndex === toIndex
    )
      return

    const [moved] = tabs.value.splice(fromIndex, 1)
    tabs.value.splice(toIndex, 0, moved)
  }

  function cacheState(key: string, state: CachedFlowchartState) {
    stateCache.value[key] = state
  }

  function getCachedState(key: string): CachedFlowchartState | null {
    return stateCache.value[key] ?? null
  }

  function clearCache(key?: string) {
    if (key) {
      delete stateCache.value[key]
    } else {
      stateCache.value = {}
    }
  }

  function clearNodeCard() {
    nodeCard.value = null
    pendingNodeCard.value = null
  }

  function setPendingNodeCard(data: PendingNodeCard) {
    pendingNodeCard.value = data
  }

  function flushNodeCard() {
    if (pendingNodeCard.value) {
      nodeCard.value = {
        title: pendingNodeCard.value.cardTitle,
        bodyHtml: pendingNodeCard.value.cardBodyHtml,
      }
      pendingNodeCard.value = null
    }
  }

  function resetAll() {
    tabs.value = []
    activeKey.value = null
    isSearchPanelVisible.value = false
    clearNodeCard()
    stateCache.value = {}
  }

  return {
    tabs,
    activeKey,
    lastReadyKey,
    activeTab,
    isSearchPanelVisible,
    pendingNodeCard,
    nodeCard,
    stateCache,
    makeKey,
    openTab,
    closeTab,
    switchTab,
    setReady,
    reorderTabs,
    cacheState,
    getCachedState,
    clearCache,
    clearNodeCard,
    setPendingNodeCard,
    flushNodeCard,
    resetAll,
  }
})
