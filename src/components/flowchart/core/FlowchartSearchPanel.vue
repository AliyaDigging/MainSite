<script setup lang="ts">
/**
 * 流程图全局查找面板
 * 支持按对话内容或全部内容搜索节点，高亮匹配项并支持上下导航
 */
import { computed, inject, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { Icon } from '@vicons/utils'
import {
  ManageSearchOutlined,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  CloseOutlined,
} from '@vicons/material'
import PvCard from 'primevue/card'
import PvInputText from 'primevue/inputtext'
import PvSelectButton from 'primevue/selectbutton'
import PvButton from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useFlowchartStore } from '@/stores/flowchart'
import { symbolUseDark, symbolL10NSearchData, symbolFlowchartSearchMetadata } from '@/constants/injection'
import { useFlowchartHighlight, SEARCH_HIGHLIGHT } from '@/composables/useFlowchartHighlight'
import { getL10NSearchConfig } from '@/components/flowchart/registry/l10nSearchRegistry'
import '@/components/flowchart/registry/l10nSearchConfigs'
import { useNodeTitleCache } from '@/composables/useNodeTitleCache'

type FlowchartDataNode = {
  id: string
  position: { x: number; y: number }
  type: string
  data: Record<string, unknown>
}

type FlowchartDataEdge = {
  id: string
  source: string
  target: string
  label?: string
}

