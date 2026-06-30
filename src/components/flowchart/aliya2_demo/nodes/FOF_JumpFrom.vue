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
    <p>displayInfo.conversationId: {{ props.data.displayInfo.conversationId }}</p>
    <p>displayInfo.dialogueId: {{ props.data.displayInfo.dialogueId }}</p>
    <p>actualJumpInfo.flowchartId: {{ props.data.actualJumpInfo.flowchartId }}</p>
    <p>actualJumpInfo.nodeId: {{ props.data.actualJumpInfo.nodeId }}</p>
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
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.fof.JumpFrom.preJumpFlowchartId.title') }}
          {{ props.data.displayInfo.conversationId }}
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.fof.JumpFrom.preJumpDialogueId.title') }}
          {{ props.data.displayInfo.dialogueId }}
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.fof.JumpFrom.actualJump.title') }}
          {{ props.data.actualJumpInfo.flowchartId }}@{{ props.data.actualJumpInfo.nodeId }}
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
            ><Icon style="font-size: 1.5em"><ExternalLink /></Icon
            >{{ $t('comp.flowchart.aliya2_demo.node.fof.JumpFrom.jumpTo.title') }}</Button
          >
        </div>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
