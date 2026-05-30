# L10N Search Registry — 接入新游戏指南

当你的项目需要接入一款新游戏的流程图，并希望其节点对话内容能被搜索面板检索到时，按以下步骤操作。

---

## 前置理解

搜索面板 (`FlowchartSearchPanel.vue`) 通过两层抽象获取搜索所需信息：

| 层 | 来源 | 作用 |
|---|------|------|
| **L10N 数据** | 父页面 `provide(symbolL10NSearchData, ...)` | 提供实际对话文本（扁平 `Record<string, string>`） |
| **搜索配置** | Registry 注册 (`registerL10NSearchConfig(...)`) | 告诉搜索面板「哪些字段是 L10N 键」、「node type 标题在哪」 |

两层的关系：
```
父页面 (load L10N JSON → normalize → provide)
  │
  │  provide(symbolL10NSearchData, flatRecord)
  │
  ▼
SearchPanel
  │ inject(symbolL10NSearchData)     ← 拿到 L10N 文本数据
  │ getL10NSearchConfig(gameId)      ← 拿到字段配置 + 标题模式
  │ → 搜索
```

---

## 步骤一：确定游戏的 L10N 数据格式

翻开你游戏的 L10N JSON 文件（通常在 `public/data/{gameId}/{versionId}/localization/...json`），确认它的结构：

### 场景 A：已是扁平 `Record<string, string>`

```json
{
  "MyNode.flow-1.1.": "Hello world!",
  "MyNode.flow-1.2.": "Goodbye."
}
```

→ 无需规范化，父页面直接 `provide(symbolL10NSearchData, refData)` 即可。

### 场景 B：嵌套结构（如 `{ story: {}, dict: {} }`）

```json
{
  "story": {
    "1.1_E1_175": "小苏打也混进去拌匀了...",
    "1.1_E1_176": "把面糊倒进模具..."
  },
  "dict": { ... }
}
```

→ 需要在父页面中用 `computed` 提取扁平部分，再 provide。例如：

```ts
const l10nSearchData = computed(() => l10nData.value.story ?? {})
provide(symbolL10NSearchData, l10nSearchData)
```

### 场景 C：无 L10N 文件

→ 提供一个空的 `ref<Record<string, string>>({})`。搜索面板在 `l10n_data` 模式下只能检索 node type 标题，用户可切换到 `field_value` 模式搜索节点原始字段值。

---

## 步骤二：确定 L10N 键字段

打开你游戏的一个典型节点的 JSON 数据，找出哪些字段存储的是 L10N 键（即在 L10N 文件中作为 key 的值）。

例如 Aliya1 的 `AliyaMessage` 节点：
```json
{
  "id": "...",
  "type": "AliyaMessage",
  "data": {
    "fileId": 1003,
    "itemId": 1,
    "messageText": "AliyaMessage.1-1.1.",   ← L10N 键
    "speaker": "Aliya"                       ← 非 L10N 键（直接文本）
  }
}
```

这里 `messageText` 是 L10N 键，`speaker` 不是。所以 `l10nKeyFields` 应该包含 `'messageText'` 但不包含 `'speaker'`。

**注意**：用户反馈——`l10n_data` 模式下不应搜索字段原始值。如果一个字段的值不是 L10N 键而是直接内联的文本，**不要**把它放进 `l10nKeyFields`，否则会造成重复搜索（L10N 文件和字段值包含同一段文字）。

---

## 步骤三：确定 node type 标题的 i18n 模式

搜索面板在两种模式下都会把 node type 的显示名称附加到搜索文本中，这样用户搜索 "Aliya's Message" 就能找到所有 `AliyaMessage` 节点。

你需要确定或建立对应游戏的 i18n 键模式。查阅 `src/i18n/en_US.json` 确认：

| 游戏 | 模式 | 示例键 |
|------|------|--------|
| aliya1 / aliya1_android_dlc | `comp.flowchart.node.[NODE_TYPE].title` | `comp.flowchart.node.AliyaMessage.title` |
| ycytx_5 | `comp.flowchart.ycytx_5.node.[NODE_TYPE].title` | `comp.flowchart.ycytx_5.node.MikoText.title` |
| 2361_playtest | `comp.flowchart.node.[NODE_TYPE].title` | `comp.flowchart.node.if.title` |

`[NODE_TYPE]` 占位符会在搜索时被替换为节点的实际 `type` 字段值（大小写敏感）。

如果你的新游戏尚无 i18n 标题键，有两种做法：
1. 在 `src/i18n/en_US.json` 和 `src/i18n/zh_CN.json` 中新增对应键；
2. 沿用现有模式（如果游戏中 node type 名称同样存在于已有 i18n 条目中），搜索面板会在键不存在时回退到显示原始 `nodeType` 字符串。

---

## 步骤四：注册搜索配置

编辑 [l10nSearchConfigs.ts](src/components/flowchart/registry/l10nSearchConfigs.ts)，在末尾添加一个新注册块：

```ts
// src/components/flowchart/registry/l10nSearchConfigs.ts

import { registerL10NSearchConfig } from './l10nSearchRegistry'

// ... 已有配置 ...

registerL10NSearchConfig({
  gameId: 'your_new_game',                          // [1]
  l10nKeyFields: ['messageText', 'text', 'logText'],// [2]
  nodeTitleI18nPattern: 'comp.flowchart.node.[NODE_TYPE].title',  // [3]
})
```

