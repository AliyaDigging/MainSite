<script setup lang="ts">
import PvSelect from 'primevue/select'
import PvTag from 'primevue/tag'
import PvDivider from 'primevue/divider'
import { flowchartOptions, type FlowchartOption } from '@/constants/flowcharts'
import { useI18n } from 'vue-i18n'
import { ref, watch, provide, useTemplateRef } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

import FlowchartComp from '@/components/flowchart/FlowchartComp.vue'
import { type L10nCsvSingleLang } from '@/types/data_script7'
import { useSiteSettingStore } from '@/stores/setting'
import { symbolL10nDataSingleLang } from '@/constants/injection'
import { getJson } from '@/utils/fetch'

const props = defineProps({
  flowchartName: {
    type: String,
    default: '',
  },
})

const i18n = useI18n()
const flowchartSelection = ref<FlowchartOption>()

const setting = useSiteSettingStore()

const dataL10n = ref<L10nCsvSingleLang>({})
provide(symbolL10nDataSingleLang, dataL10n)

const isReady = ref(false)

const flowchartRef = useTemplateRef('flowchartComp')

watch(
  () => setting.l10nlang,
  async (newValue, oldValue) => {
    dataL10n.value = await getJson<L10nCsvSingleLang>(`/data/localization/${newValue}.json`, 5)
    isReady.value = true

    if (oldValue && flowchartRef.value) {
      flowchartRef.value.triggerRelayout()
    }
  },
  { immediate: true },
)
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
      <PvSelect
        v-model="flowchartSelection"
        :options="flowchartOptions"
        :option-label="(i) => i18n.t(i.localizedNameKey)"
      >
        <template #option="slotProps">
          <div>
            <span class="mr-2">{{ i18n.t(slotProps.option.localizedNameKey) }}</span>
            <PvTag severity="info">{{
              i18n.t(`select.flowchart.type.${slotProps.option.type}`)
            }}</PvTag>
          </div>
        </template>
        <template #value="slotProps">
          <div v-if="slotProps.value">
            <span class="mr-2">{{ i18n.t(slotProps.value.localizedNameKey) }}</span>
            <PvTag severity="info">{{
              i18n.t(`select.flowchart.type.${slotProps.value.type}`)
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
          :flowchart-name="flowchartSelection ? flowchartSelection.value : ''"
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
