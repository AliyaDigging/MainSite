/**
 * L10N 搜索注册表
 * 管理不同游戏版本的 L10N 搜索配置，供 FlowchartSearchPanel 使用
 */

/**
 * 游戏的 L10N 搜索配置
 */
export interface GameL10NSearchConfig {
  /** 游戏标识符，匹配 flowchartStore.activeTab.gameId */
  gameId: string
  /** 节点 data 中存储 L10N 键的字段名列表（用于 l10n_data 搜索模式） */
  l10nKeyFields: string[]
  /** node type 的 vue-i18n 标题模式，含 [NODE_TYPE] 占位符 */
  nodeTitleI18nPattern: string
}

// 搜索配置注册表
const l10nSearchConfigs: Map<string, GameL10NSearchConfig> = new Map()

/**
 * 注册游戏的 L10N 搜索配置
 */
export function registerL10NSearchConfig(config: GameL10NSearchConfig) {
  l10nSearchConfigs.set(config.gameId, config)
}

/**
 * 获取游戏的 L10N 搜索配置
 * 支持精确匹配和包含匹配 (如 'aliya1_android_dlc' 匹配 'aliya1' 的配置)
 */
export function getL10NSearchConfig(gameId: string): GameL10NSearchConfig | undefined {
  // 首先尝试精确匹配
  if (l10nSearchConfigs.has(gameId)) {
    return l10nSearchConfigs.get(gameId)
  }

  // 然后尝试包含匹配 (优先匹配更长的 key)
  const sortedKeys = Array.from(l10nSearchConfigs.keys()).sort((a, b) => b.length - a.length)
  for (const key of sortedKeys) {
    if (gameId.includes(key)) {
      return l10nSearchConfigs.get(key)
    }
  }

  return undefined
}