1. **`gameId`** — 必须与 `flowchartStore.activeTab.gameId` 的值完全一致。如果子变体（如 DLC）希望复用基础游戏的配置，可使用不同的 gameId 注册，通过包含匹配自动找到父配置。例如 `'aliya1_android_dlc'` 包含 `'aliya1'`，会匹配到 aliya1 的配置。
2. **`l10nKeyFields`** — 步骤二中确定的字段名数组。这些字段的值会被当作 L10N 键，通过 `symbolL10NSearchData` 解析为实际文本。
3. **`nodeTitleI18nPattern`** — 步骤三中确定的 i18n 键模式。`[NODE_TYPE]` 会被替换为实际的节点类型。

### 接口参考

```ts
// src/components/flowchart/registry/l10nSearchRegistry.ts

export interface GameL10NSearchConfig {
  gameId: string
  l10nKeyFields: string[]         // node.data 中的 L10N 键字段
  nodeTitleI18nPattern: string    // 含 [NODE_TYPE] 占位符
}
```

---

## 步骤五：修改父页面，提供 L10N 数据

找到与你的游戏对应的父页面组件（在 `src/components/view_flowchart/` 下），修改它来提供 `symbolL10NSearchData`。

### 模板 A — 扁平 L10N 数据（如 aliya1）

你的 L10N 数据已经是 `Record<string, string>`，直接 provide 即可：

```ts
// src/components/view_flowchart/YourGame.vue

import { symbolL10NSearchData } from '@/constants/injection'
import '@/components/flowchart/registry/l10nSearchConfigs'

const l10nData = ref<Record<string, string>>({})

async function loadL10nData(langcode: string) {
  l10nData.value = await getJson<Record<string, string>>(
    `/data/${gameId.value}/${versionId.value}/localization/${langcode}.json`,
    5,
  )
}

provide(symbolL10NSearchData, l10nData)   // ← 直接传递
```

### 模板 B — 嵌套 L10N 数据（如 ycytx_5）

需要先从嵌套结构中提取扁平部分：

```ts
// src/components/view_flowchart/YourGame.vue

import { symbolL10NSearchData } from '@/constants/injection'
import '@/components/flowchart/registry/l10nSearchConfigs'

type MyL10nData = { story: Record<string, string>; dict: Record<string, string> }

const l10nData = ref<MyL10nData>({ story: {}, dict: {} })

async function loadL10nData() {
  l10nData.value = await getJson<MyL10nData>(
    `/data/${gameId.value}/${versionId.value}/localization/localization.json`,
    5,
  )
}

// 用 computed 提取扁平部分，保证响应式
const l10nSearchData = computed(() => l10nData.value.story ?? {})
provide(symbolL10NSearchData, l10nSearchData)
```

### 模板 C — 无 L10N 数据（如 2361_playtest）

```ts
// src/components/view_flowchart/YourGame.vue

import { symbolL10NSearchData } from '@/constants/injection'
import '@/components/flowchart/registry/l10nSearchConfigs'

const l10nSearchData = ref<Record<string, string>>({})
provide(symbolL10NSearchData, l10nSearchData)
```

---

## 步骤六：确保 i18n 标题键存在

如果游戏使用了全新的 node type 名称（未在任何已有 i18n 条目中出现），需要在 `src/i18n/en_US.json` 和 `src/i18n/zh_CN.json` 中新增对应条目。

定位到 `comp.flowchart.node` 块（或为你的游戏新建一个 `comp.flowchart.your_game.node` 前缀），添加：

```json
{
  "comp.flowchart.node.YourNodeType.title": "Your Node Name",
  "comp.flowchart.node.AnotherNode.title": "Another Node"
}
```

中文对应的也在 `zh_CN.json` 同步添加。

如果键不存在，搜索面板会回退到显示原始 node type 字符串（如 `"YourNodeType"`）——功能不会崩溃，只是用户体验欠佳。

---

## 步骤七：验证

1. **启动开发环境**：`npm run dev`
2. **打开对应游戏的流程图**
3. **Ctrl+F 打开搜索面板**
4. **默认 `l10n_data` 模式**：搜索一句已知的对话文本 → 确认匹配节点出现
5. **搜索 node type 标题**：搜索步骤六中定义的标题文本 → 确认相关节点出现
6. **切换到 `field_value` 模式**：确认回退到字段值搜索正常
7. **TypeScript 检查**：`npx vue-tsc --noEmit` 无新报错

---

## 故障排查

| 症状 | 可能原因 |
|------|---------|
| `l10n_data` 模式搜不到任何对话文本 | 父页面未 `provide(symbolL10NSearchData)`，或规范化时提取了错误的嵌套路径 |
| `l10n_data` 模式搜索出现重复结果 | `l10nKeyFields` 中包含了非 L10N 键的字段（字段值是内联文本而非键） |
| node type 标题显示为原始英文名 | 对应的 i18n 键不存在，搜索面板自动回退 |
| 新游戏找不到配置 | `gameId` 不匹配 `flowchartStore.activeTab.gameId`；检查大小写或确认包含匹配逻辑是否正确 |
| TypeScript 报类型错误 | 确保 `provide` 的值类型为 `Ref<Record<string, string>>` 或 `ComputedRef<Record<string, string>>` |
