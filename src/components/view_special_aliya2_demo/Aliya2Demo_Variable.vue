<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import PvInputText from 'primevue/inputtext'
import PvIconField from 'primevue/iconfield'
import PvInputIcon from 'primevue/inputicon'

import { symbolVariableData_Aliya2Demo } from '@/constants/injection'
import type { Variable_Entry } from '@/components/flowchart/aliya2_demo/types/script7'

const { t } = useI18n()

// ── Inject data from parent ──
const variableData = inject(symbolVariableData_Aliya2Demo)

// ── Paginator state ──
const rows = ref(10)

// ── Filter state ──
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// ── Flattened table data ──
// VariableData is Record<string, Variable_Entry>, convert to array.
const tableData = computed<Variable_Entry[]>(() => {
  const raw = variableData?.value
  if (!raw) return []
  return Object.values(raw)
})

// Fields the global search should match against
const globalFilterFields = ['name', 'type', 'initValue']
</script>

<template>
  <div class="special-comp-main">
    <p style="color: gray; text-align: center">
      在Aliya2中，游戏使用了Articy Dialogue
      System用作游戏的主要聊天与对话系统，而在这套系统框架中，创作者及程序必须定义多种<b
        style="font-size: 1.5rem"
        >变量</b
      >才能实现条件判断等功能。本页显示的是在Articy系统内定义的所有变量。
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

      <!-- Column 1: name -->
      <PvColumn field="name" header="名称">
        <template #body="slotProps">{{ slotProps.data.name }}</template>
      </PvColumn>

      <!-- Column 2: initValue -->
      <PvColumn field="initValue" header="初始值">
        <template #body="slotProps">
          <code>{{ slotProps.data.initValue }}</code>
        </template>
      </PvColumn>

      <!-- Column 3: type -->
      <PvColumn field="type" :header="t('comp.flowchart.aliya2_demo.variable.table.header.type')" />
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>暂无变量数据。</p>
  </div>
</template>
