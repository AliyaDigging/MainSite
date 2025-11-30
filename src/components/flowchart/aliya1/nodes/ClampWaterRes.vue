<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { WaterDropOutlined } from '@vicons/material'

import { type FlowchartDataNode_ClampWaterRes } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_ClampWaterRes['data']>>()
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
        <Icon class="custom-node-icon"><WaterDropOutlined /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.ClampWaterRes.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.ClampWaterRes.p.minvalue') }}:&nbsp;{{ props.data.minValue }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.ClampWaterRes.p.maxvalue') }}:&nbsp;{{ props.data.maxValue }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
