<script setup lang="ts">
import { computed, inject, ref } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import PvInputText from 'primevue/inputtext'
import PvIconField from 'primevue/iconfield'
import PvInputIcon from 'primevue/inputicon'

import PvAccordion from 'primevue/accordion'
import PvAccordionPanel from 'primevue/accordionpanel'
import PvAccordionHeader from 'primevue/accordionheader'
import PvAccordionContent from 'primevue/accordioncontent'

import {
  symbolExternalConfig_Aliya2Demo,
  symbolL10nAllLangData_Aliya2Demo,
} from '@/constants/injection'

import type { SearchConfig_Search_Entry } from '@/components/flowchart/aliya2_demo/types/script6'
import { gb18030Collator } from '@/utils/utils'

// ── Inject data from parent ──
const externalConfig = inject(symbolExternalConfig_Aliya2Demo)
const l10nAllLangData = inject(symbolL10nAllLangData_Aliya2Demo)

// ── Filter state ──
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// ── Flattened table data ──
// Global filter can't search into nested objects/arrays, so we flatten
// keywords and L10N titles/contents into top-level string keys.
type TableRow = {
  keywords: SearchConfig_Search_Entry['keywords']
  documentIds: string[]
  _keywords_zh_cn: string
  _keywords_en_us: string
  _doc_titles: string
  _doc_contents: string
}

const tableData = computed<TableRow[]>(() => {
  const raw = externalConfig?.value?.searchConfig
  if (!raw || !Array.isArray(raw)) return []

  const l10nDocs = l10nAllLangData?.value?.documents

  return raw
    .map((entry) => {
      // Flatten keywords for global filter
      const kwZhCn = entry.keywords['zh-cn'].join('、')
      const kwEnUs = entry.keywords['en-us'].join('、')

      // Flatten document titles & contents for global filter
      const titles: string[] = []
      const contents: string[] = []
      for (const docId of entry.documentIds) {
        const titleObj = l10nDocs?.title?.[docId]
        const contentObj = l10nDocs?.content?.[docId]
        titles.push((titleObj?.['zh-cn'] ?? '') + ' ' + (titleObj?.['en-us'] ?? ''))
        contents.push((contentObj?.['zh-cn'] ?? '') + ' ' + (contentObj?.['en-us'] ?? ''))
      }

      return {
        keywords: entry.keywords,
        documentIds: entry.documentIds,
        _keywords_zh_cn: kwZhCn,
        _keywords_en_us: kwEnUs,
        _doc_titles: titles.join(' '),
        _doc_contents: contents.join(' '),
      }
    })
    .sort((a, b) => gb18030Collator.compare(a._keywords_zh_cn, b._keywords_zh_cn))
})

// Fields the global search should match against
const globalFilterFields = ['_keywords_zh_cn', '_keywords_en_us', '_doc_titles', '_doc_contents']

// ── Helpers: resolve L10N for a single documentId ──

/** Returns "[zh-cn title]/[en-us title]" with fallback to docId. */
function getDocTitle(docId: string): string {
  const titleObj = l10nAllLangData?.value?.documents?.title?.[docId]
  if (!titleObj) return docId

  const zh = titleObj['zh-cn'] ?? ''
  const en = titleObj['en-us'] ?? ''
  if (!zh && !en) return docId

  return `${zh || '—'} / ${en || '—'}`
}

/** Returns { zh, en } document content with fallback to docId. */
function getDocContent(docId: string): { zh: string; en: string } {
  function replaceCharacter(text: string) {
    return text.replace(/\n\n/g, '<br />')
  }

  const contentObj = l10nAllLangData?.value?.documents?.content?.[docId]
  const temp = {
    zh: contentObj?.['zh-cn'] ?? docId,
    en: contentObj?.['en-us'] ?? docId,
  }

  temp.zh = replaceCharacter(temp.zh)
  temp.en = replaceCharacter(temp.en)

  return temp
}
</script>

<template>
  <div class="special-comp-main">
    <p class="special-comp-main-desc" v-html="$t('view.special.aliya2_demo.comp.search.desc')"></p>
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
                $t('view.special.aliya2_demo.comp.search.DataTable.1.searchPlaceholder')
              "
            />
          </PvIconField>
        </div>
      </template>

      <!-- Empty state (no filter match) -->
      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.search.DataTable.1.empty') }}
      </template>

      <!-- Column 1: 关键词 -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.search.DataTable.1.column.1.title')">
        <template #body="slotProps">
          <ul>
            <li>{{ slotProps.data.keywords['zh-cn'].join('、') || '—' }}</li>
            <li>{{ slotProps.data.keywords['en-us'].join('、') || '—' }}</li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 2: 关联文档 (independent Accordion per document) -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.search.DataTable.1.column.2.title')">
        <template #body="slotProps">
          <template v-if="slotProps.data.documentIds.length === 0">
            <span style="color: gray">—</span>
          </template>
          <template v-else>
            <PvAccordion
              v-for="docId in slotProps.data.documentIds"
              :key="docId"
              style="margin-bottom: 4px"
            >
              <PvAccordionPanel value="0">
                <PvAccordionHeader>
                  {{ getDocTitle(docId) }}
                </PvAccordionHeader>
                <PvAccordionContent>
                  <div class="search-doc-content">
                    <p>
                      <b>{{ $t('view.special.aliya2_demo.comp.search.label.zhCn') }}</b>
                    </p>
                    <div v-html="getDocContent(docId).zh"></div>
                    <br />
                    <p>
                      <b>{{ $t('view.special.aliya2_demo.comp.search.label.enUs') }}</b>
                    </p>
                    <div v-html="getDocContent(docId).en"></div>
                  </div>
                </PvAccordionContent>
              </PvAccordionPanel>
            </PvAccordion>
          </template>
        </template>
      </PvColumn>
    </PvDataTable>

    <!-- Fallback when data is null or empty -->
    <p v-else>{{ $t('view.special.aliya2_demo.comp.search.noData') }}</p>
  </div>
</template>

<style scoped>
.search-doc-content {
  max-width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 1rem;
  line-height: 1.5;
}

.search-doc-content p {
  font-size: 1.1rem;
}

.search-doc-content p {
  margin: 4px 0;
}
</style>
