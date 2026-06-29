<script setup lang="ts">
import { useFlowchartManager } from '@/composables/useFlowchartManager'
import { symbolFlowchartVarUsage_Aliya2Demo } from '@/constants/injection'
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
import type { VariableUsage_PerVariable_UsageEntry } from '../types/script8'
import { Icon } from '@vicons/utils'
import { InsertDriveFileOutlined, ViewInArFilled } from '@vicons/material'
import { isNull } from 'lodash'
import { useI18n } from 'vue-i18n'

const op = useTemplateRef('op')
const windowsize = useWindowSize()
const i18n = useI18n()

const popoverWidth = computed(() => `${Math.min(1200, windowsize.width.value * 0.8)}px`)
const varUsageData = inject(symbolFlowchartVarUsage_Aliya2Demo)!

// 变量相关ref
const currVarName = ref('')
const currUsageData = computed(() => {
  if (currVarName.value === '') {
    return {
      name: 'null',
      initialValue: null,
      type: 'string',
      usages: {} as Record<string, VariableUsage_PerVariable_UsageEntry[]>,
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
function jumpToNode(nodeId: string) {
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
      node: nodeId,
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
      >&ensp;<Tag severity="secondary">{{ currUsageData.initialValue }}</Tag
      >&ensp;<Tag severity="warn">{{
        $t(`comp.flowchart.aliya2_demo.variable.type.${currUsageData.type}`)
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
              <Column :header="i18n.t('comp.flowchart.aliya2_demo.var_usage.table.column.1')">
                <template #body="slotProps">
                  <Tag severity="success">{{
                    $t(`comp.flowchart.aliya2_demo.var_usage.type.${slotProps.data.type}`)
                  }}</Tag
                  >&ensp;<Tag severity="info">{{
                    $t(`comp.flowchart.aliya2_demo.node.${slotProps.data.nodeType}.title`)
                  }}</Tag
                  >&ensp;<Tag severity="secondary">{{ slotProps.data.nodeId }}</Tag>
                </template>
              </Column>
              <Column :header="i18n.t('comp.flowchart.aliya2_demo.var_usage.table.column.2')">
                <template #body="slotProps">
                  <!-- READ with compareOp: condition check display -->
                  <div v-if="slotProps.data.type === 'read' && slotProps.data.compareOp">
                    <span>{{ currUsageData.name }}</span
                    >&nbsp;{{
                      $t(
                        `comp.flowchart.aliya2_demo.flow.compareop.${slotProps.data.compareOp}`,
                      )
                    }}&nbsp;<code>{{
                      typeof slotProps.data.value === 'boolean'
                        ? $t(
                            `comp.flowchart.aliya2_demo.flow.boolean.${slotProps.data.value}`,
                          )
                        : typeof slotProps.data.value === 'object' &&
                            slotProps.data.value !== null
                          ? slotProps.data.value.variableName
                          : slotProps.data.value
                    }}</code>
                  </div>
                  <!-- WRITE: assignment display -->
                  <div v-else-if="slotProps.data.type === 'write'">
                    <span>{{ currUsageData.name }}</span
                    >&nbsp;=&nbsp;<code>{{
                      typeof slotProps.data.value === 'boolean'
                        ? $t(
                            `comp.flowchart.aliya2_demo.flow.boolean.${slotProps.data.value}`,
                          )
                        : typeof slotProps.data.value === 'object' &&
                            slotProps.data.value !== null
                          ? slotProps.data.value.variableName
                          : slotProps.data.value
                    }}</code>
                  </div>
                  <!-- READ without compareOp: simple read display -->
                  <div v-else-if="slotProps.data.type === 'read'">
                    <span>{{ currUsageData.name }}</span
                    >&nbsp;>=&nbsp;<code>{{
                      typeof slotProps.data.value === 'boolean'
                        ? $t(
                            `comp.flowchart.aliya2_demo.flow.boolean.${slotProps.data.value}`,
                          )
                        : typeof slotProps.data.value === 'object' &&
                            slotProps.data.value !== null
                          ? slotProps.data.value.variableName
                          : slotProps.data.value
                    }}</code>
                  </div>
                </template>
              </Column>
              <Column :header="i18n.t('comp.flowchart.aliya2_demo.var_usage.table.column.3')">
                <template #body="slotProps">
                  <PvButton @click="(e) => jumpToNode(slotProps.data.nodeId)">
                    <Icon size="22"><ViewInArFilled /></Icon
                    >{{ $t('comp.flowchart.aliya2_demo.var_usage.table.column.3.p.1') }}
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
