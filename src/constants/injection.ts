import type { FlowchartData as Aliya1_FlowchartData } from '@/components/flowchart/aliya1/types/script5_vueflow_prod'
import type { FlowchartData as Aliya1_Android_DLC_FlowchartData } from '@/components/flowchart/aliya1_android_dlc/types/script5_vueflow_prod'
import type { useVueFlow } from '@vue-flow/core'
import type { useDark } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'
import { type L10nCsvSingleLang as L10nCsvSingleLang_Aliya1 } from '@/types/aliya1/data_script7'
import type { VueFlowCatalog as VueFlowCatalog_Aliya1 } from '@/types/aliya1/data_script6'
import type { L10nSingleLang_Ycytx5, VFOut_Catalog_Ycytx5 } from '@/types/ycytx_5'

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

export const symbolGameSelectionDict = Symbol('game_select_dict') as InjectionKey<
  Ref<[string, string, string]>
>
