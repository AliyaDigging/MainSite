<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@vicons/utils'
import { CloseOutlined } from '@vicons/material'
import PvButton from 'primevue/button'
import PvCard from 'primevue/card'
import { useFlowchartStore } from '@/stores/flowchart'

const store = useFlowchartStore()

const visible = computed(() => store.nodeCard !== null)
const cardTitle = computed(() => store.nodeCard?.title ?? '')
const cardContent = computed(() => store.nodeCard?.bodyHtml ?? '')

function close() {
  store.clearNodeCard()
}
</script>

<template>
  <PvCard v-if="visible" class="node-card" :pt="{ body: { class: 'p-0' } }">
    <template #content>
      <div class="node-card__header">
        <span class="node-card__title">{{ cardTitle }}</span>
        <PvButton severity="secondary" text rounded size="small" @click="close">
          <Icon size="18">
            <CloseOutlined />
          </Icon>
        </PvButton>
      </div>
      <div class="node-card__body" v-html="cardContent" />
    </template>
  </PvCard>
</template>

<style scoped>
.node-card {
  position: absolute;
  right: 16px;
  bottom: 100px;
  z-index: 12;
  max-width: 420px;
  max-height: 360px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.node-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  border-bottom: 1px solid var(--p-surface-border, #e0e0e0);
}

.node-card__title {
  font-weight: 600;
  font-size: 18px;
}

.node-card__body {
  padding: 8px;
  overflow-y: auto;
  max-height: 300px;
}
</style>
