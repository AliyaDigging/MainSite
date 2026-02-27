<script setup lang="ts">
import FlowchartViewer_Aliya from '@/components/flowchart/core/viewer/AliyaViewer.vue'
import FlowchartMetadata_Aliya from '@/components/flowchart/core/metadata/AliyaMetadata.vue'

import {
  symbolFlowchartCatalog_Aliya1,
  symbolGameSelectionDict,
  symbolL10nDataSingleLang_Aliya1,
} from '@/constants/injection'
import { computed, inject, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
import { useSiteSettingStore } from '@/stores/setting'
import type { L10nCsvSingleLang as L10nCsvSingleLang_Aliya1 } from '@/types/aliya1/data_script7'
import type {
  VueFlowCatalog,
  VueFlowCatalog as VueFlowCatalog_Aliya1,
} from '@/types/aliya1/data_script6'
import { getJson } from '@/utils/fetch'

const setting = useSiteSettingStore()

const injectionSelectData = inject(symbolGameSelectionDict)!
const gameId = computed(() => injectionSelectData.value[0])
const versionId = computed(() => injectionSelectData.value[1])

const isLoading = ref(true)

const flowchartRef = useTemplateRef('flowchartComp')

const l10nData = ref<L10nCsvSingleLang_Aliya1>({})
const catalogData = ref<VueFlowCatalog_Aliya1>({ catalog: {}, flowchartBeingRefed: {} })
async function loadL10nData(langcode: string) {
  if (!gameId.value || !versionId.value) return

  l10nData.value = await getJson<L10nCsvSingleLang_Aliya1>(
    `/data/${gameId.value}/${versionId.value}/localization/${langcode}.json`,
    5,
  )
}

provide(symbolL10nDataSingleLang_Aliya1, l10nData)
provide(symbolFlowchartCatalog_Aliya1, catalogData)

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
  catalogData.value = await getJson<VueFlowCatalog>(
    `/data/${injectionSelectData.value[0]}/${injectionSelectData.value[1]}/flowcharts/vueflow/catalog.json`,
    5,
  )
  isLoading.value = false
})
</script>

<template>
  <template v-if="!isLoading">
    <FlowchartViewer_Aliya
      :game-id="injectionSelectData[0]"
      :version-id="injectionSelectData[1]"
      :flowchart-name="injectionSelectData[2]"
      ref="flowchartComp"
    />
    <FlowchartMetadata_Aliya
      :flowchart-name="injectionSelectData[2]"
      :game-id="injectionSelectData[0]"
      :version-id="injectionSelectData[1]"
    />
  </template>
  <template v-else>
    <p><b>Loading...</b></p>
  </template>
</template>
