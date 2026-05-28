<script setup lang="ts">
import { inject, ref } from 'vue'
import { Icon } from '@vicons/utils'
import { InfoOutlined } from '@vicons/material'
import { LayoutSidebarLeftCollapse, LayoutSidebarRightCollapse } from '@vicons/tabler'
import PvButton from 'primevue/button'
import { symbolFlowchartFileTreeCollapsed } from '@/constants/injection'

defineProps<{
  title: string
}>()

const model = defineModel<boolean>({ default: false })

const fileTreeCollapsed = inject(symbolFlowchartFileTreeCollapsed, ref(false))

function toggleFileTree() {
  fileTreeCollapsed.value = !fileTreeCollapsed.value
}
</script>

<template>
  <div class="button-group">
    <!-- File tree collapse toggle -->
    <PvButton
      class="button-group__btn"
      rounded
      @click="toggleFileTree"
      v-tooltip.left="
        fileTreeCollapsed
          ? $t('comp.flowchart.p.expandFileTree')
          : $t('comp.flowchart.p.collapseFileTree')
      "
    >
      <Icon size="24">
        <LayoutSidebarLeftCollapse v-if="fileTreeCollapsed" />
        <LayoutSidebarRightCollapse v-else />
      </Icon>
    </PvButton>

    <!-- Info toggle -->
    <PvButton
      class="button-group__btn"
      rounded
      :severity="model ? 'primary' : undefined"
      @click="model = !model"
      v-tooltip.left="title"
    >
      <Icon size="24">
        <InfoOutlined />
      </Icon>
    </PvButton>
  </div>
</template>

<style scoped>
.button-group {
  position: absolute;
  bottom: 12px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: auto;
  z-index: 11;
}
</style>
