<script setup lang="ts">
import { computed, inject, ref } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import PvInputText from 'primevue/inputtext'
import PvIconField from 'primevue/iconfield'
import PvInputIcon from 'primevue/inputicon'

import { symbolItemData_Aliya2Demo, symbolL10nAllLangData_Aliya2Demo } from '@/constants/injection'
import { Divider } from 'primevue'
import { gb18030Collator } from '@/utils/utils'

// ── Inject data from parent ──
const itemData = inject(symbolItemData_Aliya2Demo)
const l10nData = inject(symbolL10nAllLangData_Aliya2Demo)

// ── Filter state ──
const newsFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const docsFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// ── Flattened table data ──
// Global filter can't search into nested objects, so we flatten
// zh-cn and en-us values into top-level keys.
type ItemTableRow = {
  id: string
  name_en_us: string
  name_zh_cn: string
  name: { 'en-us': string; 'zh-cn': string }
  title: Record<string, string> | null
  content: Record<string, string> | null
  _title_zh_cn: string
  _title_en_us: string
  _content_zh_cn: string
  _content_en_us: string
}

const newsTableData = computed<ItemTableRow[]>(() => {
  const items = itemData?.value?.news
  if (!items) return []
  const l10n = l10nData?.value?.news
  return Object.entries(items)
    .map(([key, entry]) => {
      const titleObj = l10n?.title?.[key] ?? null
      const contentObj = l10n?.content?.[key] ?? null
      return {
        id: key,
        name_en_us: entry.name['en-us'],
        name_zh_cn: entry.name['zh-cn'],
        name: entry.name,
        title: titleObj,
        content: contentObj,
        _title_zh_cn: titleObj?.['zh-cn'] ?? '',
        _title_en_us: titleObj?.['en-us'] ?? '',
        _content_zh_cn: contentObj?.['zh-cn'] ?? '',
        _content_en_us: contentObj?.['en-us'] ?? '',
      }
    })
    .sort((a, b) => gb18030Collator.compare(a.id, b.id))
})

const documentsTableData = computed<ItemTableRow[]>(() => {
  const items = itemData?.value?.documents
  if (!items) return []
  const l10n = l10nData?.value?.documents
  return Object.entries(items)
    .map(([key, entry]) => {
      const titleObj = l10n?.title?.[key] ?? null
      const contentObj = l10n?.content?.[key] ?? null
      return {
        id: key,
        name_en_us: entry.name['en-us'],
        name_zh_cn: entry.name['zh-cn'],
        name: entry.name,
        title: titleObj,
        content: contentObj,
        _title_zh_cn: titleObj?.['zh-cn'] ?? '',
        _title_en_us: titleObj?.['en-us'] ?? '',
        _content_zh_cn: contentObj?.['zh-cn'] ?? '',
        _content_en_us: contentObj?.['en-us'] ?? '',
      }
    })
    .sort((a, b) => gb18030Collator.compare(a.id, b.id))
})

// Fields the global search should match against
const newsGlobalFilterFields = [
  'id',
  'name_zh_cn',
  'name_en_us',
  '_title_zh_cn',
  '_title_en_us',
  '_content_zh_cn',
  '_content_en_us',
]
const docsGlobalFilterFields = [
  'id',
  'name_zh_cn',
  'name_en_us',
  '_title_zh_cn',
  '_title_en_us',
  '_content_zh_cn',
  '_content_en_us',
]

function replaceCharacter(text: string) {
  return String(text).replace(/\n\n/g, '<br />')
}
</script>

