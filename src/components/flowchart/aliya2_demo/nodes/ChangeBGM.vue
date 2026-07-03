<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { MusicalNotesOutline } from '@vicons/ionicons5'

import { type FlowchartNode_ChangeBGM } from '../types/script3'
import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import { computed, inject } from 'vue'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_ChangeBGM['data']>>()

const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)!

const currBgm = computed(() => {
  const data = externalConfigData.value!.audioConfig
  return data[props.data.bgmId]
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
        <Icon class="custom-node-icon"><MusicalNotesOutline /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.ChangeBGM.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.ChangeBGM.bgmId.title') }}:
          <code>{{ props.data.bgmId }}</code>
        </p>
        <audio
          class="mt-1 mb-1"
          :src="`/aliya/aliya2_demo/audio/${currBgm?.clipFilename}`"
          controls
          style="width: 100%"
        />
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" :node-id="props.id" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
