<script setup lang="ts">
import DeferredContent from 'primevue/deferredcontent'
import PvDivider from 'primevue/divider'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'

import { resourceImages, resourceMusic } from '@/constants/resource_list'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">{{ $t('view.res.h1') }}</h1>
    <p class="view-page-h1-desc text-color mb-2" style="font-size: 1.2em">
      {{ $t('view.res.p.1') }}
    </p>
    <PvDivider />
    <h2 class="text-black mb-2">{{ $t('view.res.h2.1') }}</h2>
    <PvDataTable :value="resourceMusic">
      <PvColumn field="filename" :header="i18n.t('view.res.col.name')"></PvColumn>
      <PvColumn field="url" :header="i18n.t('view.res.col.url')">
        <template #body="slotProps">
          <audio :src="slotProps.data.url" width="100%" controls></audio>
        </template>
      </PvColumn>
    </PvDataTable>
    <PvDivider />
    <h2 class="text-black">{{ $t('view.res.h2.2') }}</h2>
    <PvDataTable :value="resourceImages">
      <PvColumn field="filename" :header="i18n.t('view.res.col.name')"></PvColumn>
      <PvColumn field="url" :header="i18n.t('view.res.col.url')">
        <template #body="slotProps">
          <DeferredContent>
            <img :src="slotProps.data.url" width="100%" />
          </DeferredContent>
        </template>
      </PvColumn>
    </PvDataTable>
  </div>
</template>

<style scoped>
h2 {
  font-size: 30px;
  font-weight: 600;
}
</style>
