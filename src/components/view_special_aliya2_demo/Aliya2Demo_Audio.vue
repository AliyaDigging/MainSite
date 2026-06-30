<script setup lang="ts">
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'

import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import type { AudioConfig_Entry } from '@/components/flowchart/aliya2_demo/types/script6'
import { AudioConfig_Entry_Category } from '@/components/flowchart/aliya2_demo/types/script6'
import { gb18030Collator } from '@/utils/utils'

const i18n = useI18n()

// ── Inject data from parent ──
const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)

// ── Row type: record key + flattened entry ──
type TableRow = {
  id: string // record key from AudioConfig
  entry: AudioConfig_Entry
}

// ── Flatten Record<string, AudioConfig_Entry> into array of { id, entry } ──
const tableData = computed<TableRow[]>(() => {
  const raw = externalConfigData?.value?.audioConfig
  if (!raw) return []
  return Object.entries(raw)
    .map(([recordKey, entry]) => ({
      id: recordKey,
      entry,
    }))
    .sort((a, b) => gb18030Collator.compare(a.id, b.id))
})

// ── Helper: map category enum to display text ──
function categoryLabel(category: number): string {
  switch (category) {
    case AudioConfig_Entry_Category.BGM:
      return i18n.t('view.special.aliya2_demo.comp.audio.category.BGM')
    case AudioConfig_Entry_Category.SFX:
      return i18n.t('view.special.aliya2_demo.comp.audio.category.SFX')
    default:
      return i18n.t('view.special.aliya2_demo.comp.audio.category.unknown', { n: category })
  }
}

// ── Helper: convert 0~1 volume to percentage string ──
function volumePercent(v: number): string {
  return `${Math.round(v * 100)}%`
}
</script>

<template>
  <div class="special-comp-main">
    <p class="special-comp-main-desc" v-html="$t('view.special.aliya2_demo.comp.audio.desc')"></p>
    <br />
    <PvDataTable :value="tableData" v-if="tableData.length > 0" style="width: 100%">
      <!-- Empty state -->
      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.audio.DataTable.1.empty') }}
      </template>

      <!-- Column 1: id (record key) -->
      <PvColumn
        field="id"
        :header="$t('view.special.aliya2_demo.comp.audio.DataTable.1.column.1.title')"
      />

      <!-- Column 2: category (mapped text BGM/SFX) -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.audio.DataTable.1.column.2.title')">
        <template #body="slotProps">
          {{ categoryLabel(slotProps.data.entry.category) }}
        </template>
      </PvColumn>

      <!-- Column 3: clipFilename + audio preview -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.audio.DataTable.1.column.3.title')">
        <template #body="slotProps">
          <p style="margin-bottom: 8px">
            <code>{{ slotProps.data.entry.clipFilename }}</code>
          </p>
          <audio
            :src="`/aliya/aliya2_demo/audio/${slotProps.data.entry.clipFilename}`"
            controls
            style="width: 100%"
          />
        </template>
      </PvColumn>

      <!-- Column 4: Other params (volume, loop, fade in/out) -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.audio.DataTable.1.column.4.title')">
        <template #body="slotProps">
          <p>
            {{ $t('view.special.aliya2_demo.comp.audio.label.defaultVolume') }}
            {{ volumePercent(slotProps.data.entry.defaultVolume) }}
          </p>
          <p>
            {{ $t('view.special.aliya2_demo.comp.audio.label.loop') }}
            {{ $t(`comp.flowchart.aliya2_demo.flow.boolean.${slotProps.data.entry.loop}`) }}
          </p>
          <p>
            {{ $t('view.special.aliya2_demo.comp.audio.label.fadeInSeconds') }}
            {{ slotProps.data.entry.fadeInSeconds }}s
          </p>
          <p>
            {{ $t('view.special.aliya2_demo.comp.audio.label.fadeOutSeconds') }}
            {{ slotProps.data.entry.fadeOutSeconds }}s
          </p>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>{{ $t('view.special.aliya2_demo.comp.audio.noData') }}</p>
  </div>
</template>
