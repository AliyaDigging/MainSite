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
        <p>
          应制作人的直接请求，我们已从ALIYA
          DB+上<b>移除该流程图的相关数据</b>。此流程图当前仅因技术原因保留，不再具有实际效用。
        </p>
        <p>感谢您的理解与配合。</p>
        <p>
          In light of the developer's direct request, we've
          <b>removed this flowchart data from the website</b>. Currently, this flowchart entry is
          only kept solely for technical reasons.
        </p>
        <p>Thank you for your understanding.</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
