<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { RemoveCircleSharp } from '@vicons/material'

import { type FlowchartNode_FileRemoved } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_FileRemoved['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>reason: {{ props.data.reason }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><RemoveCircleSharp /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.FileRemoved.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p v-html="$t('comp.flowchart.aliya2_demo.node.FileRemoved.removalNotice', 'zh_CN')"></p>
        <p>{{ $t('comp.flowchart.aliya2_demo.node.FileRemoved.thankYou', 'zh_CN') }}</p>
        <p v-html="$t('comp.flowchart.aliya2_demo.node.FileRemoved.removalNotice', 'en_US')"></p>
        <p>{{ $t('comp.flowchart.aliya2_demo.node.FileRemoved.thankYou', 'en_US') }}</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
