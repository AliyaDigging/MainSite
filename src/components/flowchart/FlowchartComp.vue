<script setup lang="ts">
import { computed, inject, nextTick, provide, ref, watch } from 'vue'
import {
  type FlowchartDataEdge,
  type FlowchartData,
  type FlowchartDataNode,
} from './types/script5_vueflow_prod'
import { getJson } from '@/utils/fetch'

import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls, ControlButton } from '@vue-flow/controls'
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
import FOF_Node from './nodes/FOF_Node.vue'
import FOF_Node_Achievement from './nodes/FOF_Node_Achievement.vue'
import { useWindowSize } from '@vueuse/core'

import { useI18n } from 'vue-i18n'
import { symbolUseDark, symbolUseVueFlow, symbolFlowchartMetadata } from '@/constants/injection'

import { SelectWindow } from '@vicons/carbon'
import { Icon } from '@vicons/utils'
import { detectIsMobile } from '@/utils/browser'

const props = defineProps({
  flowchartName: {
    type: String,
    required: true,
  },
})

async function triggerRelayout() {
  isReady.value = false
  await nextTick()
  isReady.value = true
  await nextTick()
}

defineExpose({
  triggerRelayout: triggerRelayout,
})

const fileUrl = computed(() => `/data/flowcharts/vueflow/${props.flowchartName}.json`)
const data = ref<FlowchartData | null>(null)
const vueflow = useVueFlow()
const windowsize = useWindowSize()
const i18n = useI18n()

const isShowMiniMap = ref(windowsize.width.value > 700)

const vueflowData = {
  nodes: ref<FlowchartDataNode[]>([]),
  edges: ref<FlowchartDataEdge[]>([]),
  metadata: ref<FlowchartData['metadata']>({
    counts: {
      node: -1,
      edge: -1,
      otherFlowcharts: -1,
    },
    variableNames: {},
    flowchartRefs: [],
    currName: '',
  }),
}
const vueflowLayout = useLayout()
const isReady = ref(false)
const isDraggable = ref(false)

const isDark = inject(symbolUseDark)!
const cssNodeBgColor = computed(() => (isDark.value ? '#1E1E1E' : '#FFFFFF'))
const cssNodeTextColor = computed(() => (isDark.value ? 'white' : 'black'))

const flowchartHeight = computed(() => {
  let height = 0
  if (detectIsMobile()) {
    height = Number((windowsize.height.value - 200) * 0.8)
  } else {
    height = Number((windowsize.height.value - 100) * 0.9)
  }

  const result = `${height}px`
  return result
})

function preProcessEdges(edges: FlowchartDataEdge[]) {
  edges.forEach((value) => {
    if (value.label) {
      value.label = i18n.t(value.label)
    }
  })
  return edges
}

provide(symbolUseVueFlow, vueflow)
provide(symbolFlowchartMetadata, vueflowData.metadata)

