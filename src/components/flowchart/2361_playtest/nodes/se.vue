<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { SoundOutlined } from '@vicons/antd'

import { type FlowchartDataNode_se } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_se['data']>>()
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
        <Icon class="custom-node-icon"><SoundOutlined /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.se.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>动作: {{ $t(`comp.flowchart.node.se.action.${props.data.arg.action}`) }}</p>
        <p>
          音效名: <code>{{ props.data.arg.clip }}</code>
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
