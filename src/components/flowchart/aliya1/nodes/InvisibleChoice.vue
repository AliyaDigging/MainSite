<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ReplyFilled } from '@vicons/material'

import { type FlowchartDataNode_InvisibleChoice } from '../types/script5_vueflow_prod'

import { inject } from 'vue'
import { symbolUseVueFlow } from '@/constants/injection'
import { fitInViewTargetBlock } from '@/utils/flowchart'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_InvisibleChoice['data']>>()

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
        <Icon class="custom-node-icon"><ReplyFilled /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.InvisibleChoice.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.InvisibleChoice.p.rule') }}:&nbsp;{{
            $t(`comp.flowchart.node.InvisibleChoice.rule.${props.data.rule}`)
          }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.InvisibleChoice.p.targetblock') }}:&nbsp;<a
            class="custom-node-a-clickable"
            @click="fitInViewTargetBlock(vueflow, props.data.targetBlock)"
            >{{ props.data.targetBlock }}</a
          >
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
