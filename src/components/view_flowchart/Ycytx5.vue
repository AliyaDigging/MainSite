<script setup lang="ts">
import FlowchartViewer_Ycytx5 from '@/components/flowchart/core/viewer/Ycytx5Viewer.vue'
import FlowchartMetadata_Ycytx5 from '@/components/flowchart/core/metadata/Ycytx5Metadata.vue'

import {
  symbolFlowchartCatalog_Ycytx5,
  symbolGameSelectionDict,
  symbolL10nDataSingleLang_Ycytx5,
  symbolL10nDataSingleLangDict_Ycytx5,
} from '@/constants/injection'
import { computed, inject, onMounted, provide, ref, useTemplateRef, watch, unref } from 'vue'
import { getJson } from '@/utils/fetch'
import type { L10nSingleLang_Ycytx5, VFOut_Catalog_Ycytx5 } from '@/types/ycytx_5'

const isLoading = ref(true)

const injectionSelectData = inject(symbolGameSelectionDict)!
const gameId = computed(() => injectionSelectData.value[0])
const versionId = computed(() => injectionSelectData.value[1])

const flowchartRef = useTemplateRef('flowchartComp')

const l10nData = ref<L10nSingleLang_Ycytx5>({ story: {}, dict: {} })
const catalogData = ref<VFOut_Catalog_Ycytx5>({ catalog: {} })
async function loadL10nData() {
  l10nData.value = await getJson<L10nSingleLang_Ycytx5>(
    `/data/${gameId.value}/${versionId.value}/localization/localization.json`,
    5,
  )
}

// provide dict data
const dictData: symbolL10nDataSingleLangDict_Ycytx5 = ref({})
function updateDictData(flowchartName: string) {
  dictData.value = {}

  catalogData.value.catalog[flowchartName].metadata.dictKeywordId.forEach((v) => {
    // for some reason it returns a ref-ed object
    dictData.value[`DICT_${v}`] = unref(l10nData.value.dict[`DICT_${v}`])
  })
}
provide(symbolL10nDataSingleLangDict_Ycytx5, dictData)

provide(symbolL10nDataSingleLang_Ycytx5, l10nData)
provide(symbolFlowchartCatalog_Ycytx5, catalogData)

onMounted(async () => {
  catalogData.value = await getJson<VFOut_Catalog_Ycytx5>(
    `/data/${injectionSelectData.value[0]}/${injectionSelectData.value[1]}/flowcharts/vueflow/catalog.json`,
    5,
  )
  await loadL10nData()
  updateDictData(injectionSelectData.value[2])

  isLoading.value = false
})

watch(
  () => injectionSelectData.value[2],
  async (newValue) => {
    if (Object.keys(catalogData.value.catalog).length !== 0) {
      updateDictData(newValue)
    }
  },
)
</script>

<template>
  <template v-if="!isLoading">
    <FlowchartViewer_Ycytx5
      :game-id="injectionSelectData[0]"
      :version-id="injectionSelectData[1]"
      :flowchart-name="injectionSelectData[2]"
      ref="flowchartComp"
    />
    <FlowchartMetadata_Ycytx5
      :game-id="injectionSelectData[0]"
      :version-id="injectionSelectData[1]"
      :flowchart-name="injectionSelectData[2]"
    />
  </template>
</template>
