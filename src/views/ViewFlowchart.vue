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
import { ref, watch, provide, onMounted, computed } from 'vue'
import PvMessage from 'primevue/message'

// 使用新的统一组件
import Flowchart_Aliya1 from '@/components/view_flowchart/Aliya1.vue'
import Flowchart_Ycytx5 from '@/components/view_flowchart/Ycytx5.vue'

import { symbolGameSelectionDict } from '@/constants/injection'
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
const route = useRoute()
const router = useRouter()

/* <select> variables */
const gameSelection = ref<string>(props.gameId)
const versionSelection = ref<string>(props.versionId)
const flowchartSelection = ref<string>(props.flowchartName)
const injectionSelectData = computed(
  () =>
    [gameSelection.value, versionSelection.value, flowchartSelection.value] as [
      string,
      string,
      string,
    ],
)

const dataAllCatalog = ref<AllDataCatalog>([])

const catalogList = ref<string[]>([])

// 更清晰的状态命名
const isGlobalDataLoaded = ref(false) // 替代原来的 isReady
const isFlowchartDataLoaded = ref(false) // 替代原来的 isReady2

provide(symbolGameSelectionDict, injectionSelectData)

// select 更改时，触发路径更改
watch([gameSelection, versionSelection, flowchartSelection], ([n1, n2, n3], [o1]) => {
  // 当 gameSelection 改变时，清除 versionSelection 和 flowchartSelection
  if (n1 !== o1) {
    versionSelection.value = ''
    flowchartSelection.value = ''
    isFlowchartDataLoaded.value = false
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

watch([gameSelection, versionSelection], async ([n1, n2]) => {
  if (n1 !== '' && n2 !== '') {
    isFlowchartDataLoaded.value = false
    await (async () =>
      (catalogList.value = await getJson<string[]>(
        `/data/${n1}/${n2}/flowcharts/vueflow/catalog_list.json`,
        5,
      )))()
    isFlowchartDataLoaded.value = true
  }
})

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
    (async () => {
      const [n1, n2] = [gameSelection.value, versionSelection.value]
      if (n1 !== '' && n2 !== '') {
        catalogList.value = await getJson<string[]>(
          `/data/${n1}/${n2}/flowcharts/vueflow/catalog_list.json`,
          5,
        )
        isFlowchartDataLoaded.value = true
      }
    })(),
  ])
  isGlobalDataLoaded.value = true
})
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
          <template v-if="gameSelection.toLowerCase().includes('aliya')">
            <Flowchart_Aliya1 />
          </template>
          <template v-else-if="gameSelection.toLowerCase() === 'ycytx_5'">
            <Flowchart_Ycytx5 />
          </template>
          <template v-else>
            <p>
              Unsupported game. This error may occur due to a misconfiguration in the data JSON.
            </p>
            <p>Contact the developer to fix this.</p>
            <p>该游戏数据尚未支持，出现此错误可能是由于在数据JSON中错误配置。</p>
            <p>请联系开发者修复。</p>
          </template>
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
:deep(.vue-flow__node-toolbar) {
  font-size: 0.9rem;
}
</style>
