<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { GitBranchSharp } from '@vicons/ionicons5'

import { type FlowchartDataNode_Check } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_Check['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>currIndex: {{ props.data.currIndex }}</p>
    <p>successIndex: {{ props.data.successIndex }}</p>
    <p>failureIndex: {{ props.data.failureIndex }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><GitBranchSharp /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.tysy_demo.node.Check.title') }}</span>
      </div>
      <div class="custom-node-content">
        <div class="tysy-demo-debug">
          <p>
            <i>currIndex: {{ props.data.currIndex }}</i>
          </p>
          <p>
            <i>successIndex: {{ props.data.successIndex }}</i>
          </p>
          <p>
            <i>failureIndex: {{ props.data.failureIndex }}</i>
          </p>
        </div>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.Check.variableScope.p') }}:
          {{ $t(`comp.flowchart.tysy_demo.flow.var.scope.${props.data.variableScope}`) }}
        </p>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.Check.variableName.p') }}:
          <code>{{ props.data.variableName }}</code>
        </p>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.Check.valueGreater.p') }}:
          <code>{{ props.data.valueGreater }}</code>
        </p>
        <General_ExtraAction :data="props.data.extraAction" v-if="props.data.extraAction" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
