<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import FooterComp from './components/FooterComp.vue'

import DynamicDialog from 'primevue/dynamicdialog'
import { useSiteSettingStore } from './stores/setting'
import { watch, inject, computed } from 'vue'

import { symbolUseDark } from '@/constants/injection'

const setting = useSiteSettingStore()

const isDark = inject(symbolUseDark)!
const cssCodeBgColor = computed(() => (isDark.value ? '#4a1c1f' : '#fff5f5'))
const cssCodeTextColor = computed(() => (isDark.value ? '#ff6b6b' : '#dc3545'))

watch(
  () => setting.sitelang,
  () => setting.changeSiteLang(),
)
</script>

<template>
  <div>
    <DynamicDialog />

    <div style="position: fixed; top: 0; width: 100%; z-index: 10">
      <NavMenu />
    </div>
    <div style="margin-top: 58px">
      <RouterView />
    </div>
    <FooterComp />
  </div>
</template>

<style scoped>
:deep(code) {
  font-family: 'Noto Sans Mono', monospace !important;
  background-color: v-bind(cssCodeBgColor);
  padding: 2px 4px;
  border-radius: 4px;
  color: v-bind(cssCodeTextColor);
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
