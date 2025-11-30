<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { JumpLink } from '@vicons/carbon'

import { fitInViewTargetBlock } from '@/utils/flowchart'

import { type FlowchartDataNode_CallBlock } from '../types/script5_vueflow_prod'
import { inject } from 'vue'
import { symbolUseVueFlow } from '@/constants/injection'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_CallBlock['data']>>()
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
        <Icon class="custom-node-icon"><JumpLink /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.CallBlock.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.CallBlock.p.targetblock') }}:&nbsp;
          <a
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
