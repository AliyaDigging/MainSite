<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { TimerOutlined } from '@vicons/material'

import { type FlowchartNode_WaitTime } from '../types/script3'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_WaitTime['data']>>()

const { t } = useI18n()

const time = props.data.waitTime
const timeoutTimeInSeconds = computed(() => {
  return time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds
})
const formattedWaitTime = computed(() => {
  const days = `${time.days}${t('comp.flowchart.aliya2_demo.flow.time.unit.days')}`
  const hours = `${time.hours}${t('comp.flowchart.aliya2_demo.flow.time.unit.hours')}`
  const minutes = `${time.minutes}${t('comp.flowchart.aliya2_demo.flow.time.unit.minutes')}`
  const seconds = `${time.seconds}${t('comp.flowchart.aliya2_demo.flow.time.unit.seconds')}`

  return `${timeoutTimeInSeconds.value}s (${days}${hours}${minutes}${seconds})`
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
        <Icon class="custom-node-icon"><TimerOutlined /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.WaitTime.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.WaitTime.waitTime.title') }}:
          {{ formattedWaitTime }}
        </p>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" :node-id="props.id" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
