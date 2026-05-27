<script setup lang="ts">
import FlowchartViewer_2361Playtest from '@/components/flowchart/core/viewer/2361PlaytestViewer.vue'
import FlowchartMetadata_2361Playtest from '@/components/flowchart/core/metadata/2361PlaytestMetadata.vue'

import { symbolFlowchartCatalog_2361Playtest } from '@/constants/injection'
import { computed, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
import { useSiteSettingStore } from '@/stores/setting'
import { getJson } from '@/utils/fetch'
import type { FlowchartData } from '@/components/flowchart/2361_playtest/types/script3'

const props = defineProps<{
  gameId: string
  versionId: string
  flowchartName: string
}>()

type VueFlowCatalog = {
  catalog: Record<string, { metadata: FlowchartData['metadata'] }>
  flowchartBeingRefed: Record<string, string[]>
}

const setting = useSiteSettingStore()

const gameId = computed(() => props.gameId)
const versionId = computed(() => props.versionId)

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
    `/data/${props.gameId}/${props.versionId}/flowcharts/vueflow/catalog.json`,
    5,
  )*/
  isLoading.value = false
})
</script>

<template>
  <template v-if="!isLoading">
    <FlowchartViewer_2361Playtest
      :game-id="props.gameId"
      :version-id="props.versionId"
      :flowchart-name="props.flowchartName"
      ref="flowchartComp"
    />
    <!---
    <FlowchartMetadata_2361Playtest
      :flowchart-name="props.flowchartName"
      :game-id="props.gameId"
      :version-id="props.versionId"
    />-->
  </template>
  <template v-else>
    <p><b>Loading...</b></p>
  </template>
</template>
