<script setup lang="ts">
/**
 * 流程图元数据组件
 * 显示流程图的统计信息和引用关系
 */
import TooltipAndPopup from '@/components/TooltipAndPopup.vue'
import {
  symbolFlowchartCatalog_Ycytx5,
  symbolL10nDataSingleLangDict_Ycytx5,
} from '@/constants/injection'
import { computed, inject } from 'vue'

const props = defineProps<{
  flowchartName: string
  gameId: string
  versionId: string
}>()

const dictData = inject(symbolL10nDataSingleLangDict_Ycytx5)!

const catalogData = inject(symbolFlowchartCatalog_Ycytx5)!
const catalogMetadata = computed(() => catalogData.value.catalog[props.flowchartName]?.metadata)

const shouldDisplay = computed(() => {
  const name = props.flowchartName.toLowerCase()
  if (name.includes('catalog') || name === '') {
    return false
  }
  return true
})

// trigger VueFlow fitInView
function triggerVueFlowFitInView(nodeId: string) {
  document.dispatchEvent(
    new CustomEvent('ycytx5-fit-in-view', {
      detail: {
        nodeId: nodeId,
      },
      bubbles: true,
      cancelable: true,
    }),
  )
}
</script>

<template>
  <div class="mt-6" style="font-size: 16px">
    <div v-if="shouldDisplay && catalogMetadata">
      <h2 style="font-weight: 600; font-size: 18px">{{ $t('comp.flowchartmetadata.h2') }}</h2>
      <ul class="custom-node-normal-ul mt-2">
        <li class="mb-1 ul-li">
          <span
            ><b>{{ $t('comp.flowchartmetadata.name') }}</b></span
          >:&nbsp;<code>{{ catalogMetadata.currName }}</code>
        </li>
        <li class="mb-1 ul-li">
          <span
            ><b>{{ $t('comp.flowchartmetadata.ycytx_5.version') }}</b></span
          >:&nbsp;<code>{{ catalogMetadata.version }}</code>
        </li>
        <li class="mb-1">
          <span
            ><b>{{ $t('comp.flowchartmetadata.count.node') }}</b
            >:&nbsp;<code>{{ catalogMetadata.counts.node }}</code></span
          >
        </li>
        <li class="mb-1">
          <span
            ><b>{{ $t('comp.flowchartmetadata.count.edge') }}</b></span
          >:&nbsp;<code>{{ catalogMetadata.counts.edge }}</code>
        </li>
        <li class="mb-1">
          <span
            ><b
              >{{ $t('comp.flowchartmetadata.ycytx_5.count.dictKeyword') }} [{{
                catalogMetadata.counts.dictKeyword
              }}]</b
            >:
            <span v-for="(i, id) of catalogMetadata.dictKeywordId" :key="id"
              ><TooltipAndPopup :content="dictData[`DICT_${i}`][1]">{{
                dictData[`DICT_${i}`][0]
              }}</TooltipAndPopup
              >、</span
            ></span
          >
        </li>
        <li class="mb-1">
          <span
            ><b>{{ $t('comp.flowchartmetadata.ycytx_5.count.specialNodes') }}</b></span
          >
          <ul>
            <li>
              {{ $t('comp.flowchartmetadata.ycytx_5.count.specialNodes.start') }}:
              <span v-for="(i, id) of catalogMetadata.specialNodes.start" :key="id"
                ><a style="cursor: pointer" @click="triggerVueFlowFitInView(i)"
                  ><code>{{ i }}</code></a
                >、</span
              >
            </li>
            <li>
              {{ $t('comp.flowchartmetadata.ycytx_5.count.specialNodes.end') }}:
              <span v-for="(i, id) of catalogMetadata.specialNodes.end" :key="id"
                ><a style="cursor: pointer" @click="triggerVueFlowFitInView(i)"
                  ><code>{{ i }}</code></a
                >、</span
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-else>
      <h2 style="font-weight: 600; font-size: 18px">{{ $t('comp.flowchartmetadata.h2.null') }}</h2>
    </div>
  </div>
</template>

<style scoped>
li.ul-li b {
  font-weight: 600;
}

ul ul {
  list-style-type: circle;
  margin-left: 40px;
}
</style>
