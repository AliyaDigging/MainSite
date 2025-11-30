<script setup lang="ts">
import type { AllDataCatalogEntry } from '@/types/allDataCatalog'
import { inject, onMounted, ref } from 'vue'

const dialogRef = inject('dialogRef')
const data = ref<AllDataCatalogEntry['versions'][number]>(
  {} as AllDataCatalogEntry['versions'][number],
)

onMounted(() => {
  // @ts-expect-error for some reason it thinks it's un-refed but actually it is ref
  data.value = dialogRef!.value.data.data as AllDataCatalogEntry['versions'][number]
})
</script>

<template>
  <p>
    {{ $t('comp.gameandversionselector.extrainfo.id') }}: <code>{{ data.id }}</code>
  </p>
  <p>
    {{ $t('comp.gameandversionselector.extrainfo.update_time') }}:
    <code>{{ data.update_time }}</code>
  </p>
  <p>
    {{ $t('comp.gameandversionselector.extrainfo.extra_info') }}: <code>{{ data.extra_info }}</code>
  </p>
</template>

<style scoped>
p {
  font-size: 1rem;
}
</style>
