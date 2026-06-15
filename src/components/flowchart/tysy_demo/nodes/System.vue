<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { NotificationsActiveOutlined } from '@vicons/material'

import { type FlowchartDataNode_System } from '../types/script3'
import {
  symbolL10nDataSingleLang_TysyDemo,
  symbolFlowchartMetadata_TysyDemo,
} from '@/constants/injection'
import { inject } from 'vue'

import General_ExtraAction from './General_ExtraAction.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_System['data']>>()

const l10n = inject(symbolL10nDataSingleLang_TysyDemo)!
const flowchartMetadata = inject(symbolFlowchartMetadata_TysyDemo)!
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>currIndex: {{ props.data.currIndex }}</p>
    <p>nextIndex: {{ props.data.nextIndex }}</p>
    <p>
      senderId: <code>{{ props.data.senderId }}</code>
    </p>
    <p>
      chatScene: <code>{{ props.data.chatScene }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><NotificationsActiveOutlined /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.tysy_demo.node.System.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <div class="tysy-demo-debug">
          <p>
            <i>currIndex: {{ props.data.currIndex }}</i>
          </p>
          <p>
            <i>nextIndex: {{ props.data.nextIndex }}</i>
          </p>
          <p>
            <i
              >senderId: <code>{{ props.data.senderId }}</code></i
            >
          </p>
          <p>
            <i
              >chatScene: <code>{{ props.data.chatScene }}</code></i
            >
          </p>
        </div>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.System.waitTime.p') }}: {{ props.data.waitTime }}s
        </p>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.System.senderId') }}: “{{
            $t(`comp.flowchart.tysy_demo.node.System.senderId.${props.data.senderId}`)
          }}”
        </p>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.System.chatScene') }}: “{{
            $t(`comp.flowchart.tysy_demo.node.System.chatScene.${props.data.chatScene}`)
          }}”
        </p>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.System.content') }}:
          {{ l10n[`${flowchartMetadata.currName}_${props.data.currIndex}`] }}
        </p>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.System.highlightTimeout') }}:
          {{ props.data.highlightTimeout }}s
        </p>
        <General_ExtraAction
          :data="props.data.extraAction"
          :node-id="props.id"
          v-if="props.data.extraAction"
        />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
