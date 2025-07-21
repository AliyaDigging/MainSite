<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'
import { InsertChartOutlined } from '@vicons/material'

import { type FlowchartDataNode_FlowchartBlock } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_FlowchartBlock['data']>>()
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><InsertChartOutlined /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.FlowchartBlock.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.FlowchartBlock.p.name') }}:&nbsp;
          <RouterLink :to="`/view/flowchart/${props.data.flowchartName}`">{{
            props.data.flowchartName
          }}</RouterLink>
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
