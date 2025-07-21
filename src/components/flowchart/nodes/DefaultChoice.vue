<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { QuickreplyRound } from '@vicons/material'

import { fitInViewTargetBlock } from '@/utils/flowchart'

import { type FlowchartDataNode_DefaultChoice } from '../types/script5_vueflow_prod'
import { computed, inject } from 'vue'
import { symbolUseVueFlow } from '@/constants/injection'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_DefaultChoice['data']>>()

const waitTimeInSeconds = computed(
  () => props.data.waitHours * 3600 + props.data.waitMinutes * 60 + props.data.waitSeconds,
)
const waitTimeInString = computed(
  () =>
    `${props.data.waitHours.toString().padStart(2, '0')}:${props.data.waitMinutes.toString().padStart(2, '0')}:${props.data.waitSeconds.toString().padStart(2, '0')}`,
)

const vueflow = inject(symbolUseVueFlow)!
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId:&nbsp;{{ props.data.fileId }}</p>
    <p>ItemId:&nbsp;{{ props.data.itemId }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><QuickreplyRound /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.DefaultChoice.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.DefaultChoice.p.time') }}:&nbsp;{{ waitTimeInSeconds }}s ({{
            waitTimeInString
          }})
        </p>
        <p>
          {{ $t('comp.flowchart.node.DefaultChoice.p.targetblock') }}:&nbsp;
          <a
            class="custom-node-a-clickable"
            @click="fitInViewTargetBlock(vueflow, props.data.targetBlock)"
            >{{ props.data.targetBlock }}</a
          >
        </p>
        <p>
          {{ $t('comp.flowchart.node.DefaultChoice.p.sendtoast') }}:&nbsp;
          {{ $t(`constant.boolean.human.${props.data.SendToast}`) }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
