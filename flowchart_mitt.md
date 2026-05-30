# 流程图 mitt 事件总线使用指南

## 概述

`src/utils/flowchartEvents.ts` 是一个基于 [mitt](https://github.com/developit/mitt) 的轻量事件总线，用于流程图组件之间的类型安全通信。

对比原来的 `document.dispatchEvent` / `document.addEventListener` 方案，mitt 提供了完整的 TypeScript 类型推导，不再需要 `@ts-expect-error`。

## 文件

```
src/utils/flowchartEvents.ts    ← 事件定义和总线实例
```

## 添加新事件

编辑 `FlowchartEvents` 类型，追加你的事件签名：

```typescript
import mitt from 'mitt'

type FlowchartEvents = {
  'fit-in-view': { nodeId: string }

  // ↓ 新增事件 ↓
  'popup:show': { message: string; severity: 'info' | 'warn' | 'error' }
  'flowchart:ready': { key: string }
}

export const flowchartBus = mitt<FlowchartEvents>()
```

事件名可以是任意字符串（推荐 `namespace:action` 格式）。值类型是你需要传递的 payload。

## 发送事件（emit）

```typescript
import { flowchartBus } from '@/utils/flowchartEvents'

// 类型安全：第二个参数受 FlowchartEvents 约束
flowchartBus.emit('fit-in-view', { nodeId: 'someNodeId' })
flowchartBus.emit('popup:show', { message: '加载完成', severity: 'info' })
```

TypeScript 会检查：
- 事件名是否在 `FlowchartEvents` 中定义
- payload 的字段和类型是否匹配

## 监听事件（on）

```typescript
import { flowchartBus } from '@/utils/flowchartEvents'

flowchartBus.on('fit-in-view', ({ nodeId }) => {
  // nodeId 自动推导为 string
  vueflow.fitView({ nodes: [nodeId] })
})

flowchartBus.on('popup:show', ({ message, severity }) => {
  // message: string, severity: 'info' | 'warn' | 'error'
  toast.add({ detail: message, severity })
})
```

## 取消监听

`on()` 返回一个取消函数，通常在组件卸载时调用：

```typescript
import { flowchartBus } from '@/utils/flowchartEvents'
import { onBeforeUnmount } from 'vue'

const unregister = flowchartBus.on('popup:show', ({ message }) => {
  // ...
})

onBeforeUnmount(unregister)
```

如果监听器注册在模块顶层（组件外），可以不取消——mitt 在页面生命周期内不会泄漏。

## 通配符监听

mitt 支持 `'*'` 捕获所有事件：

```typescript
flowchartBus.on('*', (type, payload) => {
  console.log(`事件: ${String(type)}`, payload)
})
```

## 为什么用 mitt 而不是 DOM 事件

| | DOM `CustomEvent` | mitt |
|---|---|---|
| 类型安全 | `event.detail` 是 `any`，需 `@ts-expect-error` | 泛型约束，emit 和 on 两端类型一致 |
| 作用域 | 全局 `document`，可能被外部意外触发 | 独立总线实例，完全隔离 |
| 体积 | 平台内置 | mitt 约 200 字节 |
| 调试 | 需在浏览器 DevTools 过滤事件 | 代码内即可追踪 |

---

## Pinia Store：程序化切换与加载就绪监听

### 架构

流程图标签页的管理和加载状态跟踪通过以下两个模块实现：

```
src/stores/flowchart.ts              ← Pinia store（标签页、activeKey、lastReadyKey）
src/composables/useFlowchartManager.ts ← 对外暴露的便捷 composable API
```

## 核心概念

- **标签页（Tab）**：每次打开一个流程图，store 维护一个 `tabs` 数组，支持多标签页切换
- **Key**：格式为 `"gameId/versionId/flowchartName"`，是流程图的唯一标识
- **lastReadyKey**：记录最近一次完成加载（fitView / setViewport 执行完毕）的流程图 key

## 程序化切换流程图

```typescript
import { useFlowchartManager } from '@/composables/useFlowchartManager'

const manager = useFlowchartManager()

// 打开流程图（如果已打开则切换到对应标签页）
manager.openFlowchart('aliya1', '20250712', '1-1')

// 按 key 切换到已打开的标签页
manager.switchToFlowchart('aliya1/20250712/1-1')

// 关闭标签页
manager.closeFlowchart('aliya1/20250712/1-1')

// 获取当前活动标签页
const active = manager.getActiveFlowchart()
if (active) {
  console.log(active.gameId, active.versionId, active.flowchartName)
}

// 获取所有已打开标签页
const tabs = manager.getOpenedFlowcharts()
```

`openFlowchart` 会自动处理：

- 如果标签页不存在 → 创建新标签页，设为活动
- 如果标签页已存在 → 直接切换过去
- 同时关闭搜索面板

## 监听流程图加载完毕

Store 暴露了 `lastReadyKey` 这个 ref，viewer 在 `initFlowchart()` 末尾（即 fitView / setViewport 执行完毕后）调用 `store.setReady(key)` 更新它。

### 方式 1：便捷方法（推荐）

```typescript
import { useFlowchartManager } from '@/composables/useFlowchartManager'
import { onBeforeUnmount } from 'vue'
import { useToast } from 'primevue/usetoast'

const manager = useFlowchartManager()
const toast = useToast()

const stop = manager.onFlowchartReady((key) => {
  // key 例如 "aliya1/20250712/1-1"
  const tab = manager.getActiveFlowchart()
  toast.add({
    severity: 'success',
    summary: '流程图已加载',
    detail: tab?.flowchartName ?? key,
    life: 3000,
  })
})

onBeforeUnmount(stop) // 组件卸载时自动清理
```

`onFlowchartReady` 返回 `WatchStopHandle`，直接传给 `onBeforeUnmount` 即可。

### 方式 2：直接 watch store ref

```typescript
import { watch } from 'vue'
import { useFlowchartManager } from '@/composables/useFlowchartManager'

const manager = useFlowchartManager()

watch(
  () => manager.store.lastReadyKey,
  (key) => {
    if (!key) return
    // 流程图已就绪...
  },
)
```

### 方式 3：watch 时自动 fitView

```typescript
watch(
  () => manager.store.lastReadyKey,
  (key) => {
    if (!key) return
    // 如果需要额外的 fitView 控制，可以在此处通过 mitt 事件触发
    flowchartBus.emit('fit-in-view', { nodeId: 'someTargetNode' })
  },
)
```

## 触发时机链路

```text
store.openTab(gameId, versionId, flowchartName)
  → activeKey 变化
    → ViewFlowchart.vue 渲染对应的 viewer
      → viewer watch(fileUrl) → fetch JSON → layout → isReady = true
        → VueFlow 渲染 → @nodes-initialized → initFlowchart()
          ├─ 缓存恢复 → setViewport → store.setReady(key) ✅
          └─ 正常加载 → fitView      → store.setReady(key) ✅
                                ↑
                    manager.onFlowchartReady 在此刻收到通知
```

关键保证：回调执行时，流程图已完成渲染、layout 和 fitView/setViewport。

## API 速查

### useFlowchartManager 返回值

| 方法 / 属性 | 说明 |
|---|---|
| `openFlowchart(gameId, versionId, name)` | 打开/切换到流程图 |
| `switchToFlowchart(key)` | 按 key 切换到已打开标签页 |
| `closeFlowchart(key)` | 关闭标签页 |
| `getActiveFlowchart()` | 返回当前活动 Tab 或 null |
| `getOpenedFlowcharts()` | 返回所有标签页数组 |
| `cacheFlowchartState(key, state)` | 缓存流程图状态（节点/边/视口） |
| `getCachedFlowchartState(key)` | 读取缓存状态 |
| `closeSearchPanel()` | 关闭搜索面板 |
| `onFlowchartReady(callback)` | 注册加载完成回调，返回取消函数 |
| `store` | 底层 Pinia store 实例（可访问 `activeTab`、`tabs`、`lastReadyKey` 等） |

### store 关键状态

| 字段 | 类型 | 说明 |
|---|---|---|
| `tabs` | `Ref<FlowchartTab[]>` | 所有已打开标签页 |
| `activeKey` | `Ref<string \| null>` | 当前活动标签页 key |
| `activeTab` | `ComputedRef<FlowchartTab \| null>` | 当前活动标签页对象 |
| `lastReadyKey` | `Ref<string \| null>` | 最近完成加载的流程图 key |
| `isSearchPanelVisible` | `Ref<boolean>` | 搜索面板是否可见 |

---

## Part 3：Node Card —— 从节点组件程序化跳转 + 显示详情卡片

### 概述

`emitNodeCard()` 是一行式 API，可从任意 node 组件内部同时完成三件事：**跳转到目标流程图** → **fitView 定位到指定节点** → **在流程图右下区域显示一张 PrimeVue 详情卡片**。

### 核心文件

```text
src/utils/flowchartEvents.ts              ← 'node-card:show' 事件定义
src/utils/flowchart.ts                    ← emitNodeCard() 便捷函数
src/stores/flowchart.ts                   ← pendingNodeCard / nodeCard 状态
src/composables/useNodeCardOrchestrator.ts ← 编排器（监听事件 → 导航 → 等待 ready → fitView → 显示卡片）
src/components/flowchart/core/FlowchartNodeCard.vue ← PvCard 展示组件
```

### 在 Node 组件中调用

```typescript
import { emitNodeCard } from '@/utils/flowchart'

function handleClick() {
  emitNodeCard({
    gameId: 'aliya1',
    versionId: '20250712',
    flowchartName: '1-1',
    nodeId: 'targetNodeId',
    cardTitle: '节点详情',
    cardBodyHtml: `<b>名称:</b> 某某节点<br/><b>描述:</b> 一些说明文字`,
  })
}
```

```html
<a class="custom-node-a-clickable" @click="handleClick">{{ props.data.label }}</a>
```

### 参数说明

| 字段 | 类型 | 说明 |
|---|---|---|
| `gameId` | `string` | 目标流程图所属游戏 |
| `versionId` | `string` | 目标流程图版本 |
| `flowchartName` | `string` | 目标流程图名称 |
| `nodeId` | `string` | fitView 定位的目标节点 ID |
| `cardTitle` | `string` | Card 标题 |
| `cardBodyHtml` | `string` | Card 正文 HTML（由开发者构建，非用户输入，无 XSS 风险） |

### 异步时序

```text
同流程图（已加载，同步完成）：
  emitNodeCard → openTab (no-op) → fitView → 显示 Card

跨流程图（需加载）：
  emitNodeCard → openTab → 等待加载
    → viewer setReady() → onFlowchartReady 回调
    → fitView → 显示 Card
```

### 边界行为

- **切换标签页**：Card 自动关闭
- **快速连续点击**：新调用覆盖旧的 pending 状态
- **点击 Card 的 X 按钮**：关闭 Card
- **Card 不可拖动**，定位在流程图右下区域

### Card 组件位置

`FlowchartNodeCard` 挂载在 `.flowchart-content`（`position: relative`）内，使用绝对定位 `right: 16px; bottom: 100px`，覆盖在当前活动标签页之上。
