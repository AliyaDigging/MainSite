<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ConditionPoint } from '@vicons/carbon'

import { type FlowchartNode_WaitForCondition } from '../types/script3'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_WaitForCondition['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>articyId: {{ props.data.articyInternal.articyId }}</p>
    <p>dialogueId: {{ props.data.articyInternal.dialogueId }}</p>
    <p>title: {{ props.data.articyInternal.title }}</p>
    <p>dialogueText: {{ props.data.articyInternal.dialogueText }}</p>
    <p>menuText: {{ props.data.articyInternal.menuText }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ConditionPoint /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.WaitForCondition.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.WaitForCondition.variableName.title') }}
          <code>{{ props.data.compareCondition.varName }}</code>
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.WaitForCondition.conditionJudgment.title') }}
          {{
            $t(`comp.flowchart.aliya2_demo.flow.judgment.${props.data.compareCondition.condition}`)
          }}
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.WaitForCondition.compareValue.title') }}
          {{ props.data.compareCondition.compareValue }}
        </p>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
