<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { Artisy_VariableOps } from '../types/script3_var'
import { flowchartBus } from '@/utils/flowchartEvents'

const props = defineProps({
  variableOps: {
    type: Object as PropType<Artisy_VariableOps | undefined>,
    required: true,
  },
  needBeforeBr: {
    type: Boolean,
    required: false,
    default: true,
  },
  nodeId: {
    type: String,
    required: true,
  },
})

const condition = computed(() => props.variableOps?.condition ?? null)

const valueAgainstVarName = computed(() => {
  const va = props.variableOps?.condition?.valueAgainst
  if (typeof va === 'object' && va !== null && 'variableName' in va) {
    return va.variableName
  }
  return undefined
})

function triggerPopover(event: Event, varName?: string) {
  // defensive: ignore if no variable name provided
  if (!varName) return
  event.stopPropagation()
  event.preventDefault()
  flowchartBus.emit('node-popover:toggle', {
    varName,
    originTriggerNodeId: props.nodeId,
    browserEvent: event,
  })
}
</script>

<template>
  <template v-if="variableOps">
    <br v-if="needBeforeBr" />
    <p
      v-tooltip.top="
        $t(
          'comp.flowchart.aliya2_demo.node.General_CustomScriptAndCondition.sectionTitle.title.tooltip',
        )
      "
    >
      <b
        ><u>{{
          $t('comp.flowchart.aliya2_demo.node.General_CustomScriptAndCondition.sectionTitle.title')
        }}</u></b
      >
    </p>
    <template v-if="variableOps.assignments.length > 0">
      <p>
        {{
          $t('comp.flowchart.aliya2_demo.node.General_CustomScriptAndCondition.variableOps.title')
        }}:
      </p>
      <ul class="custom-node-normal-ul">
        <li v-for="(i, idx) in variableOps.assignments" :key="idx">
          <code class="clickable-var" @click="(e) => triggerPopover(e, i.variableName)">{{
            i.variableName
          }}</code>
          = <code>{{ i.valueAssigned }}</code>
        </li>
      </ul>
    </template>

    <template v-if="condition">
      <p>
        {{
          $t('comp.flowchart.aliya2_demo.node.General_CustomScriptAndCondition.condition.title')
        }}:
      </p>
      <ul class="custom-node-normal-ul">
        <li>
          <code
            class="clickable-var"
            @click="(e) => triggerPopover(e, variableOps?.condition?.variableName)"
            >{{ variableOps?.condition?.variableName }}</code
          >
          {{ $t(`comp.flowchart.aliya2_demo.flow.compareop.${variableOps?.condition?.compareOp}`) }}
          <code
            v-if="valueAgainstVarName !== undefined"
            class="clickable-var"
            @click="(e) => triggerPopover(e, valueAgainstVarName)"
            >{{ valueAgainstVarName }}</code
          >
          <code v-else>{{ variableOps?.condition?.valueAgainst }}</code>
        </li>
      </ul>
    </template>
  </template>
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