<template>
  <div class="special-comp-main">
    <p class="special-comp-main-desc" v-html="$t('view.special.aliya2_demo.comp.item.desc')"></p>
    <Divider />
    <!-- ==================== News 表格 ==================== -->
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">
      {{ $t('view.special.aliya2_demo.comp.item.section.news') }}
    </h2>
    <PvDataTable
      :value="newsTableData"
      v-if="newsTableData.length > 0"
      v-model:filters="newsFilters"
      :globalFilterFields="newsGlobalFilterFields"
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
              v-model="newsFilters['global'].value"
              :placeholder="$t('view.special.aliya2_demo.comp.item.DataTable.1.searchPlaceholder')"
            />
          </PvIconField>
        </div>
      </template>

      <!-- Empty state -->
      <template #empty> {{ $t('view.special.aliya2_demo.comp.item.DataTable.1.empty') }} </template>

      <!-- Column 1: id -->
      <PvColumn
        field="id"
        :header="$t('view.special.aliya2_demo.comp.item.DataTable.1.column.1.title')"
      />

      <!-- Column 2: name (zh-cn / en-us) -->
      <!-- COMMENTED OUT, for it duplicated with the title
      <PvColumn
        field="name_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.item.DataTable.1.column.2.title')"
      >
        <template #body="slotProps">
          <p>{{ slotProps.data.name['zh-cn'] }}</p>
          <p>{{ slotProps.data.name['en-us'] }}</p>
        </template>
      </PvColumn>
      -->

      <!-- Column 3: title (L10N) -->
      <PvColumn
        field="_title_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.item.DataTable.1.column.3.title')"
      >
        <template #body="slotProps">
          <p>{{ slotProps.data.title?.['zh-cn'] ?? '—' }}</p>
          <p>{{ slotProps.data.title?.['en-us'] ?? '—' }}</p>
        </template>
      </PvColumn>

      <!-- Column 4: content (L10N) -->
      <PvColumn
        field="_content_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.item.DataTable.1.column.4.title')"
      >
        <template #body="slotProps">
          <ul class="custom-node-normal-ul">
            <li v-html="replaceCharacter(slotProps.data.content?.['zh-cn'] ?? '—')"></li>
            <li v-html="replaceCharacter(slotProps.data.content?.['en-us'] ?? '—')"></li>
          </ul>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>{{ $t('view.special.aliya2_demo.comp.item.noData1') }}</p>

    <!-- ==================== Documents 表格 ==================== -->
    <Divider />
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">
      {{ $t('view.special.aliya2_demo.comp.item.section.documents') }}
    </h2>
    <PvDataTable
      :value="documentsTableData"
      v-if="documentsTableData.length > 0"
      v-model:filters="docsFilters"
      :globalFilterFields="docsGlobalFilterFields"
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
              v-model="docsFilters['global'].value"
              :placeholder="$t('view.special.aliya2_demo.comp.item.DataTable.2.searchPlaceholder')"
            />
          </PvIconField>
        </div>
      </template>

      <!-- Empty state -->
      <template #empty> {{ $t('view.special.aliya2_demo.comp.item.DataTable.2.empty') }} </template>

      <!-- Column 1: id -->
      <PvColumn
        field="id"
        :header="$t('view.special.aliya2_demo.comp.item.DataTable.2.column.1.title')"
      />

      <!-- Column 2: name (zh-cn / en-us) -->
      <!-- COMMENTED OUT, for it duplicated with the title
      <PvColumn
        field="name_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.item.DataTable.2.column.2.title')"
      >
        <template #body="slotProps">
          <p>{{ slotProps.data.name['zh-cn'] }}</p>
          <p>{{ slotProps.data.name['en-us'] }}</p>
        </template>
      </PvColumn>
      -->

      <!-- Column 3: title (L10N) -->
      <PvColumn
        field="_title_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.item.DataTable.2.column.3.title')"
      >
        <template #body="slotProps">
          <p>{{ slotProps.data.title?.['zh-cn'] ?? '—' }}</p>
          <p>{{ slotProps.data.title?.['en-us'] ?? '—' }}</p>
        </template>
      </PvColumn>

      <!-- Column 4: content (L10N) -->
      <PvColumn
        field="_content_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.item.DataTable.2.column.4.title')"
      >
        <template #body="slotProps">
          <ul class="custom-node-normal-ul">
            <li v-html="replaceCharacter(slotProps.data.content?.['zh-cn'] ?? '—')"></li>
            <li v-html="replaceCharacter(slotProps.data.content?.['en-us'] ?? '—')"></li>
          </ul>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>{{ $t('view.special.aliya2_demo.comp.item.noData2') }}</p>
  </div>
</template>
