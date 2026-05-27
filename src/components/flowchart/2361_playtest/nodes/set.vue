<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { EditSettings24Regular } from '@vicons/fluent'

import { type FlowchartDataNode_set } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_set['data']>>()
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
        <Icon class="custom-node-icon"><EditSettings24Regular /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.set.title') }}</span>
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
        <p>受影响的变量：</p>
        <ul class="custom-node-normal-ul">
          <li v-for="(item, idx) in props.data.arg.vars" :key="idx">
            <code>{{ item.varName }} = {{ item.varValue }}</code> ({{ typeof item.varValue }})
          </li>
        </ul>
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
