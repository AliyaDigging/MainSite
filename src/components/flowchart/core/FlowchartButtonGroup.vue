<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Icon } from '@vicons/utils'
import { InfoOutlined } from '@vicons/material'
import { LayoutSidebarLeftCollapse, LayoutSidebarRightCollapse } from '@vicons/tabler'
import PvButton from 'primevue/button'
import { symbolFlowchartFileTreeCollapsed } from '@/constants/injection'
import { useWindowSize } from '@vueuse/core'

defineProps<{
  title: string
}>()

const model = defineModel<boolean>({ default: false })
const windowsize = useWindowSize()

const iconSize = computed(() => (windowsize.width.value <= 768 ? 18 : 24))

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

    <!-- Info toggle -->
    <PvButton
      class="button-group__btn"
      rounded
      severity="info"
      @click="model = !model"
      v-tooltip.right="title"
    >
      <Icon :size="iconSize">
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
  gap: 10px;
  pointer-events: auto;
  z-index: 11;
}
</style>
