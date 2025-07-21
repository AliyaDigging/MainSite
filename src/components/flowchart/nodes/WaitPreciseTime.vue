<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { AccessTimeRound } from '@vicons/material'

import { type FlowchartDataNode_WaitPreciseTime } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_WaitPreciseTime['data']>>()
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
        <Icon class="custom-node-icon"><AccessTimeRound /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.WaitPreciseTime.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.WaitPreciseTime.p.timespot') }}:&nbsp;{{
            props.data.hourNum
          }}:{{ props.data.minuteNum }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.WaitPreciseTime.p.neednewday') }}:&nbsp;
          {{ $t(`constant.boolean.human.${props.data.needNewDay}`) }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.WaitPreciseTime.p.sendtoast') }}:&nbsp;
          {{ $t(`constant.boolean.human.${props.data.sendToast}`) }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.WaitPreciseTime.p.isfirst') }}:&nbsp;
          {{ $t(`constant.boolean.human.${props.data.isFirstWaitPreciseTime}`) }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
