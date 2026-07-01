<script setup lang="ts">
import { computed, inject, ref, type UnwrapRef } from 'vue'
import { useWindowSize } from '@vueuse/core'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import PvTag from 'primevue/tag'
import SelectButton from 'primevue/selectbutton'
import { FilterMatchMode } from '@primevue/core/api'
import PvInputText from 'primevue/inputtext'
import PvIconField from 'primevue/iconfield'
import PvInputIcon from 'primevue/inputicon'

import { symbolMergeInfo_Aliya2Demo, symbolL10nAllLangData_Aliya2Demo } from '@/constants/injection'
import { Divider } from 'primevue'

// ── Inject data from parent ──
const mergeInfo = inject(symbolMergeInfo_Aliya2Demo)
const l10nData = inject(symbolL10nAllLangData_Aliya2Demo)
const windowSize = useWindowSize()

// ── Helpers: resolve L10N for a flowchartId ──

/** Returns the zh-cn flowchart name for a given flowchart ID, or null if not found. */
function getFlowchartName(id: string): string | null {
  return l10nData?.value?.conversations.title[id]?.['zh-cn'] ?? null
}

// ── Merge status → Tag mapping ──

const MERGE_STATUS_TAG_MAP: Record<
  string,
  { severity: 'danger' | 'success' | 'warn' | 'info'; i18nKey: string }
> = {
  merged: {
    severity: 'danger',
    i18nKey: 'view.special.aliya2_demo.comp.merge_info.tag.merged',
  },
  not_changed: {
    severity: 'success',
    i18nKey: 'view.special.aliya2_demo.comp.merge_info.tag.not_changed',
  },
  partially_merged: {
    severity: 'warn',
    i18nKey: 'view.special.aliya2_demo.comp.merge_info.tag.partially_merged',
  },
  others_merged_into: {
    severity: 'info',
    i18nKey: 'view.special.aliya2_demo.comp.merge_info.tag.others_merged_into',
  },
}

/** Returns Tag data for a flowchart's merge status(es). */
function getMergeStatusTags(
  id: string,
): { severity: 'danger' | 'success' | 'warn' | 'info'; i18nKey: string }[] {
  const statuses = mergeInfo?.value?.originalFlowcharts[id]
  if (!statuses || statuses.length === 0) return []
  return statuses.map((s) => MERGE_STATUS_TAG_MAP[s]).filter(Boolean)
}

// ── View switcher (SelectButton) ──

const viewOptions = [
  { i18n: 'view.special.aliya2_demo.comp.merge_info.view.forward', value: 'forward' },
  { i18n: 'view.special.aliya2_demo.comp.merge_info.view.by_status', value: 'by_status' },
]
const currentView = ref<UnwrapRef<typeof viewOptions>[number] | null>(viewOptions[0])

// ── Responsive grid columns ──

const forwardGridColumns = computed(() =>
  windowSize.width.value > 960 ? '1fr 1fr 1fr' : '1fr 1fr',
)

const statusGridColumns = computed(() => (windowSize.width.value > 960 ? '1fr 1fr' : '1fr'))

// ── View A: Forward Lookup (flowchartId → status) ──

const forwardLookupData = computed(() => {
  const raw = mergeInfo?.value?.originalFlowcharts
  if (!raw) return []
  return Object.entries(raw)
    .sort(([a], [b]) => +a - +b)
    .map(([id, statuses]) => ({
      id,
      name: getFlowchartName(id) ?? '—',
      tags: statuses.map((s) => MERGE_STATUS_TAG_MAP[s]).filter(Boolean),
    }))
})

// ── View B: Status Classification (status → flowchartIds) ──

const statusCategories = computed(() => {
  const raw = mergeInfo?.value?.originalFlowcharts
  if (!raw) return []

  const categoryOrder = ['not_changed', 'merged', 'partially_merged', 'others_merged_into'] as const

  const grouped: Record<string, string[]> = {}
  for (const cat of categoryOrder) grouped[cat] = []

  for (const [flowchartId, statuses] of Object.entries(raw)) {
    for (const status of statuses) {
      if (grouped[status]) {
        grouped[status].push(flowchartId)
      }
    }
  }

  return categoryOrder
    .filter((cat) => grouped[cat].length > 0)
    .map((cat) => ({
      statusKey: cat,
      tagDef: MERGE_STATUS_TAG_MAP[cat],
      flowcharts: grouped[cat].map((id) => ({
        id,
        name: getFlowchartName(id) ?? '—',
      })),
    }))
})

