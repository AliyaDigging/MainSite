<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import FooterComp from './components/FooterComp.vue'

import DynamicDialog from 'primevue/dynamicdialog'
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
