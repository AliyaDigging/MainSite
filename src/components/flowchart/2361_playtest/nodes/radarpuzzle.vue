<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ExtensionPuzzleOutline } from '@vicons/ionicons5'

import { type FlowchartDataNode_radarpuzzle } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_radarpuzzle['data']>>()
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
        <Icon class="custom-node-icon"><ExtensionPuzzleOutline /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.radarpuzzle.title') }}</span>
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
          动作: <code>{{ props.data.arg.action }}</code> ({{
            $t(`comp.flowchart.2361_playtest.node.radarpuzzle.action.${props.data.arg.action}`)
          }})
        </p>

        <template
          v-if="props.data.arg.action === 'channea' || props.data.arg.action === 'channelb'"
        >
          <p v-if="props.data.arg.pointer">
            对话脚本起始点: <code>{{ props.data.arg.pointer }}</code>
          </p>
        </template>
        <template v-else-if="props.data.arg.action === 'finalwallmode'">
          <p>
            是否启用: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.enabled}`) }}
          </p>
          <p>
            清除玩家做的选择:
            {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.clear}`) }}
          </p>
          <p>
            确认跳转目标: <code>{{ props.data.arg.okgoto }}</code>
          </p>
          <p>
            取消跳转目标: <code>{{ props.data.arg.cancelgoto }}</code>
          </p>
          <p>
            提交后继续显示: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.keep}`) }}
          </p>
        </template>
        <template
          v-else-if="props.data.arg.action === 'log' || props.data.arg.action === 'warnlog'"
        >
          <p v-if="props.data.speaker">说话人: {{ props.data.speaker }}</p>
          <p>内容: {{ props.data.content }}</p>
          <p v-if="props.data.arg.action === 'warnlog'"><b>会额外播放警告音效</b></p>
        </template>
        <template v-else-if="props.data.arg.action === 'openchat'">
          <p v-if="props.data.arg.pointer">
            起始对话: <code>{{ props.data.arg.pointer }}</code>
          </p>
        </template>
        <template v-else-if="props.data.arg.action === 'planxwall'">
          <p>生成的墙体坐标:</p>
          <ul class="custom-node-normal-ul">
            <li v-for="(item, idx) in String(props.data.arg.walls).split(',')" :key="idx">
              {{ item }}
            </li>
          </ul>
          <p>
            是否打日志到游戏内:
            {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.logs}`) }}
          </p>
        </template>
        <template v-else-if="props.data.arg.action === 'players'">
          <p>参与的玩家: {{ props.data.arg.players }}</p>
        </template>
        <template v-else-if="props.data.arg.action === 'previewmonsterroute'">
          <p>
            是否打日志到游戏内:
            {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.log}`) }}
          </p>
        </template>
        <template v-else-if="props.data.arg.action === 'readyaction'">
          <p>是否显示: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.show}`) }}</p>
          <p>显示的文本: {{ props.data.arg.text }}</p>
          <p>
            确认跳转目标: <code>{{ props.data.arg.okgoto }}</code>
          </p>
          <p>
            取消跳转目标: <code>{{ props.data.arg.cancelgoto }}</code>
          </p>
          <p>
            提交后继续显示: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.keep}`) }}
          </p>
        </template>
        <template v-else-if="props.data.arg.action === 'setlevel'">
          <p>
            谜题编号: <code>{{ props.data.arg.level }}</code>
          </p>
          <p v-if="props.data.arg.keepstate != undefined">
            是否保留(保持)两人的状态:
            {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.keepstate}`) }}
          </p>
          <p v-if="props.data.arg.fakeexit != undefined">
            是否设置假终点:
            {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.fakeexit}`) }}
          </p>
        </template>
        <template v-else-if="props.data.arg.action === 'setmarker'">
          <p>
            节点ID: <code>{{ props.data.arg.cell }}</code>
          </p>
        </template>
        <template v-else-if="props.data.arg.action === 'setwallcharges'">
          <p>可覆写的墙壁数: {{ props.data.arg.value }}</p>
        </template>
        <p>
          延迟时间:
          {{
            Number(
              props.data.delay === 0 && props.data.delayType === 'base' ? 0.5 : props.data.delay,
            ).toFixed(2)
          }}s ({{ $t(`comp.flowchart.2361_playtest.node.delay.${props.data.delayType}`) }})
        </p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
