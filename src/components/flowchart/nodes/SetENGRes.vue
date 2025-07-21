<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Engine } from '@vicons/tabler'

import { type FlowchartDataNode_SetENGRes } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_SetENGRes['data']>>()
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
        <Icon class="custom-node-icon"><Engine /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.SetENGRes.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.SetENGRes.p.minusvalue') }}:&nbsp;{{
            $t(`constant.boolean.toggler.${props.data.minusValue}`)
          }}
        </p>
        <p>{{ $t('comp.flowchart.node.SetENGRes.p.duration') }}:&nbsp;{{ props.data.duration }}s</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
