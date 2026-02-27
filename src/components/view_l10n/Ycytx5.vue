<script setup lang="ts">
import { useAliyaStore } from '@/stores/aliya'
import { useSiteSettingStore } from '@/stores/setting'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import PvButton from 'primevue/button'
import PvInputText from 'primevue/inputtext'
import PvIconField from 'primevue/iconfield'
import PvInputIcon from 'primevue/inputicon'
import PvMultiSelect from 'primevue/multiselect'
import PvDivider from 'primevue/divider'

import { triggerDownloadEvent } from '@/utils/browser'
import type { L10nSingleLang_Ycytx5 } from '@/types/ycytx_5'
import { getJson } from '@/utils/fetch'

const props = defineProps({
  gameId: {
    type: String,
    required: true,
  },
  versionId: {
    type: String,
    required: true,
  },
})

const i18n = useI18n()

const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
const filters2 = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })

const setting = useSiteSettingStore()
const aliyaSetting = useAliyaStore()

const dataStoryForTable = ref(new Array<{ key: string; 'zh-cn': string }>())
const dataDictForTable = ref(new Array<{ key: string; title: string; content: string }>())

const isReady2 = ref(false)

async function getL10nData(gameId: string, versionId: string) {
  isReady2.value = false
  const temp = await getJson<L10nSingleLang_Ycytx5>(
    `/data/${gameId}/${versionId}/localization/localization.json`,
  )

  dataStoryForTable.value = []
  Object.keys(temp.story)
    .sort()
    .forEach((v) => dataStoryForTable.value.push({ key: v, 'zh-cn': temp.story[v] }))

  dataDictForTable.value = []
  Object.keys(temp.dict)
    .sort()
    .forEach((v) => {
      const entry = temp.dict[v]
      dataDictForTable.value.push({ key: v, title: entry[0], content: entry[1] })
    })

  isReady2.value = true
}

onMounted(async () => {
  if (props.gameId !== '' && props.versionId !== '') {
    await getL10nData(props.gameId, props.versionId)
  }
})

watch(
  () => [props.gameId, props.versionId],
  ([n1, n2]) => {
    // 数据获取
    if (n1 !== '' && n2 !== '') {
      getL10nData(n1, n2)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <p v-if="!isReady2">{{ $t('view.l10n.p.3') }}</p>
    <template v-else>
      <h2 class="view-l10n-h2">{{ $t('view.l10n.ycytx_5.h2.1') }}</h2>
      <p style="font-size: 1.1em" class="mb-4 text-color">{{ $t('view.l10n.ycytx_5.p.1') }}</p>
      <p class="text-color">
        {{ $t('view.l10n.p.8') }}:&nbsp;&nbsp;
        <PvMultiSelect
          v-model="aliyaSetting.l10nFliterFields"
          :options="['key', 'zh-cn']"
          :placeholder="i18n.t('view.l10n.p.6')"
          :maxSelectedLabels="4"
        >
        </PvMultiSelect>
      </p>
      <PvDataTable
        :value="dataStoryForTable"
        :rows="setting.l10nLangRows"
        :rowsPerPageOptions="[5, 10, 20, 50, 100, 1000, 9999]"
        @update:rows="(value) => (setting.l10nLangRows = value)"
        paginator
        v-model:filters="filters"
        :globalFilterFields="aliyaSetting.l10nFliterFields"
      >
        <template #header>
          <div class="flex justify-end">
            <PvIconField>
              <PvInputIcon>
                <i class="pi pi-search" />
              </PvInputIcon>
              <PvInputText
                v-model="filters['global'].value"
                :placeholder="i18n.t('view.l10n.table.search')"
              />
            </PvIconField>
          </div>
        </template>

        <template #empty>{{ $t('view.l10n.table.empty') }}</template>

        <template #paginatorend>
          <PvButton
            v-tooltip.top="i18n.t('view.l10n.p.4')"
            type="button"
            icon="pi pi-download"
            text
            @click="triggerDownloadEvent('/data/localization/all.json', 'all.json')"
          />
        </template>

        <PvColumn field="key" :header="i18n.t('view.l10n.col.key')"></PvColumn>
        <PvColumn
          field="zh-cn"
          :header="i18n.t('constant.l10nlang.zh-cn')"
          v-if="aliyaSetting.l10nLangViewingList.includes('zh-cn')"
        >
          <template #body="slotProps">
            <div v-html="slotProps.data['zh-cn']"></div>
          </template>
        </PvColumn>
      </PvDataTable>
      <PvDivider />

      <h2 class="view-l10n-h2">{{ $t('view.l10n.ycytx_5.h2.2') }}</h2>
      <p style="font-size: 1.1em" class="mb-4 text-color">{{ $t('view.l10n.ycytx_5.p.2') }}</p>
      <PvDataTable
        :value="dataDictForTable"
        :rows="setting.l10nLangRows"
        :rowsPerPageOptions="[5, 10, 20, 50, 100, 1000, 9999]"
        @update:rows="(value) => (setting.l10nLangRows = value)"
        paginator
        :filters="filters2"
      >
        <template #header>
          <div class="flex justify-end">
            <PvIconField>
              <PvInputIcon>
                <i class="pi pi-search" />
              </PvInputIcon>
              <PvInputText
                v-model="filters2['global'].value"
                :placeholder="i18n.t('view.l10n.table.search')"
              />
            </PvIconField>
          </div>
        </template>

        <template #empty>{{ $t('view.l10n.table.empty') }}</template>

        <template #paginatorend>
          <PvButton
            v-tooltip.top="i18n.t('view.l10n.p.4')"
            type="button"
            icon="pi pi-download"
            text
            @click="triggerDownloadEvent('/data/localization/all.json', 'all.json')"
          />
        </template>

        <PvColumn field="key" :header="i18n.t('view.l10n.col.key')"></PvColumn>
        <PvColumn field="title" :header="i18n.t('view.l10n.ycytx_5.col.dict.title')">
          <template #body="slotProps">
            <div v-html="slotProps.data['title']"></div>
          </template>
        </PvColumn>
        <PvColumn field="content" :header="i18n.t('view.l10n.ycytx_5.col.dict.content')">
          <template #body="slotProps">
            <div v-html="slotProps.data['content']"></div>
          </template>
        </PvColumn>
      </PvDataTable>
      <PvDivider />

      <div class="mt-4">
        <p>
          {{ $t('view.l10n.p.4') }}:&#8201;<a
            :href="`/data/${gameId}/${versionId}/localization/localization.json`"
            target="_blank"
            >/data/{{ gameId }}/{{ versionId }}/localization/localization.json</a
          >
        </p>
      </div>
    </template>
  </div>
</template>
