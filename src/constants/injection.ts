import type { FlowchartData as Aliya1_FlowchartData } from '@/components/flowchart/aliya1/types/script5_vueflow_prod'
import type { FlowchartData as Aliya1_Android_DLC_FlowchartData } from '@/components/flowchart/aliya1_android_dlc/types/script5_vueflow_prod'
import type { useVueFlow } from '@vue-flow/core'
import type { useDark } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'
import { type L10nCsvSingleLang as L10nCsvSingleLang_Aliya1 } from '@/types/aliya1/data_script7'
import type { VueFlowCatalog as VueFlowCatalog_Aliya1 } from '@/types/aliya1/data_script6'
import type { L10nSingleLang_Ycytx5, VFOut_Catalog_Ycytx5 } from '@/types/ycytx_5'
import type { FlowchartData as FlowchartData_2361Playtest } from '@/components/flowchart/2361_playtest/types/script3'
import type { FlowchartData as FlowchartData_TysyDemo } from '@/components/flowchart/tysy_demo/types/script3'
import type { FlowchartData as FlowchartData_Aliya2Demo } from '@/components/flowchart/aliya2_demo/types/script3'
import type { CatalogMetadataFile as CatalogMetadataFile_Aliya2Demo } from '@/components/flowchart/aliya2_demo/types/script4'
import type { L10nAllLangEntry as L10nAllLangEntry_Aliya2Demo, L10nSingleLangEntry as L10nSingleLangEntry_Aliya2Demo } from '@/components/flowchart/aliya2_demo/types/script5'
import type { ExternalConfig as ExternalConfig_Aliya2Demo } from '@/components/flowchart/aliya2_demo/types/script6'
import type { ActorData as ActorData_Aliya2Demo, ItemData as ItemData_Aliya2Demo, VariableData as VariableData_Aliya2Demo } from '@/components/flowchart/aliya2_demo/types/script7'
import type { VariableUsage as VariableUsage_Aliya2Demo } from '@/components/flowchart/aliya2_demo/types/script8'
import type { MergeInfo as MergeInfo_Aliya2Demo } from '@/components/flowchart/aliya2_demo/types/script13'
import type { VariableUsage_Aliya1 } from '@/components/flowchart/aliya1/types/script9'
import type { VariableUsage as VariableUsage_TysyDemo } from '@/components/flowchart/tysy_demo/types/script5'
import type { CatalogData as CatalogData_TysyDemo } from '@/components/flowchart/tysy_demo/types/script4'

type FlowchartDataSet_Aliya1 = Aliya1_FlowchartData | Aliya1_Android_DLC_FlowchartData

export const symbolUseDark = Symbol('useDark_global') as InjectionKey<ReturnType<typeof useDark>>
export const symbolUseVueFlow = Symbol('useVueFlow_flowchart') as InjectionKey<
  ReturnType<typeof useVueFlow>
>

export const symbolFlowchartCatalog_Aliya1 = Symbol('flowchart_catalog') as InjectionKey<
  Ref<VueFlowCatalog_Aliya1>
>
export const symbolFlowchartMetadata_Aliya1 = Symbol('flowchart_metadata') as InjectionKey<
  Ref<FlowchartDataSet_Aliya1['metadata']>
>
export const symbolL10nDataSingleLang_Aliya1 = Symbol('l10n_data') as InjectionKey<
  Ref<L10nCsvSingleLang_Aliya1>
>
export const symbolFlowchartVarUsage_Aliya1 = Symbol('var_usage') as InjectionKey<
  Ref<VariableUsage_Aliya1>
>

export const symbolFlowchartCatalog_Ycytx5 = Symbol('flowchart_catalog') as InjectionKey<
  Ref<VFOut_Catalog_Ycytx5>
>
export const symbolFlowchartMetadata_Ycytx5 = Symbol('flowchart_metadata') as InjectionKey<
  // 取巧操作，后来的我别这么做
  Ref<VFOut_Catalog_Ycytx5['catalog'][string]['metadata']>
>
export const symbolL10nDataSingleLang_Ycytx5 = Symbol('l10n_data') as InjectionKey<
  Ref<L10nSingleLang_Ycytx5>
>
export const symbolL10nDataSingleLangDict_Ycytx5 = Symbol(
  'dict_l10n_data',
) as InjectionKey<symbolL10nDataSingleLangDict_Ycytx5>
export type symbolL10nDataSingleLangDict_Ycytx5 = Ref<L10nSingleLang_Ycytx5['dict']>

