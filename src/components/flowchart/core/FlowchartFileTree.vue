<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { InsertDriveFileOutlined } from '@vicons/material'
import { LayoutSidebarRightCollapse, LayoutSidebarLeftCollapse } from '@vicons/tabler'
import { Icon } from '@vicons/utils'
import Button from 'primevue/button'
import Listbox from 'primevue/listbox'
import Menubar from 'primevue/menubar'
import { symbolFlowchartFileTreeCollapsed, symbolFlowchartSelection } from '@/constants/injection'
import type { FlowchartCatalogListManifest as Aliya2Demo_FlowchartCatalogListManifest } from '@/components/flowchart/aliya2_demo/types/script12'
import { getJson } from '@/utils/fetch'
import { Tag } from 'primevue'

/**
 * Flowchart file tree component — left panel.
 * Currently accepts Array<string>; tree structure support planned.
 */
defineProps<{
  items: string[]
  activeItem?: string
}>()

const emit = defineEmits<{
  select: [item: string]
}>()

const fileTreeCollapsed = inject(symbolFlowchartFileTreeCollapsed, null)

function toggleFileTree() {
  if (fileTreeCollapsed) {
    fileTreeCollapsed.value = !fileTreeCollapsed.value
  }
}

const selectionStatus = inject(symbolFlowchartSelection)!

const isReady = ref(false)

/** EXTRA DATA FOR OPTIMIZED CATALOG LIST DISPLAY */
const extraData = {
  aliya2_demo: ref<Aliya2Demo_FlowchartCatalogListManifest>({}),
}
async function getExtraData(gameId: string, versionId: string) {
  if (gameId === 'aliya2_demo') {
    extraData.aliya2_demo.value = await getJson(
      `/data/aliya2_demo/${versionId}/flowcharts/metadata_manifest.json`,
      5,
    )
  }
}

watch(
  selectionStatus,
  async ([gameId, versionId], old) => {
    async function update() {
      isReady.value = false
      await getExtraData(gameId, versionId)
      isReady.value = true
    }

    if (old == undefined) {
      // first time loading (via immediate=true)
      await update()
    } else if (gameId !== old[0] && versionId !== old[1]) {
      // already loaded
      await update()
    }
  },
  { immediate: true },
)
</script>

<template>
  <template v-if="isReady">
    <Menubar v-if="fileTreeCollapsed !== null" class="file-tree-menubar">
      <template #start>
        <Button
          text
          severity="secondary"
          size="small"
          class="file-tree-collapse-btn"
          @click="toggleFileTree"
        >
          <Icon size="16">
            <LayoutSidebarLeftCollapse v-if="fileTreeCollapsed" />
            <LayoutSidebarRightCollapse v-else />
          </Icon>
          <span>{{
            fileTreeCollapsed
              ? $t('comp.flowchart.p.expandFileTree')
              : $t('comp.flowchart.p.collapseFileTree')
          }}</span>
        </Button>
      </template>
    </Menubar>
    <Listbox
      :options="items"
      :model-value="activeItem"
      :pt="{
        root: { class: 'file-tree', style: { borderRadius: 0 } },
        listContainer: { style: { maxHeight: 'none' } },
        list: 'file-tree-list',
        option: ({ context }) => ({
          class: ['file-tree-item', { active: context.selected }],
        }),
      }"
      @change="emit('select', $event.value as string)"
    >
      <template #option="{ option }">
        <!--针对 Aliya2 的特化-->
        <div
          v-if="selectionStatus[0] === 'aliya2_demo'"
          v-tooltip.top="extraData.aliya2_demo.value[option]?.title"
          style="width: 100%"
          class="p-listbox-option-div"
        >
          <span class="file-tree-item-icon" style="margin-right: 4px">
            <Icon><InsertDriveFileOutlined /></Icon>
          </span>
          <span class="file-tree-item-name">{{ option }}&ensp;</span>

          <Tag severity="primary" v-if="extraData.aliya2_demo.value[option]">{{
            extraData.aliya2_demo.value[option]?.channelId
          }}</Tag>
        </div>
        <!--特化结束-->
        <div v-else class="p-listbox-option-div">
          <span class="file-tree-item-icon" style="margin-right: 4px"
            ><Icon><InsertDriveFileOutlined /></Icon
          ></span>
          <span class="file-tree-item-name">{{ option }}</span>
        </div>
      </template>

      <template #empty>{{ $t('comp.flowchart.p.selection1') }}</template>
    </Listbox>
    <Menubar v-if="fileTreeCollapsed !== null" class="file-tree-menubar">
      <template #start>
        <Button
          text
          severity="secondary"
          size="small"
          class="file-tree-collapse-btn"
          @click="toggleFileTree"
        >
          <Icon size="16">
            <LayoutSidebarLeftCollapse v-if="fileTreeCollapsed" />
            <LayoutSidebarRightCollapse v-else />
          </Icon>
          <span>{{
            fileTreeCollapsed
              ? $t('comp.flowchart.p.expandFileTree')
              : $t('comp.flowchart.p.collapseFileTree')
          }}</span>
        </Button>
      </template>
    </Menubar>
  </template>
  <template v-else>Loading...</template>
</template>

<style scoped>
:deep(.p-listbox) {
  border-radius: 0 !important;
}

:deep(.p-listbox-option) {
  padding: 0;
}
:deep(.p-listbox-option-div) {
  padding: var(--p-listbox-option-padding);
}
</style>

<style scoped>
.file-tree-menubar {
  flex-shrink: 0;
  border: none;
  border-radius: 0;
  min-height: unset;
  padding: 2px 4px;
}

.file-tree-menubar :deep(.p-menubar-root-list) {
  display: none;
}

.file-tree-menubar :deep(.p-menubar-start) {
  margin-left: auto;
}

.file-tree {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.file-tree-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.file-tree-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 16px;
  color: var(--p-text-color, #1e293b);
  transition: background 0.15s;
  border-left: 3px solid transparent;
}

.file-tree-item:hover {
  background: var(--p-surface-hover, #e9ecef);
}

.file-tree-item.active {
  background: var(--p-primary-50, #eff6ff);
  color: var(--p-primary-color, #3b82f6);
  border-left-color: var(--p-primary-color, #3b82f6);
  font-weight: 500;
}

.file-tree-item-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.file-tree-item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
