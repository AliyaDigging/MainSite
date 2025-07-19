<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Engine } from '@vicons/tabler'
import { PowerSharp } from '@vicons/material'

import { type FlowchartDataNode_ActivateEH } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_ActivateEH['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId: {{ props.data.fileId }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon><Engine /><PowerSharp /></Icon>
        <span>ActivateEH</span>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
