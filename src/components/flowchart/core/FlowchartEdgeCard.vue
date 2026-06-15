<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { Icon } from '@vicons/utils'
import { CloseOutlined } from '@vicons/material'
import PvButton from 'primevue/button'
import PvCard from 'primevue/card'
import { flowchartBus } from '@/utils/flowchartEvents'

const props = defineProps<{
  source: string
  target: string
  position: { x: number; y: number }
}>()

const emit = defineEmits<{
  close: []
}>()

// 测量卡片实际尺寸，将位置钳制在视口内
const cardRef = ref<HTMLElement>()
const { width: cardWidth, height: cardHeight } = useElementSize(cardRef)
const { width: windowWidth, height: windowHeight } = useWindowSize()

const CARD_MIN_WIDTH = 260
const EDGE_PAD = 8

const adjustedLeft = computed(() => {
  const raw = props.position.x
  const w = cardWidth.value || CARD_MIN_WIDTH
  return Math.max(EDGE_PAD, Math.min(raw, windowWidth.value - w - EDGE_PAD))
})

const adjustedTop = computed(() => {
  const raw = props.position.y
  const h = cardHeight.value || 80
  return Math.max(EDGE_PAD, Math.min(raw, windowHeight.value - h - EDGE_PAD))
})

function navigateToNode(nodeId: string) {
  flowchartBus.emit('fit-in-view', { nodeId, highlighted: true })
  emit('close')
}

// 点击 Card 外部时自动关闭（点击 edge 本身除外 — 由父组件的 @edge-click 处理位置更新）
function handleOutsideClick(e: MouseEvent) {
  if (cardRef.value?.contains(e.target as Node)) return
  if ((e.target as Element).closest('.vue-flow__edge')) return
  emit('close')
}

onMounted(() => {
  // setTimeout 避免触发 card 的那次 edge click 事件冒泡到 document 后立即关闭
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick)
  }, 0)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div
    ref="cardRef"
    class="edge-card"
    :style="{ left: adjustedLeft + 'px', top: adjustedTop + 'px' }"
  >
    <PvCard :pt="{ body: { class: 'p-0' } }">
      <template #content>
        <div class="edge-card__header">
          <span class="edge-card__title">{{ $t('comp.flowchart.edge_card.title') }}</span>
          <PvButton
            severity="secondary"
            text
            rounded
            size="small"
            @click="emit('close')"
            v-tooltip.bottom="$t('comp.flowchart.edge_card.close')"
          >
            <Icon size="18"><CloseOutlined /></Icon>
          </PvButton>
        </div>
        <div class="edge-card__body">
          <ul class="custom-node-normal-ul">
            <li>
              {{ $t('comp.flowchart.edge_card.source') }}:
              <code class="edge-card__code" @click="navigateToNode(source)">{{ source }}</code>
            </li>
            <li>
              {{ $t('comp.flowchart.edge_card.target') }}:
              <code class="edge-card__code" @click="navigateToNode(target)">{{ target }}</code>
            </li>
          </ul>
        </div>
      </template>
    </PvCard>
  </div>
</template>

<style scoped>
.edge-card {
  position: fixed;
  z-index: 15;
  min-width: 260px;
  max-width: 360px;
}

.edge-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  border-bottom: 1px solid var(--p-surface-border, #e0e0e0);
}

.edge-card__title {
  font-weight: 600;
  font-size: 14px;
}

.edge-card__body {
  padding: 8px;
}

.edge-card__code {
  cursor: pointer;
  color: var(--p-primary-color, #3b82f6);
  text-decoration: underline;
}

.edge-card__code:hover {
  color: var(--p-primary-hover-color, #2563eb);
}
</style>