// ── Filter state (one per table) ──
const filtersMerge = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const filtersBeingMerged = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// ── Table 1: mergeStatus ──
type MergeStatusRow = {
  key: string
  _name_zh_cn: string
  _mergeTags: string
  mergedIntoIds: string[]
}

const mergeStatusData = computed<MergeStatusRow[]>(() => {
  const raw = mergeInfo?.value?.mergeStatus
  if (!raw) return []
  return Object.entries(raw).map(([key, mergedIntoIds]) => ({
    key,
    _name_zh_cn: getFlowchartName(key) ?? '',
    _mergeTags: getMergeStatusTags(key)
      .map((t) => t.i18nKey)
      .join(' '),
    mergedIntoIds,
  }))
})

const globalFilterFieldsMerge = ['key', '_name_zh_cn', '_mergeTags']

// ── Table 2: beingMergedStatus ──
type BeingMergedStatusRow = {
  key: string
  _name_zh_cn: string
  _mergeTags: string
  beingMergedIntoIds: string[]
}

const beingMergedStatusData = computed<BeingMergedStatusRow[]>(() => {
  const raw = mergeInfo?.value?.beingMergedStatus
  if (!raw) return []
  return Object.entries(raw).map(([key, beingMergedIntoIds]) => ({
    key,
    _name_zh_cn: getFlowchartName(key) ?? '',
    _mergeTags: getMergeStatusTags(key)
      .map((t) => t.i18nKey)
      .join(' '),
    beingMergedIntoIds,
  }))
})

const globalFilterFieldsBeingMerged = ['key', '_name_zh_cn', '_mergeTags']
</script>

