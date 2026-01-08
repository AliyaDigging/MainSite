<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { GitBranchOutline } from '@vicons/ionicons5'

import { type FlowchartDataNode_EndIf } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_EndIf['data']>>()
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
        <Icon class="custom-node-icon"><GitBranchOutline /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.EndIf.title') }}</span>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
