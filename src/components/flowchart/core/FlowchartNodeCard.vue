<script setup lang="ts">
import { ref, computed, nextTick, watch, onUnmounted } from 'vue'
import { useWindowSize, useElementSize } from '@vueuse/core'
import { Icon } from '@vicons/utils'
import { CloseOutlined } from '@vicons/material'
import PvButton from 'primevue/button'
import PvCard from 'primevue/card'
import { useFlowchartStore } from '@/stores/flowchart'
import { useFlowchartManager } from '@/composables/useFlowchartManager'
import { flowchartBus } from '@/utils/flowchartEvents'
import { useFlowchartHighlight, JUMP_HIGHLIGHT } from '@/composables/useFlowchartHighlight'

const props = defineProps<{
  rightPanelWidth: number
}>()

const store = useFlowchartStore()

const { width: windowWidth } = useWindowSize()

const cardRef = ref<HTMLElement>()
const { width: actualCardWidth } = useElementSize(cardRef)

const visible = computed(() => store.nodeCard !== null)

const isMobile = computed(() => windowWidth.value <= 768)

const flowchartManager = useFlowchartManager()
const { highlightNode, clearHighlights } = useFlowchartHighlight(JUMP_HIGHLIGHT)

const computedCardWidth = computed(() => {
  if (isMobile.value) return 'auto'
  return `${Math.max(400, props.rightPanelWidth * 0.4)}px`
})

const computedRight = computed(() => {
  if (isMobile.value) return '16px'
  const panelW = props.rightPanelWidth
  // Use measured card width if available, otherwise fall back to computed value
  const cardW = actualCardWidth.value || Math.min(panelW * 0.3, 420)
  return `${(panelW - cardW) / 2}px`
})

const computedLeft = computed(() => {
  if (isMobile.value) return '86px'
  return 'auto'
})

function close() {
  clearHighlights()
  store.clearNodeCard()
}

async function jumpBack(
  originFlowchartName: string,
  originNodeId: string,
  targetFlowchartName: string,
  targetNodeId: string,
) {
  clearHighlights()
  close()
  await nextTick()

  const activeFlowchart = flowchartManager.getActiveFlowchart()!
  flowchartBus.emit('node-card:show', {
    gameInfo: {
      gameId: activeFlowchart.gameId,
      versionId: activeFlowchart.versionId,
      flowchartName: targetFlowchartName,
    },
    origin: {
      node: originNodeId,
      flowchart: originFlowchartName,
    },
    target: {
      node: targetNodeId,
      flowchart: targetFlowchartName,
    },
  })
}

// 当卡片可见时高亮目标节点，卡片关闭时清除高亮
watch(
  () => store.nodeCard?.targetNode,
  (targetNode) => {
    clearHighlights()
    if (targetNode) {
      nextTick(() => {
        highlightNode(targetNode)
      })
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  clearHighlights()
})
</script>

<template>
  <div v-if="visible" ref="cardRef" class="node-card">
    <PvCard :pt="{ body: { class: 'p-0' } }">
      <template #content>
        <div class="node-card__header">
          <span class="node-card__title">{{ $t('comp.flowchart.jump_card.title') }}</span>
          <PvButton severity="secondary" text rounded size="small" @click="close">
            <Icon size="18">
              <CloseOutlined />
            </Icon>
          </PvButton>
        </div>
        <div class="node-card__body">
          <ul class="custom-node-normal-ul">
            <li>
              跳转前: <code>{{ store.nodeCard?.originNode }}</code> @
              <code>{{ store.nodeCard?.originFlowchart }}</code>
            </li>
            <li>
              当前（跳转后）: <code>{{ store.nodeCard?.targetNode }}</code> @
              <code>{{ store.nodeCard?.targetFlowchart }}</code>
            </li>
          </ul>
          <div class="node-card__actions">
            <PvButton
              severity="secondary"
              size="small"
              outlined
              @click="
                (e) =>
                  jumpBack(
                    store.nodeCard!.targetFlowchart,
                    store.nodeCard!.targetNode,
                    store.nodeCard!.originFlowchart,
                    store.nodeCard!.originNode,
                  )
              "
              >回到跳转前</PvButton
            >
            <PvButton severity="primary" size="small" @click="close">留在当前</PvButton>
          </div>
        </div>
      </template>
    </PvCard>
  </div>
</template>

<style scoped>
.node-card {
  position: absolute;
  right: v-bind(computedRight);
  left: v-bind(computedLeft);
  bottom: 16px;
  z-index: 12;
  width: v-bind(computedCardWidth);
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

.node-card__actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
