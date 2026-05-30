/**
 * 流程图节点高亮 composable
 * 提供对 VueFlow 渲染的节点 DOM 元素添加/移除高亮 CSS class 的能力
 *
 * 搜索面板和跳转卡片共用此 composable，通过不同的 HighlightConfig 区分 class 名，
 * 确保两个高亮系统互不干扰。
 */
export interface HighlightConfig {
  /** 高亮匹配节点的 CSS class */
  highlightClass: string
  /** 当前选中/激活节点的 CSS class（可选，跳转卡不需要） */
  activeClass?: string
}

/** 搜索面板高亮配置 — 黄色/橙色系 */
export const SEARCH_HIGHLIGHT: HighlightConfig = {
  highlightClass: 'flowchart-search-highlight',
  activeClass: 'flowchart-search-active',
}

/** 跳转卡片高亮配置 — 蓝色系 */
export const JUMP_HIGHLIGHT: HighlightConfig = {
  highlightClass: 'flowchart-jump-highlight',
}

function getNodeEl(nodeId: string): HTMLElement | null {
  return document.querySelector(`[data-id="${nodeId}"]`)
}

export function useFlowchartHighlight(config: HighlightConfig) {
  const { highlightClass, activeClass } = config

  /**
   * 清除当前 config 对应的所有高亮 class（不影响其他 config 的高亮）
   */
  function clearHighlights() {
    document.querySelectorAll(`.${highlightClass}`).forEach((el) => el.classList.remove(highlightClass))
    if (activeClass) {
      document.querySelectorAll(`.${activeClass}`).forEach((el) => el.classList.remove(activeClass))
    }
  }

  /**
   * 批量高亮节点（仅添加 highlightClass，不清除现有高亮）
   */
  function highlightNodes(nodeIds: string[]) {
    for (const id of nodeIds) {
      const el = getNodeEl(id)
      if (el) el.classList.add(highlightClass)
    }
  }

  /**
   * 将当前节点设为激活状态：移除 highlightClass，添加 activeClass
   * 仅在 config 定义了 activeClass 时有效
   */
  function setActiveNode(nodeId: string) {
    if (!activeClass) return
    const el = getNodeEl(nodeId)
    if (el) {
      el.classList.remove(highlightClass)
      el.classList.add(activeClass)
    }
  }

  /**
   * 高亮单个节点（仅添加 highlightClass）
   */
  function highlightNode(nodeId: string) {
    const el = getNodeEl(nodeId)
    if (el) el.classList.add(highlightClass)
  }

  return { clearHighlights, highlightNodes, setActiveNode, highlightNode }
}
