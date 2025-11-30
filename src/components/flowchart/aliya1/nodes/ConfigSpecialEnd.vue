<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { AppSettingsAltOutlined } from '@vicons/material'

import { type FlowchartDataNode_ConfigSpecialEnd } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_ConfigSpecialEnd['data']>>()
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
        <Icon class="custom-node-icon"><AppSettingsAltOutlined /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.node.ConfigSpecialEnd.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.ConfigSpecialEnd.p.o2runoutflowchartname') }}:&nbsp;<RouterLink
            :to="`/view/flowchart/${props.data.o2RunOutFlowchartName}`"
            >{{ props.data.o2RunOutFlowchartName }}</RouterLink
          >
        </p>
        <p>
          {{ $t('comp.flowchart.node.ConfigSpecialEnd.p.setcantrigger') }}:&nbsp;{{
            $t(`constant.boolean.human.${props.data.setCanTrigger}`)
          }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
