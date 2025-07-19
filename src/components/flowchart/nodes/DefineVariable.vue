<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'
import { Variable } from '@vicons/tabler'

import { type FlowchartDataNode_DefineVariable } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_DefineVariable['data']>>()
</script>

<template>
  <div class="custom-vueflow-node">
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon><Variable /> DefineVariable</Icon>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
