<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Keyboard } from '@vicons/tabler'

import { type FlowchartDataNode_PlayerInput } from '../types/script5_vueflow_prod'
import { inject } from 'vue'
import { symbolFlowchartMetadata_Aliya1 } from '@/constants/injection'
import { flowchartBus } from '@/utils/flowchartEvents'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_PlayerInput['data']>>()
const metadata = inject(symbolFlowchartMetadata_Aliya1)!

function triggerPopover(event: Event, varName: string) {
  event.stopPropagation()
  event.preventDefault()
  flowchartBus.emit('node-popover:toggle', {
    varName: varName,
    originTriggerNodeId: props.data.fileId,
    browserEvent: event,
  })
}
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId:&nbsp;{{ props.data.fileId }}</p>
    <p>ItemId:&nbsp;{{ props.data.itemId }}</p>
    <p>VarId:&nbsp;{{ props.data.variable.fileId }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><Keyboard /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.PlayerInput.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.PlayerInput.p.varname') }}:&nbsp;“<u
            @click="
              (e) => triggerPopover(e, metadata.variableNames[props.data.variable.fileId].key)
            "
            >{{ metadata.variableNames[props.data.variable.fileId].key }}</u
          >”
        </p>
        <p>
          {{ $t('comp.flowchart.node.PlayerInput.p.sendmessage') }}:&nbsp;{{
            $t(`constant.boolean.human.${props.data.sendMessage}`)
          }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
