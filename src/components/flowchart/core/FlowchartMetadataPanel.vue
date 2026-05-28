<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Icon } from '@vicons/utils'
import { InfoOutlined, CloseOutlined } from '@vicons/material'
import { LayoutSidebarLeftCollapse, LayoutSidebarRightCollapse } from '@vicons/tabler'
import PvButton from 'primevue/button'
import PvCard from 'primevue/card'
import { symbolFlowchartPageHeight, symbolFlowchartFileTreeCollapsed } from '@/constants/injection'

defineProps<{
  title: string
}>()

const show = ref(false)

const pageHeight = inject(symbolFlowchartPageHeight, ref('600px'))
const overlayTop = computed(() => `calc(${pageHeight.value} - 120px)`)

const fileTreeCollapsed = inject(symbolFlowchartFileTreeCollapsed, ref(false))

function toggleFileTree() {
  fileTreeCollapsed.value = !fileTreeCollapsed.value
}
</script>

<template>
  <div class="metadata-overlay">
    <!-- Floating file tree collapse button -->
    <PvButton
      class="file-tree-toggle-btn"
      rounded
      @click="toggleFileTree"
      v-tooltip.left="
        fileTreeCollapsed
          ? $t('comp.flowchart.p.expandFileTree')
          : $t('comp.flowchart.p.collapseFileTree')
      "
    >
      <Icon size="20">
        <LayoutSidebarLeftCollapse v-if="fileTreeCollapsed" />
        <LayoutSidebarRightCollapse v-else />
      </Icon>
    </PvButton>

    <!-- Floating info button -->
    <PvButton
      v-if="!show"
      class="metadata-toggle-btn"
      rounded
      @click="show = true"
      v-tooltip.left="title"
    >
      <Icon size="20">
        <InfoOutlined />
      </Icon>
    </PvButton>

    <!-- Metadata card -->
    <PvCard v-if="show" class="metadata-card" :pt="{ body: { class: 'p-0' } }">
      <template #content>
        <div class="metadata-card-header">
          <span class="metadata-card-title">{{ title }}</span>
          <PvButton severity="secondary" text rounded size="small" @click="show = false">
            <Icon size="18">
              <CloseOutlined />
            </Icon>
          </PvButton>
        </div>
        <div class="metadata-card-body">
          <slot />
        </div>
      </template>
    </PvCard>
  </div>
</template>

<style scoped>
.metadata-overlay {
  position: absolute;
  top: v-bind(overlayTop);
  bottom: 0;
  left: 32px;
  right: 0;
  pointer-events: none;
  z-index: 10;
}

.file-tree-toggle-btn {
  position: absolute;
  bottom: 52px;
  pointer-events: auto;
  z-index: 11;
}

.metadata-toggle-btn {
  position: absolute;
  bottom: 12px;
  pointer-events: auto;
  z-index: 11;
}

.metadata-card {
  position: absolute;
  bottom: 12px;
  pointer-events: auto;
  z-index: 11;
  max-height: 400px;
  width: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.metadata-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--p-surface-border, #e0e0e0);
}

.metadata-card-title {
  font-weight: 600;
  font-size: 16px;
}

.metadata-card-body {
  padding: 8px 12px;
  overflow-y: auto;
  max-height: 340px;
}
</style>
