/**
 * 节点类型标题缓存 composable
 * 为 FlowchartSearchPanel 提供 node type → i18n 标题的懒加载缓存
 *
 * 缓存策略：
 * - 首次遇到某 node type 时查询 vue-i18n，之后命中缓存
 * - 语言切换时自动清空缓存
 */
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

export function useNodeTitleCache() {
  const { t, te, locale } = useI18n()

  /** i18n key → 翻译后的标题 */
  const cache = new Map<string, string>()

  /**
   * 获取节点类型的人类可读标题
   * @param nodeType 节点类型名称（如 "AliyaMessage"）
   * @param i18nPattern i18n 键模式，含 [NODE_TYPE] 占位符
   * @returns 翻译后的标题，或回退到原始 nodeType
   */
  function getNodeTitle(nodeType: string, i18nPattern: string): string {
    const i18nKey = i18nPattern.replace('[NODE_TYPE]', nodeType)

    // 查缓存
    const cached = cache.get(i18nKey)
    if (cached !== undefined) return cached

    // 未命中：查询 vue-i18n
    const title = te(i18nKey) ? t(i18nKey) : nodeType
    cache.set(i18nKey, title)
    return title
  }

  /** 清空全部缓存（语言切换时调用） */
  function clearCache(): void {
    cache.clear()
  }

  // 语言切换时自动清空缓存
  watch(locale, () => {
    clearCache()
  })

  return { getNodeTitle, clearCache }
}
