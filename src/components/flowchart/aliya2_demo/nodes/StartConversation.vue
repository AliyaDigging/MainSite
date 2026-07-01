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
import { useSiteSettingStore } from '@/stores/setting.ts'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_StartConversation['data']>>()

const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!
const sitesetting = useSiteSettingStore()

const flowchartInfo = computed(() => {
  const chatData = externalConfigData.value!.chatConfig.channels
  const channel = chatData[props.data.channelId]
  if (channel) {
    return [
      (() => {
        switch (sitesetting.l10nlang) {
          case 'en-us':
            return channel.name[sitesetting.l10nlang]
          default:
            return channel.name['zh-cn']
        }
      })(),
      channel.startConversation.originConversationId,
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
        <span class="custom-node-title"
          ><u
            v-tooltip.top="$t('comp.flowchart.aliya2_demo.node.StartConversation.title.tooltip')"
            >{{ $t('comp.flowchart.aliya2_demo.node.StartConversation.title') }}</u
          ></span
        >
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.StartConversation.newConversationId.title') }}:
          <code>{{ props.data.channelId }}</code>
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.StartConversation.newConversationName.title') }}:
          {{ flowchartInfo ? flowchartInfo[0] : 'null' }}
        </p>
        <template v-if="!isNull(flowchartInfo)">
          <p>
            {{ $t('comp.flowchart.aliya2_demo.node.StartConversation.startFlowchartId.title') }}:
            <code>{{ flowchartInfo[1] }}</code>
          </p>
          <p>
            {{ $t('comp.flowchart.aliya2_demo.node.StartConversation.flowchartTitle.title') }}:
            {{ flowchartInfo[2] }}
          </p>
          <p>
            <u
              v-tooltip.top="
                $t(
                  'comp.flowchart.aliya2_demo.node.StartConversation.actualFlowchartInfo.title.tooltip',
                )
              "
              >{{
                $t('comp.flowchart.aliya2_demo.node.StartConversation.actualFlowchartInfo.title')
              }}</u
            >:
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
          <p>
            {{ $t('comp.flowchart.aliya2_demo.node.StartConversation.conversationAvatar.title') }}:
          </p>
          <img :src="flowchartInfo[3]" width="100%" style="margin-top: 2px" />
        </template>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
