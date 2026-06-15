<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@vicons/utils'
import { InfoOutlined } from '@vicons/material'
import PvButton from 'primevue/button'
import { useWindowSize } from '@vueuse/core'

defineProps<{
  title: string
}>()

const model = defineModel<boolean>({ default: false })
const windowsize = useWindowSize()

const iconSize = computed(() => (windowsize.width.value <= 768 ? 18 : 24))
</script>

<template>
  <div class="button-group">
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
  bottom: 62px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: auto;
  z-index: 11;
}
</style>
