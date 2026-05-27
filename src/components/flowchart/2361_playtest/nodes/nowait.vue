<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { TimerOffOutlined } from '@vicons/material'

import { type FlowchartDataNode_nowait } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_nowait['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>
      persistentId: <code>{{ props.data.persistentId }}</code>
    </p>
    <p>
      sourceRow: <code>{{ props.data.sourceRow }}</code>
    </p>
    <p>
      label: <code>{{ props.data.label }}</code>
    </p>
    <p>
      arg: <code>{{ props.data.ogArg }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><TimerOffOutlined /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.nowait.title') }}</span>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
