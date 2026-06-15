<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { RadarWeather } from '@vicons/carbon'

import { type FlowchartDataNode_WeatherEffect } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_WeatherEffect['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>currIndex: {{ props.data.currIndex }}</p>
    <p>nextIndex: {{ props.data.nextIndex }}</p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><RadarWeather /></Icon>
        <span class="custom-node-title">{{
          $t('comp.flowchart.tysy_demo.node.WeatherEffect.title')
        }}</span>
      </div>
      <div class="custom-node-content">
        <div class="tysy-demo-debug">
          <p>
            <i>currIndex: {{ props.data.currIndex }}</i>
          </p>
          <p>
            <i>nextIndex: {{ props.data.nextIndex }}</i>
          </p>
        </div>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.WeatherEffect.duration') }}:
          {{ props.data.duration }}s
        </p>
        <p>
          {{ $t(`comp.flowchart.tysy_demo.node.WeatherEffect.weatherType`) }}:
          {{
            $t(`comp.flowchart.tysy_demo.node.WeatherEffect.weatherType.${props.data.weatherType}`)
          }}
        </p>
        <General_ExtraAction :data="props.data.extraAction" v-if="props.data.extraAction" />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
