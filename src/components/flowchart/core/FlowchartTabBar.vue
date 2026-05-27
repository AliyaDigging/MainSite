<script setup lang="ts">
/**
 * Tab bar for opened flowcharts — shown at the top of the right panel.
 */
import { useFlowchartStore } from '@/stores/flowchart'
import { Icon } from '@vicons/utils'
import { CloseOutlined } from '@vicons/material'

const store = useFlowchartStore()

function onTabClick(key: string) {
  store.switchTab(key)
}

function onTabClose(key: string, event: MouseEvent) {
  event.stopPropagation()
  store.closeTab(key)
}
</script>

<template>
  <div v-if="store.tabs.length > 0" class="tab-bar">
    <div
      v-for="tab in store.tabs"
      :key="tab.key"
      class="tab-item"
      :class="{ active: tab.key === store.activeKey }"
      @click="onTabClick(tab.key)"
    >
      <span class="tab-label">{{ tab.flowchartName }}</span>
      <span class="tab-close" @click="(e: MouseEvent) => onTabClose(tab.key, e)">
        <Icon size="14"><CloseOutlined /></Icon>
      </span>
    </div>
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px 0;
  border-bottom: 1px solid var(--p-surface-border, #e0e0e0);
  background: var(--p-surface-ground, #f8f9fa);
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
  color: var(--p-text-muted-color, #64748b);
  background: transparent;
  white-space: nowrap;
  transition:
    background 0.15s,
    color 0.15s;
  user-select: none;
}

.tab-item:hover {
  background: var(--p-surface-hover, #e9ecef);
  color: var(--p-text-color, #1e293b);
}

.tab-item.active {
  background: var(--p-surface-card, #ffffff);
  color: var(--p-text-color, #1e293b);
  border-color: var(--p-surface-border, #e0e0e0);
  font-weight: 500;
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
  background: var(--p-surface-border, #e0e0e0);
}
</style>
