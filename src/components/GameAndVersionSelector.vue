<script setup lang="ts">
import type { AllDataCatalog, AllDataCatalogEntry } from '@/types/allDataCatalog'
import PvSelect from 'primevue/select'
import PvTag from 'primevue/tag'
import PvButton from 'primevue/button'
import { defineAsyncComponent, onMounted, ref, watch, type PropType } from 'vue'
import { useDialog } from 'primevue/usedialog'

const compExtraInfo = defineAsyncComponent(
  () => import('./GameAndVersionSelector_VersionExtraInfo.vue'),
)

const props = defineProps({
  dataAllCatalog: { type: [] as PropType<AllDataCatalog>, required: true },
  displayVersionSelectionAfterGameSelection: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const gameSelection = defineModel('gameSelection', { type: String })
const versionSelection = defineModel('versionSelection', { type: String })

const local_gameSelection = ref<AllDataCatalogEntry>(
  (() => {
    const blank = {} as AllDataCatalogEntry
    if (gameSelection.value !== '') {
      const result = props.dataAllCatalog.find((v) => v.metadata.id === gameSelection.value)
      if (result) {
        return result
      } else {
        return blank
      }
    } else {
      return blank
    }
  })(),
)
const local_versionSelection = ref<AllDataCatalogEntry['versions'][number]>(
  (() => {
    const blank = {} as AllDataCatalogEntry['versions'][number]
    if (gameSelection.value !== '' && versionSelection.value !== '') {
      const result = props.dataAllCatalog.find((v) => v.metadata.id === gameSelection.value)
      if (result) {
        const result2 = result.versions.find((v) => v.id === versionSelection.value)
        if (result2) {
          return result2
        } else {
          return blank
        }
      } else {
        return blank
      }
    } else {
      return blank
    }
  })(),
)

const currVersionData = ref<AllDataCatalogEntry['versions']>([])

watch(
  [local_gameSelection, local_versionSelection],
  ([n1, n2]) => {
    if (n1.metadata) {
      gameSelection.value = n1.metadata.id
    }
    if (n2.id) {
      versionSelection.value = n2.id
    }
  },
  { immediate: true },
)

watch(
  gameSelection,
  (newValue) => {
    const gameData = props.dataAllCatalog.find((v) => v.metadata.id === newValue)
    if (gameData) {
      currVersionData.value = gameData.versions
    } else {
      currVersionData.value = []
    }
  },
  { immediate: true },
)

watch(
  [gameSelection, versionSelection],
  ([newGameSelection, newVersionSelection]) => {
    if (newVersionSelection === '') {
      local_versionSelection.value = {} as AllDataCatalogEntry['versions'][number]
    } else if (newGameSelection !== '' && newVersionSelection !== '') {
      const gameData = props.dataAllCatalog.find((v) => v.metadata.id === newGameSelection)
      if (gameData) {
        const versionData = gameData.versions.find((v) => v.id === newVersionSelection)
        if (versionData) {
          local_versionSelection.value = versionData
        }
      }
    }
  },
)
const dialog = useDialog()
function openVersionInfoDialog(data: AllDataCatalogEntry['versions'][number]) {
  dialog.open(compExtraInfo, {
    props: {
      style: {
        width: '90vw',
      },
      modal: true,
      draggable: false,
      dismissableMask: true,
    },
    data: {
      data: data,
    },
  })
}
</script>

<template>
  <p class="select-title text-color mb-2">
    {{ $t('comp.flowchart.select.title1') }}
    <PvSelect v-model="local_gameSelection" :options="dataAllCatalog">
      <template #option="slotProps">
        <div>
          <span class="mr-2">{{ $t(`l10n.game.name.${slotProps.option.metadata.id}`) }}</span>
          <PvTag severity="info" size="small">{{
            $t(`constant.game.platform.type.${slotProps.option.metadata.platform.type}`)
          }}</PvTag
          >&nbsp;
          <PvTag severity="info" size="small">{{
            $t(`constant.game.platform.seller.${slotProps.option.metadata.platform.seller}`)
          }}</PvTag>
        </div>
      </template>
      <template #value="slotProps">
        <div v-if="slotProps.value">
          <span class="mr-2">{{ $t(`l10n.game.name.${slotProps.value.metadata.id}`) }}</span>
          <PvTag severity="info" size="small">{{
            $t(`constant.game.platform.type.${slotProps.value.metadata.platform.type}`)
          }}</PvTag
          >&nbsp;
          <PvTag severity="info" size="small">{{
            $t(`constant.game.platform.seller.${slotProps.value.metadata.platform.seller}`)
          }}</PvTag>
        </div>
        <div v-else>
          <span>{{ $t('select.gameid.placeholder') }}</span>
        </div>
      </template>
    </PvSelect>
  </p>
  <p
    class="select-title text-color mb-2"
    v-if="
      (displayVersionSelectionAfterGameSelection && gameSelection !== '') || // when true
      !displayVersionSelectionAfterGameSelection // when false
    "
  >
    {{ $t('comp.flowchart.select.title2') }}
    <PvSelect v-model="local_versionSelection" :options="currVersionData">
      <template #option="slotProps">
        <div>
          <span class="mr-2">{{ slotProps.option.id }}</span>
          <PvTag severity="info" size="small">{{ slotProps.option.update_time }}</PvTag>
        </div>
      </template>
      <template #value="slotProps">
        <div v-if="slotProps.value">
          <span class="mr-2">{{ slotProps.value.id }}</span>
          <PvTag severity="info" size="small">{{ slotProps.value.update_time }}</PvTag>
        </div>
        <div v-else>
          <span>{{ $t('select.versionid.placeholder') }}</span>
        </div>
      </template>
    </PvSelect>
    <PvButton
      v-if="local_versionSelection.id"
      class="ml-2"
      severity="secondary"
      @click="openVersionInfoDialog(local_versionSelection)"
      ><i class="pi pi-info-circle"
    /></PvButton>
  </p>
</template>
