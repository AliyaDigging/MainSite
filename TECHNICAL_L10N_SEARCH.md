# TECHNICAL_L10N_SEARCH — 新游戏接入 L10N 搜索指南

本文档说明如何为一个新游戏接入 `FlowchartSearchPanel` 的 `l10n_data` 搜索模式，使用户可以通过对话文本（而非原始字段值）搜索流程图节点。

---

## 架构概述

```
Wrapper (view_flowchart/XXX.vue)
  ├─ 加载 L10N 数据 → provide(symbolL10NSearchData)
  └─ Viewer (viewer/XXXViewer.vue)
       ├─ 加载 flowchart JSON → metadata (含 currName 等)
       ├─ provide(symbolFlowchartSearchMetadata)   ← 提供搜索元数据
       └─ FlowchartSearchPanel
            ├─ inject(symbolL10NSearchData)         → L10N 字典
            ├─ inject(symbolFlowchartSearchMetadata) → { currName, ... }
            ├─ getL10NSearchConfig(gameId)          → 游戏搜索配置
            └─ getNodeSearchText():
                  buildL10NKey(data, meta, nodeType) → L10N key[]
                  l10n[key] → 解析后的文本 → 搜索匹配
```

### 关键注册点

| 步骤 | 文件 | 作用 |
|------|------|------|
| (A) | `l10nSearchConfigs.ts` | 注册搜索配置（key 构建策略 + i18n 标题模式） |
| (B) | `injection.ts` | (已有) 通用 injection symbols，通常无需新增 |
| (C) | `XXXViewer.vue` | 提供 `symbolFlowchartSearchMetadata` |
| (D) | `view_flowchart/XXX.vue` | 提供 `symbolL10NSearchData`（规范化 L10N 字典） |

---

## 场景一：有外部 L10N 文件（推荐 `buildL10NKey`）

**适用条件**: 对话文本存储在外部 L10N/本地化 JSON 文件中，node data 不含原文，而是通过某种 key 间接引用。

已接入的游戏：aliya1、aliya1_android_dlc、tysy_demo、ycytx_5。

### Step 1: 注册搜索配置

编辑 `src/components/flowchart/registry/l10nSearchConfigs.ts`，调用 `registerL10NSearchConfig`：

```ts
import { registerL10NSearchConfig } from './l10nSearchRegistry'

registerL10NSearchConfig({
  gameId: 'your_game_id',           // 匹配 flowchartStore.activeTab.gameId
  l10nKeyFields: [],                // 使用 buildL10NKey 时留空
  nodeTitleI18nPattern: 'comp.flowchart.your_game.node.[NODE_TYPE].title',
  buildL10NKey: (data, meta, nodeType) => {
    // 根据 node.data + 流程图 metadata + node type 构建 L10N key 列表
    // 返回 string[]（可为空数组）
    ...
  },
})
```

**`buildL10NKey` 参数说明**:

| 参数 | 类型 | 来源 | 说明 |
|------|------|------|------|
| `data` | `Record<string, unknown>` | `node.data` | 节点的 data 属性，含 `currIndex`、`itemId`、`text` 等 |
| `meta` | `Record<string, unknown>` | `symbolFlowchartSearchMetadata` | 流程图级元数据，通常含 `currName` |
| `nodeType` | `string` | `node.type` | 节点类型名，如 `"Message"`、`"AliyaMessage"` |

**常见 key 构建模式**:

```ts
// 模式 A: ${currName}_${currIndex}  (tysy_demo)
buildL10NKey: (data, meta) => {
  const currName = meta.currName
  const currIndex = data.currIndex
  if (currName && currIndex != null) return [`${currName}_${currIndex}`]
  return []
}

// 模式 B: ${NodeType}.${currName}.${itemId}.  (aliya1)
buildL10NKey: (data, meta, nodeType) => {
  const currName = meta.currName
  const itemId = data.itemId
  if (currName && itemId != null) return [`${nodeType}.${currName}.${itemId}.`]
  return []
}

// 模式 C: node data 字段直接作为 key  (ycytx_5)
//   注意：这种情况其实也可以用场景二（l10nKeyFields），但 buildL10NKey 更灵活
buildL10NKey: (data) => {
  return [data.text, data.logText].filter(v => v != null).map(String)
}
```

### Step 2: 提供 L10N 字典

在 `src/components/view_flowchart/YourGame.vue` (Wrapper) 中，加载并规范化 L10N 数据为 `Record<string, string>`，通过 `symbolL10NSearchData` 提供：

