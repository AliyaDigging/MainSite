<script setup lang="ts">
import { InsertDriveFileOutlined } from '@vicons/material'
import { Icon } from '@vicons/utils'
import Listbox from 'primevue/listbox'

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
</script>

<template>
  <Listbox
    :options="items"
    :model-value="activeItem"
    :pt="{
      root: 'file-tree',
      listContainer: { style: { maxHeight: 'none' } },
      list: 'file-tree-list',
      option: ({ context }) => ({
        class: ['file-tree-item', { active: context.selected }],
      }),
    }"
    @change="emit('select', $event.value as string)"
  >
    <template #option="{ option }">
      <span class="file-tree-item-icon"
        ><Icon><InsertDriveFileOutlined /></Icon
      ></span>
      <span class="file-tree-item-name">{{ option }}</span>
    </template>
    <template #empty>{{ $t('comp.flowchart.p.selection1') }}</template>
  </Listbox>
</template>

<style scoped>
.file-tree {
  height: 100%;
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
