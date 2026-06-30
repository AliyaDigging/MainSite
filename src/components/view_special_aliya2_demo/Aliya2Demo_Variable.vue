<script setup lang="ts">
import { computed, inject, ref } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import PvInputText from 'primevue/inputtext'
import PvIconField from 'primevue/iconfield'
import PvInputIcon from 'primevue/inputicon'

import { symbolVariableData_Aliya2Demo } from '@/constants/injection'
import type { Variable_Entry } from '@/components/flowchart/aliya2_demo/types/script7'
import { gb18030Collator } from '@/utils/utils'

// ── Inject data from parent ──
const variableData = inject(symbolVariableData_Aliya2Demo)

// ── Filter state ──
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// ── Flattened table data ──
// VariableData is Record<string, Variable_Entry>, convert to array.
const tableData = computed<Variable_Entry[]>(() => {
  const raw = variableData?.value
  if (!raw) return []
  return Object.values(raw).sort((a, b) => gb18030Collator.compare(a.name, b.name))
})

// Fields the global search should match against
const globalFilterFields = ['name', 'type', 'initValue']
</script>

<template>
  <div class="special-comp-main">
    <p
      class="special-comp-main-desc"
      v-html="$t('view.special.aliya2_demo.comp.variable.desc')"
    ></p>
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
              :placeholder="
                $t('view.special.aliya2_demo.comp.variable.DataTable.1.searchPlaceholder')
              "
            />
          </PvIconField>
        </div>
      </template>

      <!-- Empty state -->
      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.variable.DataTable.1.empty') }}
      </template>

      <!-- Column 1: name -->
      <PvColumn
        field="name"
        :header="$t('view.special.aliya2_demo.comp.variable.DataTable.1.column.1.title')"
      >
        <template #body="slotProps">{{ slotProps.data.name }}</template>
      </PvColumn>

      <!-- Column 2: initValue -->
      <PvColumn
        field="initValue"
        :header="$t('view.special.aliya2_demo.comp.variable.DataTable.1.column.2.title')"
      >
        <template #body="slotProps">
          <code>{{ slotProps.data.initValue }}</code>
        </template>
      </PvColumn>

      <!-- Column 3: type -->
      <PvColumn
        field="type"
        :header="$t('view.special.aliya2_demo.comp.variable.DataTable.1.column.3.title')"
      />
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>{{ $t('view.special.aliya2_demo.comp.variable.noData') }}</p>
  </div>
</template>
