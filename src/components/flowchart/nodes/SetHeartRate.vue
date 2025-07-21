<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Heartbeat } from '@vicons/tabler'

import { type FlowchartDataNode_SetHeartRate } from '../types/script5_vueflow_prod'
import { computed } from 'vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_SetHeartRate['data']>>()

const heartrateBase = computed(() => {
  const enumValue = props.data.targetLevel
  switch (enumValue) {
    case 0:
      return 0
    case 1:
      return 60
    case 2:
      return 72
    case 3:
      return 85
    case 4:
      return 91
    case 5:
      return 98
    case 6:
      return 107
    case 7:
      return 115
    case 8:
      return 126
    default:
      return -1
  }
})
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
        <Icon class="custom-node-icon"><Heartbeat /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.SetHeartRate.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.SetHeartRate.p.basevalue') }}:&nbsp;{{ heartrateBase }} (±3)
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