export const symbolFlowchartCatalog_2361Playtest = Symbol(
  'flowchart_catalog_2361playtest',
) as InjectionKey<
  Ref<{ catalog: Record<string, { metadata: FlowchartData_2361Playtest['metadata'] }> }>
>
export const symbolFlowchartMetadata_2361Playtest = Symbol(
  'flowchart_metadata_2361playtest',
) as InjectionKey<Ref<FlowchartData_2361Playtest['metadata']>>

export const symbolL10nDataSingleLang_TysyDemo = Symbol('l10n_data_tysy_demo') as InjectionKey<
  Ref<Record<string, string>>
>

export const symbolFlowchartCatalog_TysyDemo = Symbol(
  'flowchart_catalog_tysy_demo',
) as InjectionKey<Ref<CatalogData_TysyDemo>>
export const symbolFlowchartMetadata_TysyDemo = Symbol(
  'flowchart_metadata_tysy_demo',
) as InjectionKey<Ref<FlowchartData_TysyDemo['metadata']>>
export const symbolFlowchartVarUsage_TysyDemo = Symbol('var_usage_tysy_demo') as InjectionKey<
  Ref<VariableUsage_TysyDemo>
>

// ---------- aliya2_demo ----------

export const symbolL10nDataSingleLang_Aliya2Demo = Symbol('l10n_data_aliya2_demo') as InjectionKey<
  Ref<L10nSingleLangEntry_Aliya2Demo>
>

export const symbolFlowchartCatalog_Aliya2Demo = Symbol(
  'flowchart_catalog_aliya2_demo',
) as InjectionKey<
  Ref<CatalogMetadataFile_Aliya2Demo>
>
export const symbolFlowchartMetadata_Aliya2Demo = Symbol(
  'flowchart_metadata_aliya2_demo',
) as InjectionKey<Ref<FlowchartData_Aliya2Demo['metadata']>>
export const symbolFlowchartVarUsage_Aliya2Demo = Symbol('var_usage_aliya2_demo') as InjectionKey<
  Ref<VariableUsage_Aliya2Demo>
>

export const symbolExternalConfig_Aliya2Demo = Symbol('external_config_aliya2_demo') as InjectionKey<
  Ref<ExternalConfig_Aliya2Demo | null>
>

export const symbolActorData_Aliya2Demo = Symbol('actor_data_aliya2_demo') as InjectionKey<
  Ref<ActorData_Aliya2Demo | null>
>

export const symbolItemData_Aliya2Demo = Symbol('item_data_aliya2_demo') as InjectionKey<
  Ref<ItemData_Aliya2Demo | null>
>
export const symbolVariableData_Aliya2Demo = Symbol('variable_data_aliya2_demo') as InjectionKey<
  Ref<VariableData_Aliya2Demo | null>
>
export const symbolL10nAllLangData_Aliya2Demo = Symbol('l10n_all_lang_data_aliya2_demo') as InjectionKey<
  Ref<L10nAllLangEntry_Aliya2Demo | null>
>

export const symbolMergeInfo_Aliya2Demo = Symbol('merge_info_aliya2_demo') as InjectionKey<
  Ref<MergeInfo_Aliya2Demo | null>
>

/** 通用 L10N 数据注入键 — 供搜索面板使用，各父页面负责规范化为扁平 Record<string, string> */
export const symbolL10NSearchData = Symbol('l10n_search_data') as InjectionKey<
  Ref<Record<string, string>>
>

/** 流程图搜索元数据 — 供搜索面板 buildL10NKey 使用（如 tysy_demo 的 currName） */
export const symbolFlowchartSearchMetadata = Symbol('flowchart_search_metadata') as InjectionKey<
  Ref<Record<string, unknown>>
>

export const symbolGameSelectionDict = Symbol('game_select_dict') as InjectionKey<
  Ref<[string, string, string]>
>

export const symbolFlowchartPageHeight = Symbol('flowchart_page_height') as InjectionKey<
  Ref<string>
>

export const symbolFlowchartFileTreeCollapsed = Symbol(
  'flowchart_file_tree_collapsed',
) as InjectionKey<Ref<boolean>>

export const symbolFlowchartSelection = Symbol('flowchart_selection') as InjectionKey<
  Ref<[string, string, string]>
>
