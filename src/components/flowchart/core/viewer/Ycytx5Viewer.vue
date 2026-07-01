<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, provide, ref, watch, type Ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import { useFlowchartLayout } from '@/composables/flowchart/useFlowchartLayout'
import {
  getFlowchartSizeTier,
  shouldShowMiniMapByDefault,
  type FlowchartSizeTier,
} from '@/composables/flowchart/useFlowchartPerformance'
import { useFlowchartTheme } from '@/composables/flowchart/useFlowchartTheme'
import { getGameConfig, getAllNodeTypes } from '../../registry/nodeRegistry'
// 确保游戏配置已注册
import '../../registry/gameConfigs'

import { getJson } from '@/utils/fetch'
import {
  symbolUseVueFlow,
  symbolFlowchartMetadata_Ycytx5,
  symbolFlowchartSearchMetadata,
} from '@/constants/injection'

import FlowchartControls from '../FlowchartControls.vue'
import FlowchartEmptyState from '../FlowchartEmptyState.vue'
import FlowchartSearchPanel from '../FlowchartSearchPanel.vue'
import FlowchartEdgeCard from '../FlowchartEdgeCard.vue'
import { useFlowchartStore } from '@/stores/flowchart'
import { useEdgeClickCard } from '@/composables/useEdgeClickCard'
import { useFlowchartHighlight, JUMP_HIGHLIGHT } from '@/composables/useFlowchartHighlight'
import { flowchartBus } from '@/utils/flowchartEvents'
import type { VFOut_Catalog_Entry } from '@/types/ycytx_5'

// 内联类型定义 - 不依赖外部共享类型
type FlowchartDataEdge = {
  id: string
  type: 'default'
  source: string
  target: string
  markerEnd: 'arrow' | 'arrowclosed'
  animated: boolean
  label?: string
  style?: { stroke: 'green' | 'red' }
  labelBgStyle?: { fill: 'green' | 'red' }
}

type FlowchartMetadata = VFOut_Catalog_Entry['metadata']

// 通用节点类型 - 使用宽松类型以支持不同游戏的节点
type FlowchartDataNode = {
  id: string
  position: { x: number; y: number }
  type: string
  data: Record<string, unknown>
}

interface FlowchartData {
  metadata: FlowchartMetadata
  data: {
    nodes: FlowchartDataNode[]
    edges: FlowchartDataEdge[]
  }
}

const props = defineProps<{
  gameId: string
  versionId: string
  flowchartName: string
}>()

// 获取游戏配置
const gameConfig = computed(() => getGameConfig(props.gameId))
const nodeComponents = computed(() => gameConfig.value?.nodeComponents ?? {})
const nodeTypes = computed(() => getAllNodeTypes(props.gameId))

// 组合式函数
const vueflow = useVueFlow()
const windowsize = useWindowSize()
const i18n = useI18n()
const vueflowLayout = useFlowchartLayout()
const { cssNodeBgColor, cssNodeTextColor } = useFlowchartTheme()

// 状态
const isReady = ref(false)
const isDraggable = ref(false)
const isShowMiniMap = ref(windowsize.width.value > 700)
const isSearchVisible = ref(false)
const flowchartSizeTier = ref<FlowchartSizeTier>('small')
const hasMeasuredLayout = ref(false)
const data = ref<FlowchartData | null>(null)

const vueflowData = {
  nodes: ref<FlowchartDataNode[]>([]),
  edges: ref<FlowchartDataEdge[]>([]),
  metadata: ref<FlowchartMetadata>({
    counts: { node: -1, edge: -1, dictKeyword: -1 },
    dictKeywordId: [],
    currName: '',
    version: -1,
    specialNodes: {
      start: [],
      end: [],
    },
  }),
}

// Provide
provide(symbolUseVueFlow, vueflow)
provide(symbolFlowchartMetadata_Ycytx5, vueflowData.metadata)
provide(symbolFlowchartSearchMetadata, vueflowData.metadata as Ref<Record<string, unknown>>)

const store = useFlowchartStore()
const flowKey = computed(() => store.makeKey(props.gameId, props.versionId, props.flowchartName))
const isRestoredFromCache = ref(false)

// 计算属性
const fileUrl = computed(
  () => `/data/${props.gameId}/${props.versionId}/flowcharts/vueflow/${props.flowchartName}.json`,
)

// 方法
async function triggerRelayout() {
  await nextTick()
  if (!isReady.value || vueflowData.nodes.value.length === 0) return

  vueflowData.nodes.value = vueflowLayout.layout(
    vueflowData.nodes.value,
    vueflowData.edges.value,
    'TB',
    { measureDom: true },
  )
  await nextTick()
  await fitInitialNode()
}

