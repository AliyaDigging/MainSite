<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import SelectButton from 'primevue/selectbutton'
import {
  computed,
  onMounted,
  provide,
  ref,
  watch,
  defineAsyncComponent,
  type Component,
  type UnwrapRef,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  symbolItemData_Aliya2Demo,
  symbolVariableData_Aliya2Demo,
  symbolL10nAllLangData_Aliya2Demo,
  symbolActorData_Aliya2Demo,
  symbolExternalConfig_Aliya2Demo,
  symbolMergeInfo_Aliya2Demo,
} from '@/constants/injection'
import { getJson } from '@/utils/fetch'
import type {
  ItemData,
  VariableData,
  ActorData,
} from '@/components/flowchart/aliya2_demo/types/script7'
import type { L10nAllLangEntry } from '@/components/flowchart/aliya2_demo/types/script5'
import type { ExternalConfig } from '@/components/flowchart/aliya2_demo/types/script6'
import type { MergeInfo } from '@/components/flowchart/aliya2_demo/types/script13'
import type { AllDataCatalog } from '@/types/allDataCatalog'
import GameAndVersionSelector from '@/components/GameAndVersionSelector.vue'

const props = defineProps({
  versionId: {
    type: String,
    required: false,
    default: '',
  },
})

const windowsize = useWindowSize()
const route = useRoute()
const router = useRouter()

const compOptions = ref([
  { i18n: 'view.special.aliya2_demo.option.search', value: 'search' },
  { i18n: 'view.special.aliya2_demo.option.chat', value: 'chat' },
  { i18n: 'view.special.aliya2_demo.option.media_message', value: 'media_message' },
  { i18n: 'view.special.aliya2_demo.option.audio', value: 'audio' },
  { i18n: 'view.special.aliya2_demo.option.ambient_message', value: 'ambient_message' },
  { i18n: 'view.special.aliya2_demo.option.actor', value: 'actor' },
  { i18n: 'view.special.aliya2_demo.option.item', value: 'item' },
  { i18n: 'view.special.aliya2_demo.option.variable', value: 'variable' },
  { i18n: 'view.special.aliya2_demo.option.merge_info', value: 'merge_info' },
] as const)
const compSelect = ref<UnwrapRef<typeof compOptions>[number] | null>(null)

const compLoadTable: Record<UnwrapRef<typeof compOptions>[number]['value'], Component> = {
  search: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_Search.vue'),
  ),
  chat: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_Chat.vue'),
  ),
  media_message: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_MediaMessage.vue'),
  ),
  audio: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_Audio.vue'),
  ),
  ambient_message: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_AmbientMessage.vue'),
  ),
  actor: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_Actor.vue'),
  ),
  item: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_Item.vue'),
  ),
  variable: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_Variable.vue'),
  ),
  merge_info: defineAsyncComponent(
    () => import('../components/view_special_aliya2_demo/Aliya2Demo_MergeInfo.vue'),
  ),
}
const compCurr = computed(() =>
  compSelect.value ? compLoadTable[compSelect.value.value] : undefined,
)

// ── 版本选择状态 ──
const dataAllCatalog = ref<AllDataCatalog>([])
const gameId = ref<string>('aliya2_demo')
const versionId = ref<string>(props.versionId)
const isCatalogReady = ref(false)

// ── 外部数据：按版本并行获取 + provide ──
const itemData = ref<ItemData | null>(null)
const variableData = ref<VariableData | null>(null)
const l10nAllLangData = ref<L10nAllLangEntry | null>(null)
const actorData = ref<ActorData | null>(null)
const externalConfigData = ref<ExternalConfig | null>(null)
const mergeInfoData = ref<MergeInfo | null>(null)

const isReady = ref(false)

async function loadVersionData(vId: string) {
  isReady.value = false
  const base = `/data/aliya2_demo/${vId}`
  await Promise.allSettled([
    getJson<ItemData>(`${base}/external_index/items.json`, 5).then((data) => {
      itemData.value = data
    }),
    getJson<VariableData>(`${base}/external_index/variables.json`, 5).then((data) => {
      variableData.value = data
    }),
    getJson<L10nAllLangEntry>(`${base}/localization/all.json`, 5).then((data) => {
      l10nAllLangData.value = data
    }),
    getJson<ActorData>(`${base}/external_index/actors.json`, 5).then((data) => {
      actorData.value = data
    }),
    getJson<ExternalConfig>(`${base}/external_index/external_configs.json`, 5).then((data) => {
      externalConfigData.value = data
    }),
    getJson<MergeInfo>(`${base}/external_index/merge_info.json`, 5).then((data) => {
      mergeInfoData.value = data
    }),
  ])
  isReady.value = true
}

