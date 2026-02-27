<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { PhotoRound } from '@vicons/material'

import { type VFOutNode_MikoPhoto } from '../types/script2'
import { symbolL10nDataSingleLang_Ycytx5 } from '@/constants/injection'
import { computed, inject } from 'vue'

const l10n = inject(symbolL10nDataSingleLang_Ycytx5)!

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<VFOutNode_MikoPhoto['data']>>()

const realPhotoPath = computed(() => {
  const temp = props.data.photoId.replace(/-/, '_')
  return `/aliya/ycytx_5/images/miko/${temp.toLowerCase()}_h.jpg`
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
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><PhotoRound /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.ycytx_5.node.MikoPhoto.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.ycytx_5.node.MikoPhoto.p.photoId') }}:
          <code>{{ props.data.photoId }}</code>
        </p>
        <p>{{ $t('comp.flowchart.ycytx_5.node.MikoPhoto.img.photoId') }}:</p>
        <img :src="realPhotoPath" width="100%" class="mt-1 mb-1" />
        <p v-if="props.data.logText">
          {{ $t('comp.flowchart.ycytx_5.node.MikoPhoto.p.logText') }}:
          {{ l10n.story[props.data.logText] }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
