<script setup lang="ts">
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import DeferredContent from 'primevue/deferredcontent'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import PvTag from 'primevue/tag'

const props = defineProps({
  resourceMusic: {
    type: Array as PropType<{ filename: string; url: string }[]>,
    required: true,
  },
  resourceImages: {
    type: Array as PropType<{ filename: string; url: string }[]>,
    required: true,
  },
})

const i18n = useI18n()
</script>

<template>
  <h2 class="text-black mb-2 mt-8">{{ $t('view.res.h2.1') }}</h2>
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
  <p class="mt-2 mb-4">{{ $t('view.res.images.desc.1') }}</p>
  <PvDataTable :value="resourceImages">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')">
      <template #body="slotProps">
        <span>{{ slotProps.data.filename }}</span>
        <template v-if="slotProps.data.filename.includes('.1')">
          <br />
          <PvTag severity="info" class="mt-1">{{ $t('view.res.col.name.tag.1') }}</PvTag>
        </template>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" width="100%" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
</template>
