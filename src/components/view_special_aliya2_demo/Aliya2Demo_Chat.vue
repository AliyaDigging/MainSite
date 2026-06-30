<script setup lang="ts">
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'

import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import type {
  ChatConfig_Channel_Entry,
  ChatConfig_Actor_Entry,
} from '@/components/flowchart/aliya2_demo/types/script6'
import { Divider } from 'primevue'
import { gb18030Collator } from '@/utils/utils'

const i18n = useI18n()

// ── Inject data from parent ──
const externalConfig = inject(symbolExternalConfig_Aliya2Demo)

// ── Channel table data ──
const channelTableData = computed<ChatConfig_Channel_Entry[]>(() => {
  const raw = externalConfig?.value?.chatConfig?.channels
  if (!raw) return []
  return Object.values(raw).sort((a, b) => gb18030Collator.compare(a.id, b.id))
})

// ── Actor table data ──
const actorTableData = computed<ChatConfig_Actor_Entry[]>(() => {
  const raw = externalConfig?.value?.chatConfig?.actors
  if (!raw) return []
  return Object.values(raw).sort((a, b) => gb18030Collator.compare(a.name, b.name))
})

// ── channelType mapping ──
const channelTypeLabel = (type: 0 | 1): string => {
  return i18n.t(`view.special.aliya2_demo.comp.chat.channelType.${type}`)
}
</script>

<template>
  <div class="special-comp-main">
    <p class="special-comp-main-desc" v-html="$t('view.special.aliya2_demo.comp.chat.desc')"></p>
    <Divider />

    <!-- ───────────────── Channels DataTable ───────────────── -->
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">
      {{ $t('view.special.aliya2_demo.comp.chat.section.channel') }}
    </h2>
    <PvDataTable :value="channelTableData" v-if="channelTableData.length > 0" style="width: 100%">
      <template #empty> {{ $t('view.special.aliya2_demo.comp.chat.DataTable.1.empty') }} </template>

      <!-- Column 1: id -->
      <PvColumn
        field="id"
        :header="$t('view.special.aliya2_demo.comp.chat.DataTable.1.column.1.title')"
      />

      <!-- Column 2: name (zh-cn / en-us) -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.chat.DataTable.1.column.2.title')">
        <template #body="slotProps">
          <ul>
            <li>
              {{ $t('view.special.aliya2_demo.comp.chat.label.zhCn') }}
              {{ slotProps.data.name['zh-cn'] }}
            </li>
            <li>
              {{ $t('view.special.aliya2_demo.comp.chat.label.enUs') }}
              {{ slotProps.data.name['en-us'] }}
            </li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 3: avatarFilename (path + image) -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.chat.DataTable.1.column.3.title')">
        <template #body="slotProps">
          <div class="avatar-cell">
            <code>{{ slotProps.data.avatarFilename }}</code>
            <img
              :src="`/aliya/aliya2_demo/images/avatar/${slotProps.data.avatarFilename}`"
              :alt="slotProps.data.avatarFilename"
              style="max-height: 48px; margin-top: 4px"
            />
          </div>
        </template>
      </PvColumn>

      <!-- Column 4: channelType (0=私聊, 1=群聊) -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.chat.DataTable.1.column.4.title')">
        <template #body="slotProps">
          {{ channelTypeLabel(slotProps.data.channelType) }}
        </template>
      </PvColumn>

      <!-- Column 5: startConversation -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.chat.DataTable.1.column.5.title')">
        <template #body="slotProps">
          <p>
            {{ $t('view.special.aliya2_demo.comp.chat.label.originConversationId') }}
            <code>{{ slotProps.data.startConversation.originConversationId }}</code>
            [{{ slotProps.data.startConversation.title }}]
          </p>
          <p>
            {{ $t('view.special.aliya2_demo.comp.chat.label.actualConversationInfo') }}
            <code>{{ slotProps.data.startConversation.actualConversationInfo.flowchartId }}</code
            >@<code>{{ slotProps.data.startConversation.actualConversationInfo.nodeId }}</code>
          </p>
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>{{ $t('view.special.aliya2_demo.comp.chat.noData1') }}</p>

    <Divider />

    <!-- ───────────────── Actors DataTable ───────────────── -->
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">
      {{ $t('view.special.aliya2_demo.comp.chat.section.actor') }}
    </h2>
    <PvDataTable :value="actorTableData" v-if="actorTableData.length > 0" style="width: 100%">
      <template #empty> {{ $t('view.special.aliya2_demo.comp.chat.DataTable.2.empty') }} </template>

      <!-- Column 1: name -->
      <PvColumn
        field="name"
        :header="$t('view.special.aliya2_demo.comp.chat.DataTable.2.column.1.title')"
      />

      <!-- Column 2: avatarFilename (path + image) -->
      <PvColumn :header="$t('view.special.aliya2_demo.comp.chat.DataTable.2.column.2.title')">
        <template #body="slotProps">
          <div class="avatar-cell">
            <code>{{ slotProps.data.avatarFilename }}</code>
            <img
              :src="`/aliya/aliya2_demo/images/avatar/${slotProps.data.avatarFilename}`"
              :alt="slotProps.data.avatarFilename"
              style="max-height: 48px; margin-top: 4px"
            />
          </div>
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>{{ $t('view.special.aliya2_demo.comp.chat.noData2') }}</p>
  </div>
</template>
