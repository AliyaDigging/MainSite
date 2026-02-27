<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { PostAddRound } from '@vicons/material'

import { type VFOutNode_SystemTimeline } from '../types/script2'
import { computed, inject } from 'vue'
import { symbolL10nDataSingleLang_Ycytx5 } from '@/constants/injection'

const l10n = inject(symbolL10nDataSingleLang_Ycytx5)!

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<VFOutNode_SystemTimeline['data']>>()

const realPhotoPath = computed(() => {
  const temp = props.data.photoId.replace(/-/, '_')
  return `/aliya/ycytx_5/images/${temp.toLowerCase()}_h.jpg`
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
    <p>
      text: <code>{{ props.data.text }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><PostAddRound /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.ycytx_5.node.SystemTimeline.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.SystemTimeline.p.photoId') }}:
          <code>{{ props.data.photoId }}</code>
        </p>
        <p>{{ $t('comp.flowchart.ycytx_5.node.SystemTimeline.img.photoId') }}:</p>
        <img :src="realPhotoPath" class="mt-1 mb-1" />
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.SystemTimeline.p.text') }}:
          {{ l10n.story[props.data.text].split('&').slice(-1)[0] }}
        </p>
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.SystemTimeline.p.delayTime') }}:
          {{ props.data.delayTime }}ms
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
