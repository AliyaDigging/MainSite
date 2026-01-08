<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ExternalLink } from '@vicons/tabler'

import { type FlowchartDataNode_StartAnCharacterChart } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_StartAnCharacterChart['data']>>()
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
        <Icon class="custom-node-icon"><ExternalLink /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya1_dlc.node.StartAnCharacterChart.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{
            $t('comp.flowchart.aliya1_dlc.node.StartAnCharacterChart.p.targetflowchartname')
          }}:&nbsp;“{{ props.data.targetFlowchartName }}”
        </p>
        <p>
          {{
            $t('comp.flowchart.aliya1_dlc.node.StartAnCharacterChart.p.targetblockname')
          }}:&nbsp;“{{ props.data.targetBlockName }}”
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
