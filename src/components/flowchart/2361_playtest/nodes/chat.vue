<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { MessageOutlined } from '@vicons/material'
import { TagNone } from '@vicons/carbon'

import { type FlowchartDataNode_chat } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_chat['data']>>()
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
    <div v-if="props.data.speaker || props.data.content">
      <div>
        <Icon class="custom-node-icon"><MessageOutlined /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.chat.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p v-if="props.data.label !== ''">
          <small
            ><b
              ><code>{{ props.data.label }}</code></b
            ></small
          >
        </p>
        <p>{{ $t('comp.flowchart.node.chat.p.speaker') }}: {{ props.data.speaker }}</p>
        <p>{{ $t('comp.flowchart.node.chat.p.content') }}: {{ props.data.content }}</p>
        <p>
          延迟时间:
          {{
            Number(
              props.data.delay === 0 && props.data.delayType === 'base' ? 0.5 : props.data.delay,
            ).toFixed(2)
          }}s ({{ $t(`comp.flowchart.2361_playtest.node.delay.${props.data.delayType}`) }})
        </p>
        <p v-if="props.data.voice !== ''">
          语音: <code>{{ props.data.voice }}</code>
        </p>
      </div>
    </div>
    <div v-else>
      <div>
        <Icon class="custom-node-icon"><TagNone /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.null.title') }}</span>
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
