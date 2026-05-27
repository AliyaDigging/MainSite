<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { LibraryMusicOutlined } from '@vicons/material'

import { type FlowchartDataNode_musicapp } from '../types/script3'
import { isNull } from 'lodash'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_musicapp['data']>>()
</script>

<template>
  <NodeToolbar :position="Position.Top">
    <p>
      persistentId: <code>{{ props.data.persistentId }}</code>
    </p>
    <p>
      sourceRow: <code>{{ props.data.sourceRow }}</code>
    </p>
    <p>
      label: <code>{{ props.data.label }}</code>
    </p>
    <p>
      arg: <code>{{ props.data.ogArg }}</code>
    </p>
  </NodeToolbar>

  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <div>
        <Icon class="custom-node-icon"><LibraryMusicOutlined /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.musicapp.title') }}</span>
      </div>
      <div class="custom-node-content">
        <template v-if="props.data.label !== ''">
          <p class="small-text">
            <i>
              LABEL:
              <small
                ><b
                  ><code>{{ props.data.label }}</code></b
                ></small
              ></i
            >
          </p>
          <hr />
        </template>
        <p>
          行为: <code>{{ props.data.arg.action }}</code> ({{
            $t(`comp.flowchart.node.musicapp.action.${props.data.arg.action}`)
          }})
        </p>
        <p v-if="props.data.arg.name">歌曲名称: {{ props.data.arg.name }}</p>
        <p v-if="!isNull(props.data.arg.showApp)">
          是否显示APP: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.showApp}`) }}
        </p>
        <p v-if="!isNull(props.data.arg.loop)">
          循环播放: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.loop}`) }}
        </p>
        <p v-if="!isNull(props.data.arg.fade)">过渡时间: {{ props.data.arg.fade }}s</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