watch(
  fileUrl,
  async (newValue) => {
    if (newValue === '/data/flowcharts/vueflow/.json') {
      isReady.value = false

      data.value = null
      vueflowData.nodes.value = []
      vueflowData.edges.value = []
      vueflowData.metadata.value = {
        counts: {
          node: -1,
          edge: -1,
          otherFlowcharts: -1,
        },
        variableNames: {},
        flowchartRefs: [],
        currName: '',
      }
    } else {
      isReady.value = false
      await nextTick()

      data.value = (await getJson<FlowchartData>(fileUrl.value, 5)) as FlowchartData

      vueflowData.nodes.value = data.value.data.nodes
      vueflowData.edges.value = preProcessEdges(data.value.data.edges)
      vueflowData.metadata.value = data.value.metadata
      vueflowData.nodes.value = vueflowLayout.layout(
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
  // vueflow.setInteractive(false)
  nextTick(async () => {
    vueflowData.nodes.value = vueflowLayout.layout(
      vueflowData.nodes.value,
      vueflowData.edges.value,
      'TB',
    )
    await vueflow.fitView({ nodes: [vueflowData.nodes.value[0].id] })
  })
}

watch(
  isDraggable,
  (newValue) => {
    vueflow.nodesDraggable.value = newValue
  },
  { immediate: true },
)
</script>

<template>
  <div style="width: 100%">
    <div v-if="!isReady">
      <div style="text-align: center">
        <Icon style="font-size: 80px"><SelectWindow /></Icon>
        <p style="font-size: 30px; font-weight: 550">{{ $t('comp.flowchart.p.selection1') }}</p>
      </div>
    </div>
    <div v-else class="flowchart-comp">
      <VueFlow
        :nodes="vueflowData.nodes.value"
        :edges="vueflowData.edges.value"
        :min-zoom="0.05"
        :max-zoom="4"
        @nodes-initialized="initFlowchart()"
      >
        <Background pattern-color="#aaa" :gap="16" />
        <MiniMap v-if="isShowMiniMap" />
        <Controls position="top-left">
          <template #control-interactive>
            <ControlButton
              class="vue-flow__controls-interactive"
              @click="isDraggable = !isDraggable"
            >
              <div v-if="isDraggable" name="icon-unlock">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32">
                  <path
                    d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"
                  />
                </svg>
              </div>
              <div v-if="!isDraggable" name="icon-lock">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32">
                  <path
                    d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"
                  />
                </svg>
              </div>
            </ControlButton>
          </template>
          <ControlButton
            @click="isShowMiniMap = !isShowMiniMap"
            :title="i18n.t('comp.flowchart.control.minimap')"
            v-tooltip.right="i18n.t('comp.flowchart.control.minimap')"
          >
            <div style="color: black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
                v-if="isShowMiniMap"
              >
                <path
                  d="M20.5 3l-.16.03L15 5.1L9 3L3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1l5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"
                  fill="currentColor"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
                v-else
              >
                <path
                  d="M20.5 3l-.16.03L15 5.1L9 3L3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1l5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </ControlButton>
          <ControlButton
            @click="triggerRelayout()"
            :title="i18n.t('comp.flowchart.control.relayout')"
            v-tooltip.right="i18n.t('comp.flowchart.control.relayout')"
          >
            <div style="color: black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="4" y="4" width="6" height="5" rx="2"></rect>
                  <rect x="4" y="13" width="6" height="7" rx="2"></rect>
                  <rect x="14" y="4" width="6" height="16" rx="2"></rect>
                </g>
              </svg>
            </div>
          </ControlButton>
        </Controls>

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
        <template #node-FOF_Node="props">
          <FOF_Node v-bind="props" />
        </template>
        <template #node-FOF_Node_Achievement="props">
          <FOF_Node_Achievement v-bind="props" />
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<style scoped>
.flowchart-comp {
  height: v-bind(flowchartHeight);
  width: calc(100%);
}
</style>

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
:deep(.vue-flow__node-Then),
:deep(.vue-flow__node-FOF_Node),
:deep(.vue-flow__node-FOF_Node_Achievement) {
  padding: 10px;
  border-radius: 3px;
  width: 220px;
  font-size: 12px;
  text-align: left;
  border-width: 1px;
  border-style: solid;
  border-color: var(--vf-node-color);
  background-color: v-bind(cssNodeBgColor);
  color: v-bind(cssNodeTextColor);

  &.selected,
  &.selected:hover {
    box-shadow: 0 0 0 0.5px var(--vf-box-shadow);
  }

  .vue-flow__handle {
    background: var(--vf-handle);
  }
}

:deep(.custom-node-icon) {
  margin-right: 4px;
}

:deep(.custom-node-icon),
:deep(.custom-node-title) {
  /* Base value, PC */
  font-size: 20px;

  @media screen and (max-width: 960px) {
    font-size: 18px;
  }
  @media screen and (max-width: 794px) {
    font-size: 16px;
  }
  @media screen and (max-width: 370px) {
    font-size: 16px;
  }
}

:deep(.custom-node-content) {
  font-size: 14px;

  @media screen and (max-width: 960px) {
    font-size: 12px;
  }
  @media screen and (max-width: 794px) {
    font-size: 11px;
  }
  @media screen and (max-width: 370px) {
    font-size: 11px;
  }
}

:deep(.custom-node-long-content) {
  font-size: 13px;

  @media screen and (max-width: 960px) {
    font-size: 11px;
  }
  @media screen and (max-width: 794px) {
    font-size: 11px;
  }
  @media screen and (max-width: 370px) {
    font-size: 11px;
  }
}

:deep(ul.custom-node-long-content) {
  list-style-type: disc;
  list-style-position: inside;

  /*max-height: 120px;*/
  overflow-y: auto;
}

:deep(.custom-node-a-clickable:hover) {
  cursor: pointer;
}

:deep(.custom-node-tooltip) {
  text-decoration: underline;
}
</style>

<style scoped>
:deep(.vue-flow__node-toolbar) {
  align-items: left;
  background-color: #2d3748;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: white;

  max-height: 200px;

  overflow-y: auto;
}

:deep(audio) {
  width: 200px;
  display: block;
}
</style>
