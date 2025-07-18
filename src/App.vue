<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import FooterComp from './components/FooterComp.vue'
</script>

<template>
  <div>
    <div style="position: fixed; top: 0; width: 100%; z-index: 20000">
      <NavMenu />
    </div>
    <div style="margin-top: 58px">
      <RouterView />
    </div>
    <FooterComp />
  </div>
</template>

<style scoped></style>
