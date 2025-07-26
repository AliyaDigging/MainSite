<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { useI18n } from 'vue-i18n'
import PvTag from 'primevue/tag'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<{ label: string }>>()

const i18n = useI18n()
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div style="text-align: center" class="custom-node-title">
      <RouterLink :to="`/view/flowchart/${props.data.label}`">{{ props.data.label }}</RouterLink>
      <br />
      <PvTag severity="info" size="small">{{
        props.data.label.toLowerCase().includes('catalog')
          ? i18n.t('select.flowchart.type.fof')
          : props.data.label.toLowerCase().includes('daily')
            ? i18n.t(`select.flowchart.type.daily`)
            : i18n.t(`select.flowchart.type.main`)
      }}</PvTag>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
