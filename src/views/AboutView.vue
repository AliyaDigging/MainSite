<script setup lang="ts">
import { useSiteSettingStore } from '@/stores/setting'
import AboutViewZhCn from './i18n/AboutViewZhCn.vue'
import AboutViewEnUs from './i18n/AboutViewEnUs.vue'

const setting = useSiteSettingStore()

const langComps = {
  zh_CN: AboutViewZhCn,
  en_US: AboutViewEnUs,
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
