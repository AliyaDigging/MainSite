/**
 * 游戏 L10N 搜索配置注册
 * 每个游戏注册其 L10N 数据中的关键字段和节点类型标题模式
 */

import { registerL10NSearchConfig } from './l10nSearchRegistry'

/**
 * 注册 Aliya1 搜索配置
 * L10N 数据为扁平 Record<string, string>，node data 字段值即为 L10N 键
 */
registerL10NSearchConfig({
  gameId: 'aliya1',
  l10nKeyFields: ['messageText', 'text', 'customMsgText', 'logText'],
  nodeTitleI18nPattern: 'comp.flowchart.node.[NODE_TYPE].title',
})

/**
 * 注册 Aliya1 Android DLC 搜索配置
 * 与 aliya1 共享相同的 L10N 结构
 */
registerL10NSearchConfig({
  gameId: 'aliya1_android_dlc',
  l10nKeyFields: ['messageText', 'text', 'customMsgText', 'logText'],
  nodeTitleI18nPattern: 'comp.flowchart.node.[NODE_TYPE].title',
})

/**
 * 注册 Ycytx5 搜索配置
 * L10N 数据为 { story: {}, dict: {} }，搜索时仅使用 story 部分（父页面负责规范化）
 */
registerL10NSearchConfig({
  gameId: 'ycytx_5',
  l10nKeyFields: ['text', 'logText'],
  nodeTitleI18nPattern: 'comp.flowchart.ycytx_5.node.[NODE_TYPE].title',
})

/**
 * 注册 2361 Playtest 搜索配置
 * 无 L10N 数据，l10n_data 模式下仅匹配 node type 标题
 */
registerL10NSearchConfig({
  gameId: '2361_playtest',
  l10nKeyFields: [],
  nodeTitleI18nPattern: 'comp.flowchart.node.[NODE_TYPE].title',
})
