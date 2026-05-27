<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ReplyOutlined } from '@vicons/material'

import { type FlowchartDataNode_selection } from '../types/script3'
import { isNull } from 'lodash'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_selection['data']>>()
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
        <Icon class="custom-node-icon"><ReplyOutlined /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.selection.title') }}</span>
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
        <p>内容: {{ props.data.content }}</p>
        <p>跳转到: {{ props.data.arg.goto }}</p>
        <p v-if="props.data.arg.showif">
          显示条件: <code>{{ props.data.arg.showif }}</code>
        </p>
        <p v-if="!isNull(props.data.arg.chain)">
          保持回复框打开: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.chain}`) }}
        </p>
        <p>
          延迟时间:
          {{
            Number(
              props.data.delay === 0 && props.data.delayType === 'base' ? 0.5 : props.data.delay,
            ).toFixed(2)
          }}s ({{ $t(`comp.flowchart.2361_playtest.node.delay.${props.data.delayType}`) }})
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
