<script setup lang="ts">
/**
 * Flowchart file tree component — left panel.
 * Currently accepts Array<string>; tree structure support planned.
 */
const props = defineProps<{
  items: string[]
  activeItem?: string
}>()

const emit = defineEmits<{
  select: [item: string]
}>()
</script>

<template>
  <div class="file-tree">
    <div class="file-tree-list">
      <div
        v-for="item in items"
        :key="item"
        class="file-tree-item"
        :class="{ active: item === activeItem }"
        @click="emit('select', item)"
      >
        <span class="file-tree-item-icon">&#97048;</span>
        <span class="file-tree-item-name">{{ item }}</span>
      </div>
      <div v-if="items.length === 0" class="file-tree-empty">
        {{ $t('comp.flowchart.p.selection1') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-tree {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--p-surface-border, #e0e0e0);
  background: var(--p-surface-ground, #f8f9fa);
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
  font-size: 13px;
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

.file-tree-empty {
  padding: 20px 12px;
  text-align: center;
  color: var(--p-text-muted-color, #64748b);
  font-size: 13px;
}
</style>
