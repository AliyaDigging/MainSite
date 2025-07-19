<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ArrowBarRight } from '@vicons/tabler'

import { type FlowchartDataNode_FlowchartStart } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_FlowchartStart['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId: {{ props.data.fileId }}</p>
    <br />
    <p>{{ $t('comp.flowchart.node.FlowchartStart.toolbar.complist') }}</p>
    <ul>
      <li v-for="i of props.data.components" :key="i">{{ i }}</li>
    </ul>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ArrowBarRight /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.FlowchartStart.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>{{ $t('comp.flowchart.node.FlowchartStart.p.name') }}: {{ props.data.m_Name }}</p>
        <p>
          {{ $t('comp.flowchart.node.FlowchartStart.p.count') }}: {{ props.data.components.length }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
