<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Message } from '@vicons/tabler'
import PvBadge from 'primevue/badge'

import { type FlowchartDataNode_AliyaMessage } from '../types/script5_vueflow_prod'
import { computed, inject } from 'vue'
import { symbolFlowchartMetadata, symbolL10nDataSingleLang } from '@/constants/injection'
import { useI18n } from 'vue-i18n'
import { useSiteSettingStore } from '@/stores/setting'
import { batchReplaceString, caluateMessageTypingTime } from '@/utils/aliya'
import { useAliyaStore } from '@/stores/aliya'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_AliyaMessage['data']>>()
const i18n = useI18n()
const setting = useSiteSettingStore()
const aliyaSetting = useAliyaStore()

const l10n = inject(symbolL10nDataSingleLang)!
const metadata = inject(symbolFlowchartMetadata)!

const messageTextList = computed(() => {
  const text = l10n.value[`AliyaMessage.${metadata.value.currName}.${props.data.itemId}.`]
  const textList = text.split('\\n')

  const result = new Array<{ text: string; time: number; calcString: string }>()
  textList.forEach((value) => {
    let text = value
    if (aliyaSetting.showFormattedString) {
      text = batchReplaceString(text, aliyaSetting.getTableForReplace())
    }

    result.push({
      text: text,
      ...caluateMessageTypingTime(text, setting.l10nlang),
    })
  })

  return result
})
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId:&nbsp;{{ props.data.fileId }}</p>
    <p>ItemId:&nbsp;{{ props.data.itemId }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><Message /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.AliyaMessage.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          <span
            class="custom-node-tooltip"
            v-tooltip.top="i18n.t('comp.flowchart.node.AliyaMessage.p.autowaittime.desc')"
            >{{ $t('comp.flowchart.node.AliyaMessage.p.autowaittime') }}</span
          >:&nbsp;{{ $t(`constant.boolean.human.${props.data.autoWaitTime}`) }}
        </p>
        <p v-if="!props.data.autoWaitTime">
          <span
            class="custom-node-tooltip"
            v-tooltip.top="i18n.t('comp.flowchart.node.AliyaMessage.p.waitsecond.desc')"
            >{{ $t('comp.flowchart.node.AliyaMessage.p.waitsecond') }}</span
          >:&nbsp;{{ props.data.waitSeconds }}s
        </p>
        <div v-if="!props.data.imageId">
          <p>{{ $t('comp.flowchart.node.AliyaMessage.p.messageText') }}:</p>
          <ul v-if="messageTextList[0].text !== ''" class="custom-node-long-content">
            <li v-for="(entry, n) of messageTextList" :key="n">
              <span>{{ entry.text }}</span
              >&nbsp;<PvBadge severity="secondary" size="small" v-if="props.data.autoWaitTime"
                ><span v-tooltip.top="entry.calcString" class="custom-node-tooltip"
                  >{{ entry.time.toFixed(3) }}s</span
                ></PvBadge
              >
            </li>
          </ul>
        </div>
        <div v-if="props.data.imageId">
          <p>
            {{ $t('comp.flowchart.node.AliyaMessage.p.imageid') }}:&nbsp;<code>{{
              props.data.imageId
            }}</code>
          </p>
          <img
            v-if="props.data.imageId && props.data.imageId !== ''"
            :src="`/aliya/images/${props.data.imageId}.png`"
            width="100%"
          />
        </div>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
:deep(.p-badge) {
  font-size: 11px;

  @media screen and (max-width: 960px) {
    font-size: 9px;
  }
  @media screen and (max-width: 794px) {
    font-size: 9px;
  }
  @media screen and (max-width: 370px) {
    font-size: 9px;
  }
}
</style>
