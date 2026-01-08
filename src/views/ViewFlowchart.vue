<script setup lang="ts">
import PvSelect from 'primevue/select'
import PvTag from 'primevue/tag'
import PvDivider from 'primevue/divider'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, provide, useTemplateRef, onMounted } from 'vue'
import PvMessage from 'primevue/message'

import Aliya1_FlowchartComp from '@/components/flowchart/aliya1/FlowchartComp.vue'
import Aliya1_FlowchartMetadata from '@/components/flowchart/aliya1/FlowchartMetadata.vue'
import type { VueFlowCatalog as Aliya1_VueFlowCatalog } from '@/types/aliya1/data_script6'
import { type L10nCsvSingleLang as Aliya1_L10nCsvSingleLang } from '@/types/aliya1/data_script7'
import Aliya1_Android_DLC_FlowchartComp from '@/components/flowchart/aliya1_android_dlc/FlowchartComp.vue'
import Aliya1_Android_DLC_FlowchartMetadata from '@/components/flowchart/aliya1_android_dlc/FlowchartMetadata.vue'
import type { VueFlowCatalog as Aliya1_Android_DLC_VueFlowCatalog } from '@/types/aliya1_android_dlc/data_script6'
import { type L10nCsvSingleLang as Aliya1_Android_DLC_L10nCsvSingleLang } from '@/types/aliya1_android_dlc/data_script7'

import { useSiteSettingStore } from '@/stores/setting'
import { symbolFlowchartCatalog, symbolL10nDataSingleLang } from '@/constants/injection'
import { getJson } from '@/utils/fetch'
import type { AllDataCatalog } from '@/types/allDataCatalog'
import GameAndVersionSelector from '@/components/GameAndVersionSelector.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

/* utility type, to accommodate all types from all games */
type VueFlowCatalog = Aliya1_VueFlowCatalog | Aliya1_Android_DLC_VueFlowCatalog
type L10nCsvSingleLang = Aliya1_L10nCsvSingleLang | Aliya1_Android_DLC_L10nCsvSingleLang

/* path params */
const props = defineProps({
  gameId: {
    type: String,
    default: '',
  },
  versionId: {
    type: String,
    default: '',
  },
  flowchartName: {
    type: String,
    default: '',
  },
})

/* some useXXX() */
const i18n = useI18n()
const setting = useSiteSettingStore()
const route = useRoute()
const router = useRouter()

/* <select> variables */
const gameSelection = ref<string>(props.gameId)
const versionSelection = ref<string>(props.versionId)
const flowchartSelection = ref<string>(props.flowchartName)

const dataAllCatalog = ref<AllDataCatalog>([])

const dataL10n = ref<L10nCsvSingleLang>({})
const dataCatalog = ref<VueFlowCatalog>({ catalog: {}, flowchartBeingRefed: {} })
const dataCatalogList = ref<string[]>([])

const isReady = ref(false)
const isReady2 = ref(false)

const flowchartRef = useTemplateRef('flowchartComp')

provide(symbolL10nDataSingleLang, dataL10n)
provide(symbolFlowchartCatalog, dataCatalog)

async function loadL10nData(langcode: string) {
  dataL10n.value = await getJson<L10nCsvSingleLang>(
    `/data/${gameSelection.value}/${versionSelection.value}/localization/${langcode}.json`,
    5,
  )
}

async function loadCatalogData(gameId: string, versionId: string) {
  dataCatalog.value = await getJson<VueFlowCatalog>(
    `/data/${gameId}/${versionId}/flowcharts/vueflow/catalog.json`,
    5,
  )
  dataCatalogList.value = await getJson<string[]>(
    `/data/${gameId}/${versionId}/flowcharts/vueflow/catalog_list.json`,
    5,
  )
}

// select 更改时，触发路径更改
watch([gameSelection, versionSelection, flowchartSelection], ([n1, n2, n3]) => {
  // 新URL格式
  if (n3 !== '') {
    // game, version, flowchart都已经齐了
    router.push(`/view/flowchart/${n1}/${n2}/${n3}`)
  } else if (n2 !== '') {
    router.push(`/view/flowchart/${n1}/${n2}`)
  } else if (n1 !== '') {
    router.push(`/view/flowchart/${n1}`)
  } else {
    router.push(`/view/flowchart/`)
  }
})
// 路径更改时，触发 select 更改
watch(
  () => [route.params.gameId, route.params.versionId, route.params.flowchartName],
  ([n1, n2, n3]) => {
    if (n1 !== gameSelection.value) {
      gameSelection.value = String(n1)
    }
    if (n2 !== versionSelection.value) {
      versionSelection.value = String(n2)
    }
    if (n3 !== flowchartSelection.value) {
      flowchartSelection.value = String(n3)
    }
  },
  { immediate: true },
)

