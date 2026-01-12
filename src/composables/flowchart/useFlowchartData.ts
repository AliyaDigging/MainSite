/**
 * 流程图数据管理 Composable
 * 处理流程图数据的加载和状态管理
 */

import { ref, type Ref } from 'vue'
import { getJson } from '@/utils/fetch'

// 内联类型定义
type L10nCsvSingleLang = Record<string, string>

type FlowchartMetadata = {
  counts: { node: number; edge: number; otherFlowcharts: number }
  variableNames: Record<string, { key: string; type: 'string' | 'number' }>
  flowchartRefs: string[]
  currName: string
}

type VueFlowCatalogEntry = {
  filename: string
  metadata: FlowchartMetadata
}

type VueFlowCatalog = {
  catalog: Record<string, VueFlowCatalogEntry>
  flowchartBeingRefed: Record<string, string[]>
}

export interface UseFlowchartDataOptions {
  gameId: Ref<string>
  versionId: Ref<string>
}

/**
 * 流程图数据管理 composable
 * 提供数据加载和状态管理功能
 */
export function useFlowchartData(options: UseFlowchartDataOptions) {
  const { gameId, versionId } = options

  // 数据状态
  const l10nData = ref<L10nCsvSingleLang>({})
  const catalogData = ref<VueFlowCatalog>({ catalog: {}, flowchartBeingRefed: {} })
  const catalogList = ref<string[]>([])

  /**
   * 加载本地化数据
   */
  async function loadL10nData(langcode: string) {
    if (!gameId.value || !versionId.value) return

    l10nData.value = await getJson<L10nCsvSingleLang>(
      `/data/${gameId.value}/${versionId.value}/localization/${langcode}.json`,
      5,
    )
  }

  /**
   * 加载目录数据
   */
  async function loadCatalogData(gameIdValue: string, versionIdValue: string) {
    catalogData.value = await getJson<VueFlowCatalog>(
      `/data/${gameIdValue}/${versionIdValue}/flowcharts/vueflow/catalog.json`,
      5,
    )
    catalogList.value = await getJson<string[]>(
      `/data/${gameIdValue}/${versionIdValue}/flowcharts/vueflow/catalog_list.json`,
      5,
    )
  }

  return {
    l10nData,
    catalogData,
    catalogList,
    loadL10nData,
    loadCatalogData,
  }
}
