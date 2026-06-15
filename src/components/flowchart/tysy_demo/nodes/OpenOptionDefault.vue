<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ReplyOutlined } from '@vicons/material'

import { type FlowchartDataNode_OpenOptionDefault } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_OpenOptionDefault['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>currIndex: {{ props.data.currIndex }}</p>
    <p>nextIndex: {{ props.data.nextIndex }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ReplyOutlined /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.tysy_demo.node.OpenOptionDefault.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <div class="tysy-demo-debug">
          <p>
            <i>currIndex: {{ props.data.currIndex }}</i>
          </p>
          <p>
            <i>nextIndex: {{ props.data.nextIndex }}</i>
          </p>
        </div>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.OpenOptionDefault.timeout') }}:
          {{ props.data.timeout }}s
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
