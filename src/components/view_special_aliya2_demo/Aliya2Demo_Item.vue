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
  return Object.entries(items).map(([key, entry]) => {
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
})

const documentsTableData = computed<ItemTableRow[]>(() => {
  const items = itemData?.value?.documents
  if (!items) return []
  const l10n = l10nData?.value?.documents
  return Object.entries(items).map(([key, entry]) => {
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
    <p style="color: gray; text-align: center">
      早在2代的宣传图与商店介绍中，玩家便可注意到游戏中出现了特殊的<b style="font-size: 1.2rem"
        >文档/新闻类条目</b
      >信息。这些条目在底层是Articy Dialogue
      System中的一个Item，本页显示的便是这些Item的信息与对应L10N内容。
    </p>
    <Divider />
    <!-- ==================== News 表格 ==================== -->
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">News（新闻）</h2>
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
            <PvInputText v-model="newsFilters['global'].value" placeholder="搜索..." />
          </PvIconField>
        </div>
      </template>

      <!-- Empty state -->
      <template #empty> 无新闻数据 </template>

      <!-- Column 1: id -->
      <PvColumn field="id" header="ID" />

      <!-- Column 2: name (zh-cn / en-us) -->
      <PvColumn field="name_zh_cn" header="名称">
        <template #body="slotProps">
          <ul class="custom-node-normal-ul">
            <li>{{ slotProps.data.name['zh-cn'] }}</li>
            <li>{{ slotProps.data.name['en-us'] }}</li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 3: title (L10N) -->
      <PvColumn field="_title_zh_cn" header="标题(L10N)">
        <template #body="slotProps">
          <ul class="custom-node-normal-ul">
            <li>{{ slotProps.data.title?.['zh-cn'] ?? '—' }}</li>
            <li>{{ slotProps.data.title?.['en-us'] ?? '—' }}</li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 4: content (L10N) -->
      <PvColumn field="_content_zh_cn" header="内容(L10N)">
        <template #body="slotProps">
          <ul class="custom-node-normal-ul">
            <li v-html="replaceCharacter(slotProps.data.content?.['zh-cn'] ?? '—')"></li>
            <li v-html="replaceCharacter(slotProps.data.content?.['zh-cn'] ?? '—')"></li>
          </ul>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>暂无新闻数据。</p>

    <!-- ==================== Documents 表格 ==================== -->
    <Divider />
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">Documents（文件）</h2>
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
            <PvInputText v-model="docsFilters['global'].value" placeholder="搜索..." />
          </PvIconField>
        </div>
      </template>

      <!-- Empty state -->
      <template #empty> 无文件数据 </template>

      <!-- Column 1: id -->
      <PvColumn field="id" header="ID" />

      <!-- Column 2: name (zh-cn / en-us) -->
      <PvColumn field="name_zh_cn" header="名称">
        <template #body="slotProps">
          <ul class="custom-node-normal-ul">
            <li>{{ slotProps.data.name['zh-cn'] }}</li>
            <li>{{ slotProps.data.name['en-us'] }}</li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 3: title (L10N) -->
      <PvColumn field="_title_zh_cn" header="标题(L10N)">
        <template #body="slotProps">
          <ul class="custom-node-normal-ul">
            <li>{{ slotProps.data.title?.['zh-cn'] ?? '—' }}</li>
            <li>{{ slotProps.data.title?.['en-us'] ?? '—' }}</li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 4: content (L10N) -->
      <PvColumn field="_content_zh_cn" header="内容(L10N)">
        <template #body="slotProps">
          <ul class="custom-node-normal-ul">
            <li v-html="replaceCharacter(slotProps.data.content?.['zh-cn'] ?? '—')"></li>
            <li v-html="replaceCharacter(slotProps.data.content?.['en-us'] ?? '—')"></li>
          </ul>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>暂无文件数据。</p>
  </div>
</template>
