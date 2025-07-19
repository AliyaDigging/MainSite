<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'
import { Music } from '@vicons/tabler'

import { type FlowchartDataNode_ChangeRadioMusic } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_ChangeRadioMusic['data']>>()
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon><Music /> ChangeRadioMusic</Icon>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
