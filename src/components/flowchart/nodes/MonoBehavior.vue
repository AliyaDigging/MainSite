<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'
import { Code } from '@vicons/tabler'

import { type FlowchartDataNode_MonoBehavior } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_MonoBehavior['data']>>()
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><Code /></Icon>
        <span class="custom-node-title">MonoBehavior</span>
      </div>
      <div class="custom-node-content">
        <p>FileId:&nbsp;{{ props.data.fileId }}</p>
        <p>ItemId:&nbsp;{{ props.data.itemId }}</p>
        <p>
          m_Script:<br /><code>{{ JSON.stringify(props.data.m_Script, null, 2) }}</code>
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
