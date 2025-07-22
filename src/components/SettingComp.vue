<script setup lang="ts">
import { useSiteSettingStore } from '@/stores/setting'
import { SiteLanguage, L10nLanguage } from '@/types/setting'
import PvSelect from 'primevue/select'
import PvDivider from 'primevue/divider'
import PvInputText from 'primevue/inputtext'
import PvToggleButton from 'primevue/togglebutton'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import { useAliyaStore } from '@/stores/aliya'

const setting = useSiteSettingStore()
const aliyaSetting = useAliyaStore()
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
  <h2>{{ $t('comp.setting.h2.playername') }}</h2>
  <PvInputText type="text" v-model="aliyaSetting.playerName" class="mt-2" />
  <h2 class="mt-4">{{ $t('comp.setting.h2.showformatted') }}</h2>
  <p>{{ $t('comp.setting.showformatted.p1') }}</p>
  <PvToggleButton
    v-model="aliyaSetting.showFormattedString"
    :onLabel="i18n.t('constant.boolean.toggler.true')"
    :offLabel="i18n.t('constant.boolean.toggler.false')"
    class="mt-2"
  />
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
