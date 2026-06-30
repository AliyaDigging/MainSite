<script setup lang="ts">
import { computed, inject } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'

import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'

// ── Inject data from parent ──
const externalConfigData = inject(symbolExternalConfig_Aliya2Demo)

// ── Flatten images Record → array ──
const imagesData = computed(() => {
  const raw = externalConfigData?.value?.mediaMessageConfig?.images
  if (!raw) return []
  return Object.values(raw)
})

// ── Flatten emojis Record → array ──
const emojisData = computed(() => {
  const raw = externalConfigData?.value?.mediaMessageConfig?.emojis
  if (!raw) return []
  return Object.values(raw)
})
</script>

<template>
  <div class="special-comp-main">
    <p style="color: gray; text-align: center">
      同1代类似，Aliya2代也引入了<b style="font-size: 1.2rem">图片</b
      >消息，但除了CG外则还有表情包（emoji）类图片，且这些图片在流程图内对话中使用特殊命令形式<code>$image{图片ID}</code>标记。本页显示的便是在该命令中使用的图片ID及其对应图片的信息。
    </p>
    <br />
    <!-- ── Images DataTable ── -->
    <PvDataTable :value="imagesData" v-if="imagesData.length > 0" style="width: 100%">
      <template #empty> 无数据 </template>

      <PvColumn field="id" header="ID" />

      <PvColumn header="图片预览">
        <template #body="slotProps">
          <p style="margin-bottom: 8px">
            <code>{{ slotProps.data.imageFilename }}</code>
          </p>
          <img
            :src="`/aliya/aliya2_demo/images/${slotProps.data.imageFilename}`"
            :alt="slotProps.data.id"
            style="max-width: 300px; border-radius: 4px"
          />
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>暂无图片数据。</p>

    <!-- ── Emojis DataTable ── -->
    <PvDataTable
      :value="emojisData"
      v-if="emojisData.length > 0"
      style="width: 100%; margin-top: 24px"
    >
      <template #empty> 无数据 </template>

      <PvColumn field="id" header="ID" />

      <PvColumn header="表情预览">
        <template #body="slotProps">
          <p style="margin-bottom: 8px">
            <code>{{ slotProps.data.imageFilename }}</code>
          </p>
          <img
            :src="`/aliya/aliya2_demo/images/${slotProps.data.imageFilename}`"
            :alt="slotProps.data.id"
            style="max-width: 120px; border-radius: 4px"
          />
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>暂无表情数据。</p>
  </div>
</template>
