<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ReplyFilled } from '@vicons/material'

import { type FlowchartNode_PlayerChoice } from '../types/script3'
import { computed, inject } from 'vue'
import {
  symbolL10nDataSingleLang_Aliya2Demo,
  symbolExternalConfig_Aliya2Demo,
} from '@/constants/injection'
import { isNull } from 'lodash'
import { Aliya2Demo_Utils } from '@/utils/aliya'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'
import { useAliyaStore } from '@/stores/aliya.ts'
import { useSiteSettingStore } from '@/stores/setting.ts'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_PlayerChoice['data']>>()

const l10nFile = inject(symbolL10nDataSingleLang_Aliya2Demo)!
const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!
const aliyaSetting = useAliyaStore()
const setting = useSiteSettingStore()

// 分割实际发送和玩家选项
const contentSplitted = computed(() => {
  const actualContent = String(
    l10nFile.value.dialogues[`${props.data.articyInternal.dialogueId}`],
  ).replace(/\$v\{name\}/gi, aliyaSetting.playerName)

  // 判断是不是有特殊的分隔符
  if (actualContent.includes('<') && actualContent.includes('>')) {
    const match = actualContent.match(/(.*)\<(.*)\>/i)
    if (match) {
      return [
        match[1],
        Aliya2Demo_Utils.replaceText(
          match[2],
          { '$v{name}': aliyaSetting.playerName },
          setting.sitelang,
        ),
      ]
    } else {
      return [actualContent, actualContent]
    }
  } else {
    return [actualContent, actualContent]
  }
})
const imageUrlForSendingOut = computed(() => {
  const text = contentSplitted.value[0]
  try {
    if (text.includes('$image')) {
      const imageMapping = externalConfigData.value!.mediaMessageConfig.images
      const match = text.match(/\$image\{(.*)\}/im)
      if (match) {
        const imageEntry = imageMapping[match[1]]
        if (imageEntry) {
          return [match[1], `/aliya/aliya2_demo/images/${imageMapping[match[1]].imageFilename}`]
        } else {
          return [match[1], '']
        }
      } else {
        return null
      }
    } else if (text.includes('$emoji')) {
      const imageMapping = externalConfigData.value!.mediaMessageConfig.emojis
      const match = text.match(/\$emoji\{(.*)\}/im)
      if (match) {
        const emojiEntry = imageMapping[match[1]]
        if (emojiEntry) {
          return [match[1], `/aliya/aliya2_demo/images/${imageMapping[match[1]].imageFilename}`]
        } else {
          return [match[1], '']
        }
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (e) {
    console.log(contentSplitted.value)
    console.log(e)
    return null
  }
})

const msgReadTime = computed(() => {
  if (isNull(imageUrlForSendingOut.value))
    return Aliya2Demo_Utils.getTextReadWaitTime(contentSplitted.value[1])
  else return 0.6
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
        <Icon class="custom-node-icon"><ReplyFilled /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.PlayerChoice.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          <u
            v-tooltip.top="
              $t('comp.flowchart.aliya2_demo.node.PlayerChoice.contentSplitted.title.tooltip')
            "
            >{{ $t('comp.flowchart.aliya2_demo.node.PlayerChoice.contentSplitted.title') }}</u
          >:
          <span v-html="contentSplitted[1]"></span>
        </p>
        <p v-if="isNull(imageUrlForSendingOut)">
          {{ $t('comp.flowchart.aliya2_demo.node.PlayerChoice.replyContent.title') }}:
          {{ contentSplitted[0] }}
        </p>
        <div v-else>
          <p>
            {{ $t('comp.flowchart.aliya2_demo.node.PlayerChoice.replyImageId.title') }}:
            <code>{{ imageUrlForSendingOut[0] }}</code>
          </p>
          <img
            :src="imageUrlForSendingOut[1]"
            width="100%"
            style="margin-top: 2px; margin-bottom: 8px"
          />
        </div>
        <p>
          <u
            v-tooltip.top="
              $t('comp.flowchart.aliya2_demo.node.PlayerChoice.msgReadTime.title.tooltip')
            "
            >{{ $t('comp.flowchart.aliya2_demo.node.PlayerChoice.msgReadTime.title') }}</u
          >: {{ msgReadTime.toFixed(2) }}s
        </p>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" :node-id="props.id" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
