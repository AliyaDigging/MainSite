<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import FooterComp from './components/FooterComp.vue'
</script>

<template>
  <div style="position: sticky; top: 0">
    <NavMenu />
  </div>
  <div>
    <RouterView />
  </div>
  <FooterComp />
</template>

<style scoped></style>
