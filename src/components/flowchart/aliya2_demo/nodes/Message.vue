<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { type FlowchartNode_Message } from '../types/script3'
import {
  symbolL10nDataSingleLang_Aliya2Demo,
  symbolActorData_Aliya2Demo,
  symbolExternalConfig_Aliya2Demo,
} from '@/constants/injection'
import { useAliyaStore } from '@/stores/aliya'
import { Aliya2Demo_Utils } from '@/utils/aliya'
import { inject, computed } from 'vue'
import { useSiteSettingStore } from '@/stores/setting'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_Message['data']>>()

const l10nFile = inject(symbolL10nDataSingleLang_Aliya2Demo)!
const actorData = inject(symbolActorData_Aliya2Demo)!
const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!
const aliyaSetting = useAliyaStore()
const setting = useSiteSettingStore()

const actualContent = computed(() => {
  return Aliya2Demo_Utils.replaceText(
    String(l10nFile.value.dialogues[`${props.data.articyInternal.dialogueId}`]),
    { '$v{name}': aliyaSetting.playerName },
    setting.sitelang,
  )
})
const isImageMessage = computed(() => {
  const text = actualContent.value
  if (text.includes('$image') || text.includes('$emoji')) {
    return true
  } else {
    return false
  }
})
const imageInfo = computed(() => {
  try {
    if (isImageMessage.value) {
      if (actualContent.value.includes('$image')) {
        const imageMapping = externalConfigData.value!.mediaMessageConfig.images

        const regex = /\$image\{(.*)\}/i
        const match = actualContent.value.match(regex)
        if (match && match[1]) {
          const imageEntry = imageMapping[match[1]]
          if (imageEntry) {
            return [match[1], `/aliya/aliya2_demo/images/${imageEntry.imageFilename}`]
          } else {
            return [match[1], '']
          }
        } else {
          return ['', '']
        }
      } else if (actualContent.value.includes('$emoji')) {
        const emojiMapping = externalConfigData.value!.mediaMessageConfig.emojis

        const regex = /\$emoji\{(.*)\}/i
        const match = actualContent.value.match(regex)
        if (match && match[1]) {
          const emojiEntry = emojiMapping[match[1]]
          if (emojiEntry) {
            return [match[1], `/aliya/aliya2_demo/images/${emojiMapping[match[1]].imageFilename}`]
          } else {
            return [match[1], '']
          }
        } else {
          return ['', '']
        }
      } else {
        return ['', '']
      }
    } else {
      return ['', '']
    }
  } catch (e) {
    console.log(actualContent.value)
    console.log(e)
    return ['', '']
  }
})

const sendWaitTime = computed(() => {
  if (props.data.autoSendTime) {
    return Aliya2Demo_Utils.getTextSendWaitTime(actualContent.value).toFixed(2)
  } else {
    const temp = props.data.sendTime
    return Number(temp.days * 86400 + temp.hours * 3600 + temp.minutes * 60 + temp.seconds)
  }
})
const speakerName = computed(() => {
  const currActorId = props.data.actorId
  const actors = actorData.value!

  switch (setting.l10nlang) {
    case 'en-us':
      return [actors[String(currActorId)].name['en-us'], actors[String(currActorId)].name['zh-cn']]
    default:
      return [actors[String(currActorId)].name['zh-cn'], actors[String(currActorId)].name['zh-cn']]
  }
})
const speakerAvatar = computed(() => {
  const externalActorsData = externalConfigData.value!.chatConfig.actors

  const currAvatar = externalActorsData[speakerName.value[1]]
  if (currAvatar) {
    return `/aliya/aliya2_demo/images/avatar/${currAvatar.avatarFilename}`
  } else {
    return `/aliya/aliya2_demo/images/avatar/default.png`
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
    <p>
      userScript: <code>{{ props.data.userScript }}</code>
    </p>
    <p>
      conditionString: <code>{{ props.data.conditionString }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <span class="custom-node-title"
          ><img class="custom-node-msg-avatar" :src="speakerAvatar" />{{
            $t(
              isImageMessage
                ? 'comp.flowchart.aliya2_demo.node.Message.title.image'
                : 'comp.flowchart.aliya2_demo.node.Message.title',
            )
          }}</span
        >
      </div>
      <div class="custom-node-content">
        <p>
          <u
            v-tooltip.top="$t('comp.flowchart.aliya2_demo.node.Message.speakerName.title.tooltip')"
            >{{ $t('comp.flowchart.aliya2_demo.node.Message.speakerName.title') }}</u
          >:
          <span style="font-size: 1.2em">{{ speakerName[0] }}</span>
        </p>
        <p>
          <u
            v-tooltip.top="$t('comp.flowchart.aliya2_demo.node.Message.sendWaitTime.title.tooltip')"
            >{{ $t('comp.flowchart.aliya2_demo.node.Message.sendWaitTime.title') }}</u
          >: {{ sendWaitTime }}s
        </p>
        <p v-if="!isImageMessage">
          {{ $t('comp.flowchart.aliya2_demo.node.Message.actualContent.title') }}:
          <span v-html="actualContent"></span>
        </p>
        <template v-else>
          <p>
            {{ $t('comp.flowchart.aliya2_demo.node.Message.imageId.title') }}:
            <code>{{ imageInfo[0] }}</code>
          </p>
          <img :src="imageInfo[1]" width="100%" class="mt-1 mb-1" />
        </template>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.Message.autoSendTime.title') }}:
          {{ $t(`comp.flowchart.aliya2_demo.flow.boolean.${props.data.autoSendTime}`) }}
        </p>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