function preProcessEdges(edges: FlowchartDataEdge[]) {
  return edges.map((edge) => ({
    ...edge,
    label: edge.label ? i18n.t(edge.label) : undefined,
  }))
}

async function initFlowchart() {
  if (isRestoredFromCache.value) {
    isRestoredFromCache.value = false
    nextTick(async () => {
      const cached = store.getCachedState(flowKey.value)
      if (cached?.viewport) {
        vueflow.setViewport(cached.viewport)
      }
      store.setReady(flowKey.value)
    })
    return
  }

  if (hasMeasuredLayout.value) return
  hasMeasuredLayout.value = true

  await nextTick()
  vueflowData.nodes.value = vueflowLayout.layout(
    vueflowData.nodes.value,
    vueflowData.edges.value,
    'TB',
    { measureDom: true },
  )
  await nextTick()
  await fitInitialNode()
  store.setReady(flowKey.value)
}

async function fitInitialNode() {
  if (vueflowData.nodes.value.length > 0) {
    await vueflow.fitView({ nodes: vueflowData.metadata.value.specialNodes.start })
  }
}

// 暴露方法
defineExpose({ triggerRelayout })

// 监听器
watch(
  fileUrl,
  async (newValue) => {
    if (newValue.endsWith('/.json') || !props.flowchartName) {
      isReady.value = false
      hasMeasuredLayout.value = false
      data.value = null
      vueflowData.nodes.value = []
      vueflowData.edges.value = []
      vueflowData.metadata.value = {
        counts: { node: -1, edge: -1, dictKeyword: -1 },
        dictKeywordId: [],
        currName: '',
        version: -1,
        specialNodes: {
          start: [],
          end: [],
        },
      }
    } else {
      const cached = store.getCachedState(flowKey.value)
      if (cached) {
        vueflowData.nodes.value = cached.nodes
        vueflowData.edges.value = cached.edges
        vueflowData.metadata.value = cached.metadata
        flowchartSizeTier.value = getFlowchartSizeTier(cached.nodes.length, cached.edges.length)
        isShowMiniMap.value = shouldShowMiniMapByDefault(
          flowchartSizeTier.value,
          windowsize.width.value,
        )
        isRestoredFromCache.value = true
        hasMeasuredLayout.value = true
        isReady.value = true
        return
      }

      isReady.value = false
      hasMeasuredLayout.value = false
      await nextTick()
      const fetchedData = await getJson<FlowchartData>(fileUrl.value, 5)
      data.value = fetchedData
      vueflowData.nodes.value = fetchedData.data.nodes as FlowchartDataNode[]
      vueflowData.edges.value = preProcessEdges(fetchedData.data.edges)
      vueflowData.metadata.value = fetchedData.metadata
      flowchartSizeTier.value = getFlowchartSizeTier(
        vueflowData.nodes.value.length,
        vueflowData.edges.value.length,
      )
      isShowMiniMap.value = shouldShowMiniMapByDefault(
        flowchartSizeTier.value,
        windowsize.width.value,
      )
      vueflowData.nodes.value = vueflowLayout.layout(
        vueflowData.nodes.value,
        vueflowData.edges.value,
        'TB',
        { measureDom: false },
      )

      isReady.value = true
    }
  },
  { immediate: true },
)

watch(
  isDraggable,
  (newValue) => {
    vueflow.nodesDraggable.value = newValue
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (isReady.value && props.flowchartName && store.shouldCacheStateOnUnmount(flowKey.value)) {
    store.cacheState(flowKey.value, {
      nodes: vueflowData.nodes.value,
      edges: vueflowData.edges.value,
      metadata: vueflowData.metadata.value,
      viewport: { ...vueflow.viewport.value },
    })
  }

  flowchartBus.off('fit-in-view')
})

const { highlightNode: jumpHighlightNode, clearHighlights: clearJumpHighlights } =
  useFlowchartHighlight(JUMP_HIGHLIGHT)

flowchartBus.on('fit-in-view', ({ nodeId, highlighted, highlightDuration }) => {
  vueflow.fitView({ nodes: [nodeId] })
  if (highlighted) {
    clearJumpHighlights()
    jumpHighlightNode(nodeId)
    setTimeout(() => clearJumpHighlights(), highlightDuration ?? 3000)
  }
})

