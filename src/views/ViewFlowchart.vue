<script setup lang="ts">
import PvSelect from 'primevue/select'
import PvTag from 'primevue/tag'
import PvDivider from 'primevue/divider'
import { flowchartOptions, type FlowchartOption } from '@/constants/flowcharts'
import { useI18n } from 'vue-i18n'
import { ref, watch, provide, useTemplateRef, onMounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

import FlowchartComp from '@/components/flowchart/FlowchartComp.vue'
import { type L10nCsvSingleLang } from '@/types/data_script7'
import { useSiteSettingStore } from '@/stores/setting'
import { symbolL10nDataSingleLang } from '@/constants/injection'
import { getJson } from '@/utils/fetch'
import type { VueFlowCatalog, VueFlowCatalogEntry } from '@/types/data_script6'

const props = defineProps({
  flowchartName: {
    type: String,
    default: '',
  },
})

const i18n = useI18n()
const flowchartSelection = ref<VueFlowCatalogEntry>()

const setting = useSiteSettingStore()

const dataL10n = ref<L10nCsvSingleLang>({})
const dataCatalog = ref<VueFlowCatalog>([])
const isReady = ref(false)

const flowchartRef = useTemplateRef('flowchartComp')

provide(symbolL10nDataSingleLang, dataL10n)

async function loadL10nData(langcode: string) {
  dataL10n.value = await getJson<L10nCsvSingleLang>(`/data/localization/${langcode}.json`, 5)
}

async function loadCatalogData() {
  dataCatalog.value = await getJson<VueFlowCatalog>(`/data/flowcharts/vueflow/catalog.json`, 5)
}

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
    <h1 class="view-page-h1 text-black mb-0">查看流程图</h1>
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
      <p class="view-page-h1-desc text-color mb-2">选择一个流程图开始查看内容</p>
      <PvSelect v-model="flowchartSelection" :options="dataCatalog">
        <template #option="slotProps">
          <div>
            <span class="mr-2">{{ slotProps.option.filename }}&nbsp;</span>
            <PvTag severity="info" size="small">{{
              slotProps.option.filename.toLowerCase().includes('daily')
                ? i18n.t(`select.flowchart.type.daily`)
                : i18n.t(`select.flowchart.type.main`)
            }}</PvTag>
          </div>
        </template>
        <template #value="slotProps">
          <div v-if="slotProps.value">
            <span class="mr-2">{{ slotProps.value.filename }}&nbsp;</span>
            <PvTag severity="info" size="small">{{
              slotProps.value.filename.toLowerCase().includes('daily')
                ? i18n.t(`select.flowchart.type.daily`)
                : i18n.t(`select.flowchart.type.main`)
            }}</PvTag>
          </div>
          <div v-else>
            <span>{{ i18n.t('select.flowchart.placeholder') }}</span>
          </div>
        </template>
      </PvSelect>
      <PvDivider />
      <div class="mt-6">
        <FlowchartComp
          :flowchart-name="flowchartSelection ? flowchartSelection.filename : ''"
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
