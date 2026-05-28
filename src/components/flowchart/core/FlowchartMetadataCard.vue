<script setup lang="ts">
import { Icon } from '@vicons/utils'
import { CloseOutlined } from '@vicons/material'
import PvButton from 'primevue/button'
import PvCard from 'primevue/card'

defineProps<{
  title: string
}>()

const show = defineModel<boolean>({ required: true })
</script>

<template>
  <PvCard v-if="show" class="metadata-card" :pt="{ body: { class: 'p-0' } }">
    <template #content>
      <div class="metadata-card__header">
        <span class="metadata-card__title">{{ title }}</span>
        <PvButton severity="secondary" text rounded size="small" @click="show = false">
          <Icon size="18">
            <CloseOutlined />
          </Icon>
        </PvButton>
      </div>
      <div class="metadata-card__body">
        <slot />
      </div>
    </template>
  </PvCard>
</template>

<style scoped>
.metadata-card {
  position: absolute;
  bottom: 12px;
  left: 62px;
  pointer-events: auto;
  z-index: 11;
  max-height: 400px;
  width: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
}

.metadata-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  border-bottom: 1px solid var(--p-surface-border, #e0e0e0);
}

.metadata-card__title {
  font-weight: 600;
  font-size: 18px;
}

.metadata-card__body {
  padding: 0px 4px;
  padding-bottom: 20px;
  overflow-y: auto;
  max-height: 340px;
}
</style>
