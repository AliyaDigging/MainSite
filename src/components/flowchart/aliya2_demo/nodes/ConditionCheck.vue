<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { SpellcheckFilled } from '@vicons/material'

import { type FlowchartNode_ConditionCheck } from '../types/script3'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_ConditionCheck['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>articyId: {{ props.data.articyInternal.articyId }}</p>
    <p>dialogueId: {{ props.data.articyInternal.dialogueId }}</p>
    <p>title: {{ props.data.articyInternal.title }}</p>
    <p>dialogueText: {{ props.data.articyInternal.dialogueText }}</p>
    <p>menuText: {{ props.data.articyInternal.menuText }}</p>
    <p>
      userScript: <code>{{ props.data.userScript }}</code>
    </p>
    <p>
      conditionString: <code>{{ props.data.conditionString }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><SpellcheckFilled /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.ConditionCheck.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <General_CustomScriptAndCondition
          :variable-ops="props.data.variableOps"
          :need-before-br="false"
        />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
