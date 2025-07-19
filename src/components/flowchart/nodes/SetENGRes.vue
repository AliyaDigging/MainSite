<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'
import { Engine } from '@vicons/tabler'

import { type FlowchartDataNode_SetENGRes } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_SetENGRes['data']>>()
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon><Engine /> SetENGRes</Icon>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
