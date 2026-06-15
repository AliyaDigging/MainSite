<script setup lang="ts">
import PvDivider from 'primevue/divider'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DeferredContent from 'primevue/deferredcontent'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import PvTag from 'primevue/tag'
import type { Aliya1_ResourceList } from '@/types/aliya1/resource_list'
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

const isReady = ref(false)

type ResourceListData = Aliya1_ResourceList
const dataResourceList = ref<ResourceListData>({ images: [], music: [] })
async function loadResourceCatalog(gameId: string, versionId: string) {
  if (gameId === '' || versionId === '') {
    return
  }
  dataResourceList.value = await getJson<ResourceListData>(
    `/data/${gameId}/${versionId}/resource.json`,
  )
}

const i18n = useI18n()

onMounted(async () => {
  isReady.value = false
  await loadResourceCatalog(props.gameId, props.versionId)
  isReady.value = true
})

watch(
  () => [props.gameId, props.versionId],
  ([n1, n2]) => {
    if (n1 !== '' && n2 !== '') {
      loadResourceCatalog(n1, n2)
    }
  },
  { immediate: true },
)
</script>

<template>
  <h2 class="text-black mb-2 mt-8">{{ $t('view.res.h2.1') }}</h2>
  <PvDataTable :value="dataResourceList.music" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')"></PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <audio :src="slotProps.data.url" width="100%" controls></audio>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />
  <h2 class="text-black">{{ $t('view.res.h2.2') }}</h2>
  <p class="mt-2 mb-4">{{ $t('view.res.images.desc.1') }}</p>
  <PvDataTable :value="dataResourceList.images" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')">
      <template #body="slotProps">
        <span>{{ slotProps.data.filename }}</span>
        <template v-if="slotProps.data.filename.includes('.1') && !gameId.includes('dlc')">
          <br />
          <PvTag severity="info" class="mt-1">{{ $t('view.res.col.name.tag.1') }}</PvTag>
        </template>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" width="100%" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
</template>
