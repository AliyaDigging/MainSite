<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { LibraryAddOutlined } from '@vicons/material'

import { type FlowchartNode_StartConversation } from '../types/script3'
import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import { computed, inject } from 'vue'
import { isNull } from 'lodash'

import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'
import { flowchartBus } from '@/utils/flowchartEvents.ts'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_StartConversation['data']>>()

const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!

const flowchartInfo = computed(() => {
  const chatData = externalConfigData.value.chatConfig.channels
  const channel = chatData[props.data.channelId]
  if (channel) {
    return [
      channel.startConversation.conversationId,
      channel.startConversation.title,
      `/aliya/aliya2_demo/images/avatar/${channel.avatarFilename}`,
    ]
  } else {
    return null
  }
})
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>articyId: {{ props.data.articyInternal.articyId }}</p>
    <p>dialogueId: {{ props.data.articyInternal.dialogueId }}</p>
    <p>title: {{ props.data.articyInternal.title }}</p>
    <p>dialogueText: {{ props.data.articyInternal.dialogueText }}</p>
    <p>menuText: {{ props.data.articyInternal.menuText }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><LibraryAddOutlined /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.StartConversation.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          新对话ID: <code>{{ props.data.channelId }}</code>
        </p>
        <template v-if="!isNull(flowchartInfo)">
          <p>
            对话起始流程图ID: <code>{{ flowchartInfo[0] }}</code>
          </p>
          <p>
            实际流程图ID、节点ID:
            <span
              class="anchor-like"
              @click="
                () =>
                  flowchartBus.emit('jump-to-other', {
                    flowchartName: props.data.actualJumpInfo.flowchartId,
                    nodeId: props.data.actualJumpInfo.nodeId,
                    highlighted: true,
                  })
              "
              >{{ props.data.actualJumpInfo.flowchartId }}@{{
                props.data.actualJumpInfo.nodeId
              }}</span
            >
          </p>
          <p>流程图标题: {{ flowchartInfo[1] }}</p>
          <p>对话头像：</p>
          <img :src="flowchartInfo[2]" width="100%" />
        </template>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
