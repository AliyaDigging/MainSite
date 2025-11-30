<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { GitBranchOutline } from '@vicons/ionicons5'

import { type FlowchartDataNode_If } from '../types/script5_vueflow_prod'
import { useI18n } from 'vue-i18n'
import { computed, inject } from 'vue'
import { symbolFlowchartMetadata } from '@/constants/injection'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_If['data']>>()

const i18n = useI18n()
const metadata = inject(symbolFlowchartMetadata)!

const conditions = computed(() => {
  const conditions = props.data.conditions
  const result = new Array<{
    operator: number
    varName: string
    varId: string
    dataType: string
    dataValue: unknown
  }>()

  conditions.forEach((value) => {
    const operator = value.compareOperator
    const varName = metadata.value.variableNames[value.anyVar.variable].key
    const varId = value.anyVar.variable
    const dataType = metadata.value.variableNames[value.anyVar.variable].type
    const dataValue =
      dataType === 'string'
        ? value.anyVar.data.stringData.stringVal
        : value.anyVar.data.integerData.integerVal

    result.push({
      operator,
      varName,
      varId,
      dataType,
      dataValue,
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
        <Icon class="custom-node-icon"><GitBranchOutline /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.If.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          <span
            class="custom-node-tooltip"
            v-tooltip.top="i18n.t('comp.flowchart.node.If.p.anyorallcondition.desc')"
            >{{ $t('comp.flowchart.node.If.p.anyorallcondition') }}</span
          >:&nbsp;{{
            $t(`comp.flowchart.node.If.p.anyorallcondition.type.${props.data.anyOrAllConditions}`)
          }}
        </p>
        <p>{{ $t('comp.flowchart.node.If.p.conditions') }}:</p>
        <ul class="custom-node-normal-ul">
          <li v-for="(item, n) of conditions" :key="n">
            <span class="custom-node-tooltip" v-tooltip.top="`${item.varId}`">{{
              item.varName
            }}</span
            >&nbsp;({{ $t(`comp.flowchart.variable.type.${item.dataType}`) }})&nbsp;{{
              $t(`comp.flowchart.node.If.p.compareoperator.type.${item.operator}`)
            }}&nbsp;<code>{{ item.dataValue }}</code>
          </li>
        </ul>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
