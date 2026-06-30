<script setup lang="ts">
import { computed, inject } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'

import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import type { AmbientMessageConfig_Entry } from '@/components/flowchart/aliya2_demo/types/script6'

// ── Inject data from parent ──
const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)

// ── Flattened table data ──
const tableData = computed<AmbientMessageConfig_Entry[]>(() => {
  const raw = externalConfigData?.value?.ambientMessage
  if (!raw) return []
  return Object.values(raw)
})

// ── Utility: RGB 0~1 float → 0~255 integer ──
function to255(v: number): number {
  return Math.round(v * 255)
}

// ── Utility: RGB 0~1 float → HEX ──
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => to255(n).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}
</script>

<template>
  <div class="special-comp-main">
    <p
      class="special-comp-main-desc"
      v-html="$t('view.special.aliya2_demo.comp.ambient_message.desc')"
    ></p>
    <br />
    <PvDataTable :value="tableData" v-if="tableData.length > 0" style="width: 100%">
      <!-- Empty state -->
      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.ambient_message.DataTable.1.empty') }}
      </template>

      <!-- Column 1: id -->
      <PvColumn
        field="id"
        :header="$t('view.special.aliya2_demo.comp.ambient_message.DataTable.1.column.1.title')"
      />

      <!-- Column 2: color block + RGB / HEX -->
      <PvColumn
        :header="$t('view.special.aliya2_demo.comp.ambient_message.DataTable.1.column.2.title')"
      >
        <template #body="slotProps">
          <span
            :style="{
              color: `rgb(${to255(slotProps.data.color.r)}, ${to255(slotProps.data.color.g)}, ${to255(slotProps.data.color.b)})`,
              backgroundColor: '#fff',
              display: 'inline-block',
              padding: '4px 2px',
            }"
            >█</span
          >
          <br />
          <span style="display: inline-block; margin-top: 8px"
            >RGB({{ to255(slotProps.data.color.r) }}, {{ to255(slotProps.data.color.g) }},
            {{ to255(slotProps.data.color.b) }}) [{{
              rgbToHex(slotProps.data.color.r, slotProps.data.color.g, slotProps.data.color.b)
            }}]</span
          >
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>{{ $t('view.special.aliya2_demo.comp.ambient_message.noData') }}</p>
  </div>
</template>
