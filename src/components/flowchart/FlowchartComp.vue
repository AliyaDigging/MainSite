<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  type FlowchartDataEdge,
  type FlowchartData,
  type FlowchartDataNode,
} from './types/script5_vueflow_prod'
import { getJson } from '@/utils/fetch'
import PvProgressSpinner from 'primevue/progressspinner'

import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { useLayout } from './useLayout'

import ActivateEH from './nodes/ActivateEH.vue'
import ActivateEOG from './nodes/ActivateEOG.vue'
import ActivateRadio from './nodes/ActivateRadio.vue'
import BanEOGControl from './nodes/BanEOGControl.vue'
import BanEHControl from './nodes/BanEHControl.vue'
import BanRadioControl from './nodes/BanRadioControl.vue'
import SetEHValue from './nodes/SetEHValue.vue'
import SetRadioValue from './nodes/SetRadioValue.vue'
import If from './nodes/If.vue'
import Then from './nodes/Then.vue'
import Else from './nodes/Else.vue'
import EndIf from './nodes/EndIf.vue'
import AliyaMessage from './nodes/AliyaMessage.vue'
import PlayerChoice from './nodes/PlayerChoice.vue'
import InvisibleChoice from './nodes/InvisibleChoice.vue'
import DefaultChoice from './nodes/DefaultChoice.vue'
import GroupBlock from './nodes/GroupBlock.vue'
import CallBlock from './nodes/CallBlock.vue'
import CallFlowchart from './nodes/CallFlowchart.vue'
import WaitTime from './nodes/WaitTime.vue'
import WaitPreciseTime from './nodes/WaitPreciseTime.vue'
import SetVariable from './nodes/SetVariable.vue'
import DefineVariable from './nodes/DefineVariable.vue'
import PlayerInput from './nodes/PlayerInput.vue'
import ClampO2Res from './nodes/ClampO2Res.vue'
import ClampWaterRes from './nodes/ClampWaterRes.vue'
import FlowchartStart from './nodes/FlowchartStart.vue'
import EnableRadioMusic from './nodes/EnableRadioMusic.vue'
import DisableRadioMusic from './nodes/DisableRadioMusic.vue'
import ChangeRadioMusic from './nodes/ChangeRadioMusic.vue'
import ChangeBGMusic from './nodes/ChangeBGMusic.vue'
import SetHeartRate from './nodes/SetHeartRate.vue'
import SetENGRes from './nodes/SetENGRes.vue'
import SetO2ConsumeFactor from './nodes/SetO2ConsumeFactor.vue'
import ToggleWarningAni from './nodes/ToggleWarningAni.vue'
import HighlightButton from './nodes/HighlightButton.vue'
import GetAchievement from './nodes/GetAchievement.vue'
import RestartGame from './nodes/RestartGame.vue'
import ConfigSpecialEnd from './nodes/ConfigSpecialEnd.vue'
import CallDailyPart from './nodes/CallDailyPart.vue'
import ExitDailyInsert from './nodes/ExitDailyInsert.vue'
import MonoBehavior from './nodes/MonoBehavior.vue'
import FlowchartBlock from './nodes/FlowchartBlock.vue'

const props = defineProps({
  flowchartName: {
    type: String,
    required: true,
  },
})

const fileUrl = computed(() => `/data/flowcharts/vueflow/${props.flowchartName}.json`)
const data = ref<FlowchartData | null>(null)

const vueflowData = {
  nodes: ref<FlowchartDataNode[]>([]),
  edges: ref<FlowchartDataEdge[]>([]),
}
const isReady = ref(false)

watch(
  fileUrl,
  async (newValue) => {
    if (newValue === '/data/flowcharts/vueflow/.json') {
      isReady.value = false

      data.value = null
      vueflowData.nodes.value = []
      vueflowData.edges.value = []
    } else {
      data.value = (await getJson<FlowchartData>(fileUrl.value, 5)) as FlowchartData

      vueflowData.nodes.value = data.value.data.nodes
      vueflowData.edges.value = data.value.data.edges
      vueflowData.nodes.value = useLayout().layout(
        vueflowData.nodes.value,
        vueflowData.edges.value,
        'TB',
      )

      isReady.value = true
    }
  },
  { immediate: true },
)

