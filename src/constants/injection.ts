import type { FlowchartData } from '@/components/flowchart/types/script5_vueflow_prod'
import type { useVueFlow } from '@vue-flow/core'
import type { useDark } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'
import { type L10nCsvSingleLang } from '@/types/data_script7'
import type { VueFlowCatalog } from '@/types/data_script6'

export const symbolUseDark = Symbol('useDark_global') as InjectionKey<ReturnType<typeof useDark>>
export const symbolUseVueFlow = Symbol('useVueFlow_flowchart') as InjectionKey<
  ReturnType<typeof useVueFlow>
>

export const symbolFlowchartCatalog = Symbol('flowchart_catalog') as InjectionKey<
  Ref<VueFlowCatalog>
>
export const symbolFlowchartMetadata = Symbol('flowchart_metadata') as InjectionKey<
  Ref<FlowchartData['metadata']>
>
export const symbolL10nDataSingleLang = Symbol('l10n_data') as InjectionKey<Ref<L10nCsvSingleLang>>
