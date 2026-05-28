<script setup lang="ts">
/**
 * 流程图查看页面
 * 双panel布局：左侧文件列表 + 右侧流程图（支持多标签页）
 */
import PvDivider from 'primevue/divider'
import PvMessage from 'primevue/message'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted, onBeforeUnmount, computed, provide } from 'vue'
import type { Component } from 'vue'
import { useWindowSize } from '@vueuse/core'

import Flowchart_Aliya1 from '@/components/view_flowchart/Aliya1.vue'
import Flowchart_Ycytx5 from '@/components/view_flowchart/Ycytx5.vue'
import Flowchart_2361Playtest from '@/components/view_flowchart/2361Playtest.vue'

import { useFlowchartStore } from '@/stores/flowchart'
import { getJson } from '@/utils/fetch'
import type { AllDataCatalog } from '@/types/allDataCatalog'
import GameAndVersionSelector from '@/components/GameAndVersionSelector.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import FlowchartFileTree from '@/components/flowchart/core/FlowchartFileTree.vue'
import FlowchartTabBar from '@/components/flowchart/core/FlowchartTabBar.vue'
import FlowchartEmptyState from '@/components/flowchart/core/FlowchartEmptyState.vue'
import { detectIsMobile } from '@/utils/browser'
import { symbolFlowchartPageHeight, symbolFlowchartFileTreeCollapsed } from '@/constants/injection'

const props = defineProps({
  gameId: { type: String, default: '' },
  versionId: { type: String, default: '' },
  flowchartName: { type: String, default: '' },
})

const gameComponentMap: Record<string, Component> = {
  aliya1: Flowchart_Aliya1,
  ycytx_5: Flowchart_Ycytx5,
  '2361_playtest': Flowchart_2361Playtest,
}

function getGameComponent(gameId: string): Component | null {
  if (gameComponentMap[gameId]) return gameComponentMap[gameId]
  for (const [key, comp] of Object.entries(gameComponentMap)) {
    if (gameId.toLowerCase().includes(key)) return comp
  }
  return null
}

const route = useRoute()
const router = useRouter()
const store = useFlowchartStore()

const gameSelection = ref<string>(props.gameId)
const versionSelection = ref<string>(props.versionId)
const flowchartSelection = ref<string>(props.flowchartName)

const dataAllCatalog = ref<AllDataCatalog>([])
const catalogList = ref<string[]>([])

const windowsize = useWindowSize()

const isGlobalDataLoaded = ref(false)
const isFlowchartDataLoaded = ref(false)

const flowchartPageHeight = computed(
  () => `${(windowsize.height.value - 140) * (detectIsMobile() ? 0.9 : 1)}px`,
)

const fileTreeCollapsed = ref(false)

provide(symbolFlowchartPageHeight, flowchartPageHeight)
provide(symbolFlowchartFileTreeCollapsed, fileTreeCollapsed)

// select 更改时，触发路径更改
watch([gameSelection, versionSelection, flowchartSelection], ([n1, n2, n3], [o1, o2]) => {
  if (n1 !== o1) {
    versionSelection.value = ''
    flowchartSelection.value = ''
    isFlowchartDataLoaded.value = false
  }
  if (n1 !== o1 || n2 !== o2) {
    store.resetAll()
  }

  if (n3 !== '') {
    router.push(`/view/flowchart/${n1}/${n2}/${n3}`)
  } else if (n2 !== '') {
    router.push(`/view/flowchart/${n1}/${n2}`)
  } else if (n1 !== '') {
    router.push(`/view/flowchart/${n1}`)
  } else {
    router.push(`/view/flowchart/`)
  }
})

// 路径更改时，触发 select 和 store 更改
watch(
  () => [route.params.gameId, route.params.versionId, route.params.flowchartName],
  ([n1, n2, n3]) => {
    if (n1 !== gameSelection.value) {
      gameSelection.value = String(n1)
    }
    if (n2 !== versionSelection.value) {
      versionSelection.value = String(n2)
    }
    if (n3 !== flowchartSelection.value) {
      flowchartSelection.value = String(n3)
    }

    // Open tab from URL navigation
    const gId = String(n1)
    const vId = String(n2)
    const fName = String(n3)
    if (gId && vId && fName) {
      const key = store.makeKey(gId, vId, fName)
      if (store.activeKey !== key) {
        store.openTab(gId, vId, fName)
      }
    }
  },
  { immediate: true },
)

// Store → flowchartSelection (when user clicks tab)
watch(
  () => store.activeKey,
  (key) => {
    const tab = key ? store.tabs.find((t) => t.key === key) : null
    const newName = tab?.flowchartName ?? ''
    if (newName && newName !== flowchartSelection.value) {
      flowchartSelection.value = newName
    }
  },
)

// When all tabs are closed, clear URL
watch(
  () => store.tabs.length,
  (len) => {
    if (len === 0 && flowchartSelection.value !== '') {
      flowchartSelection.value = ''
    }
  },
)

