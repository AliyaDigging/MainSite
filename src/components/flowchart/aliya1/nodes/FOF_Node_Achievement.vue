<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'

import { Icon } from '@vicons/utils'
import { Medal } from '@vicons/fa'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<{ label: string }>>()
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><Medal /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.GetAchievement.title') }}</span>
      </div>
      <div class="custom-node-content">
        <p>
          {{ $t('comp.flowchart.node.GetAchievement.p.achievementid') }}:&nbsp;
          {{ props.data.label }}
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
