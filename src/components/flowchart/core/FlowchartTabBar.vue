<script setup lang="ts">
/**
 * Tab bar for opened flowcharts — shown at the top of the right panel.
 */
import { computed, inject } from 'vue'
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
</style>
