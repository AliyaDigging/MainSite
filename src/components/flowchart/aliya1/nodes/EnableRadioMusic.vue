<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Radio } from '@vicons/tabler'

import { type FlowchartDataNode_EnableRadioMusic } from '../types/script5_vueflow_prod'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_EnableRadioMusic['data']>>()
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
        <Icon class="custom-node-icon"><Radio /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.node.EnableRadioMusic.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.EnableRadioMusic.p.musicid') }}:&nbsp;{{ props.data.musicId }}
        </p>
        <audio :src="`/aliya/music/${props.data.musicId}.ogg`" class="mt-2 mb-2" controls></audio>
        <p>
          {{ $t('comp.flowchart.node.EnableRadioMusic.p.initquality') }}:&nbsp;{{
            props.data.initQuality
          }}
        </p>
        <p>
          {{ $t('comp.flowchart.node.EnableRadioMusic.finalpospercentoffset') }}:&nbsp;{{
            props.data.finalPosPercentOffset
          }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
