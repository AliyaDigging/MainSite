<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { GitBranchOutline } from '@vicons/ionicons5'

import { type FlowchartDataNode_elseif } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_elseif['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>
      persistentId: <code>{{ props.data.persistentId }}</code>
    </p>
    <p>
      sourceRow: <code>{{ props.data.sourceRow }}</code>
    </p>
    <p>
      label: <code>{{ props.data.label }}</code>
    </p>
    <p>
      arg: <code>{{ props.data.ogArg }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><GitBranchOutline /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.elseif.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          判断要求:
          {{ $t(`comp.flowchart.2361_playtest.comparer.${props.data.arg.conditions.comparer}`) }}
        </p>
        <p>判断条件：</p>
        <ul class="custom-node-normal-ul">
          <li v-for="(item, idx) in props.data.arg.conditions.conditions" :key="idx">
            <code>{{ item.variableLeft }}</code>
            {{ $t(`comp.flowchart.2361_playtest.compareop.${item.compareOp}`) }}
            <code>{{ item.variableRight }}</code>
          </li>
        </ul>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
