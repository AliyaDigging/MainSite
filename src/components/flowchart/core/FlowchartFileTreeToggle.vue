<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Icon } from '@vicons/utils'
import { LayoutSidebarLeftCollapse, LayoutSidebarRightCollapse } from '@vicons/tabler'
import PvButton from 'primevue/button'
import { symbolFlowchartFileTreeCollapsed } from '@/constants/injection'
import { useWindowSize } from '@vueuse/core'

const windowsize = useWindowSize()

const iconSize = computed(() => (windowsize.width.value <= 768 ? 18 : 24))

const fileTreeCollapsed = inject(symbolFlowchartFileTreeCollapsed, ref(false))

function toggleFileTree() {
  fileTreeCollapsed.value = !fileTreeCollapsed.value
}
</script>

<template>
  <PvButton
    class="file-tree-toggle__btn"
    rounded
    severity="help"
    @click="toggleFileTree"
    v-tooltip.right="
      fileTreeCollapsed
        ? $t('comp.flowchart.p.expandFileTree')
        : $t('comp.flowchart.p.collapseFileTree')
    "
  >
    <Icon :size="iconSize">
      <LayoutSidebarLeftCollapse v-if="fileTreeCollapsed" />
      <LayoutSidebarRightCollapse v-else />
    </Icon>
  </PvButton>
</template>

<style scoped>
/* Positioning is controlled by the parent container */
</style>
