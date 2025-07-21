<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { RestartAltRound } from '@vicons/material'

import { type FlowchartDataNode_RestartGame } from '../types/script5_vueflow_prod'
import { useI18n } from 'vue-i18n'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_RestartGame['data']>>()

const i18n = useI18n()
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
        <Icon class="custom-node-icon"><RestartAltRound /></Icon>
        <span
          class="custom-node-title custom-node-tooltip"
          v-tooltip.top="i18n.t('comp.flowchart.node.RestartGame.title.desc')"
          >{{ $t('comp.flowchart.node.RestartGame.title') }}</span
        >
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
