<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { BracesVariable20Filled } from '@vicons/fluent'

import { type FlowchartDataNode_SetVariable } from '../types/script5_vueflow_prod'
import { computed, inject } from 'vue'
import { symbolFlowchartMetadata } from '@/constants/injection'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_SetVariable['data']>>()

const metadata = inject(symbolFlowchartMetadata)!
const targetVarData = computed(() => {
  const varInfo = metadata.value.variableNames[props.data.anyVar.variable]
  const assignedData: number | string | null =
    varInfo.type === 'string'
      ? props.data.anyVar.data.stringData.stringVal
      : props.data.anyVar.data.integerData.integerVal

  if (varInfo) {
    return { ...varInfo, data: assignedData }
  } else {
    return { key: 'unknown', type: 'unknown', data: assignedData }
  }
})
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId:&nbsp;{{ props.data.fileId }}</p>
    <p>ItemId:&nbsp;{{ props.data.itemId }}</p>
    <p>
      {{ $t('comp.flowchart.node.SetVariable.toolbar.varid') }}:
      <code>{{ props.data.anyVar.variable }}</code>
    </p>
    <p>
      {{ $t('comp.flowchart.node.SetVariable.toolbar.vardata') }}:<br />
      <code>{{ props.data.anyVar.data }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><BracesVariable20Filled /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.SetVariable.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>{{ $t('comp.flowchart.node.SetVariable.p.varname') }}:&nbsp;“{{ targetVarData.key }}”</p>
        <p>
          {{ $t('comp.flowchart.node.SetVariable.p.vartype') }}:&nbsp;
          {{ $t(`comp.flowchart.variable.type.${targetVarData.type}`) }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.SetVariable.p.operator') }}:&nbsp;
          {{ $t(`comp.flowchart.variable.operator.${props.data.setOperator}`) }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.SetVariable.p.data') }}:&nbsp;
          <code>{{ targetVarData.data }}</code>
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
