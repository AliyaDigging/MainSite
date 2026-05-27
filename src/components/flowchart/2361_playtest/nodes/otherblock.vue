<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { InsertChartOutlinedFilled } from '@vicons/material'

import { type FlowchartDataNode_otherblock } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_otherblock['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top"> </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><InsertChartOutlinedFilled /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.otherblock.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          跳转到: <code>{{ props.data.targetId }}</code>
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
