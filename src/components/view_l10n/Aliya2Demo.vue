<script setup lang="ts">
import { useAliyaStore } from '@/stores/aliya'
import { useSiteSettingStore } from '@/stores/setting'
import type { L10nAllLangEntry } from '@/components/flowchart/aliya2_demo/types/script5'
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

const filters1 = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
const filters2 = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })

const setting = useSiteSettingStore()
const aliyaSetting = useAliyaStore()

const dataConversationsTitle = ref(new Array<{ key: string; 'zh-cn': string; 'en-us': string }>())
const dataDialogues = ref(new Array<{ key: string; 'zh-cn': string; 'en-us': string }>())

const isReady2 = ref(false)

async function getL10nData(gameId: string, versionId: string) {
  isReady2.value = false
  const temp = await getJson<L10nAllLangEntry>(`/data/${gameId}/${versionId}/localization/all.json`)

  dataConversationsTitle.value = []
  Object.keys(temp.conversations.title)
    .sort((a, b) => Number(a) - Number(b))
    .forEach((v) => {
      const entry = temp.conversations.title[v]
      dataConversationsTitle.value.push({
        key: v,
        'zh-cn': entry['zh-cn'],
        'en-us': entry['en-us'],
      })
    })

  dataDialogues.value = []
  Object.keys(temp.dialogues)
    .sort()
    .forEach((v) => {
      const entry = temp.dialogues[v]
      dataDialogues.value.push({
        key: v,
        'zh-cn': entry['zh-cn'],
        'en-us': entry['en-us'],
      })
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
      <h2 class="view-l10n-h2">{{ $t('view.l10n.aliya2_demo.h2.1') }}</h2>
      <p style="font-size: 1.1em" class="mb-4 text-color">{{ $t('view.l10n.aliya2_demo.p.1') }}</p>
      <p class="text-color">
        {{ $t('view.l10n.p.8') }}:&nbsp;&nbsp;
        <PvMultiSelect
          v-model="aliyaSetting.l10nFliterFields"
          :options="['key', 'zh-cn', 'en-us']"
          :placeholder="i18n.t('view.l10n.p.6')"
          :maxSelectedLabels="4"
        >
        </PvMultiSelect>
      </p>
      <PvDataTable
        :value="dataConversationsTitle"
        :rows="setting.l10nLangRows"
        :rowsPerPageOptions="[5, 10, 20, 50, 100, 1000, 9999]"
        @update:rows="(value) => (setting.l10nLangRows = value)"
        paginator
        v-model:filters="filters1"
        :globalFilterFields="aliyaSetting.l10nFliterFields"
      >
        <template #header>
          <div class="flex justify-end">
            <PvIconField>
              <PvInputIcon>
                <i class="pi pi-search" />
              </PvInputIcon>
              <PvInputText
                v-model="filters1['global'].value"
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
            @click="
              triggerDownloadEvent(`/data/${gameId}/${versionId}/localization/all.json`, 'all.json')
            "
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
        <PvColumn
          field="en-us"
          :header="i18n.t('constant.l10nlang.en-us')"
          v-if="aliyaSetting.l10nLangViewingList.includes('en-us')"
        >
          <template #body="slotProps">
            <div v-html="slotProps.data['en-us']"></div>
          </template>
        </PvColumn>
      </PvDataTable>
      <PvDivider />

      <h2 class="view-l10n-h2">{{ $t('view.l10n.aliya2_demo.h2.2') }}</h2>
      <p style="font-size: 1.1em" class="mb-4 text-color">{{ $t('view.l10n.aliya2_demo.p.2') }}</p>
      <p class="text-color">
        {{ $t('view.l10n.p.8') }}:&nbsp;&nbsp;
        <PvMultiSelect
          v-model="aliyaSetting.l10nFliterFields"
          :options="['key', 'zh-cn', 'en-us']"
          :placeholder="i18n.t('view.l10n.p.6')"
          :maxSelectedLabels="4"
        >
        </PvMultiSelect>
      </p>
      <PvDataTable
        :value="dataDialogues"
        :rows="setting.l10nLangRows"
        :rowsPerPageOptions="[5, 10, 20, 50, 100, 1000, 9999]"
        @update:rows="(value) => (setting.l10nLangRows = value)"
        paginator
        v-model:filters="filters2"
        :globalFilterFields="aliyaSetting.l10nFliterFields"
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
            @click="
              triggerDownloadEvent(`/data/${gameId}/${versionId}/localization/all.json`, 'all.json')
            "
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
        <PvColumn
          field="en-us"
          :header="i18n.t('constant.l10nlang.en-us')"
          v-if="aliyaSetting.l10nLangViewingList.includes('en-us')"
        >
          <template #body="slotProps">
            <div v-html="slotProps.data['en-us']"></div>
          </template>
        </PvColumn>
      </PvDataTable>
      <PvDivider />

      <div class="mt-4">
        <p>
          {{ $t('view.l10n.p.4') }}:&#8201;<a
            :href="`/data/${gameId}/${versionId}/localization/all.json`"
            target="_blank"
            >/data/{{ gameId }}/{{ versionId }}/localization/all.json</a
          >
        </p>
        <p>
          {{ $t('view.l10n.p.5') }}:&#8201;<a
            :href="`/data/${gameId}/${versionId}/localization/zh-cn.json`"
            target="_blank"
            >zh-cn.json</a
          >&#8201;/&#8201;<a
            :href="`/data/${gameId}/${versionId}/localization/en-us.json`"
            target="_blank"
            >en-us.json</a
          >
        </p>
      </div>
    </template>
  </div>
</template>
