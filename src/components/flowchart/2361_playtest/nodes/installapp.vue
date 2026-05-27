<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { InstallMobileFilled } from '@vicons/material'

import { type FlowchartDataNode_installapp } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_installapp['data']>>()
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
        <Icon class="custom-node-icon"><InstallMobileFilled /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.installapp.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          应用ID: <code>{{ props.data.arg.target }}</code>
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
