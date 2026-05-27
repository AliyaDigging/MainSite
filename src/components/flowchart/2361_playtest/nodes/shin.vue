<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Flash24Regular } from '@vicons/fluent'

import { type FlowchartDataNode_shin } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_shin['data']>>()
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
        <Icon class="custom-node-icon"><Flash24Regular /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.shin.title') }}</span>
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
          颜色: <code>{{ props.data.arg.color }}</code>
        </p>
        <p>透明度: {{ props.data.arg.alpha }}</p>
        <p>间隔时间: {{ props.data.arg.interval }}s</p>
        <p>闪烁次数: {{ props.data.arg.count }}</p>
        <p>阻塞式: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
