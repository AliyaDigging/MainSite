<script setup lang="ts">
import PvDivider from 'primevue/divider'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DeferredContent from 'primevue/deferredcontent'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import PvTag from 'primevue/tag'
import { getJson } from '@/utils/fetch'
import type { Ycytx5_ResourceList } from '@/types/ycytx_5/resource_list'

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

const dataResourceList = ref<Ycytx5_ResourceList>({} as Ycytx5_ResourceList)
async function loadResourceCatalog(gameId: string, versionId: string) {
  if (gameId === '' || versionId === '') {
    return
  }
  dataResourceList.value = await getJson<Ycytx5_ResourceList>(
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

  <h2 class="text-black">{{ $t('view.res.ycytx_5.h2.2') }}</h2>
  <p class="mt-2 mb-4">{{ $t('view.res.ycytx_5.desc.1') }}</p>
  <PvDataTable :value="dataResourceList.images.story_images" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.yxytx_5.images.story_images.col.1')">
      <template #body="slotProps">
        <span>{{ slotProps.data[0].filename }}</span>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.yxytx_5.images.story_images.col.2')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data[0].url" width="100%" />
        </DeferredContent>
      </template>
    </PvColumn>
    <PvColumn field="filename" :header="i18n.t('view.res.yxytx_5.images.story_images.col.3')">
      <template #body="slotProps">
        <span>{{ slotProps.data[1].filename }}</span>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.yxytx_5.images.story_images.col.4')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data[1].url" width="100%" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <h2 class="text-black">{{ $t('view.res.ycytx_5.h2.3') }}</h2>
  <p class="mt-2 mb-4">{{ $t('view.res.ycytx_5.desc.2') }}</p>
  <PvDataTable :value="dataResourceList.images.feed_avater" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')">
      <template #body="slotProps">
        <span>{{ slotProps.data.filename }}</span>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>

  <h2 class="text-black">{{ $t('view.res.ycytx_5.h2.4') }}</h2>
  <p class="mt-2 mb-4">{{ $t('view.res.ycytx_5.desc.3') }}</p>
  <PvDataTable :value="dataResourceList.images.chapter_cover" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')">
      <template #body="slotProps">
        <span>{{ slotProps.data.filename }}</span>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <PvDivider />
  <PvDivider />

  <h2 class="text-black">{{ $t('view.res.ycytx_5.h2.5') }}</h2>
  <p class="mt-2 mb-4">{{ $t('view.res.ycytx_5.desc.4') }}</p>
  <PvDataTable :value="dataResourceList.images.chat_background" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')">
      <template #body="slotProps">
        <span>{{ slotProps.data.filename }}</span>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <h2 class="text-black">{{ $t('view.res.ycytx_5.h2.6') }}</h2>
  <p class="mt-2 mb-4">{{ $t('view.res.ycytx_5.desc.5') }}</p>
  <PvDataTable :value="dataResourceList.images.chat_background_new" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')">
      <template #body="slotProps">
        <span>{{ slotProps.data.filename }}</span>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <h2 class="text-black">{{ $t('view.res.ycytx_5.h2.7') }}</h2>
  <p class="mt-2 mb-4">{{ $t('view.res.ycytx_5.desc.6') }}</p>
  <PvDataTable :value="dataResourceList.images.splash_screen" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')">
      <template #body="slotProps">
        <span>{{ slotProps.data.filename }}</span>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <h2 class="text-black">{{ $t('view.res.ycytx_5.h2.8') }}</h2>
  <p class="mt-2 mb-4">{{ $t('view.res.ycytx_5.desc.7') }}</p>
  <PvDataTable :value="dataResourceList.images.guide_image" v-if="isReady">
    <PvColumn field="filename" :header="i18n.t('view.res.col.name')">
      <template #body="slotProps">
        <span>{{ slotProps.data.filename }}</span>
      </template>
    </PvColumn>
    <PvColumn field="url" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.url" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />
</template>
