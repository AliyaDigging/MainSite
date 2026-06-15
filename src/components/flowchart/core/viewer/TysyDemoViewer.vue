<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, provide, ref, watch, type Ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import { useFlowchartLayout } from '@/composables/flowchart/useFlowchartLayout'
import { useFlowchartTheme } from '@/composables/flowchart/useFlowchartTheme'
import { getGameConfig, getAllNodeTypes } from '../../registry/nodeRegistry'
import '../../registry/gameConfigs'

import { getJson } from '@/utils/fetch'
import { symbolUseVueFlow, symbolFlowchartMetadata_TysyDemo, symbolFlowchartSearchMetadata } from '@/constants/injection'
import { flowchartBus } from '@/utils/flowchartEvents'

import FlowchartControls from '../FlowchartControls.vue'
import FlowchartEmptyState from '../FlowchartEmptyState.vue'
import FlowchartSearchPanel from '../FlowchartSearchPanel.vue'
import FlowchartEdgeCard from '../FlowchartEdgeCard.vue'
import { useFlowchartStore } from '@/stores/flowchart'
import { useEdgeClickCard } from '@/composables/useEdgeClickCard'
import { useFlowchartHighlight, JUMP_HIGHLIGHT } from '@/composables/useFlowchartHighlight'

type FlowchartDataEdge = {
  id: string
  type: 'default'
  source: string
  target: string
  markerEnd: 'arrow' | 'arrowclosed'
  animated: boolean
  label?: string
  style?: { stroke: 'green' | 'red' | 'orange' }
  labelBgStyle?: { fill: 'green' | 'red' | 'orange' }
}

type FlowchartMetadata = {
  counts: { node: number; edge: number; otherFlowcharts: number }
  currName: string
}

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

const gameConfig = computed(() => getGameConfig(props.gameId))
const nodeComponents = computed(() => gameConfig.value?.nodeComponents ?? {})
const nodeTypes = computed(() => getAllNodeTypes(props.gameId))

const vueflow = useVueFlow()
const windowsize = useWindowSize()
const i18n = useI18n()
const vueflowLayout = useFlowchartLayout()
const { cssNodeBgColor, cssNodeTextColor } = useFlowchartTheme()

const isReady = ref(false)
const isDraggable = ref(false)
const isShowMiniMap = ref(windowsize.width.value > 700)
const isSearchVisible = ref(false)

const vueflowData = {
  nodes: ref<FlowchartDataNode[]>([]),
  edges: ref<FlowchartDataEdge[]>([]),
  metadata: ref<FlowchartMetadata>({
    counts: { node: -1, edge: -1, otherFlowcharts: -1 },
    currName: '',
  }),
}

provide(symbolUseVueFlow, vueflow)
provide(symbolFlowchartMetadata_TysyDemo, vueflowData.metadata)
provide(symbolFlowchartSearchMetadata, vueflowData.metadata as Ref<Record<string, unknown>>)

const store = useFlowchartStore()
const flowKey = computed(() => store.makeKey(props.gameId, props.versionId, props.flowchartName))
const isRestoredFromCache = ref(false)

const fileUrl = computed(
  () => `/data/${props.gameId}/${props.versionId}/flowcharts/vueflow/${props.flowchartName}.json`,
)

async function triggerRelayout() {
  isReady.value = false
  await nextTick()
  isReady.value = true
  await nextTick()
}

function preProcessEdges(edges: FlowchartDataEdge[]) {
  return edges.map((edge) => ({
    ...edge,
    label: (() => {
      if (edge.label && edge.label != undefined && edge.label.length > 0) {
        const temp = edge.label.split(',').map((v) => i18n.t(v))
        return temp.join('/')
      }
      return ''
    })(),
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

  nextTick(async () => {
    vueflowData.nodes.value = vueflowLayout.layout(
      vueflowData.nodes.value,
      vueflowData.edges.value,
      'TB',
    )
    if (vueflowData.nodes.value.length > 0) {
      await vueflow.fitView({ nodes: [vueflowData.nodes.value[0].id] })
    }
    store.setReady(flowKey.value)
  })
}

defineExpose({ triggerRelayout })

watch(
  fileUrl,
  async (newValue) => {
    if (newValue.endsWith('/.json') || !props.flowchartName) {
      isReady.value = false
      vueflowData.nodes.value = []
      vueflowData.edges.value = []
      vueflowData.metadata.value = {
        counts: { node: -1, edge: -1, otherFlowcharts: -1 },
        currName: '',
      }
    } else {
      const cached = store.getCachedState(flowKey.value)
      if (cached) {
        vueflowData.nodes.value = cached.nodes
        vueflowData.edges.value = cached.edges
        vueflowData.metadata.value = cached.metadata
        isRestoredFromCache.value = true
        isReady.value = true
        return
      }

      isReady.value = false
      await nextTick()
      const fetchedData = await getJson<FlowchartData>(fileUrl.value, 5)
      vueflowData.nodes.value = fetchedData.data.nodes as FlowchartDataNode[]
      vueflowData.edges.value = preProcessEdges(fetchedData.data.edges)
      vueflowData.metadata.value = fetchedData.metadata
      vueflowData.nodes.value = vueflowLayout.layout(
        vueflowData.nodes.value,
        vueflowData.edges.value,
        'TB',
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
  if (isReady.value && props.flowchartName) {
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

const { edge, position, visible: isEdgeCardVisible, handleEdgeClick, close: closeEdgeCard } =
  useEdgeClickCard()
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

<style scoped>
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

:deep(.custom-node-icon) {
  margin-right: 4px;
}

:deep(.custom-node-icon),
:deep(.custom-node-title) {
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

:deep(p.small-text) {
  font-size: 12px;
  margin-bottom: 0.4rem;
}
:deep(p.small-text + hr) {
  margin-bottom: 0.4rem;
}
</style>
