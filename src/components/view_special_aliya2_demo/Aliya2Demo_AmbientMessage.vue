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
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
</script>

<template>
  <div class="special-comp-main">
    <p style="color: gray; text-align: center">
      “AmbientMessage”是一类特殊的消息，其在UI行为上指的是<b style="font-size: 1.5rem">小字消息</b
      >，起到类似系统消息或<b style="font-size: 1.5rem">“环境消息”</b
      >（例如Oleg的脑机接口的碎碎念）的作用。AmbientMessage通常使用<code>$md[type]{[消息内容]}</code>格式提供，其中type可为空，为空是则默认fallback到null（即ID="NULL"）；在目前的demo中，type用于指定AmbientMessage的文字颜色，如下所示。
    </p>
    <br />
    <PvDataTable :value="tableData" v-if="tableData.length > 0" style="width: 100%">
      <!-- Empty state -->
      <template #empty> 无数据 </template>

      <!-- Column 1: id -->
      <PvColumn field="id" header="ID" />

      <!-- Column 2: color block + RGB / HEX -->
      <PvColumn header="颜色">
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
          RGB({{ to255(slotProps.data.color.r) }}, {{ to255(slotProps.data.color.g) }},
          {{ to255(slotProps.data.color.b) }}) [{{
            rgbToHex(slotProps.data.color.r, slotProps.data.color.g, slotProps.data.color.b)
          }}]
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>暂无环境消息数据。</p>
  </div>
</template>
