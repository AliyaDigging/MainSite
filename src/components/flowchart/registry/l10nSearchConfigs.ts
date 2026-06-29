/**
 * 游戏 L10N 搜索配置注册
 * 每个游戏注册其 L10N 数据中的关键字段和节点类型标题模式
 *
 * - 若配置 buildL10NKey，则 l10n_data 模式下优先调用它动态构建 L10N key
 * - 否则使用 l10nKeyFields（node.data 字段值直接作为 L10N key）
 */

import { registerL10NSearchConfig } from './l10nSearchRegistry'

/**
 * 注册 Aliya1 搜索配置
 * L10N key 格式：${NodeType}.${currName}.${itemId}. (如 "AliyaMessage.1-1.1.")
 * 由 node type + flowchart metadata currName + node data itemId 组合
 */
registerL10NSearchConfig({
  gameId: 'aliya1',
  l10nKeyFields: [],
  nodeTitleI18nPattern: 'comp.flowchart.node.[NODE_TYPE].title',
  buildL10NKey: (data, meta, nodeType) => {
    const currName = meta.currName
    const itemId = data.itemId
    if (currName && itemId != null) {
      return [`${nodeType}.${currName}.${itemId}.`]
    }
    return []
  },
})

/**
 * 注册 Aliya1 Android DLC 搜索配置
 * 与 aliya1 共享相同的 L10N key 结构
 */
registerL10NSearchConfig({
  gameId: 'aliya1_android_dlc',
  l10nKeyFields: [],
  nodeTitleI18nPattern: 'comp.flowchart.node.[NODE_TYPE].title',
  buildL10NKey: (data, meta, nodeType) => {
    const currName = meta.currName
    const itemId = data.itemId
    if (currName && itemId != null) {
      return [`${nodeType}.${currName}.${itemId}.`]
    }
    return []
  },
})

/**
 * 注册 Ycytx5 搜索配置
 * L10N key 直接存储在 node.data.text / node.data.logText 中
 * L10N 数据为 { story: {}, dict: {} }，搜索使用 story 部分（父页面负责规范化）
 */
registerL10NSearchConfig({
  gameId: 'ycytx_5',
  l10nKeyFields: [],
  nodeTitleI18nPattern: 'comp.flowchart.ycytx_5.node.[NODE_TYPE].title',
  buildL10NKey: (data) => {
    return [data.text, data.logText].filter((v) => v != null).map(String)
  },
})

/**
 * 注册 2361 Playtest 搜索配置
 * 无 L10N 数据，使用 l10nKeyFields 方式保留扩展性
 */
registerL10NSearchConfig({
  gameId: '2361_playtest',
  l10nKeyFields: [],
  nodeTitleI18nPattern: 'comp.flowchart.node.[NODE_TYPE].title',
})

/**
 * 注册 Aliya2Demo 搜索配置
 * L10N key 格式（扁平化前缀）：
 *   - 对话: dialogue:{currId}_{dialogueId}
 *   - 文档: doc:title:{documentId} / doc:content:{documentId}
 *   - 新闻: news:title:{newsId} / news:content:{newsId}
 */
registerL10NSearchConfig({
  gameId: 'aliya2_demo',
  l10nKeyFields: [],
  nodeTitleI18nPattern: 'comp.flowchart.aliya2_demo.node.[NODE_TYPE].title',
  buildL10NKey: (data, meta, nodeType) => {
    const keys: string[] = []

    // 对话节点 — key 格式: dialogue:{currId}_{dialogueId}
    // Message, AmbientMessage, PlayerChoice 使用当前流程图 currId
    // DefaultNode 是 fallback 类型，也可能包含有效对话
    if (['Message', 'AmbientMessage', 'PlayerChoice', 'DefaultNode'].includes(nodeType)) {
      const currId = meta.currId
      const dialogueId = (data.articyInternal as Record<string, unknown> | undefined)?.dialogueId
      if (currId && dialogueId != null) {
        keys.push(`dialogue:${currId}_${dialogueId}`)
      }
    }

    // 推送文档节点 — key 格式: doc:title:{documentId}, doc:content:{documentId}
    if (nodeType === 'PushDoc') {
      const docId = data.documentId
      if (docId) {
        keys.push(`doc:title:${docId}`, `doc:content:${docId}`)
      }
    }

    // 推送新闻节点 — key 格式: news:title:{newsId}, news:content:{newsId}
    if (nodeType === 'PushNews') {
      const newsId = data.newsId
      if (newsId) {
        keys.push(`news:title:${newsId}`, `news:content:${newsId}`)
      }
    }

    return keys
  },
})

/**
 * 注册 TysyDemo 搜索配置
 * L10N key 格式：${currName}_${currIndex} (如 "C1S1_100")
 * 由 flowchart metadata currName + node data currIndex 组合
 */
registerL10NSearchConfig({
  gameId: 'tysy_demo',
  l10nKeyFields: [],
  nodeTitleI18nPattern: 'comp.flowchart.tysy_demo.node.[NODE_TYPE].title',
  buildL10NKey: (data, meta) => {
    const currName = meta.currName
    const currIndex = data.currIndex
    if (currName && currIndex != null) {
      return [`${currName}_${currIndex}`]
    }
    return []
  },
})
