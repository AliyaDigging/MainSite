/**
 * 流程图节点注册表
 * 管理不同游戏版本的节点组件映射
 */

import type { Component } from 'vue'

// 节点类型到组件的映射
export type NodeComponentMap = Record<string, Component>

/**
 * 游戏流程图配置接口
 */
export interface GameFlowchartConfig {
  /** 游戏标识符 */
  gameId: string
  /** 节点组件映射 */
  nodeComponents: NodeComponentMap
  /** 所有节点类型列表 (用于生成 CSS 和动态 slot) */
  nodeTypes: string[]
  /** 图片资源基础路径 */
  imageBasePath: string
}

// 游戏配置注册表
const gameConfigs: Map<string, GameFlowchartConfig> = new Map()

/**
 * 注册游戏配置
 */
export function registerGameConfig(config: GameFlowchartConfig) {
  gameConfigs.set(config.gameId, config)
}

/**
 * 获取游戏配置
 * 支持精确匹配和包含匹配 (如 'aliya1_android_dlc' 优先于 'aliya1')
 */
export function getGameConfig(gameId: string): GameFlowchartConfig | undefined {
  // 首先尝试精确匹配
  if (gameConfigs.has(gameId)) {
    return gameConfigs.get(gameId)
  }

  // 然后尝试包含匹配 (优先匹配更长的 key)
  const sortedKeys = Array.from(gameConfigs.keys()).sort((a, b) => b.length - a.length)
  for (const key of sortedKeys) {
    if (gameId.includes(key)) {
      return gameConfigs.get(key)
    }
  }

  return undefined
}

/**
 * 获取游戏的所有节点类型
 */
export function getAllNodeTypes(gameId: string): string[] {
  const config = getGameConfig(gameId)
  return config ? config.nodeTypes : []
}

/**
 * 获取游戏的图片基础路径
 */
export function getImageBasePath(gameId: string): string {
  const config = getGameConfig(gameId)
  return config?.imageBasePath ?? '/aliya/'
}

/**
 * 获取所有已注册的游戏 ID
 */
export function getRegisteredGameIds(): string[] {
  return Array.from(gameConfigs.keys())
}
