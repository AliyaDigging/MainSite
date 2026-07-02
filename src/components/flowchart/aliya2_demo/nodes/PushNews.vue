<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'

import { type FlowchartNode_PushNews } from '../types/script3'
import { inject, ref } from 'vue'
import { Button, Dialog } from 'primevue'
import { News24Regular } from '@vicons/fluent'
import { symbolL10nDataSingleLang_Aliya2Demo } from '@/constants/injection'
import General_CustomScriptAndCondition from './General_CustomScriptAndCondition.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartNode_PushNews['data']>>()

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
        <Icon class="custom-node-icon"><News24Regular /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.aliya2_demo.node.PushNews.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.PushNews.newsId.title') }}
          <code>{{ props.data.newsId }}</code>
        </p>
        <p>
          {{ $t('comp.flowchart.aliya2_demo.node.PushNews.newsTitle.title') }}:
          {{ l10nFile.news.title[props.data.newsId] }}
        </p>
        <div style="margin-top: 6px">
          <Button severity="primary" @click="dialogVisible = true"
            ><Icon style="font-size: 1.3em"><News24Regular /></Icon
            >{{ $t('comp.flowchart.aliya2_demo.node.PushNews.viewDetail.title') }}</Button
          >
        </div>
        <General_CustomScriptAndCondition :variable-ops="props.data.variableOps" />

        <Dialog
          v-model:visible="dialogVisible"
          modal
          :header="$t('comp.flowchart.aliya2_demo.node.PushNews.dialog.title')"
          :style="{ 'max-width': '90%' }"
          :draggable="false"
          :closable="true"
          :dismissableMask="true"
        >
          <div class="dialog-div">
            <h2>
              {{ $t('comp.flowchart.aliya2_demo.node.PushNews.newsTitle.title') }}
            </h2>
            <p>{{ l10nFile.news.title[props.data.newsId] }}</p>
            <h2>
              {{ $t('comp.flowchart.aliya2_demo.node.PushNews.newsContent.title') }}
            </h2>
            <p v-html="l10nFile.news.content[props.data.newsId].replace('\n', '<br />')"></p>
          </div>
        </Dialog>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.dialog-div h2 {
  font-weight: 600;
  font-size: 1.5em;
  margin-bottom: 8px;
}

.dialog-div p {
  margin-bottom: 16px;
}
</style>
