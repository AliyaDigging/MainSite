<script setup lang="ts">
import { computed, inject } from 'vue'

import PvDataTable from 'primevue/datatable'
import PvColumn from 'primevue/column'

import { symbolExternalConfig_Aliya2Demo } from '@/constants/injection'
import type {
  ChatConfig_Channel_Entry,
  ChatConfig_Actor_Entry,
} from '@/components/flowchart/aliya2_demo/types/script6'
import { Divider } from 'primevue'

// ── Inject data from parent ──
const externalConfig = inject(symbolExternalConfig_Aliya2Demo)

// ── Channel table data ──
const channelTableData = computed<ChatConfig_Channel_Entry[]>(() => {
  const raw = externalConfig?.value?.chatConfig?.channels
  if (!raw) return []
  return Object.values(raw)
})

// ── Actor table data ──
const actorTableData = computed<ChatConfig_Actor_Entry[]>(() => {
  const raw = externalConfig?.value?.chatConfig?.actors
  if (!raw) return []
  return Object.values(raw)
})

// ── channelType mapping ──
const channelTypeLabel = (type: 0 | 1): string => {
  return type === 0 ? '私聊(Single)' : '群聊(Multi)'
}
</script>

<template>
  <div class="special-comp-main">
    <p style="color: gray; text-align: center">
      在底层上，Aliya2代使用了Articy Dialogue
      System作为自己的故事对话系统，在此系统中，我们与每个人聊天的“频道”（channel）在系统内被视作为一种“对话”（conversation），而对话中的参与者被称为“演员”（actor）。尽管Articy为actor提供了头像的字段，但却没有为conversation提供头像的字段；为此，应当是处于数据管理的考量，Aliya2代使用了一个额外的文件来管理<b
        style="font-size: 1.2rem"
        >conversation和actor们的数据</b
      >。以下显示的便是这些相关数据。
    </p>
    <Divider />

    <!-- ───────────────── Channels DataTable ───────────────── -->
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">对话（Conversation）</h2>
    <PvDataTable :value="channelTableData" v-if="channelTableData.length > 0" style="width: 100%">
      <template #empty> 无频道数据 </template>

      <!-- Column 1: id -->
      <PvColumn field="id" header="ID" />

      <!-- Column 2: name (zh-cn / en-us) -->
      <PvColumn header="名称">
        <template #body="slotProps">
          <ul>
            <li>
              zh-cn: <code>{{ slotProps.data.name['zh-cn'] }}</code>
            </li>
            <li>
              en-us: <code>{{ slotProps.data.name['en-us'] }}</code>
            </li>
          </ul>
        </template>
      </PvColumn>

      <!-- Column 3: avatarFilename (path + image) -->
      <PvColumn header="头像">
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
      <PvColumn header="频道类型">
        <template #body="slotProps">
          <code>{{ channelTypeLabel(slotProps.data.channelType) }}</code>
        </template>
      </PvColumn>

      <!-- Column 5: startConversation -->
      <PvColumn header="起始会话">
        <template #body="slotProps">
          <ul>
            <li>
              originConversationId:
              <code>{{ slotProps.data.startConversation.originConversationId }}</code>
              :
              <code>{{ slotProps.data.startConversation.title }}</code>
            </li>
            <li>
              actualConversationInfo:
              <code
                >{{ slotProps.data.startConversation.actualConversationInfo.flowchartId }}@{{
                  slotProps.data.startConversation.actualConversationInfo.nodeId
                }}</code
              >
            </li>
          </ul>
        </template>
      </PvColumn>
    </PvDataTable>
    <p v-else>暂无频道数据。</p>

    <Divider />

    <!-- ───────────────── Actors DataTable ───────────────── -->
    <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 8px">演员（Actor）</h2>
    <PvDataTable :value="actorTableData" v-if="actorTableData.length > 0" style="width: 100%">
      <template #empty> 无角色数据 </template>

      <!-- Column 1: name -->
      <PvColumn field="name" header="名称" />

      <!-- Column 2: avatarFilename (path + image) -->
      <PvColumn header="头像">
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
    <p v-else>暂无角色数据。</p>
  </div>
</template>
