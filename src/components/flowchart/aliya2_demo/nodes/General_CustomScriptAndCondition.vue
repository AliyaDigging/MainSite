<script setup lang="ts">
import type { PropType } from 'vue'
import type { Artisy_VariableOps } from '../types/script3_var'

const props = defineProps({
  variableOps: {
    type: Object as PropType<Artisy_VariableOps | undefined>,
    required: true,
  },
})
</script>

<template>
  <template v-if="variableOps">
    <p>
      <b>{{
        $t('comp.flowchart.aliya2_demo.node.General_CustomScriptAndCondition.sectionTitle.title')
      }}</b>
    </p>
    <template v-if="variableOps.assignments.length > 0">
      <p>
        {{
          $t('comp.flowchart.aliya2_demo.node.General_CustomScriptAndCondition.variableOps.title')
        }}
      </p>
      <ul class="custom-node-normal-ul">
        <li v-for="(i, idx) in variableOps.assignments" :key="idx">
          <code>{{ i.variableName }}</code> = <code>{{ i.valueAssigned }}</code>
        </li>
      </ul>
    </template>

    <template v-if="variableOps.condition">
      <p>
        {{ $t('comp.flowchart.aliya2_demo.node.General_CustomScriptAndCondition.condition.title') }}
      </p>
      <ul class="custom-node-normal-ul">
        <li>
          <code>{{ variableOps.condition.variableName }}</code>
          {{ $t(`comp.flowchart.aliya2_demo.flow.compareop.${variableOps.condition.compareOp}`) }}
          <code>{{
            typeof variableOps.condition.valueAgainst === 'object'
              ? variableOps.condition.valueAgainst.variableName
              : variableOps.condition.valueAgainst
          }}</code>
        </li>
      </ul>
    </template>
  </template>
</template>
