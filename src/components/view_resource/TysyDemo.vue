<script setup lang="ts">
import PvDivider from 'primevue/divider'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DeferredContent from 'primevue/deferredcontent'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { getJson } from '@/utils/fetch'
import type { TysyDemo_ResourceList } from '@/types/tysy_demo/resource_list'

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

const dataResourceList = ref<TysyDemo_ResourceList>({} as TysyDemo_ResourceList)
async function loadResourceCatalog(gameId: string, versionId: string) {
  if (gameId === '' || versionId === '') {
    return
  }
  dataResourceList.value = await getJson<TysyDemo_ResourceList>(
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
  <h2 class="text-black mb-2 mt-8">{{ $t('view.res.h2.2') }}</h2>
  <PvDataTable :value="dataResourceList.images" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')"></PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" width="100%" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />
</template>
