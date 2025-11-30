<script setup lang="ts">
import { useAliyaStore } from '@/stores/aliya'
import PvMultiSelect from 'primevue/multiselect'
import PvDivider from 'primevue/divider'
import { useI18n } from 'vue-i18n'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import PvButton from 'primevue/button'
import PvInputText from 'primevue/inputtext'
import PvIconField from 'primevue/iconfield'
import PvInputIcon from 'primevue/inputicon'

import { ref, onMounted, watch } from 'vue'
import type { L10nCsvAllLang, L10nCsvAllLangEntry } from '@/types/aliya1/data_script7'
import { getJson } from '@/utils/fetch'
import { useSiteSettingStore } from '@/stores/setting'
import { triggerDownloadEvent } from '@/utils/browser'
import GameAndVersionSelector from '@/components/GameAndVersionSelector.vue'
import type { AllDataCatalog } from '@/types/allDataCatalog'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  gameId: {
    type: String,
    required: false,
    default: '',
  },
  versionId: {
    type: String,
    required: false,
    default: '',
  },
})

const isReady = ref(false)
const isReady2 = ref(false)

const setting = useSiteSettingStore()
const aliyaSetting = useAliyaStore()
const i18n = useI18n()
const route = useRoute()
const router = useRouter()

const data = ref<Array<L10nCsvAllLangEntry & { key: string }>>([])

const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })

const dataAllCatalog = ref<AllDataCatalog>([])
const gameId = ref<string>(props.gameId)
const versionId = ref<string>(props.versionId)

async function getL10nData(gameId: string, versionId: string) {
  isReady2.value = false
  const temp = await getJson<L10nCsvAllLang>(`/data/${gameId}/${versionId}/localization/all.json`)

  data.value = []
  Object.entries(temp).forEach(([name, value]) => {
    const temp = { ...(value as L10nCsvAllLangEntry) }
    for (const lang of ['zh-cn', 'en-us', 'zh-cn-c'] as const) {
      temp[lang] = temp[lang].replace(/\\n/gi, '<br />')
    }

    data.value.push({ ...temp, key: name })
  })

  isReady2.value = true
}

onMounted(async () => {
  dataAllCatalog.value = await getJson<AllDataCatalog>(`/data/data_catalog.json`, 5)
  isReady.value = true
})

watch(
  [gameId, versionId],
  ([n1, n2]) => {
    // 数据获取
    if (n1 !== '' && n2 !== '') {
      getL10nData(n1, n2)
    }
  },
  { immediate: true },
)

// select 更改时，触发路径更改
watch([gameId, versionId], ([n1, n2]) => {
  // 新URL格式
  if (n2 !== '') {
    router.push(`/view/localization/${n1}/${n2}`)
  } else if (n1 !== '') {
    router.push(`/view/localization/${n1}`)
  } else {
    router.push(`/view/localization/`)
  }
})
// 路径更改时，触发 select 更改
watch(
  () => [route.params.gameId, route.params.versionId],
  ([n1, n2]) => {
    if (n1 !== gameId.value) {
      gameId.value = String(n1)
    }
    if (n2 !== versionId.value) {
      versionId.value = String(n2)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">{{ $t('view.l10n.h1') }}</h1>
    <p class="view-page-h1-desc text-color mb-2" style="font-size: 1.2em">
      {{ $t('view.l10n.p.1') }}
    </p>
    <PvDivider />

    <template v-if="!isReady"><LoadingSpinner /></template>
    <template v-else>
      <GameAndVersionSelector
        :dataAllCatalog="dataAllCatalog"
        v-model:gameSelection="gameId"
        v-model:versionSelection="versionId"
      />
      <p class="text-color select-title">
        {{ $t('view.l10n.p.7') }}:&nbsp;&nbsp;<PvMultiSelect
          v-model="aliyaSetting.l10nLangViewingList"
          :options="['zh-cn', 'en-us', 'zh-cn-c']"
          :optionLabel="(item) => i18n.t(`constant.l10nlang.${item}`)"
          :placeholder="i18n.t('view.l10n.p.2')"
          :maxSelectedLabels="3"
        />
      </p>
      <PvDivider />

      <div>
        <p v-if="!isReady2">{{ $t('view.l10n.p.3') }}</p>
        <template v-else>
          <p class="text-color">
            {{ $t('选择一个或多个过滤列') }}:&nbsp;&nbsp;
            <PvMultiSelect
              v-model="aliyaSetting.l10nFliterFields"
              :options="['key', 'zh-cn', 'en-us', 'zh-cn-c']"
              :placeholder="i18n.t('view.l10n.p.6')"
              :maxSelectedLabels="4"
            >
            </PvMultiSelect>
          </p>
          <PvDataTable
            :value="data"
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
            <PvColumn
              field="en-us"
              :header="i18n.t('constant.l10nlang.en-us')"
              v-if="aliyaSetting.l10nLangViewingList.includes('en-us')"
            >
              <template #body="slotProps">
                <div v-html="slotProps.data['en-us']"></div>
              </template>
            </PvColumn>
            <PvColumn
              field="zh-cn-c"
              :header="i18n.t('constant.l10nlang.zh-cn-c')"
              v-if="aliyaSetting.l10nLangViewingList.includes('zh-cn-c')"
            >
              <template #body="slotProps">
                <div v-html="slotProps.data['zh-cn-c']"></div>
              </template>
            </PvColumn>
          </PvDataTable>
          <div class="mt-4">
            <p>
              {{ $t('view.l10n.p.4') }}:&#8201;<a href="/data/localization/all.json" target="_blank"
                >/data/localization/all.json</a
              >
            </p>
            <p>
              {{ $t('view.l10n.p.5') }}:&#8201;<a
                href="/data/localization/zh-cn.json"
                target="_blank"
                >zh-cn.json</a
              >&#8201;/&#8201;<a href="/data/localization/zh-cn-c.json" target="_blank"
                >zh-cn-c.json</a
              >&#8201;/&#8201;<a href="/data/localization/en-us.json" target="_blank">en-us.json</a>
            </p>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped>
p {
  font-size: 1em;
}
:deep(.select-title) {
  font-size: 1.1rem;
}
</style>