const props = defineProps<{
  visible: boolean
  nodes: FlowchartDataNode[]
  edges: FlowchartDataEdge[]
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const vueflow = useVueFlow()
const i18n = useI18n()
const flowchartStore = useFlowchartStore()
const isDark = inject(symbolUseDark)!

// L10N search data & registry
const l10nSearchData = inject(symbolL10NSearchData)!
const searchMetadata = inject(symbolFlowchartSearchMetadata, ref({}))
const { getNodeTitle } = useNodeTitleCache()
const l10nSearchConfig = computed(() =>
  getL10NSearchConfig(flowchartStore.activeTab?.gameId ?? ''),
)

const { clearHighlights, highlightNodes, setActiveNode } = useFlowchartHighlight(SEARCH_HIGHLIGHT)

// 深色模式下 box-shadow 使用浅色半透明以保持可见层次
const cssSearchPanelBoxShadow = computed(() =>
  isDark.value ? '0 4px 12px rgba(255, 255, 255, 0.06)' : '0 4px 12px rgba(0, 0, 0, 0.12)',
)

const cardPt = computed(() => ({
  root: { style: `box-shadow: ${cssSearchPanelBoxShadow.value}` },
}))

// Sync visibility to store
watch(
  () => props.visible,
  (v) => {
    flowchartStore.isSearchPanelVisible = v
  },
)

// Close search panel when store signals (e.g. tab switch)
watch(
  () => flowchartStore.isSearchPanelVisible,
  (v) => {
    if (!v && props.visible) {
      emit('update:visible', false)
    }
  },
)

const searchText = ref('')
const searchMode = ref<'l10n_data' | 'field_value'>('l10n_data')
const currentMatchIndex = ref(0)
const inputRef = ref<InstanceType<typeof PvInputText> | null>(null)

interface MatchItem {
  nodeId: string
  edgeId: string | null
}

const matches = ref<MatchItem[]>([])
const navigationZoom = ref(1)
let lastScrollTimestamp = 0
const ANIMATION_DURATION = 300

const searchModeOptions = computed(() => [
  { label: i18n.t('comp.flowchart.search.mode.l10n_data'), value: 'l10n_data' },
  { label: i18n.t('comp.flowchart.search.mode.field_value'), value: 'field_value' },
])

const matchCount = computed(() => matches.value.length)
const currentMatchDisplay = computed(() =>
  matchCount.value > 0 ? `${currentMatchIndex.value + 1}/${matchCount.value}` : '0/0',
)

function collectAllStrings(obj: unknown): string[] {
  if (typeof obj === 'string') return [obj]
  if (typeof obj === 'number' || typeof obj === 'boolean') return [String(obj)]
  if (obj === null || obj === undefined) return []
  if (Array.isArray(obj)) return obj.flatMap(collectAllStrings)
  if (typeof obj === 'object') {
    return Object.values(obj as Record<string, unknown>).flatMap(collectAllStrings)
  }
  return []
}

function getNodeSearchText(node: FlowchartDataNode, mode: 'l10n_data' | 'field_value'): string {
  const data = node.data
  const config = l10nSearchConfig.value
  const parts: string[] = []

  // 始终附加 node type 的 i18n 标题
  if (config) {
    const title = getNodeTitle(node.type, config.nodeTitleI18nPattern)
    if (title) parts.push(title)
  }

  if (mode === 'l10n_data' && config) {
    // 优先使用 buildL10NKey（从 metadata + node data 动态构建 key），
    // 未配置则回退到 l10nKeyFields（node data 字段值直接作为 key）
    const l10n = l10nSearchData.value
    if (config.buildL10NKey) {
      const keys = config.buildL10NKey(data, searchMetadata.value, node.type)
      for (const key of keys) {
        const resolved = l10n[String(key)]
        if (resolved) parts.push(resolved)
      }
    } else {
      for (const field of config.l10nKeyFields) {
        const key = data[field]
        if (key == null) continue
        const resolved = l10n[String(key)]
        if (resolved) parts.push(resolved)
      }
    }
  } else {
    // field_value 模式，或 l10n_data 模式但无配置：收集所有字段原始值
    parts.push(...collectAllStrings(data))
  }

  return parts.join(' ')
}

function performSearch() {
  matches.value = []
  currentMatchIndex.value = 0

  const text = searchText.value.trim().toLowerCase()
  if (!text) {
    clearHighlights()
    return
  }

  const mode = searchMode.value

  // Search nodes
  for (const node of props.nodes) {
    const searchText_2 = getNodeSearchText(node, mode).toLowerCase()
    if (searchText_2.includes(text)) {
      matches.value.push({ nodeId: node.id, edgeId: null })
    }
  }

  // Also search edge labels in "field_value" mode
  if (mode === 'field_value') {
    for (const edge of props.edges) {
      if (edge.label && edge.label.toLowerCase().includes(text)) {
        matches.value.push({ nodeId: edge.source, edgeId: edge.id })
      }
    }
  }

  refreshHighlights()
}

function refreshHighlights() {
  clearHighlights()
  if (matches.value.length > 0) {
    highlightNodes(matches.value.map((m) => m.nodeId))
    if (currentMatchIndex.value < matches.value.length) {
      setActiveNode(matches.value[currentMatchIndex.value].nodeId)
    }
  }
}

function scrollToCurrentMatch() {
  if (matches.value.length === 0) return
  const match = matches.value[currentMatchIndex.value]
  if (!match) return

  const now = Date.now()
  if (now - lastScrollTimestamp > ANIMATION_DURATION) {
    navigationZoom.value = vueflow.viewport.value.zoom
  }
  lastScrollTimestamp = now

  const node = vueflow.findNode(match.nodeId)
  if (node) {
    vueflow.setCenter(node.position.x + 110, node.position.y + 30, {
      zoom: navigationZoom.value,
      duration: 300,
    })
  }
  refreshHighlights()
}

function goToPrev() {
  if (matches.value.length === 0) return
  currentMatchIndex.value =
    (currentMatchIndex.value - 1 + matches.value.length) % matches.value.length
  scrollToCurrentMatch()
}

function goToNext() {
  if (matches.value.length === 0) return
  currentMatchIndex.value = (currentMatchIndex.value + 1) % matches.value.length
  scrollToCurrentMatch()
}

function close() {
  emit('update:visible', false)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (e.shiftKey) {
      goToPrev()
    } else {
      goToNext()
    }
  }
}

watch([searchText, searchMode], () => {
  performSearch()
})

