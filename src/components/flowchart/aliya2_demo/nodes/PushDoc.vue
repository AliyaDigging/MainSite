<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'

import { type FlowchartNode_PushDoc } from '../types/script3'
import { inject, ref } from 'vue'
import { Button, Dialog } from 'primevue'
import { DocumentText20Regular, DocumentAdd20Regular } from '@vicons/fluent'
import { symbolL10nDataSingleLang_Aliya2Demo } from '@/constants/injection'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_PushDoc['data']>>()

const l10nFile = inject(symbolL10nDataSingleLang_Aliya2Demo)!

const dialogVisible = ref(false)
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>articyId: {{ props.data.articyInternal.articyId }}</p>
    <p>dialogueId: {{ props.data.articyInternal.dialogueId }}</p>
    <p>title: {{ props.data.articyInternal.title }}</p>
    <p>dialogueText: {{ props.data.articyInternal.dialogueText }}</p>
    <p>menuText: {{ props.data.articyInternal.menuText }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><DocumentAdd20Regular /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.PushDoc.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.PushDoc.documentId.title') }}
          <code>{{ props.data.documentId }}</code>
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.PushDoc.docTitle.title') }}:{{
            l10nFile.documents.title[props.data.documentId]
          }}
        </p>
        <div style="margin-top: 6px">
          <Button severity="primary" @click="dialogVisible = true"
            ><Icon style="font-size: 1.5em"><DocumentText20Regular /></Icon
            >{{ $t('comp.flowchart.aliya2_demo.node.PushDoc.viewDetail.title') }}</Button
          >
        </div>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />

        <Dialog
          v-model:visible="dialogVisible"
          modal
          :header="$t('comp.flowchart.aliya2_demo.node.PushDoc.dialog.title')"
          :style="{ 'max-width': '90%' }"
          :draggable="false"
          :closable="true"
          :dismissableMask="true"
        >
          <div class="dialog-div">
            <h2>{{ $t('comp.flowchart.aliya2_demo.node.PushDoc.docTitle.title') }}</h2>
            <p>{{ l10nFile.documents.title[props.data.documentId] }}</p>
            <h2>{{ $t('comp.flowchart.aliya2_demo.node.PushDoc.docContent.title') }}</h2>
            <p
              v-html="l10nFile.documents.content[props.data.documentId].replace('\n', '<br />')"
            ></p>
          </div>
        </Dialog>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.dialog-div h2 {
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 8px;
}

.dialog-div p {
  margin-bottom: 16px;
}
</style>
