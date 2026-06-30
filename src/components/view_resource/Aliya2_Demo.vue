<script setup lang="ts">
import PvDivider from 'primevue/divider'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DeferredContent from 'primevue/deferredcontent'
import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'
import { getJson } from '@/utils/fetch'
import type { ResourceList_Aliya2Demo } from '@/types/aliya2_demo/resource_list'

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

const dataResourceList = ref<ResourceList_Aliya2Demo>({} as ResourceList_Aliya2Demo)
async function loadResourceCatalog(gameId: string, versionId: string) {
  if (gameId === '' || versionId === '') {
    return
  }
  dataResourceList.value = await getJson<ResourceList_Aliya2Demo>(
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
  <!-- 第1节：角色头像 -->
  <h2 class="text-black mb-2 mt-8">{{ $t('view.res.aliya2_demo.h2.1') }}</h2>
  <PvDataTable :value="dataResourceList.image.avatar.actor" v-if="isReady">
    <PvColumn field="name" :header="i18n.t('view.res.col.name')"></PvColumn>
    <PvColumn field="path" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.path" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <!-- 第2节：频道头像 -->
  <h2 class="text-black">{{ $t('view.res.aliya2_demo.h2.2') }}</h2>
  <PvDataTable :value="dataResourceList.image.avatar.channel" v-if="isReady">
    <PvColumn field="name" :header="i18n.t('view.res.col.name')"></PvColumn>
    <PvColumn field="path" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.path" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <!-- 第3节：CG图片 -->
  <h2 class="text-black">{{ $t('view.res.aliya2_demo.h2.3') }}</h2>
  <PvDataTable :value="dataResourceList.image.cg" v-if="isReady">
    <PvColumn field="name" :header="i18n.t('view.res.col.name')"></PvColumn>
    <PvColumn field="path" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.path" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <!-- 第4节：表情 -->
  <h2 class="text-black">{{ $t('view.res.aliya2_demo.h2.4') }}</h2>
  <PvDataTable :value="dataResourceList.image.emoji" v-if="isReady">
    <PvColumn field="name" :header="i18n.t('view.res.col.name')"></PvColumn>
    <PvColumn field="path" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <DeferredContent>
          <img :src="slotProps.data.path" />
        </DeferredContent>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <!-- 第5节：背景音乐 -->
  <h2 class="text-black">{{ $t('view.res.aliya2_demo.h2.5') }}</h2>
  <PvDataTable :value="dataResourceList.audio.bgm" v-if="isReady">
    <PvColumn field="name" :header="i18n.t('view.res.col.name')"></PvColumn>
    <PvColumn field="path" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <audio :src="slotProps.data.path" width="100%" controls></audio>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />

  <!-- 第6节：音效 -->
  <h2 class="text-black">{{ $t('view.res.aliya2_demo.h2.6') }}</h2>
  <PvDataTable :value="dataResourceList.audio.sfx" v-if="isReady">
    <PvColumn field="name" :header="i18n.t('view.res.col.name')"></PvColumn>
    <PvColumn field="path" :header="i18n.t('view.res.col.url')">
      <template #body="slotProps">
        <audio :src="slotProps.data.path" width="100%" controls></audio>
      </template>
    </PvColumn>
  </PvDataTable>
  <p v-else><b>Loading...</b></p>
  <PvDivider />
</template>
