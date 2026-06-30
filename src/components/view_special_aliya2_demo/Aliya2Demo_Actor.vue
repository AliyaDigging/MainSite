<script setup lang="ts">
import { computed, inject, ref } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import PvInputText from 'primevue/inputtext'
import PvIconField from 'primevue/iconfield'
import PvInputIcon from 'primevue/inputicon'

import { symbolActorData_Aliya2Demo } from '@/constants/injection'
import type { Actor_Entry } from '@/components/flowchart/aliya2_demo/types/script7'

// ── Inject data from parent ──
const actorData = inject(symbolActorData_Aliya2Demo)

// ── Filter state ──
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// ── Flattened table data ──
// Global filter can't search into nested `name` object, so we flatten
// zh-cn and en-us names into top-level keys.
type TableRow = Actor_Entry & {
  _name_zh_cn: string
  _name_en_us: string
}

const tableData = computed<TableRow[]>(() => {
  const raw = actorData?.value
  if (!raw) return []
  return Object.values(raw).map((entry) => ({
    ...entry,
    _name_zh_cn: entry.name['zh-cn'],
    _name_en_us: entry.name['en-us'],
  }))
})

// Fields the global search should match against
const globalFilterFields = [
  'id',
  '_name_zh_cn',
  '_name_en_us',
  'description',
  'articyId',
  'technicalName',
]
</script>

<template>
  <div class="special-comp-main">
    <p style="color: gray; text-align: center">
      底层上，Aliya2代使用了Articy Dialogue
      System作为对话故事系统。在该系统中，为了能正确标识“说话人”（speaker）并以此正确配置故事脚本，编剧必须定义<b
        style="font-size: 1.5rem"
        >演员 (actor)</b
      >。以下列表显示自解包文件中导出的所有Articy
      Actor信息；需要注意的是这些Actor没有头像，对于部分Actor的头像等信息，参见<i
        style="font-size: 1.5rem"
        >聊天对话信息</i
      >。
    </p>
    <br />
    <PvDataTable
      :value="tableData"
      v-if="tableData.length > 0"
      v-model:filters="filters"
      :globalFilterFields="globalFilterFields"
      style="width: 100%"
    >
      <!-- Header: search bar -->
      <template #header>
        <div class="flex justify-end">
          <PvIconField>
            <PvInputIcon>
              <i class="pi pi-search" />
            </PvInputIcon>
            <PvInputText v-model="filters['global'].value" placeholder="搜索..." />
          </PvIconField>
        </div>
      </template>

      <!-- Empty state -->
      <template #empty> 无数据 </template>

      <!-- Column 1: id -->
      <PvColumn field="id" header="ID" />

      <!-- Column 2: name (zh-cn / en-us) -->
      <PvColumn field="_name_zh_cn" header="名称">
        <template #body="slotProps">
          <ul>
            <li>
              zh-cn: <code>{{ slotProps.data.name['zh-cn'] }}</code>
            </li>
            <li>
              en-us: <code>{{ slotProps.data.name['en-us'] }}</code>
            </li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 3: description -->
      <PvColumn field="description" header="描述" />

      <!-- Column 4: isPlayer / isNPC -->
      <PvColumn field="isPlayer" header="角色类型">
        <template #body="slotProps">
          <ul>
            <li>
              isPlayer: <code>{{ slotProps.data.isPlayer }}</code>
            </li>
            <li>
              isNPC: <code>{{ slotProps.data.isNPC }}</code>
            </li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 5: articyId / technicalName -->
      <PvColumn field="articyId" header="Articy ID / 技术名">
        <template #body="slotProps">
          <ul>
            <li>
              articyId: <code>{{ slotProps.data.articyId }}</code>
            </li>
            <li>
              technicalName: <code>{{ slotProps.data.technicalName }}</code>
            </li>
          </ul>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>暂无角色数据。</p>
  </div>
</template>
