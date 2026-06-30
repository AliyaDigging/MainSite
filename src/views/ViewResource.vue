<script setup lang="ts">
import PvDivider from 'primevue/divider'

import { onMounted, ref, watch } from 'vue'
import type { AllDataCatalog } from '@/types/allDataCatalog'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { getJson } from '@/utils/fetch'

import Aliya1 from '@/components/view_resource/Aliya1.vue'
import Ycytx5 from '@/components/view_resource/Ycytx5.vue'
import TysyDemo from '@/components/view_resource/TysyDemo.vue'
import Aliya2Demo from '@/components/view_resource/Aliya2_Demo.vue'
import GameAndVersionSelector from '@/components/GameAndVersionSelector.vue'
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

const dataAllCatalog = ref<AllDataCatalog>([])
const gameId = ref<string>(props.gameId)
const versionId = ref<string>(props.versionId)

const isReady = ref(false)
const isReady2 = ref(false)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  dataAllCatalog.value = await getJson<AllDataCatalog>(`/data/data_catalog.json`, 5)
  isReady.value = true

  if (gameId.value !== '' && versionId.value !== '') {
    isReady2.value = true
  }
})

// select 更改时，触发路径更改
watch([gameId, versionId], ([n1, n2], [o1]) => {
  // 新URL格式
  if (n2 !== '') {
    router.push(`/view/resource/${n1}/${n2}`)
  } else if (n1 !== '') {
    router.push(`/view/resource/${n1}`)
    isReady2.value = false
  } else {
    router.push(`/view/resource/`)
    isReady2.value = false
  }

  if (n1 !== o1) {
    versionId.value = ''
    isReady2.value = false
    return
  }

  if (n1 !== '' && n2 !== '') {
    isReady2.value = true
  }
})
// 路径更改时，触发 select 更改
watch(
  () => [route.params.gameId, route.params.versionId],
  ([n1, n2]) => {
    if (n1 !== gameId.value) {
      gameId.value = String(n1)
      versionId.value = ''
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
        <Aliya1 v-if="gameId.includes('aliya1')" :game-id="gameId" :version-id="versionId" />
        <Ycytx5
          v-else-if="gameId.toLowerCase() === 'ycytx_5'"
          :game-id="gameId"
          :version-id="versionId"
        />
        <TysyDemo
          v-else-if="gameId.toLowerCase() === 'tysy_demo'"
          :game-id="gameId"
          :version-id="versionId"
        />
        <Aliya2Demo
          v-else-if="gameId.toLowerCase() === 'aliya2_demo'"
          :game-id="gameId"
          :version-id="versionId"
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