watch(
  () => setting.l10nlang,
  async (newValue, oldValue) => {
    await loadL10nData(newValue)
    isReady.value = true

    if (oldValue && flowchartRef.value) {
      flowchartRef.value.triggerRelayout()
    }
  },
)

onMounted(async () => {
  if (props.gameId.includes('-')) {
    // 从老URL格式过来的，是Aliya 1代
    // 写死在这里了，反正数据大概不会变
    gameSelection.value = 'aliya1'
    versionSelection.value = '20250712'
    flowchartSelection.value = props.gameId
    router.push(`/view/flowchart/aliya1/20250712/${props.gameId}`)
  }

  await Promise.allSettled([
    (async () => {
      dataAllCatalog.value = await getJson<AllDataCatalog>(`/data/data_catalog.json`, 5)
    })(),
  ])
  isReady.value = true
})

watch(
  [gameSelection, versionSelection],
  async ([n1, n2]) => {
    if (n1 !== '' && n2 !== '') {
      isReady2.value = false
      await Promise.allSettled([loadL10nData(setting.l10nlang), loadCatalogData(n1, n2)])
      isReady2.value = true
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">{{ $t('comp.flowchart.p.view1') }}</h1>
    <div v-if="!isReady" class="mt-6">
      <div class="card justify-center">
        <LoadingSpinner />
      </div>
    </div>
    <div v-else>
      <p class="view-page-h1-desc text-color mb-2">{{ $t('comp.flowchart.p.view2') }}</p>
      <PvDivider />

      <GameAndVersionSelector
        :data-all-catalog="dataAllCatalog"
        v-model:game-selection="gameSelection"
        v-model:version-selection="versionSelection"
      />

      <template v-if="isReady2"
        ><p class="select-title text-color mb-2">
          {{ $t('comp.flowchart.select.title3')
          }}<PvSelect v-model="flowchartSelection" :options="dataCatalogList">
            <template #option="slotProps">
              <div>
                <span class="mr-2">{{ slotProps.option }}&nbsp;</span>
                <PvTag severity="info" size="small">{{
                  slotProps.option.toLowerCase().includes('catalog')
                    ? i18n.t('select.flowchart.type.fof')
                    : slotProps.option.toLowerCase().includes('daily')
                      ? i18n.t(`select.flowchart.type.daily`)
                      : i18n.t(`select.flowchart.type.main`)
                }}</PvTag>
              </div>
            </template>
            <template #value="slotProps">
              <div v-if="slotProps.value">
                <span class="mr-2">{{ slotProps.value }}&nbsp;</span>
                <PvTag severity="info" size="small">{{
                  slotProps.value.toLowerCase().includes('catalog')
                    ? i18n.t('select.flowchart.type.fof')
                    : slotProps.value.toLowerCase().includes('daily')
                      ? i18n.t(`select.flowchart.type.daily`)
                      : i18n.t(`select.flowchart.type.main`)
                }}</PvTag>
              </div>
              <div v-else>
                <span>{{ i18n.t('select.flowchart.placeholder') }}</span>
              </div>
            </template>
          </PvSelect>
        </p>
        <PvMessage severity="info" class="mt-4">{{ $t('comp.flowchart.p.view3') }}</PvMessage>
        <PvMessage severity="error" class="mt-2">{{ $t('comp.flowchart.p.view4') }}</PvMessage>
        <PvMessage severity="success" class="mt-2">{{ $t('comp.flowchart.p.view5') }}</PvMessage>
        <PvMessage severity="success" class="mt-2">{{ $t('comp.flowchart.p.view6') }}</PvMessage>
        <PvDivider />

        <div class="mt-6">
          <div v-if="gameId.includes('aliya1_android_dlc')">
            <Aliya1_Android_DLC_FlowchartComp
              :game-id="gameId ? gameId : ''"
              :version-id="versionId ? versionId : ''"
              :flowchart-name="flowchartSelection ? flowchartSelection : ''"
              ref="flowchartComp"
            />
            <Aliya1_Android_DLC_FlowchartMetadata :flowchart-name="flowchartName" />
          </div>
          <div v-else-if="gameId.includes('aliya1')">
            <Aliya1_FlowchartComp
              :game-id="gameId ? gameId : ''"
              :version-id="versionId ? versionId : ''"
              :flowchart-name="flowchartSelection ? flowchartSelection : ''"
              ref="flowchartComp"
            />
            <Aliya1_FlowchartMetadata :flowchart-name="flowchartName" />
          </div>
        </div>
        <PvDivider
      /></template>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 1.2em;
}
:deep(p.select-title) {
  font-size: 1.1em;
}
</style>
