<script setup lang="ts">
import FlowchartViewer_2361Playtest from '@/components/flowchart/core/viewer/2361PlaytestViewer.vue'
import FlowchartMetadata_2361Playtest from '@/components/flowchart/core/metadata/2361PlaytestMetadata.vue'

import { symbolFlowchartCatalog_2361Playtest, symbolGameSelectionDict } from '@/constants/injection'
import { computed, inject, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
import { useSiteSettingStore } from '@/stores/setting'
import { getJson } from '@/utils/fetch'
import type { FlowchartData } from '@/components/flowchart/2361_playtest/types/script3'

type VueFlowCatalog = {
  catalog: Record<string, { metadata: FlowchartData['metadata'] }>
  flowchartBeingRefed: Record<string, string[]>
}

const setting = useSiteSettingStore()

const injectionSelectData = inject(symbolGameSelectionDict)!
const gameId = computed(() => injectionSelectData.value[0])
const versionId = computed(() => injectionSelectData.value[1])

const isLoading = ref(true)

const flowchartRef = useTemplateRef('flowchartComp')

const catalogData = ref<VueFlowCatalog>({ catalog: {}, flowchartBeingRefed: {} })

provide(symbolFlowchartCatalog_2361Playtest, catalogData)

watch(
  () => setting.l10nlang,
  async (_newValue, oldValue) => {
    if (oldValue && flowchartRef.value) {
      flowchartRef.value.triggerRelayout()
    }
  },
)

onMounted(async () => {
  /*
  catalogData.value = await getJson<VueFlowCatalog>(
    `/data/${injectionSelectData.value[0]}/${injectionSelectData.value[1]}/flowcharts/vueflow/catalog.json`,
    5,
  )*/
  isLoading.value = false
})
</script>

<template>
  <template v-if="!isLoading">
    <FlowchartViewer_2361Playtest
      :game-id="injectionSelectData[0]"
      :version-id="injectionSelectData[1]"
      :flowchart-name="injectionSelectData[2]"
      ref="flowchartComp"
    />
    <!---
    <FlowchartMetadata_2361Playtest
      :flowchart-name="injectionSelectData[2]"
      :game-id="injectionSelectData[0]"
      :version-id="injectionSelectData[1]"
    />-->
  </template>
  <template v-else>
    <p><b>Loading...</b></p>
  </template>
</template>
