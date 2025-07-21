<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { BracesVariable20Filled } from '@vicons/fluent'

import { type FlowchartDataNode_DefineVariable } from '../types/script5_vueflow_prod'
import { computed, inject } from 'vue'
import { symbolFlowchartMetadata } from '@/constants/injection'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_DefineVariable['data']>>()

const metadata = inject(symbolFlowchartMetadata)!
const variableType = computed(() => {
  const entry = metadata.value.variableNames[props.data.fileId]
  if (entry) {
    return entry.type
  } else {
    return 'unknown'
  }
})
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId:&nbsp;{{ props.data.fileId }}</p>
  </NodeToolbar>

  <div class="custom-vueflow-node">
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><BracesVariable20Filled /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.DefineVariable.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>{{ $t('comp.flowchart.node.DefineVariable.p.key') }}:&nbsp;“{{ props.data.key }}”</p>
        <p>
          {{ $t('comp.flowchart.node.DefineVariable.p.type') }}:&nbsp;{{
            $t(`comp.flowchart.variable.type.${variableType}`)
          }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.DefineVariable.p.value') }}:&nbsp;
          <code>{{ props.data.value }}</code>
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
