<script setup lang="ts">
import FlowchartViewer_TysyDemo from '@/components/flowchart/core/viewer/TysyDemoViewer.vue'
import FlowchartMetadata_TysyDemo from '@/components/flowchart/core/metadata/TysyDemoMetadata.vue'
import FlowchartExtraControls from '@/components/flowchart/core/FlowchartExtraControls.vue'

import {
  symbolFlowchartCatalog_TysyDemo,
  symbolFlowchartVarUsage_TysyDemo,
  symbolL10nDataSingleLang_TysyDemo,
  symbolL10NSearchData,
} from '@/constants/injection'
import '@/components/flowchart/registry/l10nSearchConfigs'
import { computed, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
import { useSiteSettingStore } from '@/stores/setting'
import { getJson } from '@/utils/fetch'
import type { FlowchartData } from '@/components/flowchart/tysy_demo/types/script3'
import type { VariableUsage as VariableUsage_TysyDemo } from '@/components/flowchart/tysy_demo/types/script5'

const props = defineProps<{
  gameId: string
  versionId: string
  flowchartName: string
}>()

type VueFlowCatalog = {
  catalog: Record<string, FlowchartData['metadata']>
  flowchartBeingRefed: Record<string, string[]>
}

const setting = useSiteSettingStore()

const gameId = computed(() => props.gameId)
const versionId = computed(() => props.versionId)

const isLoading = ref(true)

const flowchartRef = useTemplateRef('flowchartComp')

const catalogData = ref<VueFlowCatalog>({ catalog: {}, flowchartBeingRefed: {} })

const varUsageData = ref<VariableUsage_TysyDemo>({})

const l10nData = ref<Record<string, string>>({})
async function loadL10nData(langcode: string) {
  if (!gameId.value || !versionId.value) return

  l10nData.value = await getJson<Record<string, string>>(
    `/data/${gameId.value}/${versionId.value}/localization/${langcode}.json`,
    5,
  )
}

provide(symbolL10nDataSingleLang_TysyDemo, l10nData)
provide(symbolL10NSearchData, l10nData)
provide(symbolFlowchartCatalog_TysyDemo, catalogData)
provide(symbolFlowchartVarUsage_TysyDemo, varUsageData)

watch(
  () => setting.l10nlang,
  async (newValue, oldValue) => {
    await loadL10nData(newValue)

    if (oldValue && flowchartRef.value) {
      flowchartRef.value.triggerRelayout()
    }
  },
  { immediate: true },
)

onMounted(async () => {
  await Promise.allSettled([
    (async () => {
      catalogData.value = await getJson<VueFlowCatalog>(
        `/data/${props.gameId}/${props.versionId}/flowcharts/vueflow/catalog.json`,
        5,
      )
    })(),
    (async () => {
      varUsageData.value = await getJson<VariableUsage_TysyDemo>(
        `/data/${props.gameId}/${props.versionId}/flowcharts/variable_usage.json`,
        5,
      )
    })(),
  ])

  isLoading.value = false
})
</script>

<template>
  <template v-if="!isLoading">
    <div class="flowchart-wrapper">
      <FlowchartViewer_TysyDemo
        :game-id="props.gameId"
        :version-id="props.versionId"
        :flowchart-name="props.flowchartName"
        ref="flowchartComp"
      />

      <FlowchartExtraControls :title="$t('comp.flowchartmetadata.h2')">
        <FlowchartMetadata_TysyDemo
          :flowchart-name="props.flowchartName"
          :game-id="props.gameId"
          :version-id="props.versionId"
        />
      </FlowchartExtraControls>
    </div>
  </template>
  <template v-else>
    <p><b>Loading...</b></p>
  </template>
</template>

<style scoped>
.flowchart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

:deep(.tysy-demo-debug) {
  margin-top: 4px;
  margin-bottom: 8px;
  border: skyblue solid 2px;
  padding: 4px;
}
</style>