watch([gameSelection, versionSelection], async ([n1, n2]) => {
  if (n1 !== '' && n2 !== '') {
    isFlowchartDataLoaded.value = false
    catalogList.value = await getJson<string[]>(
      `/data/${n1}/${n2}/flowcharts/vueflow/catalog_list.json`,
      5,
    )
    isFlowchartDataLoaded.value = true
  }
})

function onFileSelect(flowchartName: string) {
  flowchartSelection.value = flowchartName
  store.openTab(gameSelection.value, versionSelection.value, flowchartName)
}

onMounted(async () => {
  if (props.gameId.includes('-')) {
    gameSelection.value = 'aliya1'
    versionSelection.value = '20250712'
    flowchartSelection.value = props.gameId
    router.push(`/view/flowchart/aliya1/20250712/${props.gameId}`)
  }

  await Promise.allSettled([
    (async () => {
      dataAllCatalog.value = await getJson<AllDataCatalog>(`/data/data_catalog.json`, 5)
    })(),
    (async () => {
      const [n1, n2] = [gameSelection.value, versionSelection.value]
      if (n1 !== '' && n2 !== '') {
        catalogList.value = await getJson<string[]>(
          `/data/${n1}/${n2}/flowcharts/vueflow/catalog_list.json`,
          5,
        )
        isFlowchartDataLoaded.value = true
      }
    })(),
  ])
  isGlobalDataLoaded.value = true
})

onBeforeUnmount(() => {
  store.resetAll()
})
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">{{ $t('comp.flowchart.p.view1') }}</h1>
    <div v-if="!isGlobalDataLoaded" class="mt-6">
      <div class="card justify-center">
        <LoadingSpinner />
      </div>
    </div>
    <div v-else class="flowchart-page">
      <p class="view-page-h1-desc text-color mb-2">{{ $t('comp.flowchart.p.view2') }}</p>
      <PvDivider />

      <!-- 游戏/版本选择（页面上部） -->
      <GameAndVersionSelector
        :data-all-catalog="dataAllCatalog"
        v-model:game-selection="gameSelection"
        v-model:version-selection="versionSelection"
      />

      <template v-if="isFlowchartDataLoaded">
        <PvMessage severity="info" class="mt-4">{{ $t('comp.flowchart.p.view3') }}</PvMessage>
        <PvMessage severity="error" class="mt-2">{{ $t('comp.flowchart.p.view4') }}</PvMessage>
        <PvMessage severity="success" class="mt-2">{{ $t('comp.flowchart.p.view5') }}</PvMessage>
        <PvMessage severity="success" class="mt-2">{{ $t('comp.flowchart.p.view6') }}</PvMessage>
        <PvDivider />

        <!-- 双panel布局 -->
        <div class="flowchart-panel-layout">
          <!-- 左panel：文件列表 -->
          <Transition name="file-tree-slide">
            <div v-if="!fileTreeCollapsed" class="left-panel">
              <FlowchartFileTree
                :items="catalogList"
                :active-item="flowchartSelection"
                @select="onFileSelect"
              />
            </div>
          </Transition>

          <!-- 右panel：标签栏 + 流程图内容 -->
          <div class="right-panel">
            <FlowchartTabBar />
            <div class="flowchart-content">
              <template v-for="tab in store.tabs" :key="tab.key">
                <div v-if="tab.key === store.activeKey" class="tab-content">
                  <component
                    :is="getGameComponent(tab.gameId)"
                    :game-id="tab.gameId"
                    :version-id="tab.versionId"
                    :flowchart-name="tab.flowchartName"
                  />
                </div>
              </template>
              <FlowchartEmptyState v-if="store.tabs.length === 0" />
            </div>
          </div>
        </div>
        <PvDivider />
      </template>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 1.2em;
}

.flowchart-page {
  display: flex;
  flex-direction: column;
}

.flowchart-panel-layout {
  display: flex;
  height: v-bind(flowchartPageHeight);
  min-height: 0;
  border: 1px solid var(--p-surface-border, #e0e0e0);
  border-radius: 6px;
  overflow: hidden;
}

.left-panel {
  width: 260px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  background: var(--p-surface-ground, #f8f9fa);
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.flowchart-content {
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 0;
}

.tab-content {
  position: absolute;
  inset: 0;
}

:deep(.vue-flow__node-toolbar) {
  font-size: 0.9rem;
}

/* File tree slide transition */
.file-tree-slide-enter-active,
.file-tree-slide-leave-active {
  transition:
    width 0.3s ease,
    min-width 0.3s ease,
    opacity 0.3s ease;
  overflow: hidden;
}

.file-tree-slide-enter-from,
.file-tree-slide-leave-to {
  width: 0 !important;
  min-width: 0 !important;
  opacity: 0;
}
</style>

<style scoped>
:deep(.vue-flow__controls-button) {
  width: 24px;
  height: 24px;
}

@media screen and (max-width: 768px) {
  :deep(.vue-flow__controls-button) {
    width: 18px;
    height: 18px;
  }
}
</style>
