<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { HeartRateMonitor } from '@vicons/tabler'

import { type FlowchartDataNode_watchstart } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_watchstart['data']>>()
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
        <Icon class="custom-node-icon"><HeartRateMonitor /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.watchstart.title') }}</span>
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
        <p>ID: {{ props.data.arg.id }}</p>
        <template v-if="props.data.arg.condition">
          <p>
            触发条件（<b>{{
              $t(`comp.flowchart.2361_playtest.comparer.${props.data.arg.condition.comparer}`)
            }}</b
            >）：
          </p>
          <ul class="custom-node-normal-ul">
            <li v-for="(item, idx) in props.data.arg.condition.conditions" :key="idx">
              <code>{{ item.variableLeft }}</code>
              {{ $t(`comp.flowchart.2361_playtest.compareop.${item.compareOp}`) }}
              <code>{{ item.variableRight }}</code>
            </li>
          </ul>
        </template>
        <template v-if="props.data.arg.seconds">
          <p>超时自动触发时间: {{ props.data.arg.seconds }}s</p>
        </template>
        <p>跳转目标: {{ props.data.arg.target }}</p>
        <p>优先级: {{ props.data.arg.priority }}</p>
        <p>
          不打开对话也触发:
          {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.runOnEnd}`) }}
        </p>
        <p>仅触发一次: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.once}`) }}</p>
        <p>
          玩家选择时不计时: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.pause}`) }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
