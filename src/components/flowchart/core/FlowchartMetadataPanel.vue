<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { symbolFlowchartPageHeight } from '@/constants/injection'
import FlowchartButtonGroup from '@/components/flowchart/core/FlowchartButtonGroup.vue'
import FlowchartMetadataCard from '@/components/flowchart/core/FlowchartMetadataCard.vue'

defineProps<{
  title: string
}>()

const show = ref(false)

const pageHeight = inject(symbolFlowchartPageHeight, ref('600px'))
const overlayTop = computed(() => `calc(${pageHeight.value} - 180px)`)
</script>

<template>
  <div class="metadata-overlay">
    <FlowchartButtonGroup v-model="show" :title="title" />
    <FlowchartMetadataCard v-model="show" :title="title">
      <slot />
    </FlowchartMetadataCard>
  </div>
</template>

<style scoped>
.metadata-overlay {
  position: absolute;
  bottom: 16px;
  left: 24px;
  right: 0;
  pointer-events: none;
  z-index: 10;
}
</style>
