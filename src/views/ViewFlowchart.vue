<script setup lang="ts">
import PvSelect from 'primevue/select'
import PvTag from 'primevue/tag'
import { flowchartOptions, type FlowchartOption } from '@/constants/flowcharts'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const props = defineProps({
  flowchartName: {
    type: String,
    default: '',
  },
})

const i18n = useI18n()
const flowchartSelection = ref<FlowchartOption>()
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">查看流程图</h1>
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
  </div>
</template>

<style scoped>
p {
  font-size: 1.2em;
}
</style>
