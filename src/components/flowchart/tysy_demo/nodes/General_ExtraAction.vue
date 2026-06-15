<script setup lang="ts">
import { type BlockData_ExtraAction } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<{ data: BlockData_ExtraAction }>()
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
        <code>{{ props.data.varName }}</code>
      </li>
      <li>
        {{ $t('comp.flowchart.tysy_demo.node.General_ExtraAction.VarAdd.value.p') }}:
        <code>{{ props.data.value }}</code>
      </li>
    </template>
  </ul>
</template>
