<script setup lang="ts">
import { type BlockData_ExtraAction } from '../types/script3'
import { flowchartBus } from '@/utils/flowchartEvents'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<{
  data: BlockData_ExtraAction
  nodeId?: string
}>()

function triggerPopover(event: Event, varName: string) {
  event.stopPropagation()
  event.preventDefault()
  flowchartBus.emit('node-popover:toggle', {
    varName,
    originTriggerNodeId: props.nodeId ?? '',
    browserEvent: event,
  })
}
</script>

<template>
  <p>额外副作用:</p>
  <ul class="custom-node-normal-ul">
    <li>
      {{ $t('comp.flowchart.tysy_demo.node.General_ExtraAction.type.p') }}:
      {{ $t(`comp.flowchart.tysy_demo.node.General_ExtraAction.type.${props.data.type}`) }}
      (<code>{{ props.data.type }}</code
      >)
    </li>

    <template v-if="props.data.type === 'VarAdd'">
      <li>
        {{ $t('comp.flowchart.tysy_demo.node.General_ExtraAction.VarAdd.scope.p') }}:
        {{ $t(`comp.flowchart.tysy_demo.flow.var.scope.${props.data.scope}`) }}
      </li>
      <li>
        {{ $t('comp.flowchart.tysy_demo.node.General_ExtraAction.VarAdd.varName.p') }}:
        <!--@vue-expect-error type is incorrectly inferred as Achievement one-->
        <code class="clickable-var" @click="(e) => triggerPopover(e, props.data.varName)">{{
          props.data.varName
        }}</code>
      </li>
      <li>
        {{ $t('comp.flowchart.tysy_demo.node.General_ExtraAction.VarAdd.value.p') }}:
        <code>{{ props.data.value }}</code>
      </li>
    </template>

    <template v-else-if="props.data.type === 'VarGeneral'">
      <li>
        {{ $t('comp.flowchart.tysy_demo.node.General_ExtraAction.VarAdd.scope.p') }}:
        {{ $t(`comp.flowchart.tysy_demo.flow.var.scope.${props.data.scope}`) }}
      </li>
      <li>
        {{ $t('comp.flowchart.tysy_demo.node.General_ExtraAction.VarAdd.varName.p') }}:
        <!--@vue-expect-error type is incorrectly inferred as Achievement one-->
        <code class="clickable-var" @click="(e) => triggerPopover(e, props.data.varName)">{{
          props.data.varName
        }}</code>
      </li>
      <li>
        {{ $t('comp.flowchart.tysy_demo.node.General_ExtraAction.VarAdd.value.p') }}:
        <code>{{ props.data.value }}</code>
      </li>
    </template>
  </ul>
</template>

<style scoped>
code.clickable-var {
  text-decoration: underline;
  cursor: pointer;
}
code.clickable-var:hover {
  color: var(--p-primary-color);
}
</style>
