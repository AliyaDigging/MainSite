<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
</script>

<template>
  <ProgressSpinner
    style="width: 70px; height: 70px"
    strokeWidth="5"
    fill="transparent"
    animationDuration="1.0s"
  />
  <div class="mt-4">
    <p style="font-weight: 800; font-size: 20px">{{ $t('view.[any].p.loading') }}</p>
    <p>{{ $t('view.[any].p.loading2') }}</p>
  </div>
</template>
