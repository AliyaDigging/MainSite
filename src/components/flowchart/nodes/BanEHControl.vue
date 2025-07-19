<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'
import { Engine, Ban } from '@vicons/tabler'

import { type FlowchartDataNode_BanEHControl } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_BanEHControl['data']>>()
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon><Engine /><Ban /> BanEHControl</Icon>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