// ── 双向同步：versionId ←→ route.params.versionId ──

// 方向 A：本地 versionId 变化 → 更新 URL
watch(versionId, (newVal) => {
  if (newVal !== '') {
    router.push({
      path: `/special/aliya2_demo/${newVal}`,
      query: route.query.tab ? { tab: route.query.tab } : {},
    })
  } else {
    isReady.value = false
    compSelect.value = null
    router.push({ path: '/special/aliya2_demo/', query: {} })
  }
})

// 方向 B：URL 变化 → 更新本地 versionId（浏览器前进/后退）
watch(
  () => route.params.versionId,
  (newVal) => {
    const strVal = typeof newVal === 'string' ? newVal : ''
    if (strVal !== versionId.value) {
      versionId.value = strVal
    }
  },
  { immediate: true },
)

// 当 versionId 变化时，加载对应版本数据
watch(versionId, async (newVal, oldVal) => {
  if (newVal === '') {
    isReady.value = false
    return
  }
  if (newVal !== oldVal) {
    await loadVersionData(newVal)
  }
})

/** 将 query string 中的 tab 值（如 "chat"）映射为 compOptions 中的完整选项对象 */
function findOption(tabValue: string): UnwrapRef<typeof compOptions>[number] | null {
  return compOptions.value.find((opt) => opt.value === tabValue) ?? null
}

// ── 双向同步：compSelect ←→ ?tab= query string ──

// 方向 A：UI 变化 → 更新 URL（compSelect → ?tab=）
watch(compSelect, (newVal) => {
  if (!versionId.value) return
  const tabValue = newVal?.value ?? null
  const currentQueryTab = route.query.tab
  if (tabValue) {
    if (currentQueryTab !== tabValue) {
      router.replace({ query: { tab: tabValue } })
    }
  } else {
    if (currentQueryTab !== undefined) {
      router.replace({ query: {} })
    }
  }
})

// 方向 B：URL 变化 → 更新 UI（?tab= → compSelect）
// 处理浏览器前进/后退
watch(
  () => route.query.tab,
  (tabParam) => {
    if (!isReady.value) return
    const tabValue = typeof tabParam === 'string' ? tabParam : undefined
    if (tabValue && tabValue in compLoadTable) {
      const option = findOption(tabValue)
      if (option && compSelect.value?.value !== tabValue) {
        compSelect.value = option
      }
    } else if (tabValue) {
      // 无效 tab → 清除 query string
      router.replace({ query: {} })
    } else {
      // 无 tab → 取消选择
      if (compSelect.value !== null) {
        compSelect.value = null
      }
    }
  },
)

// 初始加载：数据就绪后应用 URL 中的 ?tab=
watch(isReady, (ready) => {
  if (!ready) return
  const tabParam = route.query.tab
  const tabValue = typeof tabParam === 'string' ? tabParam : undefined
  if (tabValue && tabValue in compLoadTable) {
    const option = findOption(tabValue)
    if (option) {
      compSelect.value = option
    }
  } else if (tabValue) {
    // 无效 tab → 清除 query string
    router.replace({ query: {} })
  }
})

onMounted(async () => {
  // 1. 加载数据目录
  dataAllCatalog.value = await getJson<AllDataCatalog>('/data/data_catalog.json', 5)

  // 2. 验证 URL 中的 versionId 是否在 catalog 中存在
  if (versionId.value !== '') {
    const gameEntry = dataAllCatalog.value.find((v) => v.metadata.id === 'aliya2_demo')
    if (!gameEntry?.versions.some((v) => v.id === versionId.value)) {
      versionId.value = ''
    }
  }

  // 3. Catalog 就绪，让 GameAndVersionSelector 渲染
  isCatalogReady.value = true

  // 4. 加载版本数据
  if (versionId.value !== '') {
    await loadVersionData(versionId.value)
  }

  // 5. 无效状态清理：有 tab 无 version
  if (!versionId.value && route.query.tab !== undefined) {
    router.replace({ query: {} })
  }
})

provide(symbolItemData_Aliya2Demo, itemData)
provide(symbolVariableData_Aliya2Demo, variableData)
provide(symbolL10nAllLangData_Aliya2Demo, l10nAllLangData)
provide(symbolActorData_Aliya2Demo, actorData)
provide(symbolExternalConfig_Aliya2Demo, externalConfigData)
provide(symbolMergeInfo_Aliya2Demo, mergeInfoData)
</script>

