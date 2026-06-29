<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'

import { type FlowchartNode_FOF_Channel } from '../types/script3'
import { ChatConfig_Channel_ChannelType } from '../types/script6'
import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import { useSiteSettingStore } from '@/stores/setting'
import { computed, inject } from 'vue'
import { ChatLaunch } from '@vicons/carbon'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_FOF_Channel['data']>>()

const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!
const setting = useSiteSettingStore()

const channelInfo = computed(() => {
  const channels = externalConfigData.value.chatConfig.channels
  const channel = channels[props.data.channelId]
  if (channel) {
    return channel
  }
  return null
})

const channelTypeLabel = computed(() => {
  if (!channelInfo.value) return 'Unknown'
  return channelInfo.value.channelType === ChatConfig_Channel_ChannelType.Single
    ? 'Single'
    : 'Multi'
})

const channelName = computed(() => {
  if (!channelInfo.value) return ''
  switch (setting.l10nlang) {
    case 'en-us':
      return channelInfo.value.name['en-us']
    default:
      return channelInfo.value.name['zh-cn']
  }
})
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ChatLaunch /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.FOF_Channel.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          频道ID: <code>{{ props.data.channelId }}</code>
        </p>
        <template v-if="channelInfo">
          <p>频道名称: {{ channelName }}</p>
          <p>频道类型: {{ channelTypeLabel }}</p>
          <p>频道头像：</p>
          <img
            :src="`/aliya/aliya2_demo/images/avatar/${channelInfo.avatarFilename}`"
            width="100%"
          />
        </template>
        <template v-else>
          <p style="color: orange">警告：未找到该频道的数据</p>
        </template>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
