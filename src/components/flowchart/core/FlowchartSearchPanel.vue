<script setup lang="ts">
/**
 * 流程图全局查找面板
 * 支持按对话内容或全部内容搜索节点，高亮匹配项并支持上下导航
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { Icon } from '@vicons/utils'
import {
  ManageSearchOutlined,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  CloseOutlined,
} from '@vicons/material'
import PvInputText from 'primevue/inputtext'
import PvSelectButton from 'primevue/selectbutton'
import PvButton from 'primevue/button'
import { useI18n } from 'vue-i18n'

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

const DIALOGUE_FIELDS = ['messageText', 'text', 'content', 'customMsgText', 'logText', 'speaker']

const searchText = ref('')
const searchMode = ref<'dialogue' | 'all'>('dialogue')
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
  { label: i18n.t('comp.flowchart.search.mode.dialogue'), value: 'dialogue' },
  { label: i18n.t('comp.flowchart.search.mode.all'), value: 'all' },
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

function getNodeSearchText(node: FlowchartDataNode, mode: 'dialogue' | 'all'): string {
  const data = node.data
  if (mode === 'dialogue') {
    return DIALOGUE_FIELDS.map((f) => (data[f] != null ? String(data[f]) : '')).join(' ')
  }
  return collectAllStrings(data).join(' ')
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

  // Also search edge labels in "all" mode
  if (mode === 'all') {
    for (const edge of props.edges) {
      if (edge.label && edge.label.toLowerCase().includes(text)) {
        matches.value.push({ nodeId: edge.source, edgeId: edge.id })
      }
    }
  }

  updateHighlights()
}

const HIGHLIGHT_CLASS = 'flowchart-search-highlight'
const ACTIVE_CLASS = 'flowchart-search-active'

function clearHighlights() {
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => el.classList.remove(HIGHLIGHT_CLASS))
  document.querySelectorAll(`.${ACTIVE_CLASS}`).forEach((el) => el.classList.remove(ACTIVE_CLASS))
}

function updateHighlights() {
  clearHighlights()

  for (const match of matches.value) {
    const el = document.querySelector(`[data-id="${match.nodeId}"]`)
    if (el) {
      el.classList.add(HIGHLIGHT_CLASS)
    }
  }

  if (matches.value.length > 0 && currentMatchIndex.value < matches.value.length) {
    const currentMatch = matches.value[currentMatchIndex.value]
    const el = document.querySelector(`[data-id="${currentMatch.nodeId}"]`)
    if (el) {
      el.classList.remove(HIGHLIGHT_CLASS)
      el.classList.add(ACTIVE_CLASS)
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
  updateHighlights()
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
  <div v-if="visible" class="flowchart-search-panel">
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
  </div>
</template>

<style scoped>
.flowchart-search-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background: var(--p-surface-card, #ffffff);
  border: 1px solid var(--p-surface-border, #e0e0e0);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 360px;
  max-width: 420px;
}

.search-panel-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--p-surface-border, #e0e0e0);
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
  padding: 10px 12px;
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

<style>
/* Global highlight styles - cannot be scoped since they're applied to VueFlow DOM elements */
.vue-flow__node.flowchart-search-highlight {
  background-color: #fff9c4 !important;
  outline: 2px solid #fdd835 !important;
}

.vue-flow__node.flowchart-search-active {
  background-color: #ffe0b2 !important;
  outline: 3px solid #ff9800 !important;
}
</style>
