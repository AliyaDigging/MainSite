<script setup lang="ts">
import { useSiteSettingStore } from '@/stores/setting'
import { SiteLanguage, L10nLanguage } from '@/types/setting'
import PvSelect from 'primevue/select'
import PvDivider from 'primevue/divider'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

const setting = useSiteSettingStore()
const i18n = useI18n()
watch(
  () => setting.sitelang,
  (newValue) => {
    i18n.locale.value = newValue
  },
)
</script>

<template>
  <h2>{{ $t('comp.setting.h2.sitelang') }}</h2>
  <PvSelect
    v-model="setting.sitelang"
    :options="SiteLanguage"
    :optionLabel="(item) => i18n.t(`constant.sitelang.${item}`)"
    class="mt-2"
  ></PvSelect>
  <h2 class="mt-4">{{ $t('comp.setting.h2.l10nlang') }}</h2>
  <PvSelect
    v-model="setting.l10nlang"
    :options="L10nLanguage"
    :optionLabel="(item) => i18n.t(`constant.l10nlang.${item}`)"
    class="mt-2"
  ></PvSelect>
  <PvDivider />
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
}
</style>
