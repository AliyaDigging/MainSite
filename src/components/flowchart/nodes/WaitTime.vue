<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { TimerSharp } from '@vicons/material'

import { type FlowchartDataNode_WaitTime } from '../types/script5_vueflow_prod'
import { computed } from 'vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_WaitTime['data']>>()

const waitTimeInSeconds = computed(() => {
  return props.data.waitHours * 3600 + props.data.waitMinutes * 60 + props.data.waitSeconds
})
const waitTimeString = computed(
  () => `${props.data.waitHours}:${props.data.waitMinutes}:${props.data.waitSeconds}`,
)
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId: {{ props.data.fileId }}</p>
    <p>ItemId: {{ props.data.itemId }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><TimerSharp /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.WaitTime.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.WaitTime.p.time') }}: {{ waitTimeInSeconds }}s ({{
            waitTimeString
          }})
        </p>
        <p>
          {{ $t('comp.flowchart.node.WaitTime.p.sendtoast') }}:
          {{ $t(`constant.boolean.human.${props.data.SendToast}`) }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