```ts
import { symbolL10NSearchData, symbolL10nDataSingleLang_YourGame } from '@/constants/injection'

const l10nData = ref<Record<string, string>>({})

async function loadL10nData(langcode: string) {
  l10nData.value = await getJson<Record<string, string>>(
    `/data/${gameId.value}/${versionId.value}/localization/${langcode}.json`,
    5,
  )
}

// 搜索面板使用此数据
provide(symbolL10NSearchData, l10nData)
// 节点组件使用此数据（如有需要）
provide(symbolL10nDataSingleLang_YourGame, l10nData)
```

> **重要**: `symbolL10NSearchData` 必须是扁平 `Record<string, string>`。如果 L10N 数据有嵌套结构（如 ycytx_5 的 `{ story: {}, dict: {} }`），需在 provide 时做规范化（只取 story 部分）。

### Step 3: 提供搜索元数据

在 `src/components/flowchart/core/viewer/YourGameViewer.vue` 中：

```ts
import { symbolFlowchartSearchMetadata } from '@/constants/injection'

// 在 provide 区域添加：
provide(symbolFlowchartSearchMetadata, vueflowData.metadata as Ref<Record<string, unknown>>)
```

`vueflowData.metadata` 至少应包含 `currName` 字段。如果你的 `buildL10NKey` 需要额外字段，确保 metadata 中也包含它们。

### Step 4: 注册 i18n 节点标题

在 `src/i18n/zh_CN.json`（及其他语言文件）中，为每个节点类型添加标题：

```json
{
  "comp.flowchart.your_game.node.Message.title": "消息",
  "comp.flowchart.your_game.node.System.title": "系统消息",
  ...
}
```

标题模式由 `nodeTitleI18nPattern` 指定，`[NODE_TYPE]` 会被替换为实际节点类型名。

---

## 场景二：文本内嵌在 node data 字段中（使用 `l10nKeyFields`）

**适用条件**: node data 的某些字段直接存储了 L10N key（或原始文本），无需从 metadata 组合。2361_playtest 使用此方式。

> **注意**: 如果字段存储的是 L10N key（能在字典中查到的），使用 `l10nKeyFields`。如果字段存储的是**原始文本**（不需要查字典），`l10n_data` 模式不适用——用户应在 `field_value` 模式下搜索。

### Step 1: 注册搜索配置

```ts
registerL10NSearchConfig({
  gameId: 'your_game_id',
  l10nKeyFields: ['text', 'logText', 'content'],  // node.data 中存 L10N key 的字段
  nodeTitleI18nPattern: 'comp.flowchart.your_game.node.[NODE_TYPE].title',
  // 不配置 buildL10NKey，搜索面板使用 l10nKeyFields
})
```

如果游戏完全没有 L10N 数据（如 2361_playtest），设置 `l10nKeyFields: []`。此时 `l10n_data` 模式仅匹配节点类型的 i18n 标题，实际文本搜索需使用 `field_value` 模式。

### Step 2 & 3

同场景一：提供 `symbolL10NSearchData` 和 `symbolFlowchartSearchMetadata`。

即使 `l10nKeyFields` 为空，仍建议提供 `symbolFlowchartSearchMetadata` —— 为将来扩展预留。

---

## 两种模式对比

| 特性 | `buildL10NKey` | `l10nKeyFields` |
|------|---------------|----------------|
| key 来源 | 动态构建（metadata + data + type） | node.data 字段值直读 |
| 多 key 支持 | 返回数组 | 遍历字段列表 |
| 需要 metadata | 通常需要 | 不需要 |
| 灵活性 | 高（可做任意组合、转换） | 低（仅限字段直读） |
| 适用场景 | L10N key 由多源组合 | L10N key 即字段值 |

**优先使用 `buildL10NKey`**，即使字段值就是 key（如 ycytx_5），也方便未来扩展。

---

## 搜索模式行为总结

| 搜索模式 | 搜索内容 |
|----------|----------|
| `l10n_data` | `getNodeTitle(nodeType)` + L10N 解析后的文本（通过 `buildL10NKey` 或 `l10nKeyFields`） |
| `field_value` | `getNodeTitle(nodeType)` + node.data 中所有字段的原始值（递归收集） |

---

## 验证清单

- [ ] `registerL10NSearchConfig` 已调用，`gameId` 与 tab 中的一致
- [ ] `buildL10NKey` 返回正确的 key 数组，空数组表示无文本
- [ ] `symbolL10NSearchData` 已 provide，数据为扁平 `Record<string, string>`
- [ ] `symbolFlowchartSearchMetadata` 已在 viewer 中 provide，至少含 `currName`
- [ ] 节点类型 i18n 标题已在各语言文件中注册
- [ ] `vue-tsc --noEmit` 零错误
- [ ] 手动测试：打开流程图 → Ctrl+F → 选择 `l10n_data` 模式 → 搜索对话文本 → 匹配节点高亮
- [ ] 切换语言后搜索仍然正确
- [ ] `field_value` 模式不受影响