const {
  edge,
  position,
  visible: isEdgeCardVisible,
  handleEdgeClick,
  close: closeEdgeCard,
} = useEdgeClickCard()
</script>

<template>
  <div style="width: 100%; height: 100%">
    <FlowchartEmptyState v-if="!isReady" />
    <div v-else class="flowchart-comp">
      <VueFlow
        :nodes="vueflowData.nodes.value"
        :edges="vueflowData.edges.value"
        :min-zoom="0.05"
        :max-zoom="4"
        @nodes-initialized="initFlowchart()"
        @edge-click="(event) => handleEdgeClick(event)"
      >
        <Background pattern-color="#aaa" :gap="16" />
        <MiniMap v-if="isShowMiniMap" mask-color="rgba(20, 46, 89, 0.5)" pannable />
        <FlowchartControls
          v-model:is-draggable="isDraggable"
          v-model:is-show-mini-map="isShowMiniMap"
          @relayout="triggerRelayout"
          @toggle-search="isSearchVisible = !isSearchVisible"
        />

        <FlowchartSearchPanel
          v-if="isSearchVisible"
          v-model:visible="isSearchVisible"
          :nodes="vueflowData.nodes.value"
          :edges="vueflowData.edges.value"
        />

        <FlowchartEdgeCard
          v-if="isEdgeCardVisible"
          :source="edge!.source"
          :target="edge!.target"
          :position="position"
          @close="closeEdgeCard"
        />

        <!-- 动态节点槽位 -->
        <template v-for="nodeType in nodeTypes" :key="nodeType" #[`node-${nodeType}`]="nodeProps">
          <component :is="nodeComponents[nodeType]" v-bind="nodeProps" />
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<style scoped>
.flowchart-comp {
  height: 100%;
  width: calc(100%);
}
</style>

<!-- 节点通用样式 -->
<style scoped>
/* 使用属性选择器匹配所有节点类型 */
:deep([class*='vue-flow__node-']) {
  padding: 10px;
  border-radius: 3px;
  width: 220px;
  font-size: 12px;
  text-align: left;
  border-width: 1px;
  border-style: solid;
  border-color: var(--vf-node-color);
  background-color: v-bind(cssNodeBgColor);
  color: v-bind(cssNodeTextColor);

  &.selected,
  &.selected:hover {
    box-shadow: 0 0 0 0.5px var(--vf-box-shadow);
  }

  .vue-flow__handle {
    background: var(--vf-handle);
  }
}

:deep([class*='vue-flow__node-VF_JumpBe']),
:deep([class*='vue-flow__node-GameBe']) {
  border-color: red !important;
  border-width: 8px;
}
:deep([class*='vue-flow__node-VF_JumpNext']),
:deep([class*='vue-flow__node-VF_JumpPrev']) {
  border-color: rgb(34, 165, 241) !important;
  border-width: 8px;
}
:deep([class*='vue-flow__node-GameHe']),
:deep([class*='vue-flow__node-GameEnd']) {
  border-color: green !important;
  border-width: 8px;
}

:deep(.custom-node-icon) {
  margin-right: 4px;
}

:deep(.custom-node-icon),
:deep(.custom-node-title) {
  /* Base value, PC */
  font-size: 20px;

  @media screen and (max-width: 960px) {
    font-size: 18px;
  }
  @media screen and (max-width: 794px) {
    font-size: 16px;
  }
  @media screen and (max-width: 370px) {
    font-size: 16px;
  }
}

:deep(.custom-node-content) {
  font-size: 14px;

  @media screen and (max-width: 960px) {
    font-size: 12px;
  }
  @media screen and (max-width: 794px) {
    font-size: 11px;
  }
  @media screen and (max-width: 370px) {
    font-size: 11px;
  }
}

:deep(.custom-node-long-content) {
  font-size: 13px;

  @media screen and (max-width: 960px) {
    font-size: 11px;
  }
  @media screen and (max-width: 794px) {
    font-size: 11px;
  }
  @media screen and (max-width: 370px) {
    font-size: 11px;
  }
}

:deep(ul.custom-node-long-content) {
  list-style-type: disc;
  list-style-position: inside;
  overflow-y: auto;
}

:deep(.custom-node-a-clickable:hover) {
  cursor: pointer;
}

:deep(.custom-node-tooltip) {
  text-decoration: underline;
}
</style>

<style scoped>
:deep(.vue-flow__node-toolbar) {
  align-items: left;
  background-color: #2d3748;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: white;
  max-height: 200px;
  overflow-y: auto;
}

:deep(audio) {
  width: 200px;
  display: block;
}
</style>
