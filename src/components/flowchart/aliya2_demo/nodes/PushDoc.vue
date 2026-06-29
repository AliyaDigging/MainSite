<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'

import { type FlowchartNode_PushDoc } from '../types/script3'
import { inject, ref } from 'vue'
import { Button } from 'primevue'
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
          文档ID: <code>{{ props.data.documentId }}</code>
        </p>
        <Button size="big" severity="primary"
          ><Icon style="font-size: 1.5em"><DocumentText20Regular /></Icon>查看文档详情</Button
        >
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />

        <Dialog
          v-model:visible="dialogVisible"
          modal
          header="新闻内容"
          :style="{ 'max-width': '90%' }"
        >
          <h2>文档标题</h2>
          <p>{{ l10nFile.documents.title[props.data.documentId] }}</p>
          <h2>文档内容</h2>
          <p v-html="l10nFile.documents.content[props.data.documentId].replace('\n', '<br />')"></p>
        </Dialog>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
