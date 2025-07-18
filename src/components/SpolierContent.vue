<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
</script>

<template>
  <Spolier :title="i18n.t('comp.spolier.title')">
    <slot></slot>
  </Spolier>
</template>

<style scope>
spolier {
  background-color: black;
  color: black;
  transition: color 0.1s ease-in-out;
}

spolier:hover {
  color: white;
}
</style>
