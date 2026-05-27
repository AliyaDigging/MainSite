<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { MusicNote216Regular } from '@vicons/fluent'

import { type FlowchartDataNode_bgm } from '../types/script3'
import { isNull } from 'lodash'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_bgm['data']>>()
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
        <Icon class="custom-node-icon"><MusicNote216Regular /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.bgm.title') }}</span>
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
          行为: {{ $t(`comp.flowchart.2361_playtest.node.bgm.action.${props.data.arg.action}`) }}
        </p>
        <p v-if="!isNull(props.data.arg.clip) && props.data.arg.clip">
          片段名: {{ props.data.arg.clip }}
        </p>
        <p v-if="!isNull(props.data.arg.fadeout)">淡出时长: {{ props.data.arg.fadeout }}s</p>
        <p v-if="!isNull(props.data.arg.wait)">
          是否阻塞: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
