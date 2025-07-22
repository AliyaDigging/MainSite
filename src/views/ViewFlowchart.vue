<script setup lang="ts">
import PvSelect from 'primevue/select'
import PvTag from 'primevue/tag'
import PvDivider from 'primevue/divider'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, provide, useTemplateRef, onMounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import PvMessage from 'primevue/message'

import FlowchartComp from '@/components/flowchart/FlowchartComp.vue'
import { type L10nCsvSingleLang } from '@/types/data_script7'
import { useSiteSettingStore } from '@/stores/setting'
import { symbolL10nDataSingleLang } from '@/constants/injection'
import { getJson } from '@/utils/fetch'
import type { VueFlowCatalog } from '@/types/data_script6'

const props = defineProps({
  flowchartName: {
    type: String,
    default: '',
  },
})

const i18n = useI18n()
const flowchartSelection = ref<string>(props.flowchartName)

const setting = useSiteSettingStore()
const route = useRoute()
const router = useRouter()

const dataL10n = ref<L10nCsvSingleLang>({})
const dataCatalog = ref<VueFlowCatalog>({})
const dataCatalogList = ref<string[]>([])
const isReady = ref(false)

const flowchartRef = useTemplateRef('flowchartComp')

provide(symbolL10nDataSingleLang, dataL10n)

async function loadL10nData(langcode: string) {
  dataL10n.value = await getJson<L10nCsvSingleLang>(`/data/localization/${langcode}.json`, 5)
}

async function loadCatalogData() {
  dataCatalog.value = await getJson<VueFlowCatalog>(`/data/flowcharts/vueflow/catalog.json`, 5)
  dataCatalogList.value = await getJson<string[]>(`/data/flowcharts/vueflow/catalog_list.json`, 5)
}

// select 更改时，触发路径更改
watch(flowchartSelection, (newValue) => {
  if (newValue !== route.params.flowchartName) {
    router.push(`/view/flowchart/${newValue}`)
  }
})
// 路径更改时，触发 select 更改
watch(
  () => route.params.flowchartName,
  (newValue) => {
    if (newValue !== flowchartSelection.value) {
      flowchartSelection.value = String(newValue)
    }
  },
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
  console.log('onMounted')
  await Promise.allSettled([loadL10nData(setting.l10nlang), loadCatalogData()])
  isReady.value = true
})
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">{{ $t('comp.flowchart.p.view1') }}</h1>
    <div v-if="!isReady" class="mt-6">
      <div class="card justify-center">
        <ProgressSpinner
          style="width: 70px; height: 70px"
          strokeWidth="5"
          fill="transparent"
          animationDuration="1.0s"
        />
        <div class="mt-4">
          <p style="font-weight: 800; font-size: 20px">{{ $t('view.flowchart.p.loading') }}</p>
          <p>{{ $t('view.flowchart.p.loading2') }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="view-page-h1-desc text-color mb-2">{{ $t('comp.flowchart.p.view2') }}</p>
      <PvSelect v-model="flowchartSelection" :options="dataCatalogList">
        <template #option="slotProps">
          <div>
            <span class="mr-2">{{ slotProps.option }}&nbsp;</span>
            <PvTag severity="info" size="small">{{
              slotProps.option.toLowerCase().includes('daily')
                ? i18n.t(`select.flowchart.type.daily`)
                : i18n.t(`select.flowchart.type.main`)
            }}</PvTag>
          </div>
        </template>
        <template #value="slotProps">
          <div v-if="slotProps.value">
            <span class="mr-2">{{ slotProps.value }}&nbsp;</span>
            <PvTag severity="info" size="small">{{
              slotProps.value.toLowerCase().includes('daily')
                ? i18n.t(`select.flowchart.type.daily`)
                : i18n.t(`select.flowchart.type.main`)
            }}</PvTag>
          </div>
          <div v-else>
            <span>{{ i18n.t('select.flowchart.placeholder') }}</span>
          </div>
        </template>
      </PvSelect>
      <PvMessage severity="info" class="mt-4">{{ $t('comp.flowchart.p.view3') }}</PvMessage>
      <PvMessage severity="error" class="mt-2">{{ $t('comp.flowchart.p.view4') }}</PvMessage>
      <PvMessage severity="success" class="mt-2">{{ $t('comp.flowchart.p.view5') }}</PvMessage>
      <PvDivider />
      <div class="mt-6">
        <FlowchartComp
          :flowchart-name="flowchartSelection ? flowchartSelection : ''"
          ref="flowchartComp"
        />
      </div>
      <PvDivider />
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 1.2em;
}
</style>
