<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { QuickreplyOutlined } from '@vicons/material'

import { type FlowchartNode_DefaultChoice } from '../types/script3'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'
import { computed } from 'vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_DefaultChoice['data']>>()

const time = props.data.timeoutTime
const timeoutTimeInSeconds = computed(() => {
  return time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds
})
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
        <Icon class="custom-node-icon"><QuickreplyOutlined /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.DefaultChoice.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          超时时间: {{ timeoutTimeInSeconds }}s ({{ time.days }}天{{ time.hours }}时{{
            time.minutes
          }}分{{ time.seconds }}秒)
        </p>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
