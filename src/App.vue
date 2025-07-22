<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import FooterComp from './components/FooterComp.vue'

import DynamicDialog from 'primevue/dynamicdialog'
import { useSiteSettingStore } from './stores/setting'
import { watch } from 'vue'

const setting = useSiteSettingStore()

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

<style scoped></style>
