<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'

import { type FlowchartNode_FOF_Channel } from '../types/script3'
import { ChatConfig_Channel_ChannelType } from '../types/script6'
import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import { useSiteSettingStore } from '@/stores/setting'
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChatLaunch } from '@vicons/carbon'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_FOF_Channel['data']>>()

const { t } = useI18n()
const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!
const setting = useSiteSettingStore()

const channelInfo = computed(() => {
  const channels = externalConfigData.value!.chatConfig.channels
  const channel = channels[props.data.channelId]
  if (channel) {
    return channel
  }
  return null
})

const channelTypeLabel = computed(() => {
  if (!channelInfo.value)
    return t('comp.flowchart.aliya2_demo.node.FOF_Channel.channelType.Unknown')
  return channelInfo.value.channelType === ChatConfig_Channel_ChannelType.Single
    ? t('comp.flowchart.aliya2_demo.node.FOF_Channel.channelType.Single')
    : t('comp.flowchart.aliya2_demo.node.FOF_Channel.channelType.Multi')
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
          {{ $t('comp.flowchart.aliya2_demo.node.FOF_Channel.channelId.title') }}
          <code>{{ props.data.channelId }}</code>
        </p>
        <template v-if="channelInfo">
          <p>
            {{ $t('comp.flowchart.aliya2_demo.node.FOF_Channel.channelName.title') }}
            {{ channelName }}
          </p>
          <p>
            {{ $t('comp.flowchart.aliya2_demo.node.FOF_Channel.channelType.title') }}
            {{ channelTypeLabel }}
          </p>
          <p>{{ $t('comp.flowchart.aliya2_demo.node.FOF_Channel.channelAvatar.title') }}</p>
          <img
            :src="`/aliya/aliya2_demo/images/avatar/${channelInfo.avatarFilename}`"
            width="100%"
          />
        </template>
        <template v-else>
          <p style="color: orange">
            {{ $t('comp.flowchart.aliya2_demo.node.FOF_Channel.warningNotFound.title') }}
          </p>
        </template>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
