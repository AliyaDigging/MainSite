<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { EllipsisHorizontalCircle } from '@vicons/ionicons5'

import { type FlowchartDataNode_DefaultNode } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_DefaultNode['data']>>()
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
        <Icon class="custom-node-icon"><EllipsisHorizontalCircle /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.tysy_demo.node.DefaultNode.title')
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
        <General_ExtraAction :data="props.data.extraAction" :node-id="props.id" v-if="props.data.extraAction" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
