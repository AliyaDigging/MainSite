<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { MoodBadRound } from '@vicons/material'

import { type VFOutNode_GameBE } from '../types/script2'
import { symbolL10nDataSingleLang_Ycytx5 } from '@/constants/injection'
import { inject } from 'vue'

const l10n = inject(symbolL10nDataSingleLang_Ycytx5)!

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<VFOutNode_GameBE['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>
      day: <code>{{ props.data.day }}</code>
    </p>
    <p>
      id: <code>{{ props.data.id }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><MoodBadRound /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.ycytx_5.node.GameBe.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.GameBe.p.text') }}: {{ l10n.story[props.data.text] }}
        </p>
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.GameBe.p.delayTime') }}: {{ props.data.delayTime }}ms
        </p>
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.GameBe.p.wxScenece') }}:
          <code>{{ props.data.wxScence }}</code>
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
