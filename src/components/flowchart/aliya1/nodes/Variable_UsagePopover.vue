<script setup lang="ts">
import { useFlowchartManager } from '@/composables/useFlowchartManager'
import { symbolFlowchartVarUsage_Aliya1 } from '@/constants/injection'
import { flowchartBus } from '@/utils/flowchartEvents'
import { useWindowSize } from '@vueuse/core'
import {
  Popover,
  Splitter,
  SplitterPanel,
  Listbox,
  Tag,
  DataTable,
  Column,
  Button as PvButton,
} from 'primevue'
import { computed, inject, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import type { VariableUsageEntry_Aliya1 } from '../types/script9'
import { Icon } from '@vicons/utils'
import { InsertDriveFileOutlined, ViewInArFilled } from '@vicons/material'
import { isNull } from 'lodash'
import { useI18n } from 'vue-i18n'

const op = useTemplateRef('op')
const windowsize = useWindowSize()
const i18n = useI18n()

const popoverWidth = computed(() => `${Math.min(1200, windowsize.width.value * 0.8)}px`)
const varUsageData = inject(symbolFlowchartVarUsage_Aliya1)!

// 变量相关ref
const currVarName = ref('')
const currUsageData = computed(() => {
  if (currVarName.value === '') {
    return {
      name: 'null',
      fileId: '-1',
      type: 'string',
      usages: {} as Record<string, VariableUsageEntry_Aliya1[]>,
    }
  } else {
    return varUsageData.value[currVarName.value]
  }
})
// 流程图信息相关ref
const flowchartManager = useFlowchartManager()
const currFlowchartName = ref<string | null>('')
// 其他该组件需要的ref
const currOriginNodeId = ref('')

// 跳转
function jumpToNode(blockId: string) {
  const activeFlowchart = flowchartManager.getActiveFlowchart()!
  op.value!.hide()

  flowchartBus.emit('node-card:show', {
    gameInfo: {
      gameId: activeFlowchart.gameId,
      versionId: activeFlowchart.versionId,
      // @ts-expect-error: Impossible to trigger this unless the button is shown when a flowchart is selected and data is loaded
      flowchartName: currFlowchartName.value,
    },
    origin: {
      node: currOriginNodeId.value,
      flowchart: activeFlowchart.flowchartName,
    },
    target: {
      node: blockId,
      flowchart: currFlowchartName.value!,
    },
  })
}

onMounted(() => {
  flowchartBus.on('node-popover:toggle', (event) => {
    currVarName.value = event.varName
    currFlowchartName.value = flowchartManager.getActiveFlowchart()?.flowchartName ?? null
    currOriginNodeId.value = event.originTriggerNodeId

    op.value!.toggle(event.browserEvent)
  })
})

onBeforeUnmount(() => {
  flowchartBus.off('node-popover:toggle')
})
</script>

<template>
  <Popover ref="op">
    <p style="margin-bottom: 8px; text-align: center">
      <b>{{ currUsageData.name }}</b
      >&ensp;<Tag severity="secondary">{{ currUsageData.fileId }}</Tag
      >&ensp;<Tag severity="warn">{{
        $t(`comp.flowchart.variable.type.${currUsageData.type}`)
      }}</Tag>
    </p>
    <div class="flex flex-col gap-4" :style="{ width: popoverWidth }">
      <div>
        <Splitter style="height: 400px">
          <SplitterPanel :size="20" :min-size="10" style="overflow-y: auto">
            <Listbox
              v-model="currFlowchartName"
              :options="Object.keys(currUsageData.usages)"
              style="width: 100%; height: 100%"
              :pt="{
                root: { style: { borderRadius: 0 } },
                listContainer: { style: { maxHeight: 'none' } },
              }"
              ><template #option="{ option }">
                <span class="file-tree-item-icon" style="margin-right: 4px"
                  ><Icon><InsertDriveFileOutlined /></Icon
                ></span>
                <span class="file-tree-item-name">{{ option }}</span>
              </template></Listbox
            >
          </SplitterPanel>
          <SplitterPanel :size="80" :min-size="60" style="overflow-y: auto">
            <DataTable
              :value="
                !isNull(currFlowchartName) ? (currUsageData.usages[currFlowchartName] ?? []) : []
              "
            >
              <Column :header="i18n.t('comp.flowchart.var_usage.table.column.1')">
                <template #body="slotProps">
                  <Tag severity="success">{{
                    $t(`comp.flowchart.var_usage.type.${slotProps.data.type}`)
                  }}</Tag
                  >&ensp;<Tag severity="info">{{
                    $t(`comp.flowchart.node.${slotProps.data.blockType}.title`)
                  }}</Tag
                  >&ensp;<Tag severity="secondary">{{ slotProps.data.blockId }}</Tag>
                </template>
              </Column>
              <Column :header="i18n.t('comp.flowchart.var_usage.table.column.2')">
                <template #body="slotProps">
                  <div v-if="slotProps.data.ifCondition">
                    <span>{{ currUsageData.name }}</span
                    >&nbsp;{{
                      $t(
                        `comp.flowchart.node.If.p.compareoperator.type.${slotProps.data.ifCondition.operator}`,
                      )
                    }}&nbsp;<code>{{ slotProps.data.ifCondition.valueAgainst }}</code>
                  </div>
                  <div
                    v-else-if="
                      !isNull(slotProps.data.valueAssigned) &&
                      slotProps.data.valueAssigned !== undefined
                    "
                  >
                    <span>{{ currUsageData.name }}</span
                    >&nbsp;=&nbsp;<code>{{ slotProps.data.valueAssigned }}</code>
                  </div>
                </template>
              </Column>
              <Column :header="i18n.t('comp.flowchart.var_usage.table.column.3')">
                <template #body="slotProps">
                  <PvButton @click="(e) => jumpToNode(slotProps.data.blockId)">
                    <Icon size="22"><ViewInArFilled /></Icon
                    >{{ $t('comp.flowchart.var_usage.table.column.3.p.1') }}
                  </PvButton></template
                >
              </Column>
            </DataTable>
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  </Popover>
</template>
