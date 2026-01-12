<script setup lang="ts">
/**
 * 流程图查看页面
 * 重构版本：使用统一的 FlowchartViewer 组件
 */
import PvSelect from 'primevue/select'
import PvTag from 'primevue/tag'
import PvDivider from 'primevue/divider'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, provide, useTemplateRef, onMounted } from 'vue'
import PvMessage from 'primevue/message'

// 使用新的统一组件
import FlowchartViewer from '@/components/flowchart/core/FlowchartViewer.vue'
import FlowchartMetadata from '@/components/flowchart/core/FlowchartMetadata.vue'

import { useFlowchartData } from '@/composables/flowchart/useFlowchartData'
import { useSiteSettingStore } from '@/stores/setting'
import { symbolFlowchartCatalog, symbolL10nDataSingleLang } from '@/constants/injection'
import { getJson } from '@/utils/fetch'
import type { AllDataCatalog } from '@/types/allDataCatalog'
import GameAndVersionSelector from '@/components/GameAndVersionSelector.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

/* path params */
const props = defineProps({
  gameId: {
    type: String,
    default: '',
  },
  versionId: {
    type: String,
    default: '',
  },
  flowchartName: {
    type: String,
    default: '',
  },
})

/* some useXXX() */
const i18n = useI18n()
const setting = useSiteSettingStore()
const route = useRoute()
const router = useRouter()

/* <select> variables */
const gameSelection = ref<string>(props.gameId)
const versionSelection = ref<string>(props.versionId)
const flowchartSelection = ref<string>(props.flowchartName)

const dataAllCatalog = ref<AllDataCatalog>([])

// 使用新的 composable 管理数据
const { l10nData, catalogData, catalogList, loadL10nData, loadCatalogData } = useFlowchartData({
  gameId: gameSelection,
  versionId: versionSelection,
})

// 更清晰的状态命名
const isGlobalDataLoaded = ref(false) // 替代原来的 isReady
const isFlowchartDataLoaded = ref(false) // 替代原来的 isReady2

const flowchartRef = useTemplateRef('flowchartComp')

provide(symbolL10nDataSingleLang, l10nData)
provide(symbolFlowchartCatalog, catalogData)

// select 更改时，触发路径更改
watch([gameSelection, versionSelection, flowchartSelection], ([n1, n2, n3], [o1, o2, o3]) => {
  // 当 gameSelection 改变时，清除 versionSelection 和 flowchartSelection
  if (n1 !== o1) {
    versionSelection.value = ''
    flowchartSelection.value = ''
  }

  // 新URL格式
  if (n3 !== '') {
    // game, version, flowchart都已经齐了
    router.push(`/view/flowchart/${n1}/${n2}/${n3}`)
  } else if (n2 !== '') {
    router.push(`/view/flowchart/${n1}/${n2}`)
  } else if (n1 !== '') {
    router.push(`/view/flowchart/${n1}`)
  } else {
    router.push(`/view/flowchart/`)
  }
})

// 路径更改时，触发 select 更改
watch(
  () => [route.params.gameId, route.params.versionId, route.params.flowchartName],
  ([n1, n2, n3]) => {
    if (n1 !== gameSelection.value) {
      gameSelection.value = String(n1)
    }
    if (n2 !== versionSelection.value) {
      versionSelection.value = String(n2)
    }
    if (n3 !== flowchartSelection.value) {
      flowchartSelection.value = String(n3)
    }
  },
  { immediate: true },
)

watch(
  () => setting.l10nlang,
  async (newValue, oldValue) => {
    await loadL10nData(newValue)

    if (oldValue && flowchartRef.value) {
      flowchartRef.value.triggerRelayout()
    }
  },
)

onMounted(async () => {
  if (props.gameId.includes('-')) {
    // 从老URL格式过来的，是Aliya 1代
    // 写死在这里了，反正数据大概不会变
    gameSelection.value = 'aliya1'
    versionSelection.value = '20250712'
    flowchartSelection.value = props.gameId
    router.push(`/view/flowchart/aliya1/20250712/${props.gameId}`)
  }

  await Promise.allSettled([
    (async () => {
      dataAllCatalog.value = await getJson<AllDataCatalog>(`/data/data_catalog.json`, 5)
    })(),
  ])
  isGlobalDataLoaded.value = true
})

watch(
  [gameSelection, versionSelection],
  async ([n1, n2]) => {
    if (n1 !== '' && n2 !== '') {
      isFlowchartDataLoaded.value = false
      await Promise.allSettled([loadL10nData(setting.l10nlang), loadCatalogData(n1, n2)])
      isFlowchartDataLoaded.value = true
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">{{ $t('comp.flowchart.p.view1') }}</h1>
    <div v-if="!isGlobalDataLoaded" class="mt-6">
      <div class="card justify-center">
        <LoadingSpinner />
      </div>
    </div>
    <div v-else>
      <p class="view-page-h1-desc text-color mb-2">{{ $t('comp.flowchart.p.view2') }}</p>
      <PvDivider />

      <GameAndVersionSelector
        :data-all-catalog="dataAllCatalog"
        v-model:game-selection="gameSelection"
        v-model:version-selection="versionSelection"
      />

      <template v-if="isFlowchartDataLoaded">
        <p class="select-title text-color mb-2">
          {{ $t('comp.flowchart.select.title3')
          }}<PvSelect v-model="flowchartSelection" :options="catalogList">
            <template #option="slotProps">
              <div>
                <span class="mr-2">{{ slotProps.option }}&nbsp;</span>
                <PvTag severity="info" size="small">{{
                  slotProps.option.toLowerCase().includes('catalog')
                    ? i18n.t('select.flowchart.type.fof')
                    : slotProps.option.toLowerCase().includes('daily')
                      ? i18n.t(`select.flowchart.type.daily`)
                      : i18n.t(`select.flowchart.type.main`)
                }}</PvTag>
              </div>
            </template>
            <template #value="slotProps">
              <div v-if="slotProps.value">
                <span class="mr-2">{{ slotProps.value }}&nbsp;</span>
                <PvTag severity="info" size="small">{{
                  slotProps.value.toLowerCase().includes('catalog')
                    ? i18n.t('select.flowchart.type.fof')
                    : slotProps.value.toLowerCase().includes('daily')
                      ? i18n.t(`select.flowchart.type.daily`)
                      : i18n.t(`select.flowchart.type.main`)
                }}</PvTag>
              </div>
              <div v-else>
                <span>{{ i18n.t('select.flowchart.placeholder') }}</span>
              </div>
            </template>
          </PvSelect>
        </p>
        <PvMessage severity="info" class="mt-4">{{ $t('comp.flowchart.p.view3') }}</PvMessage>
        <PvMessage severity="error" class="mt-2">{{ $t('comp.flowchart.p.view4') }}</PvMessage>
        <PvMessage severity="success" class="mt-2">{{ $t('comp.flowchart.p.view5') }}</PvMessage>
        <PvMessage severity="success" class="mt-2">{{ $t('comp.flowchart.p.view6') }}</PvMessage>
        <PvDivider />

        <!-- 统一的流程图查看器 - 不再需要条件判断游戏类型 -->
        <div class="mt-6">
          <FlowchartViewer
            :game-id="gameSelection"
            :version-id="versionSelection"
            :flowchart-name="flowchartSelection"
            ref="flowchartComp"
          />
          <FlowchartMetadata
            :flowchart-name="flowchartSelection"
            :game-id="gameSelection"
            :version-id="versionSelection"
          />
        </div>
        <PvDivider />
      </template>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 1.2em;
}
:deep(p.select-title) {
  font-size: 1.1em;
}
</style>
