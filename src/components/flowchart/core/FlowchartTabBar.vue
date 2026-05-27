<script setup lang="ts">
/**
 * Tab bar for opened flowcharts — shown at the top of the right panel.
 * Supports drag-and-drop reordering.
 */
import { ref, computed, inject } from 'vue'
import { useFlowchartStore } from '@/stores/flowchart'
import { Icon } from '@vicons/utils'
import { CloseOutlined } from '@vicons/material'
import { symbolUseDark } from '@/constants/injection'

const store = useFlowchartStore()
const isDark = inject(symbolUseDark)!

const cssTabBarBg = computed(() => (isDark.value ? '#121212' : '#f8f9fa'))
const cssTabBarBorder = computed(() => (isDark.value ? '#2a2a2a' : '#e0e0e0'))
const cssTabTextColor = computed(() => (isDark.value ? '#8b8b8b' : '#64748b'))
const cssTabTextActive = computed(() => (isDark.value ? '#e0e0e0' : '#1e293b'))
const cssTabBgHover = computed(() => (isDark.value ? '#1e1e1e' : '#e9ecef'))
const cssTabBgActive = computed(() => (isDark.value ? '#1a1a1a' : '#ffffff'))
const cssTabCloseHoverBg = computed(() => (isDark.value ? '#333333' : '#e0e0e0'))

/** The key of the tab currently being dragged, or null. */
const dragKey = ref<string | null>(null)
/** The index in store.tabs where the insertion indicator should be drawn. */
const dropTargetIndex = ref<number | null>(null)

function onTabClick(key: string) {
  store.switchTab(key)
}

function onTabClose(key: string, event: MouseEvent) {
  event.stopPropagation()
  store.closeTab(key)
}

// ── drag & drop handlers ──────────────────────────────────────────────

function findTabIndex(key: string): number {
  return store.tabs.findIndex((t) => t.key === key)
}

function onDragStart(key: string, event: DragEvent) {
  dragKey.value = key
  dropTargetIndex.value = null
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    // Required for Firefox; can be any value.
    event.dataTransfer.setData('text/plain', key)
  }
}

function onDragOver(index: number, event: DragEvent) {
  if (!dragKey.value) return
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  dropTargetIndex.value = index
}

function onDragLeave(index: number) {
  // Only clear if the leave fires for the same target we previously set.
  if (dropTargetIndex.value === index) {
    dropTargetIndex.value = null
  }
}

function onDrop(index: number, event: DragEvent) {
  event.preventDefault()
  dropTargetIndex.value = null
  if (!dragKey.value) return

  const fromIndex = findTabIndex(dragKey.value)
  dragKey.value = null
  if (fromIndex === -1 || fromIndex === index) return

  store.reorderTabs(fromIndex, index)
}

function onDragEnd() {
  dragKey.value = null
  dropTargetIndex.value = null
}
</script>

<template>
  <div v-if="store.tabs.length > 0" class="tab-bar">
    <!-- insertion indicator before first tab -->
    <span
      v-if="dropTargetIndex === 0"
      class="drop-indicator"
      :style="{ '--tab-bar-border': cssTabBarBorder }"
    />
    <template v-for="(tab, i) in store.tabs" :key="tab.key">
      <div
        class="tab-item"
        :class="{
          active: tab.key === store.activeKey,
          dragging: dragKey === tab.key,
        }"
        :draggable="true"
        @click="onTabClick(tab.key)"
        @dragstart="onDragStart(tab.key, $event)"
        @dragover="onDragOver(i, $event)"
        @dragleave="onDragLeave(i)"
        @drop="onDrop(i, $event)"
        @dragend="onDragEnd"
      >
        <span class="tab-label">{{ tab.flowchartName }}</span>
        <span class="tab-close" @click="(e: MouseEvent) => onTabClose(tab.key, e)">
          <Icon size="14"><CloseOutlined /></Icon>
        </span>
      </div>
      <!-- insertion indicator after this tab -->
      <span
        v-if="dropTargetIndex === i + 1"
        class="drop-indicator"
        :style="{ '--tab-bar-border': cssTabBarBorder }"
      />
    </template>
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 4px 6px 0;
  border-bottom: 1px solid v-bind(cssTabBarBorder);
  background: v-bind(cssTabBarBg);
  overflow-x: auto;
  flex-shrink: 0;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  border: 1px solid transparent;
  border-bottom: none;
  color: v-bind(cssTabTextColor);
  background: transparent;
  white-space: nowrap;
  transition:
    background 0.15s,
    color 0.15s;
  user-select: none;
}

.tab-item:hover {
  background: v-bind(cssTabBgHover);
  color: v-bind(cssTabTextActive);
}

.tab-item.active {
  background: v-bind(cssTabBgActive);
  color: v-bind(cssTabTextActive);
  border-color: v-bind(cssTabBarBorder);
  font-weight: 500;
}

.tab-item.dragging {
  opacity: 0.45;
}

.tab-label {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  flex-shrink: 0;
  opacity: 0;
  transition:
    opacity 0.15s,
    background 0.15s;
}

.tab-item:hover .tab-close,
.tab-item.active .tab-close {
  opacity: 0.6;
}

.tab-close:hover {
  opacity: 1 !important;
  background: v-bind(cssTabCloseHoverBg);
}

/* ── drop insertion indicator ──────────────────────────────────────── */
.drop-indicator {
  width: 2px;
  min-width: 2px;
  height: 32px;
  margin: 0 2px;
  align-self: center;
  border-radius: 1px;
  background: var(--tab-bar-border, #1890ff);
  box-shadow: 0 0 3px var(--tab-bar-border, #1890ff);
}
</style>