async function initFlowchart() {
  const { fitView } = useVueFlow()
  nextTick(() => {
    fitView({ nodes: [vueflowData.nodes.value[0].id] })
  })
}
</script>

<template>
  <div style="width: 100%">
    <PvProgressSpinner v-if="!isReady" />
    <div v-else style="height: 600px; width: calc(100%)">
      <VueFlow
        :nodes="vueflowData.nodes.value"
        :edges="vueflowData.edges.value"
        :min-zoom="0.1"
        :max-zoom="4"
        @nodes-initialized="initFlowchart()"
      >
        <Background pattern-color="#aaa" :gap="16" />
        <MiniMap />
        <Controls position="top-left"></Controls>

        <template #node-ActivateEH="props">
          <ActivateEH v-bind="props" />
        </template>
        <template #node-ActivateEOG="props">
          <ActivateEOG v-bind="props" />
        </template>
        <template #node-ActivateRadio="props">
          <ActivateRadio v-bind="props" />
        </template>
        <template #node-BanEOGControl="props">
          <BanEOGControl v-bind="props" />
        </template>
        <template #node-BanEHControl="props">
          <BanEHControl v-bind="props" />
        </template>
        <template #node-BanRadioControl="props">
          <BanRadioControl v-bind="props" />
        </template>
        <template #node-SetEHValue="props">
          <SetEHValue v-bind="props" />
        </template>
        <template #node-SetRadioValue="props">
          <SetRadioValue v-bind="props" />
        </template>
        <template #node-If="props">
          <If v-bind="props" />
        </template>
        <template #node-Else="props">
          <Else v-bind="props" />
        </template>
        <template #node-EndIf="props">
          <EndIf v-bind="props" />
        </template>
        <template #node-AliyaMessage="props">
          <AliyaMessage v-bind="props" />
        </template>
        <template #node-PlayerChoice="props">
          <PlayerChoice v-bind="props" />
        </template>
        <template #node-InvisibleChoice="props">
          <InvisibleChoice v-bind="props" />
        </template>
        <template #node-DefaultChoice="props">
          <DefaultChoice v-bind="props" />
        </template>
        <template #node-GroupBlock="props">
          <GroupBlock v-bind="props" />
        </template>
        <template #node-CallBlock="props">
          <CallBlock v-bind="props" />
        </template>
        <template #node-CallFlowchart="props">
          <CallFlowchart v-bind="props" />
        </template>
        <template #node-WaitTime="props">
          <WaitTime v-bind="props" />
        </template>
        <template #node-WaitPreciseTime="props">
          <WaitPreciseTime v-bind="props" />
        </template>
        <template #node-SetVariable="props">
          <SetVariable v-bind="props" />
        </template>
        <template #node-DefineVariable="props">
          <DefineVariable v-bind="props" />
        </template>
        <template #node-PlayerInput="props">
          <PlayerInput v-bind="props" />
        </template>
        <template #node-ClampO2Res="props">
          <ClampO2Res v-bind="props" />
        </template>
        <template #node-ClampWaterRes="props">
          <ClampWaterRes v-bind="props" />
        </template>
        <template #node-FlowchartStart="props">
          <FlowchartStart v-bind="props" />
        </template>
        <template #node-EnableRadioMusic="props">
          <EnableRadioMusic v-bind="props" />
        </template>
        <template #node-DisableRadioMusic="props">
          <DisableRadioMusic v-bind="props" />
        </template>
        <template #node-ChangeRadioMusic="props">
          <ChangeRadioMusic v-bind="props" />
        </template>
        <template #node-ChangeBGMusic="props">
          <ChangeBGMusic v-bind="props" />
        </template>
        <template #node-SetHeartRate="props">
          <SetHeartRate v-bind="props" />
        </template>
        <template #node-SetENGRes="props">
          <SetENGRes v-bind="props" />
        </template>
        <template #node-SetO2ConsumeFactor="props">
          <SetO2ConsumeFactor v-bind="props" />
        </template>
        <template #node-ToggleWarningAni="props">
          <ToggleWarningAni v-bind="props" />
        </template>
        <template #node-HighlightButton="props">
          <HighlightButton v-bind="props" />
        </template>
        <template #node-GetAchievement="props">
          <GetAchievement v-bind="props" />
        </template>
        <template #node-RestartGame="props">
          <RestartGame v-bind="props" />
        </template>
        <template #node-ConfigSpecialEnd="props">
          <ConfigSpecialEnd v-bind="props" />
        </template>
        <template #node-CallDailyPart="props">
          <CallDailyPart v-bind="props" />
        </template>
        <template #node-ExitDailyInsert="props">
          <ExitDailyInsert v-bind="props" />
        </template>
        <template #node-MonoBehavior="props">
          <MonoBehavior v-bind="props" />
        </template>
        <template #node-Then="props">
          <Then v-bind="props" />
        </template>
        <template #node-FlowchartBlock="props">
          <FlowchartBlock v-bind="props" />
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<style scoped>
:deep(.vue-flow__node-ActivateEH),
:deep(.vue-flow__node-ActivateEOG),
:deep(.vue-flow__node-ActivateRadio),
:deep(.vue-flow__node-BanEOGControl),
:deep(.vue-flow__node-BanEHControl),
:deep(.vue-flow__node-BanRadioControl),
:deep(.vue-flow__node-SetEHValue),
:deep(.vue-flow__node-SetRadioValue),
:deep(.vue-flow__node-If),
:deep(.vue-flow__node-Else),
:deep(.vue-flow__node-EndIf),
:deep(.vue-flow__node-AliyaMessage),
:deep(.vue-flow__node-PlayerChoice),
:deep(.vue-flow__node-InvisibleChoice),
:deep(.vue-flow__node-DefaultChoice),
:deep(.vue-flow__node-GroupBlock),
:deep(.vue-flow__node-CallBlock),
:deep(.vue-flow__node-CallFlowchart),
:deep(.vue-flow__node-WaitTime),
:deep(.vue-flow__node-WaitPreciseTime),
:deep(.vue-flow__node-SetVariable),
:deep(.vue-flow__node-DefineVariable),
:deep(.vue-flow__node-PlayerInput),
:deep(.vue-flow__node-ClampO2Res),
:deep(.vue-flow__node-ClampWaterRes),
:deep(.vue-flow__node-FlowchartStart),
:deep(.vue-flow__node-EnableRadioMusic),
:deep(.vue-flow__node-DisableRadioMusic),
:deep(.vue-flow__node-ChangeRadioMusic),
:deep(.vue-flow__node-ChangeBGMusic),
:deep(.vue-flow__node-SetHeartRate),
:deep(.vue-flow__node-SetENGRes),
:deep(.vue-flow__node-SetO2ConsumeFactor),
:deep(.vue-flow__node-ToggleWarningAni),
:deep(.vue-flow__node-HighlightButton),
:deep(.vue-flow__node-GetAchievement),
:deep(.vue-flow__node-RestartGame),
:deep(.vue-flow__node-ConfigSpecialEnd),
:deep(.vue-flow__node-CallDailyPart),
:deep(.vue-flow__node-ExitDailyInsert),
:deep(.vue-flow__node-MonoBehavior),
:deep(.vue-flow__node-FlowchartBlock),
:deep(.vue-flow__node-Then) {
  padding: 10px;
  border-radius: 3px;
  width: 150px;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  color: var(--vf-node-text);
  background-color: var(--vf-node-bg);
  border-color: var(--vf-node-color);

  &.selected,
  &.selected:hover {
    box-shadow: 0 0 0 0.5px var(--vf-box-shadow);
  }

  .vue-flow__handle {
    background: var(--vf-handle);
  }
}
</style>
