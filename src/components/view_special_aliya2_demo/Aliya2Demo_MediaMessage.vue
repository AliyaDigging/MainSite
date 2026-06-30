<script setup lang="ts">
import { computed, inject } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'

import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import { DeferredContent } from 'primevue'
import { gb18030Collator } from '@/utils/utils'

// ── Inject data from parent ──
const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)

// ── Flatten images Record → array ──
const imagesData = computed(() => {
  const raw = externalConfigData?.value?.mediaMessageConfig?.images
  if (!raw) return []
  return Object.values(raw).sort((a, b) =>
    gb18030Collator.compare(a.imageFilename, b.imageFilename),
  )
})

// ── Flatten emojis Record → array ──
const emojisData = computed(() => {
  const raw = externalConfigData?.value?.mediaMessageConfig?.emojis
  if (!raw) return []
  return Object.values(raw).sort((a, b) =>
    gb18030Collator.compare(a.imageFilename, b.imageFilename),
  )
})
</script>

<template>
  <div class="special-comp-main">
    <p
      class="special-comp-main-desc"
      v-html="$t('view.special.aliya2_demo.comp.media_message.desc')"
    ></p>
    <br />
    <!-- ── Images DataTable ── -->
    <PvDataTable :value="imagesData" v-if="imagesData.length > 0" style="width: 100%">
      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.media_message.DataTable.1.empty') }}
      </template>

      <PvColumn
        field="id"
        :header="$t('view.special.aliya2_demo.comp.media_message.DataTable.1.column.1.title')"
      />

      <PvColumn
        :header="$t('view.special.aliya2_demo.comp.media_message.DataTable.1.column.2.title')"
      >
        <template #body="slotProps">
          <p style="margin-bottom: 8px">
            <code>{{ slotProps.data.imageFilename }}</code>
          </p>
          <DeferredContent>
            <img
              :src="`/aliya/aliya2_demo/images/${slotProps.data.imageFilename}`"
              :alt="slotProps.data.id"
            />
          </DeferredContent>
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>{{ $t('view.special.aliya2_demo.comp.media_message.noData1') }}</p>

    <!-- ── Emojis DataTable ── -->
    <PvDataTable
      :value="emojisData"
      v-if="emojisData.length > 0"
      style="width: 100%; margin-top: 24px"
    >
      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.media_message.DataTable.2.empty') }}
      </template>

      <PvColumn
        field="id"
        :header="$t('view.special.aliya2_demo.comp.media_message.DataTable.2.column.1.title')"
      />

      <PvColumn
        :header="$t('view.special.aliya2_demo.comp.media_message.DataTable.2.column.2.title')"
      >
        <template #body="slotProps">
          <p style="margin-bottom: 8px">
            <code>{{ slotProps.data.imageFilename }}</code>
          </p>
          <DeferredContent>
            <img
              :src="`/aliya/aliya2_demo/images/${slotProps.data.imageFilename}`"
              :alt="slotProps.data.id"
            />
          </DeferredContent>
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>{{ $t('view.special.aliya2_demo.comp.media_message.noData2') }}</p>
  </div>
</template>
