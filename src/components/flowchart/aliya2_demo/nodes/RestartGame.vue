<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Restart } from '@vicons/carbon'

import { type FlowchartNode_RestartGame } from '../types/script3'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_RestartGame['data']>>()
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
        <Icon class="custom-node-icon"><Restart /></Icon>
        <span class="custom-node-title"
          ><u v-tooltip.top="$t('comp.flowchart.node.RestartGame.title.tooltip')">{{
            $t('comp.flowchart.aliya2_demo.node.RestartGame.title')
          }}</u></span
        >
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
