import { useFlowchartStore } from '@/stores/flowchart'
import type { CachedFlowchartState } from '@/stores/flowchart'

/**
 * Global API for managing flowchart tabs and state.
 * Use this composable to open/close/switch flowcharts from anywhere.
 */
export function useFlowchartManager() {
  const store = useFlowchartStore()

  function openFlowchart(gameId: string, versionId: string, flowchartName: string) {
    store.openTab(gameId, versionId, flowchartName)
  }

  function closeFlowchart(key: string) {
    store.closeTab(key)
  }

  function switchToFlowchart(key: string) {
    store.switchTab(key)
  }

  function getActiveFlowchart() {
    return store.activeTab
  }

  function getOpenedFlowcharts() {
    return store.tabs
  }

  function cacheFlowchartState(key: string, state: CachedFlowchartState) {
    store.cacheState(key, state)
  }

  function getCachedFlowchartState(key: string) {
    return store.getCachedState(key)
  }

  function closeSearchPanel() {
    store.isSearchPanelVisible = false
  }

  return {
    openFlowchart,
    closeFlowchart,
    switchToFlowchart,
    getActiveFlowchart,
    getOpenedFlowcharts,
    cacheFlowchartState,
    getCachedFlowchartState,
    closeSearchPanel,
    isSearchPanelVisible: store.isSearchPanelVisible,
    store,
  }
}
