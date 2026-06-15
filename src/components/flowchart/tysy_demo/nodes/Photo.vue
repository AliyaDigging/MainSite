<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ImageFilled } from '@vicons/material'

import { type FlowchartDataNode_Photo } from '../types/script3'

import General_ExtraAction from './General_ExtraAction.vue'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_Photo['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>currIndex: {{ props.data.currIndex }}</p>
    <p>nextIndex: {{ props.data.nextIndex }}</p>
    <p>
      senderId: <code>{{ props.data.senderId }}</code>
    </p>
    <p>
      chatScene: <code>{{ props.data.chatScene }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><ImageFilled /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.tysy_demo.node.Photo.title') }}</span>
      </div>
      <div class="custom-node-content">
        <div class="tysy-demo-debug">
          <p>
            <i>currIndex: {{ props.data.currIndex }}</i>
          </p>
          <p>
            <i>nextIndex: {{ props.data.nextIndex }}</i>
          </p>
          <p>
            <i
              >senderId: <code>{{ props.data.senderId }}</code></i
            >
          </p>
          <p>
            <i
              >chatScene: <code>{{ props.data.chatScene }}</code></i
            >
          </p>
        </div>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.Photo.waitTime.p') }}: {{ props.data.waitTime }}s
        </p>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.Photo.senderId') }}: “{{
            $t(`comp.flowchart.tysy_demo.node.Photo.senderId.${props.data.senderId}`)
          }}”
        </p>
        <p>
          {{ $t('comp.flowchart.tysy_demo.node.Photo.chatScene') }}: “{{
            $t(`comp.flowchart.tysy_demo.node.Photo.chatScene.${props.data.chatScene}`)
          }}”
        </p>
        <p>{{ $t('comp.flowchart.tysy_demo.node.Photo.imageId') }}:</p>
        <ul class="custom-node-normal-ul">
          <li v-for="[key, value] of Object.entries(props.data.imageId)" :key="key">
            {{ $t(`comp.flowchart.tysy_demo.node.Photo.imageId.${key}`) }}:
            <code>{{ value[0] }}</code> ({{
              $t(`comp.flowchart.tysy_demo.node.Photo.imageId.dimension.${value[1]}`)
            }})
            <br />
            <img :src="`/aliya/tysy_demo/images/${value[0]}.png`" style="width: 100%" />
          </li>
        </ul>
        <General_ExtraAction
          :data="props.data.extraAction"
          :node-id="props.id"
          v-if="props.data.extraAction"
        />
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
img {
  margin: 4px 0px;
}
</style>
