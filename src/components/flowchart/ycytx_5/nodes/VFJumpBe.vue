<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { MoodConfuzed } from '@vicons/tabler'

import { type VFOutNode_VFJumpBE } from '../types/script2'
import { getCorrectFlowchartUrl } from '@/utils/flowchart'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<VFOutNode_VFJumpBE['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>{{ $t('comp.flowchart.ycytx_5.node.toolbar.p1') }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><MoodConfuzed /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.ycytx_5.node.VFJumpBe.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.VFJumpBe.p.targetFlowchartName') }}:
          <RouterLink :to="getCorrectFlowchartUrl($route.path, props.data.targetFlowchartName)">{{
            props.data.targetFlowchartName
          }}</RouterLink>
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
