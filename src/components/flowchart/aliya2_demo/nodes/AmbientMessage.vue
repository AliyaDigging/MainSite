<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { type FlowchartNode_AmbientMessage } from '../types/script3'
import { computed, inject } from 'vue'
import {
  symbolActorData_Aliya2Demo,
  symbolExternalConfig_Aliya2Demo,
  symbolFlowchartMetadata_Aliya2Demo,
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
  String(l10nFile.value.dialogues[`${props.data.articyInternal.dialogueId}`]).replace(
    /\$v\{name\}/gi,
    aliyaSetting.playerName,
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
            $t('comp.flowchart.aliya2_demo.node.AmbientMessage.title')
          }}</span
        >
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.AmbientMessage.speakerName.title') }}
          <span style="font-size: 1.2em">{{ speakerName[0] }}</span>
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.AmbientMessage.sendWaitTime.title') }}
          {{ sendWaitTime }}s
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.AmbientMessage.actualContent.title') }}
          {{ actualContent }}
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.AmbientMessage.autoSendTime.title') }}
          {{ $t(`comp.flowchart.aliya2_demo.flow.boolean.${props.data.autoSendTime}`) }}
        </p>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
