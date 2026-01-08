<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { TimerOffRound } from '@vicons/material'

import { type FlowchartDataNode_EndWaitTimeForCondition } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_EndWaitTimeForCondition['data']>>()
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
        <Icon class="custom-node-icon"><TimerOffRound /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya1_dlc.node.node.EndWaitTimeForCondition.title')
        }}</span>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