// Re-run search when L10N data finishes loading or language switches,
// so existing search queries don't show stale results.
watch(l10nSearchData, () => {
  performSearch()
})

watch(
  () => props.visible,
  (v) => {
    if (v) {
      navigationZoom.value = vueflow.viewport.value.zoom
      nextTick(() => {
        const comp = inputRef.value as { $el?: HTMLInputElement } | null
        comp?.$el?.focus()
      })
    } else {
      searchText.value = ''
      matches.value = []
      currentMatchIndex.value = 0
      clearHighlights()
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown)
  clearHighlights()
})

function handleGlobalKeydown(e: KeyboardEvent) {
  // Ctrl+F to toggle search panel
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    // Don't intercept when user is already typing in an input
    const tag = (e.target as Element).tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

    // Only handle if we're in a flowchart context
    const flowchartContainer = document.querySelector('.flowchart-comp')
    if (flowchartContainer && flowchartContainer.contains(e.target as Node)) {
      e.preventDefault()
      emit('update:visible', !props.visible)
      return
    }
    // Also handle if the target is within a VueFlow node (which is inside flowchart-comp)
    const vueFlowNode = (e.target as Element).closest('.vue-flow__node')
    if (vueFlowNode) {
      e.preventDefault()
      emit('update:visible', !props.visible)
      return
    }
  }
}
</script>

<template>
  <PvCard v-if="visible" class="flowchart-search-panel" :pt="cardPt">
    <template #header>
      <div class="search-panel-header">
        <Icon class="search-panel-icon"><ManageSearchOutlined /></Icon>
        <span class="search-panel-title">{{ i18n.t('comp.flowchart.search.title') }}</span>
        <PvButton
          severity="secondary"
          text
          rounded
          size="small"
          @click="close"
          v-tooltip.bottom="i18n.t('comp.flowchart.search.close')"
        >
          <Icon><CloseOutlined /></Icon>
        </PvButton>
      </div>
    </template>
    <template #content>
      <div class="search-panel-body">
        <PvInputText
          ref="inputRef"
          v-model="searchText"
          :placeholder="i18n.t('comp.flowchart.search.placeholder')"
          class="search-input"
          @keydown="handleKeydown"
          autocomplete="off"
        />
        <PvSelectButton
          v-model="searchMode"
          :options="searchModeOptions"
          option-value="value"
          option-label="label"
          size="small"
          class="search-mode-toggle"
        />
        <div class="search-nav">
          <span class="search-counter">{{ currentMatchDisplay }}</span>
          <PvButton
            severity="secondary"
            text
            rounded
            size="small"
            :disabled="matchCount === 0"
            @click="goToPrev"
            v-tooltip.bottom="i18n.t('comp.flowchart.search.prev')"
          >
            <Icon><KeyboardArrowLeftOutlined /></Icon>
          </PvButton>
          <PvButton
            severity="secondary"
            text
            rounded
            size="small"
            :disabled="matchCount === 0"
            @click="goToNext"
            v-tooltip.bottom="i18n.t('comp.flowchart.search.next')"
          >
            <Icon><KeyboardArrowRightOutlined /></Icon>
          </PvButton>
        </div>
      </div>
    </template>
  </PvCard>
</template>

<style scoped>
.flowchart-search-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  min-width: 360px;
  max-width: 420px;
}

.search-panel-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 4px;
}

.search-panel-icon {
  font-size: 18px;
  color: var(--p-primary-color, #3b82f6);
}

.search-panel-title {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: var(--p-text-color, #1e293b);
}

.search-panel-body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.search-input {
  flex: 1 1 100%;
}

.search-mode-toggle {
  flex: 0 0 auto;
}

.search-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 1 1 auto;
  justify-content: flex-end;
}

.search-counter {
  font-size: 12px;
  color: var(--p-text-muted-color, #64748b);
  min-width: 36px;
  text-align: center;
  margin-right: 4px;
}

:deep(.search-mode-toggle .p-togglebutton) {
  padding: 4px 10px;
  font-size: 12px;
}
</style>
