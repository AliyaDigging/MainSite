<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { type FlowchartNode_AmbientMessage } from '../types/script3'
import { computed, inject } from 'vue'
import {
  symbolActorData_Aliya2Demo,
  symbolExternalConfig_Aliya2Demo,
  symbolL10nDataSingleLang_Aliya2Demo,
} from '@/constants/injection'
import { useAliyaStore } from '@/stores/aliya'
import { Aliya2Demo_Utils } from '@/utils/aliya'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'
import { useSiteSettingStore } from '@/stores/setting.ts'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_AmbientMessage['data']>>()

const l10nFile = inject(symbolL10nDataSingleLang_Aliya2Demo)!
const actorData = inject(symbolActorData_Aliya2Demo)!
const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!
const aliyaSetting = useAliyaStore()
const setting = useSiteSettingStore()

const actualContent = computed(() =>
  Aliya2Demo_Utils.replaceText(
    String(l10nFile.value.dialogues[`${props.data.articyInternal.dialogueId}`]),
    { '$v{name}': aliyaSetting.playerName },
    setting.sitelang,
  ),
)
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

  const currAvatar = externalActorsData[speakerName.value[1]].avatarFilename
  if (currAvatar) {
    return `/aliya/aliya2_demo/images/avatar/${currAvatar}`
  } else {
    return `/aliya/aliya2_demo/images/avatar/default.png`
  }
})
const ambientTypeRGB = computed(() => {
  const ambientCatalog = externalConfigData.value!.ambientMessage
  const currStyle = ambientCatalog[String(props.data.ambientType)]
  if (!currStyle) return ['0', '0', '0', '1']
  else
    return (['r', 'g', 'b', 'a'] as const)
      .map((key) => {
        const temp = Number(currStyle.color[key])
        if (isNaN(temp)) return 0
        else {
          if (key === 'a') return 1 - temp
          else return Math.round(temp * 255)
        }
      })
      .map(String)
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
        <span class="custom-node-title">
          <img class="custom-node-msg-avatar" :src="speakerAvatar" />
          <u v-tooltip.top="$t('comp.flowchart.aliya2_demo.node.AmbientMessage.title.tooltip')">{{
            $t('comp.flowchart.aliya2_demo.node.AmbientMessage.title')
          }}</u></span
        >
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.AmbientMessage.speakerName.title') }}:
          <span style="font-size: 1.2em">{{ speakerName[0] }}</span>
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.AmbientMessage.sendWaitTime.title') }}:
          {{ sendWaitTime }}s
        </p>
        <p style="margin: 4px 0">
          <u
            v-tooltip.top="
              $t('comp.flowchart.aliya2_demo.node.AmbientMessage.actualContent.title.tooltip')
            "
            >{{ $t('comp.flowchart.aliya2_demo.node.AmbientMessage.actualContent.title') }}</u
          >:
          <span
            :style="{
              display: 'inline-block',
              'background-color': 'white',
              padding: '4px',
              color: `rgba(${ambientTypeRGB.join(',')})`,
            }"
            v-tooltip.top="`color: rgba(${ambientTypeRGB.join(', ')})`"
            v-html="actualContent"
          ></span>
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.AmbientMessage.autoSendTime.title') }}:
          {{ $t(`comp.flowchart.aliya2_demo.flow.boolean.${props.data.autoSendTime}`) }}
        </p>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" :node-id="props.id" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
