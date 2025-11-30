<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { AirRound } from '@vicons/material'

import { type FlowchartDataNode_SetO2ConsumeFactor } from '../types/script5_vueflow_prod'
import { useI18n } from 'vue-i18n'
import { getHHMMSSBySeconds } from '@/utils/utils'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_SetO2ConsumeFactor['data']>>()

const i18n = useI18n()
function getTooltipString(value: number) {
  const o2at180000 = Math.floor(180000 / value)
  const o2at90000 = Math.floor(90000 / value)
  return i18n
    .t('comp.flowchart.node.SetO2ConsumeFactor.p.value.tooltip')
    .replace(/\[o2180000\]/, String(o2at180000))
    .replace(/\[o290000\]/, String(o2at90000))
    .replace(/\[o2180000hhmmss\]/, getHHMMSSBySeconds(o2at180000))
    .replace(/\[o290000hhmmss\]/, getHHMMSSBySeconds(o2at90000))
}
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId:&nbsp;{{ props.data.fileId }}</p>
    <p>ItemId:&nbsp;{{ props.data.itemId }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><AirRound /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.node.SetO2ConsumeFactor.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.SetO2ConsumeFactor.p.value') }}:&nbsp;<span
            class="custom-node-tooltip"
            v-tooltip.top="getTooltipString(props.data.targetValue)"
            >{{ props.data.targetValue }}</span
          >
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
