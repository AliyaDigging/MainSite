<script setup lang="ts">
import { symbolFlowchartCatalog_TysyDemo } from '@/constants/injection'
import { computed, inject } from 'vue'

const props = defineProps<{
  flowchartName: string
  gameId: string
  versionId: string
}>()

const catalogData = inject(symbolFlowchartCatalog_TysyDemo)!
const catalogMetadata = computed(() => catalogData.value.catalog[props.flowchartName])

const shouldDisplay = computed(() => {
  const name = props.flowchartName.toLowerCase()
  if (name.includes('catalog') || name === '') {
    return false
  }
  return true
})

// 生成流程图链接
function getFlowchartLink(flowchartName: string) {
  return `/view/flowchart/${props.gameId}/${props.versionId}/${flowchartName}`
}
</script>

<template>
  <div class="mt-6" style="font-size: 16px">
    <div v-if="shouldDisplay && catalogMetadata">
      <ul class="custom-node-normal-ul mt-2">
        <li class="mb-1 ul-li">
          <span
            ><b>{{ $t('comp.flowchartmetadata.name') }}</b></span
          >:&nbsp;<code>{{ catalogMetadata.currName }}</code>
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
            ><b>{{ $t('comp.flowchartmetadata.otherflowcharts') }}</b
            >:&nbsp;<span v-for="(i, id) of catalogMetadata.flowchartRefs" :key="id"
              ><RouterLink :to="getFlowchartLink(i)">{{ i }}</RouterLink
              >,
            </span></span
          >
        </li>
        <li class="mb-1">
          <span
            ><b>{{ $t('comp.flowchartmetadata.beingrefed') }}</b
            >:&nbsp;<span
              v-for="(i, id) of catalogData.flowchartBeingRefed[flowchartName]"
              :key="id"
              ><RouterLink :to="getFlowchartLink(i)">{{ i }}</RouterLink
              >,
            </span></span
          >
        </li>
        <li class="mb-1">
          <span
            ><b>{{ $t('comp.flowchartmetadata.variablenames') }}</b
            >:&nbsp;</span
          >
          <ul>
            <li v-for="(entry, id) of catalogMetadata.variableNames" :key="id" class="mt-1">
              <code>{{ entry.key }}</code
              >&nbsp;-&nbsp;{{ $t(`comp.flowchart.variable.type.${entry.type}`) }}&nbsp;({{
                $t(`comp.flowchart.tysy_demo.flow.var.scope.${entry.scope}`)
              }})
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
