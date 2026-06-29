<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Keyboard24Regular } from '@vicons/fluent'

import { type FlowchartNode_PlayerInput } from '../types/script3'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_PlayerInput['data']>>()
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
        <Icon class="custom-node-icon"><Keyboard24Regular /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.PlayerInput.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          变量名: <code>{{ props.data.varName }}</code>
        </p>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
