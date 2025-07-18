<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import FooterComp from './components/FooterComp.vue'
</script>

<template>
  <div class="">
    <div style="position: sticky; top: 0">
      <NavMenu />
    </div>
    <div>
      <RouterView />
    </div>
    <FooterComp />
  </div>
</template>

<style scoped></style>
