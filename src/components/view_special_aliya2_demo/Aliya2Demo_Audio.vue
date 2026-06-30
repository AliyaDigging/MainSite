<script setup lang="ts">
import { computed, inject } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'

import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import type { AudioConfig_Entry } from '@/components/flowchart/aliya2_demo/types/script6'
import { AudioConfig_Entry_Category } from '@/components/flowchart/aliya2_demo/types/script6'

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
  return Object.entries(raw).map(([recordKey, entry]) => ({
    id: recordKey,
    entry,
  }))
})

// ── Helper: map category enum to display text ──
function categoryLabel(category: number): string {
  switch (category) {
    case AudioConfig_Entry_Category.BGM:
      return 'BGM'
    case AudioConfig_Entry_Category.SFX:
      return 'SFX'
    default:
      return `Unknown(${category})`
  }
}

// ── Helper: convert 0~1 volume to percentage string ──
function volumePercent(v: number): string {
  return `${Math.round(v * 100)}%`
}
</script>

<template>
  <div class="special-comp-main">
    <p style="color: gray; text-align: center">
      Aliya2代中包含<b style="font-size: 1.5rem">BGM与SFX</b
      >两类音频，这些文件亦由一个独立文件管理。由于Demo音频文件较少，为方便起见，本页的表格将混合显示BGM与SFX信息。
    </p>
    <br />
    <PvDataTable :value="tableData" v-if="tableData.length > 0" style="width: 100%">
      <!-- Empty state -->
      <template #empty> 无数据 </template>

      <!-- Column 1: id (record key) -->
      <PvColumn field="id" header="ID" />

      <!-- Column 2: category (mapped text BGM/SFX) -->
      <PvColumn header="类型">
        <template #body="slotProps">
          {{ categoryLabel(slotProps.data.entry.category) }}
        </template>
      </PvColumn>

      <!-- Column 3: clipFilename + audio preview -->
      <PvColumn header="音频文件 / 预览">
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
      <PvColumn header="参数">
        <template #body="slotProps">
          <ul>
            <li>
              defaultVolume: <code>{{ volumePercent(slotProps.data.entry.defaultVolume) }}</code>
            </li>
            <li>
              loop: <code>{{ slotProps.data.entry.loop }}</code>
            </li>
            <li>
              fadeInSeconds: <code>{{ slotProps.data.entry.fadeInSeconds }}</code>
            </li>
            <li>
              fadeOutSeconds: <code>{{ slotProps.data.entry.fadeOutSeconds }}</code>
            </li>
          </ul>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>暂无音频数据。</p>
  </div>
</template>
