<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { Message } from '@vicons/tabler'

import { type VFOutNode_MikoText } from '../types/script2'
import { computed, inject } from 'vue'
import {
  symbolL10nDataSingleLang_Ycytx5,
  symbolL10nDataSingleLangDict_Ycytx5,
} from '@/constants/injection'
import { createComponentWithLinks } from './utils'

const l10n = inject(symbolL10nDataSingleLang_Ycytx5)!
const dictData = inject(symbolL10nDataSingleLangDict_Ycytx5)!

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<VFOutNode_MikoText['data']>>()

const storyTextComp = computed(() => {
  return createComponentWithLinks(l10n.value.story[props.data.text], dictData.value)
})

const requirementPrice = computed(() => {
  if (!props.data.requirement) {
    return -1
  }

  const temp = /price=(\d*)/g.exec(props.data.requirement!)
  if (!temp) {
    return -1
  } else {
    return Number(temp[1])
  }
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
    <p v-if="props.data.dictId">
      dictId: <code>{{ props.data.dictId }}</code>
    </p>
    <p v-if="props.data.requirement">
      requirement: <code>{{ props.data.requirement }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><Message /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.ycytx_5.node.MikoText.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.MikoText.p.text') }}: <Component :is="storyTextComp" />
        </p>
        <p v-if="props.data.logText">
          {{ $t('comp.flowchart.ycytx_5.node.MikoText.p.logText') }}:
          {{ l10n.story[props.data.logText] }}
        </p>
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.MikoText.p.delayTime') }}: {{ props.data.delayTime }}ms
        </p>
        <template v-if="requirementPrice != -1">
          <br />
          <p>
            <b>{{ $t('comp.flowchart.ycytx_5.node.MikoText.p.pay_checkpoint') }}</b>
          </p>
          <p>
            {{ $t('comp.flowchart.ycytx_5.node.MikoText.p.requirement.price') }}: RMB&nbsp;{{
              requirementPrice
            }}
          </p>
        </template>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
