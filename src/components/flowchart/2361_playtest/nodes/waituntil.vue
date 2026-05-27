<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ConditionPoint } from '@vicons/carbon'

import { type FlowchartDataNode_waituntil } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_waituntil['data']>>()
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
        <Icon class="custom-node-icon"><ConditionPoint /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.waituntil.title') }}</span>
      </div>
      <div class="custom-node-content">
        <template v-if="props.data.label !== ''">
          <p class="small-text">
            <i>
              LABEL:
              <small
                ><b
                  ><code>{{ props.data.label }}</code></b
                ></small
              ></i
            >
          </p>
          <hr />
        </template>
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
