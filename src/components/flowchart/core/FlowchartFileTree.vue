<script setup lang="ts">
import { inject } from 'vue'
import { InsertDriveFileOutlined } from '@vicons/material'
import { LayoutSidebarRightCollapse, LayoutSidebarLeftCollapse } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import Button from 'primevue/button'
import Listbox from 'primevue/listbox'
import Menubar from 'primevue/menubar'
import { symbolFlowchartFileTreeCollapsed } from '@/constants/injection'

/**
 * Flowchart file tree component — left panel.
 * Currently accepts Array<string>; tree structure support planned.
 */
defineProps<{
  items: string[]
  activeItem?: string
}>()

const emit = defineEmits<{
  select: [item: string]
}>()

const fileTreeCollapsed = inject(symbolFlowchartFileTreeCollapsed, null)

function toggleFileTree() {
  if (fileTreeCollapsed) {
    fileTreeCollapsed.value = !fileTreeCollapsed.value
  }
}
</script>

<template>
  <Menubar v-if="fileTreeCollapsed !== null" class="file-tree-menubar">
    <template #start>
      <Button
        text
        severity="secondary"
        size="small"
        class="file-tree-collapse-btn"
        @click="toggleFileTree"
      >
        <Icon size="16">
          <LayoutSidebarLeftCollapse v-if="fileTreeCollapsed" />
          <LayoutSidebarRightCollapse v-else />
        </Icon>
        <span>{{
          fileTreeCollapsed
            ? $t('comp.flowchart.p.expandFileTree')
            : $t('comp.flowchart.p.collapseFileTree')
        }}</span>
      </Button>
    </template>
  </Menubar>
  <Listbox
    :options="items"
    :model-value="activeItem"
    :pt="{
      root: { class: 'file-tree', style: { borderRadius: 0 } },
      listContainer: { style: { maxHeight: 'none' } },
      list: 'file-tree-list',
      option: ({ context }) => ({
        class: ['file-tree-item', { active: context.selected }],
      }),
    }"
    @change="emit('select', $event.value as string)"
  >
    <template #option="{ option }">
      <span class="file-tree-item-icon" style="margin-right: 4px"
        ><Icon><InsertDriveFileOutlined /></Icon
      ></span>
      <span class="file-tree-item-name">{{ option }}</span>
    </template>
    <template #empty>{{ $t('comp.flowchart.p.selection1') }}</template>
  </Listbox>
  <Menubar v-if="fileTreeCollapsed !== null" class="file-tree-menubar">
    <template #start>
      <Button
        text
        severity="secondary"
        size="small"
        class="file-tree-collapse-btn"
        @click="toggleFileTree"
      >
        <Icon size="16">
          <LayoutSidebarLeftCollapse v-if="fileTreeCollapsed" />
          <LayoutSidebarRightCollapse v-else />
        </Icon>
        <span>{{
          fileTreeCollapsed
            ? $t('comp.flowchart.p.expandFileTree')
            : $t('comp.flowchart.p.collapseFileTree')
        }}</span>
      </Button>
    </template>
  </Menubar>
</template>

<style scoped>
:deep(.p-listbox) {
  border-radius: 0 !important;
}
</style>

<style scoped>
.file-tree-menubar {
  flex-shrink: 0;
  border: none;
  border-radius: 0;
  min-height: unset;
  padding: 2px 4px;
}

.file-tree-menubar :deep(.p-menubar-root-list) {
  display: none;
}

.file-tree-menubar :deep(.p-menubar-start) {
  margin-left: auto;
}

.file-tree {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.file-tree-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.file-tree-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 16px;
  color: var(--p-text-color, #1e293b);
  transition: background 0.15s;
  border-left: 3px solid transparent;
}

.file-tree-item:hover {
  background: var(--p-surface-hover, #e9ecef);
}

.file-tree-item.active {
  background: var(--p-primary-50, #eff6ff);
  color: var(--p-primary-color, #3b82f6);
  border-left-color: var(--p-primary-color, #3b82f6);
  font-weight: 500;
}

.file-tree-item-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.file-tree-item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
