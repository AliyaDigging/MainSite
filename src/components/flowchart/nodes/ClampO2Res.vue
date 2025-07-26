<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { AirRound } from '@vicons/material'

import { type FlowchartDataNode_ClampO2Res } from '../types/script5_vueflow_prod'
import { useI18n } from 'vue-i18n'
import { getHHMMSSBySeconds } from '@/utils/utils'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_ClampO2Res['data']>>()

const i18n = useI18n()

function getValueTooltip(value: number) {
  const onetimes = Number(value / 1)
  const fivetimes = Math.floor(value / 5)
  return i18n
    .t('comp.flowchart.node.ClampO2Res.p.value.tooltip')
    .replace(/\[1times\]/, String(onetimes))
    .replace(/\[5times\]/, String(fivetimes))
    .replace(/\[1timeshhmmss\]/, getHHMMSSBySeconds(onetimes))
    .replace(/\[5timeshhmmss\]/, getHHMMSSBySeconds(fivetimes))
    .replace(/\[o2percent\]/, ((value / 180000) * 100).toFixed(2) + '%')
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
        <span class="custom-node-title">{{ $t('comp.flowchart.node.ClampO2Res.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.ClampO2Res.p.minvalue') }}:&nbsp;<span
            class="custom-node-tooltip"
            v-tooltip.top="getValueTooltip(props.data.minValue)"
            >{{ props.data.minValue }}</span
          >
        </p>
        <p>
          {{ $t('comp.flowchart.node.ClampO2Res.p.maxvalue') }}:&nbsp;<span
            class="custom-node-tooltip"
            v-tooltip.top="getValueTooltip(props.data.maxValue)"
            >{{ props.data.maxValue }}</span
          >
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
