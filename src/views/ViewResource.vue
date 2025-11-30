<script setup lang="ts">
import PvDivider from 'primevue/divider'

import { onMounted, ref, watch } from 'vue'
import type { AllDataCatalog } from '@/types/allDataCatalog'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { getJson } from '@/utils/fetch'

import Aliya1 from '@/components/view_resource/Aliya1.vue'
import GameAndVersionSelector from '@/components/GameAndVersionSelector.vue'
import { useRoute, useRouter } from 'vue-router'
import type { Aliya1_ResourceList } from '@/types/aliya1/resource_list'

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

type ResourceListData = Aliya1_ResourceList
const dataResourceList = ref<ResourceListData>({} as ResourceListData)

const dataAllCatalog = ref<AllDataCatalog>([])
const gameId = ref<string>(props.gameId)
const versionId = ref<string>(props.versionId)

const isReady = ref(false)
const isReady2 = ref(false)

const route = useRoute()
const router = useRouter()

async function loadResourceCatalog(gameId: string, versionId: string) {
  isReady2.value = false
  dataResourceList.value = await getJson<ResourceListData>(
    `/data/${gameId}/${versionId}/resource.json`,
  )
  isReady2.value = true
}

watch(
  [gameId, versionId],
  ([n1, n2]) => {
    if (n1 !== '' && n2 !== '') {
      loadResourceCatalog(n1, n2)
    }
  },
  { immediate: true },
)

onMounted(async () => {
  dataAllCatalog.value = await getJson<AllDataCatalog>(`/data/data_catalog.json`, 5)
  isReady.value = true
})

// select 更改时，触发路径更改
watch([gameId, versionId], ([n1, n2]) => {
  // 新URL格式
  if (n2 !== '') {
    router.push(`/view/resource/${n1}/${n2}`)
  } else if (n1 !== '') {
    router.push(`/view/resource/${n1}`)
  } else {
    router.push(`/view/resource/`)
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
    <h1 class="view-page-h1 text-black mb-0">{{ $t('view.res.h1') }}</h1>
    <p class="view-page-h1-desc text-color mb-2" style="font-size: 1.2em">
      {{ $t('view.res.p.1') }}
    </p>
    <PvDivider />

    <div v-if="!isReady">
      <LoadingSpinner />
    </div>
    <div v-else>
      <GameAndVersionSelector
        :data-all-catalog="dataAllCatalog"
        v-model:game-selection="gameId"
        v-model:version-selection="versionId"
      />
      <template v-if="isReady2">
        <Aliya1
          v-if="gameId.includes('aliya1')"
          :resource-music="(dataResourceList as Aliya1_ResourceList).music"
          :resource-images="(dataResourceList as Aliya1_ResourceList).images"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
:deep(h2) {
  font-size: 30px;
  font-weight: 600;
}
:deep(.select-title) {
  font-size: 1.1rem;
}
</style>
