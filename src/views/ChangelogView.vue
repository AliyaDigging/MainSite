<script setup lang="ts">
import { useSiteSettingStore } from '@/stores/setting'
import ChangelogViewZhCn from './i18n/ChangelogViewZhCn.vue'
import ChangelogViewEnUs from './i18n/ChangelogViewEnUs.vue'

const setting = useSiteSettingStore()

const langComps = {
  zh_CN: ChangelogViewZhCn,
  en_US: ChangelogViewEnUs,
}
</script>

<template>
  <component :is="langComps[setting.sitelang]" />
</template>

<style scoped>
:deep(h2) {
  font-size: 1.6em;
  font-weight: 600;
}
</style>
