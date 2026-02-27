<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { StatusResolved } from '@vicons/carbon'

import { type VFOutNode_SystemStatusTips } from '../types/script2'
import { inject } from 'vue'
import { symbolL10nDataSingleLang_Ycytx5 } from '@/constants/injection'

const l10n = inject(symbolL10nDataSingleLang_Ycytx5)!

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<VFOutNode_SystemStatusTips['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>
      day: <code>{{ props.data.day }}</code>
    </p>
    <p>
      id: <code>{{ props.data.id }}</code>
    </p>
    <p>
      nextId: <code>{{ props.data.nextId }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><StatusResolved /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.ycytx_5.node.SystemStatusTips.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.SystemStatusTips.p.text') }}:
          {{ l10n.story[props.data.text] }}
        </p>
        <p v-if="props.data.logText">
          {{ $t('comp.flowchart.ycytx_5.node.SystemStatusTips.p.logText') }}:
          {{ l10n.story[props.data.logText] }}
        </p>
        <p v-if="props.data.wxScence">
          {{ $t('comp.flowchart.ycytx_5.node.SystemStatusTips.p.wxScence') }}:
          <code>{{ props.data.wxScence }}</code>
        </p>
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.SystemStatusTips.p.delayTime') }}:
          {{ props.data.delayTime }}ms
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
