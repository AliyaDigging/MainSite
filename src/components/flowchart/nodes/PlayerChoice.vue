<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ReplyFilled } from '@vicons/material'

import { fitInViewTargetBlock } from '@/utils/flowchart'

import { type FlowchartDataNode_PlayerChoice } from '../types/script5_vueflow_prod'
import { computed, inject } from 'vue'
import {
  symbolFlowchartMetadata,
  symbolL10nDataSingleLang,
  symbolUseVueFlow,
} from '@/constants/injection'
import { useI18n } from 'vue-i18n'
import { useAliyaStore } from '@/stores/aliya'
import { batchReplaceString } from '@/utils/aliya'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_PlayerChoice['data']>>()
const i18n = useI18n()
const aliyaSetting = useAliyaStore()

const vueflow = inject(symbolUseVueFlow)!
const l10n = inject(symbolL10nDataSingleLang)!
const metadata = inject(symbolFlowchartMetadata)!
const playerText = computed(() => {
  const text = l10n.value[`PlayerChoice.${metadata.value.currName}.${props.data.itemId}.`]
  let textList = text.split('|###|')
  textList = textList.map((value) => value.trim())

  if (aliyaSetting.showFormattedString) {
    textList = textList.map((value) => batchReplaceString(value, aliyaSetting.getTableForReplace()))
  }

  if (textList.length === 1) {
    return { choice: textList[0], sent: textList[0] }
  } else {
    return { choice: textList[0], sent: textList[1] }
  }
})
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>FileId:&nbsp;{{ props.data.fileId }}</p>
    <p>ItemId:&nbsp;{{ props.data.itemId }}</p>
    <p>
      additionalEvents:&nbsp;<code>{{ props.data.additionalEvents }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ReplyFilled /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.PlayerChoice.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          <span
            class="custom-node-tooltip"
            v-tooltip.top="i18n.t('comp.flowchart.node.PlayerChoice.p.text.desc')"
            >{{ $t('comp.flowchart.node.PlayerChoice.p.text') }}</span
          >:&nbsp;“{{ playerText.choice }}”
        </p>
        <p>
          {{ $t('comp.flowchart.node.PlayerChoice.p.custommsgtext') }}:&nbsp;“{{ playerText.sent }}”
        </p>
        <p v-if="props.data.customImgMsg">
          {{ $t('comp.flowchart.node.PlayerChoice.p.customimgmsg') }}:&nbsp;{{
            props.data.customImgMsg
          }}
        </p>
        <img
          v-if="props.data.customImgMsg"
          :src="`/aliya/images/${props.data.customImgMsg}.png`"
          width="100%"
          class="mt-1"
        />
        <p>
          {{ $t('comp.flowchart.node.PlayerChoice.p.targetblock') }}:&nbsp;<br /><a
            class="custom-node-a-clickable"
            @click="fitInViewTargetBlock(vueflow, props.data.targetBlock)"
            >{{ props.data.targetBlock }}</a
          >
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
