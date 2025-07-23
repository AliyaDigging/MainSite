<script setup lang="ts">
import { useSiteSettingStore } from '@/stores/setting'
import FaqViewZhCn from './i18n/FaqViewZhCn.vue'
import FaqViewEnUs from './i18n/FaqViewEnUs.vue'

const setting = useSiteSettingStore()

const langComps = {
  zh_CN: FaqViewZhCn,
  en_US: FaqViewEnUs,
}
</script>

<template>
  <component :is="langComps[setting.sitelang]" />
</template>

<style scoped>
:deep(h2) {
  font-size: 30px;
  font-weight: 600;
}
</style>
