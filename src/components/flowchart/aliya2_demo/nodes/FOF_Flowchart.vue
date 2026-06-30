<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'

import { type FlowchartNode_FOF_Flowchart } from '../types/script3'
import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import { useSiteSettingStore } from '@/stores/setting'
import { computed, inject } from 'vue'
import { isNull } from 'lodash'
import { FlowchartCircle20Regular } from '@vicons/fluent'
import { flowchartBus } from '@/utils/flowchartEvents'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_FOF_Flowchart['data']>>()

const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!
const setting = useSiteSettingStore()

const channelName = computed(() => {
  if (isNull(props.data.channelId)) return null
  const channels = externalConfigData.value!.chatConfig.channels
  const channel = channels[props.data.channelId!]
  if (channel) {
    switch (setting.l10nlang) {
      case 'en-us':
        return channel.name['en-us']
      default:
        return channel.name['zh-cn']
    }
  }
  return null
})
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><FlowchartCircle20Regular /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.FOF_Flowchart.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.FOF_Flowchart.originalFlowchartId.title') }}
          {{ props.data.flowchartId }}
        </p>
        <hr />
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.FOF_Flowchart.actualFlowchartInfo.title') }}
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
        <template v-if="!isNull(props.data.channelId)">
          <p>
            {{ $t('comp.flowchart.aliya2_demo.node.FOF_Flowchart.channelId.title') }}
            <code>{{ props.data.channelId }}</code>
          </p>
          <template v-if="channelName">
            <p>
              {{ $t('comp.flowchart.aliya2_demo.node.FOF_Flowchart.channelName.title') }}
              {{ channelName }}
            </p>
          </template>
        </template>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
