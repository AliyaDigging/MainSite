<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ReplyFilled } from '@vicons/material'

import { type VFOutNode_ChoiceText } from '../types/script2'
import {
  symbolL10nDataSingleLang_Ycytx5,
  symbolL10nDataSingleLangDict_Ycytx5,
} from '@/constants/injection'
import { computed, inject } from 'vue'
import { createComponentWithLinks } from './utils'

const l10n = inject(symbolL10nDataSingleLang_Ycytx5)!
const dictData = inject(symbolL10nDataSingleLangDict_Ycytx5)!

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<VFOutNode_ChoiceText['data']>>()

const storyTextComp = computed(() => {
  return createComponentWithLinks(l10n.value.story[props.data.text], dictData.value)
})
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>
      day: <code>{{ props.data.day }}</code>
    </p>
    <p>
      id: <code>{{ props.data.id }}</code>
    </p>
    <p>
      nextId: <code>{{ props.data.nextId }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ReplyFilled /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.ycytx_5.node.ChoiceText.title')
        }}</span>
        <div class="custom-node-content">
          <p>
            {{ $t('comp.flowchart.ycytx_5.node.ChoiceText.p.text') }}:
            <Component :is="storyTextComp" />
          </p>
          <p>
            {{ $t('comp.flowchart.ycytx_5.node.ChoiceText.p.delayTime') }}:
            {{ props.data.delayTime }}ms
          </p>
          <p>
            {{ $t('comp.flowchart.ycytx_5.node.ChoiceText.p.choicePos') }}:
            <code>{{ props.data.choicePos }}</code>
          </p>
        </div>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
