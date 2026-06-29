<script setup lang="ts">
import FlowchartViewer_Aliya2Demo from '@/components/flowchart/core/viewer/Aliya2DemoViewer.vue'
import FlowchartExtraControls from '@/components/flowchart/core/FlowchartExtraControls.vue'
import Aliya2DemoMetadata from '@/components/flowchart/core/metadata/Aliya2DemoMetadata.vue'

import {
  symbolActorData_Aliya2Demo,
  symbolExternalConfig_Aliya2Demo,
  symbolFlowchartCatalog_Aliya2Demo,
  symbolFlowchartVarUsage_Aliya2Demo,
  symbolL10nDataSingleLang_Aliya2Demo,
  symbolL10NSearchData,
} from '@/constants/injection'
import '@/components/flowchart/registry/l10nSearchConfigs'
import { computed, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
import { useSiteSettingStore } from '@/stores/setting'
import { getJson } from '@/utils/fetch'
import type { CatalogMetadataFile } from '@/components/flowchart/aliya2_demo/types/script4'
import type { L10nSingleLangEntry } from '@/components/flowchart/aliya2_demo/types/script5'
import type { ExternalConfig } from '@/components/flowchart/aliya2_demo/types/script6'
import type { ActorData } from '@/components/flowchart/aliya2_demo/types/script7'
import type { VariableUsage } from '@/components/flowchart/aliya2_demo/types/script8'

const props = defineProps<{
  gameId: string
  versionId: string
  flowchartName: string
}>()

const setting = useSiteSettingStore()

const gameId = computed(() => props.gameId)
const versionId = computed(() => props.versionId)

const isLoading = ref(true)

const flowchartRef = useTemplateRef('flowchartComp')

const catalogData = ref<CatalogMetadataFile>({ catalog: {}, flowchartBeingRefed: {} })

const varUsageData = ref<VariableUsage>({})

const l10nData = ref<L10nSingleLangEntry>({
  documents: { title: {}, content: {} },
  news: { title: {}, content: {} },
  conversations: { title: {} },
  dialogues: {},
})
async function loadL10nData(langcode: string) {
  if (!gameId.value || !versionId.value) return

  try {
    l10nData.value = await getJson<L10nSingleLangEntry>(
      `/data/${gameId.value}/${versionId.value}/localization/${langcode}.json`,
      5,
    )
  } catch {
    // L10N data may not exist for this game yet — keep default empty structure
    l10nData.value = {
      documents: { title: {}, content: {} },
      news: { title: {}, content: {} },
      conversations: { title: {} },
      dialogues: {},
    }
  }
}

const actorData = ref<ActorData>({})

const externalConfig = ref<ExternalConfig>({
  ambientMessage: {},
  audioConfig: {},
  chatConfig: { channels: {}, actors: {} },
  mediaMessageConfig: { images: {}, emojis: {} },
  searchConfig: [],
})

async function loadActorData() {
  if (!gameId.value || !versionId.value) return
  try {
    actorData.value = await getJson<ActorData>(
      `/data/${gameId.value}/${versionId.value}/external_index/actors.json`,
      5,
    )
  } catch {
    // keep default empty object
  }
}

async function loadExternalConfig() {
  if (!gameId.value || !versionId.value) return
  try {
    externalConfig.value = await getJson<ExternalConfig>(
      `/data/${gameId.value}/${versionId.value}/external_index/external_configs.json`,
      5,
    )
  } catch {
    // keep default empty structure
  }
}

/** Derive flat search data from structured L10n — for FlowchartSearchPanel */
const l10nSearchData = computed<Record<string, string>>(() => {
  const flat: Record<string, string> = {}
  const d = l10nData.value
  for (const [k, v] of Object.entries(d.documents.title)) flat[`doc:title:${k}`] = v
  for (const [k, v] of Object.entries(d.documents.content)) flat[`doc:content:${k}`] = v
  for (const [k, v] of Object.entries(d.news.title)) flat[`news:title:${k}`] = v
  for (const [k, v] of Object.entries(d.news.content)) flat[`news:content:${k}`] = v
  for (const [k, v] of Object.entries(d.conversations.title)) flat[`conv:title:${k}`] = v
  for (const [k, v] of Object.entries(d.dialogues)) flat[`dialogue:${k}`] = v
  return flat
})

provide(symbolL10nDataSingleLang_Aliya2Demo, l10nData)
provide(symbolL10NSearchData, l10nSearchData)
provide(symbolFlowchartCatalog_Aliya2Demo, catalogData)
provide(symbolFlowchartVarUsage_Aliya2Demo, varUsageData)
provide(symbolExternalConfig_Aliya2Demo, externalConfig)
provide(symbolActorData_Aliya2Demo, actorData)

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
      try {
        catalogData.value = await getJson<CatalogMetadataFile>(
          `/data/${props.gameId}/${props.versionId}/flowcharts/vueflow/catalog.json`,
          5,
        )
      } catch {
        // catalog.json may not exist; keep default empty catalog
        catalogData.value = { catalog: {}, flowchartBeingRefed: {} }
      }
    })(),
    loadActorData(),
    loadExternalConfig(),
    (async () => {
      try {
        varUsageData.value = await getJson<VariableUsage>(
          `/data/${props.gameId}/${props.versionId}/flowcharts/variable_usage.json`,
          5,
        )
      } catch {
        // keep default empty object
      }
    })(),
  ])

  isLoading.value = false
})
</script>

<template>
  <template v-if="!isLoading">
    <div class="flowchart-wrapper">
      <FlowchartViewer_Aliya2Demo
        :game-id="props.gameId"
        :version-id="props.versionId"
        :flowchart-name="props.flowchartName"
        ref="flowchartComp"
      />

      <FlowchartExtraControls :title="$t('comp.flowchartmetadata.h2')">
        <Aliya2DemoMetadata
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

:deep(.aliya2-demo-debug) {
  margin-top: 4px;
  margin-bottom: 8px;
  border: skyblue solid 2px;
  padding: 4px;
}
</style>
