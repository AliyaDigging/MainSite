<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ExternalLink } from '@vicons/tabler'

import { type FlowchartNode_FOF_JumpFrom } from '../types/script3'
import { Button } from 'primevue'
import { flowchartBus } from '@/utils/flowchartEvents'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_FOF_JumpFrom['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>conversationId: {{ props.data.conversationId }}</p>
    <p>dialogueId: {{ props.data.dialogueId }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ExternalLink /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.fof.JumpFrom.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>跳转前流程图ID: {{ props.data.displayInfo.conversationId }}</p>
        <p>跳转前对话ID: {{ props.data.displayInfo.dialogueId }}</p>
        <p>
          实际跳转: {{ props.data.actualJumpInfo.flowchartId }}@{{
            props.data.actualJumpInfo.nodeId
          }}
        </p>
        <div style="text-align: center" class="mt-2">
          <Button
            @click="
              flowchartBus.emit('jump-to-other', {
                flowchartName: props.data.actualJumpInfo.flowchartId,
                nodeId: `${props.data.actualJumpInfo.nodeId}`,
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
