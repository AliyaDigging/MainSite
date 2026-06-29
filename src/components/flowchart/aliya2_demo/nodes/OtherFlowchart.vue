<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ExternalLink } from '@vicons/tabler'

import { type FlowchartNode_OtherFlowchart } from '../types/script3'
import { Button } from 'primevue'
import { flowchartBus } from '@/utils/flowchartEvents'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_OtherFlowchart['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p><b>displayData</b></p>
    <p>conversationId: {{ props.data.displayData.conversationId }}</p>
    <p>dialogueId: {{ props.data.displayData.dialogueId }}</p>
    <p><b>actualJumpData</b></p>
    <p>conversationId: {{ props.data.actualJumpData.conversationId }}</p>
    <p>nodeId: {{ props.data.actualJumpData.nodeId }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ExternalLink /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.OtherFlowchart.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>其他流程图ID: {{ props.data.displayData.conversationId }}</p>
        <p>具体对话ID: {{ props.data.displayData.dialogueId }}</p>
        <div style="text-align: center" class="mt-2">
          <Button
            @click="
              flowchartBus.emit('jump-to-other', {
                flowchartName: props.data.actualJumpData.conversationId,
                nodeId: props.data.actualJumpData.nodeId,
              })
            "
            size="big"
            severity="primary"
            ><Icon style="font-size: 1.5em"><ExternalLink /></Icon>跳转到该处</Button
          >
        </div>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
