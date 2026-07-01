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
    <p class="special-comp-main-desc" v-html="$t('view.special.aliya2_demo.comp.actor.desc')"></p>
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
            <PvInputText
              v-model="filters['global'].value"
              :placeholder="$t('view.special.aliya2_demo.comp.actor.DataTable.1.searchPlaceholder')"
            />
          </PvIconField>
        </div>
      </template>

      <!-- Empty state -->
      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.actor.DataTable.1.empty') }}
      </template>

      <!-- Column 1: id -->
      <PvColumn
        field="id"
        :header="$t('view.special.aliya2_demo.comp.actor.DataTable.1.column.1.title')"
      />

      <!-- Column 2: name (zh-cn / en-us) -->
      <PvColumn
        field="_name_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.actor.DataTable.1.column.2.title')"
      >
        <template #body="slotProps">
          <p>
            {{ $t('view.special.aliya2_demo.comp.actor.label.zhCn') }}
            {{ slotProps.data.name['zh-cn'] }}
          </p>
          <p>
            {{ $t('view.special.aliya2_demo.comp.actor.label.enUs') }}
            {{ slotProps.data.name['en-us'] }}
          </p>
        </template>
      </PvColumn>

      <!-- Column 3: description -->
      <PvColumn
        field="description"
        :header="$t('view.special.aliya2_demo.comp.actor.DataTable.1.column.3.title')"
      />

      <!-- Column 4: isPlayer / isNPC -->
      <PvColumn
        field="isPlayer"
        :header="$t('view.special.aliya2_demo.comp.actor.DataTable.1.column.4.title')"
      >
        <template #body="slotProps">
          <p :style="{ 'font-weight': slotProps.data.isPlayer ? '600' : 'normal' }">
            {{ $t('view.special.aliya2_demo.comp.actor.label.isPlayer') }}
            {{ $t(`comp.flowchart.aliya2_demo.flow.boolean.${slotProps.data.isPlayer}`) }}
          </p>
          <p :style="{ 'font-weight': slotProps.data.isNPC ? '600' : 'normal' }">
            {{ $t('view.special.aliya2_demo.comp.actor.label.isNPC') }}
            {{ $t(`comp.flowchart.aliya2_demo.flow.boolean.${slotProps.data.isNPC}`) }}
          </p>
        </template>
      </PvColumn>

      <!-- Column 5: articyId / technicalName -->
      <PvColumn
        field="articyId"
        :header="$t('view.special.aliya2_demo.comp.actor.DataTable.1.column.5.title')"
      >
        <template #body="slotProps">
          <p>
            {{ $t('view.special.aliya2_demo.comp.actor.label.articyId') }}
            <code>{{ slotProps.data.articyId }}</code>
          </p>
          <p>
            {{ $t('view.special.aliya2_demo.comp.actor.label.technicalName') }}
            <code>{{ slotProps.data.technicalName }}</code>
          </p>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>{{ $t('view.special.aliya2_demo.comp.actor.noData') }}</p>
  </div>
</template>
