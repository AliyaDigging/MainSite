<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { AirRound } from '@vicons/material'

import { type FlowchartDataNode_ClampO2Res } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_ClampO2Res['data']>>()
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
        <p>{{ $t('comp.flowchart.node.ClampO2Res.p.minvalue') }}:&nbsp;{{ props.data.minValue }}</p>
        <p>{{ $t('comp.flowchart.node.ClampO2Res.p.maxvalue') }}:&nbsp;{{ props.data.maxValue }}</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
