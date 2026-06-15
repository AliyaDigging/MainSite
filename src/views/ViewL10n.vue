<script setup lang="ts">
import { useAliyaStore } from '@/stores/aliya'
import PvMultiSelect from 'primevue/multiselect'
import PvDivider from 'primevue/divider'
import { useI18n } from 'vue-i18n'

import { ref, onMounted, watch } from 'vue'
import { getJson } from '@/utils/fetch'
import GameAndVersionSelector from '@/components/GameAndVersionSelector.vue'
import type { AllDataCatalog } from '@/types/allDataCatalog'
import { useRoute, useRouter } from 'vue-router'

import LoadingSpinner from '@/components/LoadingSpinner.vue'

import Aliya1 from '@/components/view_l10n/Aliya1.vue'
import Ycytx5 from '@/components/view_l10n/Ycytx5.vue'
import TysyDemo from '@/components/view_l10n/TysyDemo.vue'

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

const aliyaSetting = useAliyaStore()
const i18n = useI18n()
const route = useRoute()
const router = useRouter()

const dataAllCatalog = ref<AllDataCatalog>([])
const gameId = ref<string>(props.gameId)
const versionId = ref<string>(props.versionId)

onMounted(async () => {
  dataAllCatalog.value = await getJson<AllDataCatalog>(`/data/data_catalog.json`, 5)
  isReady.value = true

  if (props.gameId !== '' && props.versionId !== '') {
    isReady2.value = true
  }
})

// select 更改时，触发路径更改
watch([gameId, versionId], ([n1, n2], [o1]) => {
  // 新URL格式
  if (n2 !== '') {
    router.push(`/view/localization/${n1}/${n2}`)
  } else if (n1 !== '') {
    router.push(`/view/localization/${n1}`)
    isReady2.value = false
  } else {
    router.push(`/view/localization/`)
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
          :options="['zh-cn', 'en-us', 'zh-cn-c', 'ja-jp']"
          :optionLabel="(item) => i18n.t(`constant.l10nlang.${item}`)"
          :placeholder="i18n.t('view.l10n.p.2')"
          :maxSelectedLabels="3"
        />
      </p>
      <PvDivider />

      <p v-if="!isReady2">{{ $t('view.l10n.p.3') }}</p>
      <template v-else>
        <Aliya1 v-if="gameId.includes('aliya1')" :gameId="gameId" :versionId="versionId" />
        <Ycytx5
          v-else-if="gameId.toLowerCase() === 'ycytx_5'"
          :gameId="gameId"
          :versionId="versionId"
        />
        <TysyDemo
          v-else-if="gameId.toLowerCase() === 'tysy_demo'"
          :gameId="gameId"
          :versionId="versionId"
        />
      </template>
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
:deep(.view-l10n-h2) {
  font-size: 30px;
  font-weight: 600;
}
</style>
