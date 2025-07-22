<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
</script>

<template>
  <spolier :title="i18n.t('comp.spolier.title')">
    <slot></slot>
  </spolier>
</template>

<style scope></style>