<template>
  <div class="special-comp-main">
    <p
      class="special-comp-main-desc"
      v-html="$t('view.special.aliya2_demo.comp.merge_info.desc')"
    ></p>
    <Divider />

    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">
      {{ $t('view.special.aliya2_demo.comp.merge_info.section.all_channel_query') }}
    </h2>

    <!-- View Switcher -->
    <div style="margin-bottom: 16px; text-align: center">
      <SelectButton v-model="currentView" :options="viewOptions" :allowEmpty="false">
        <template #option="slotProps">
          {{ $t(slotProps.option.i18n) }}
        </template>
      </SelectButton>
    </div>

    <!-- View A: Forward Lookup (flowchartId → status) -->
    <div
      v-if="currentView?.value === 'forward'"
      :style="{
        display: 'grid',
        gridTemplateColumns: forwardGridColumns,
        gap: '16px',
        marginBottom: '24px',
      }"
    >
      <div
        v-for="item in forwardLookupData"
        :key="item.id"
        style="padding: 12px; border: 1px solid var(--p-surface-200); border-radius: 8px"
      >
        <div>
          {{ $t('view.special.aliya2_demo.comp.merge_info.label.flowchartId') }}
          <code>{{ item.id }}</code>
        </div>
        <div>{{ item.name }}</div>
        <div v-if="item.tags.length > 0" style="margin-top: 4px">
          <PvTag
            v-for="(tag, idx) in item.tags"
            :key="tag.i18nKey"
            :severity="tag.severity"
            :style="idx > 0 ? 'margin-left: 4px' : ''"
          >
            {{ $t(tag.i18nKey) }}
          </PvTag>
        </div>
      </div>
    </div>

    <!-- View B: Status Classification (status → flowchartIds) -->
    <div
      v-else-if="currentView?.value === 'by_status'"
      :style="{
        display: 'grid',
        gridTemplateColumns: statusGridColumns,
        gap: '16px',
        marginBottom: '24px',
      }"
    >
      <div
        v-for="cat in statusCategories"
        :key="cat.statusKey"
        style="padding: 12px; border: 1px solid var(--p-surface-200); border-radius: 8px"
      >
        <PvTag :severity="cat.tagDef.severity" style="margin-bottom: 8px">
          {{ $t(cat.tagDef.i18nKey) }} ({{ cat.flowcharts.length }})
        </PvTag>
        <ol style="margin: 0 16px" class="custom-node-normal-ol">
          <li v-for="fc in cat.flowcharts" :key="fc.id">
            {{ $t('view.special.aliya2_demo.comp.merge_info.label.flowchartId')
            }}<code>{{ fc.id }}</code> — {{ fc.name }}
          </li>
        </ol>
      </div>
    </div>

    <Divider />
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">
      {{ $t('view.special.aliya2_demo.comp.merge_info.section.merge_status_data') }}
    </h2>

    <!-- Table 1: mergeStatus -->
    <PvDataTable
      :value="mergeStatusData"
      v-if="mergeStatusData.length > 0"
      v-model:filters="filtersMerge"
      :globalFilterFields="globalFilterFieldsMerge"
      style="width: 100%"
    >
      <template #header>
        <div class="flex justify-end">
          <PvIconField>
            <PvInputIcon>
              <i class="pi pi-search" />
            </PvInputIcon>
            <PvInputText
              v-model="filtersMerge['global'].value"
              :placeholder="
                $t('view.special.aliya2_demo.comp.merge_info.DataTable.1.searchPlaceholder')
              "
            />
          </PvIconField>
        </div>
      </template>

      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.merge_info.DataTable.1.empty') }}
      </template>

      <!-- Column: 流程图ID -->
      <PvColumn
        field="key"
        :header="$t('view.special.aliya2_demo.comp.merge_info.DataTable.1.column.1.title')"
      />

      <!-- Column: 流程图名称 -->
      <PvColumn
        field="_name_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.merge_info.DataTable.1.column.2.title')"
      >
        <template #body="slotProps">
          {{ slotProps.data._name_zh_cn || '—' }}
          <template v-if="slotProps.data._mergeTags">
            <br />
            <PvTag
              v-for="(tag, idx) in getMergeStatusTags(slotProps.data.key)"
              :key="tag.i18nKey"
              :severity="tag.severity"
              :style="idx > 0 ? 'margin-left: 4px' : ''"
            >
              {{ $t(tag.i18nKey) }}
            </PvTag>
          </template>
        </template>
      </PvColumn>

      <!-- Column: 合并进来的流程图ID+名称 -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.merge_info.DataTable.1.column.3.title')">
        <template #body="slotProps">
          <ol class="custom-node-normal-ol">
            <li v-for="id in slotProps.data.mergedIntoIds" :key="id">
              {{ $t('view.special.aliya2_demo.comp.merge_info.label.flowchartId') }}
              <code>{{ id }}</code> ({{ getFlowchartName(id) ?? '—' }})
            </li>
          </ol>
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>{{ $t('view.special.aliya2_demo.comp.merge_info.noData1') }}</p>

    <Divider />
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">
      {{ $t('view.special.aliya2_demo.comp.merge_info.section.being_merged_status_data') }}
    </h2>

    <!-- Table 2: beingMergedStatus -->
    <PvDataTable
      :value="beingMergedStatusData"
      v-if="beingMergedStatusData.length > 0"
      v-model:filters="filtersBeingMerged"
      :globalFilterFields="globalFilterFieldsBeingMerged"
      style="width: 100%"
    >
      <template #header>
        <div class="flex justify-end">
          <PvIconField>
            <PvInputIcon>
              <i class="pi pi-search" />
            </PvInputIcon>
            <PvInputText
              v-model="filtersBeingMerged['global'].value"
              :placeholder="
                $t('view.special.aliya2_demo.comp.merge_info.DataTable.2.searchPlaceholder')
              "
            />
          </PvIconField>
        </div>
      </template>

      <template #empty>
        {{ $t('view.special.aliya2_demo.comp.merge_info.DataTable.2.empty') }}
      </template>

      <!-- Column: 流程图ID -->
      <PvColumn
        field="key"
        :header="$t('view.special.aliya2_demo.comp.merge_info.DataTable.2.column.1.title')"
      />

      <!-- Column: 流程图名称 -->
      <PvColumn
        field="_name_zh_cn"
        :header="$t('view.special.aliya2_demo.comp.merge_info.DataTable.2.column.2.title')"
      >
        <template #body="slotProps">
          {{ slotProps.data._name_zh_cn || '—' }}
          <template v-if="slotProps.data._mergeTags">
            <br />
            <PvTag
              v-for="(tag, idx) in getMergeStatusTags(slotProps.data.key)"
              :key="tag.i18nKey"
              :severity="tag.severity"
              :style="idx > 0 ? 'margin-left: 4px' : ''"
            >
              {{ $t(tag.i18nKey) }}
            </PvTag>
          </template>
        </template>
      </PvColumn>

      <!-- Column: 被合并进到的流程图ID+名称 -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.merge_info.DataTable.2.column.3.title')">
        <template #body="slotProps">
          <ol class="custom-node-normal-ol">
            <li v-for="id in slotProps.data.beingMergedIntoIds" :key="id">
              {{ $t('view.special.aliya2_demo.comp.merge_info.label.flowchartId') }}
              <code>{{ id }}</code> ({{ getFlowchartName(id) ?? '—' }})
            </li>
          </ol>
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>{{ $t('view.special.aliya2_demo.comp.merge_info.noData2') }}</p>
  </div>
</template>