<template>
  <div
    class="special-main-div"
    style="
      margin-top: 16px;
      align-items: center;
      justify-items: center;
      align-content: center;
      text-align: center;
    "
  >
    <div class="special-main-div-title">
      <img style="width: 3rem" src="/aliya/game_icon/aliya2_demo.jpg" />
      <h1 style="font-size: 3rem">
        <b>{{ $t('view.special.aliya2_demo.title') }}</b>
      </h1>
    </div>

    <!-- 版本选择器 -->
    <GameAndVersionSelector
      v-if="isCatalogReady"
      :data-all-catalog="dataAllCatalog"
      :show-game-select="false"
      v-model:game-selection="gameId"
      v-model:version-selection="versionId"
    />

    <!--Select Button group-->
    <template v-if="versionId">
      <div v-if="windowsize.width.value <= 1320">
        <SelectButton v-model="compSelect" :options="compOptions.slice(0, 4)">
          <template #option="slotProps">
            <span style="word-break: break-word">{{ $t(slotProps.option.i18n) }}</span>
          </template>
        </SelectButton>
        <br />
        <SelectButton v-model="compSelect" :options="compOptions.slice(4, 8)">
          <template #option="slotProps">
            <span style="word-break: break-word">{{ $t(slotProps.option.i18n) }}</span>
          </template>
        </SelectButton>
        <!--这里不额外再加一个<br/>了，这样的话下面这个可以在宽度适合的时候直接和第二组同一行显示-->
        <SelectButton v-model="compSelect" :options="compOptions.slice(8)">
          <template #option="slotProps">
            <span style="word-break: break-word">{{ $t(slotProps.option.i18n) }}</span>
          </template>
        </SelectButton>
      </div>
      <div v-else>
        <!--@vue-expect-error An readonly array is also fine as long as we don't touch it.-->
        <SelectButton v-model="compSelect" :options="compOptions">
          <template #option="slotProps">
            <span style="word-break: break-word">{{ $t(slotProps.option.i18n) }}</span>
          </template>
        </SelectButton>
      </div>
    </template>
    <!--ENDING SelectButton group-->
  </div>
  <div class="special-main-div" style="margin-bottom: 28px; margin-top: 8px">
    <!-- Catalog 加载中 -->
    <div v-if="!isCatalogReady" class="loading-placeholder" style="margin-top: 8px">
      <p style="text-align: center">{{ $t('view.special.aliya2_demo.loadingCatalog') }}</p>
    </div>
    <!-- Catalog 已加载，但未选版本 -->
    <p v-else-if="!versionId" style="text-align: center; margin-top: 16px; font-size: 1.1rem">
      {{ $t('view.special.aliya2_demo.version.prompt') }}
    </p>
    <!-- 版本已选，数据加载中 -->
    <div v-else-if="!isReady" class="loading-placeholder" style="margin-top: 8px">
      <p style="text-align: center">{{ $t('view.special.aliya2_demo.loadingData') }}</p>
    </div>
    <!-- 数据就绪 -->
    <template v-else>
      <KeepAlive>
        <component :is="compCurr" />
      </KeepAlive>
      <p v-if="!compSelect" style="text-align: center; margin-top: 16px">
        {{ $t('view.special.aliya2_demo.selectPrompt') }}
      </p>
    </template>
    <p style="color: gray; font-size: 0.8rem; margin-top: 16px">
      {{ $t('view.special.aliya2_demo.footer') }}
    </p>
  </div>
</template>

<style scoped>
.special-main-div {
  margin: 0 10%;
  display: grid;
}

.special-main-div-title {
  margin-bottom: 16px;
  display: flex; /* 让子元素水平排列 */
  align-items: center; /* 子元素垂直居中（图标与文字基线对齐） */
  gap: 12px; /* 图标与标题的间距（可自定义） */
}

/*
NOT SURE WHY EVEN WITH THIS COMMENTED OUT, THE CONTENT IN THE SAID DIV
CAN STILL BE ALIGNED LEFT (UNLESS <p> OR PROBABLY SOME OTHER STUFF.)
SINCE WE NEED CENTER <p> FOR EXPLANATION AND UI, WE COMMENTED THIS OUT.
:deep(.special-comp-main) {
  align-items: normal;
  justify-items: left;
  text-align: left;
}
  */
:deep(.special-comp-main-desc) {
  color: gray;
  text-align: center;
}
:deep(.special-comp-main-desc b) {
  font-size: 1.5rem;
}

@media screen and (max-width: 960px) {
  .special-main-div {
    margin: 0 16px;
    margin-top: 16px;
  }

  .special-main-div-title h1 {
    font-size: 2.5rem !important;
  }
  .special-main-div-title img {
    width: 2.5rem !important;
  }
}

@media screen and (max-width: 794px) {
  .special-main-div-title h1 {
    font-size: 1.9rem !important;
  }
  .special-main-div-title img {
    width: 1.9rem !important;
  }
}
</style>
