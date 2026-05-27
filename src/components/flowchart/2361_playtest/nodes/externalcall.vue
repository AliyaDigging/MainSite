<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

import { Icon } from '@vicons/utils'
import { ExternalLinkAlt } from '@vicons/fa'

import { type FlowchartDataNode_externalcall } from '../types/script3'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<FlowchartDataNode_externalcall['data']>>()
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
        <Icon class="custom-node-icon"><ExternalLinkAlt /></Icon>
        <span class="custom-node-title">{{ $t('comp.flowchart.node.externalcall.title') }}</span>
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
          提供者ID: <code>{{ props.data.arg.provider }}</code> ({{
            $t(
              `comp.flowchart.2361_playtest.node.externalcall.provider.${props.data.arg.provider}`,
            )
          }})
        </p>
        <p>
          ID: <code>{{ props.data.arg.id }}</code>
        </p>
        <template v-if="props.data.arg.provider === 'PasswordPuzzleExternal'">
          <p>
            动作:
            <code>{{ props.data.arg.action }}</code> ({{
              $t(
                `comp.flowchart.2361_playtest.node.externalcall.PasswordPuzzleExternal.action.${props.data.arg.action}`,
              )
            }})
          </p>

          <template v-if="props.data.arg.action === 'setpuzzle'">
            <p>谜题名称: {{ props.data.arg.puzzle }}</p>
            <p>
              强制载入: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.forceLoad}`) }}
            </p>
            <p>
              重置谜题状态:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.resetState}`) }}
            </p>
            <p>
              阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
            </p>
          </template>
          <template v-else-if="props.data.arg.action === 'open'">
            <p>
              是否显示关闭按钮:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.showClose}`) }}
            </p>
            <p>
              关闭按钮可交互:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.closeInteractable}`) }}
            </p>
            <p>
              答案正确则关闭:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.completeOnCorrect}`) }}
            </p>
            <p>
              答案正确跳转目标: <code>{{ props.data.arg.onSuccess }}</code>
            </p>
            <p>
              答案错误则关闭:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.completeOnWrong}`) }}
            </p>
            <p>答案错误时的行为: {{ props.data.arg.wrongOutcome }}</p>
            <p>
              答案错误跳转目标: <code>{{ props.data.arg.onError }}</code>
            </p>
            <p>
              关闭窗口跳转目标: <code>{{ props.data.arg.onClose }}</code>
            </p>
            <p>
              启用过渡效果: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.fade}`) }}
            </p>
            <p>过渡效果持续时间: {{ props.data.arg.fadeDuration }}s</p>
            <p>
              阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
            </p>
          </template>
          <template v-else-if="props.data.arg.action === 'close'">
            <p>
              启用过渡效果: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.fade}`) }}
            </p>
            <p>过渡效果持续时间: {{ props.data.arg.fadeDuration }}s</p>
            <p>
              阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
            </p>
          </template>
          <template v-else-if="props.data.arg.action === 'perform'">
            <p>谜题结果处文本: {{ props.data.arg.resultText }}</p>
            <p>是否显示: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.show}`) }}</p>
            <p>
              是否锁定密码输入:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.lockInput}`) }}
            </p>
            <p>
              是否显示密码输入:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.digitButtons}`) }}
            </p>
            <p>
              是否显示关闭按钮:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.showClose}`) }}
            </p>
            <p>
              关闭交互可交互:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.closeInteractable}`) }}
            </p>
            <p>
              启用过渡效果: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.fade}`) }}
            </p>
            <p>过渡效果持续时间: {{ props.data.arg.fadeDuration }}s</p>
            <p>
              阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
            </p>
          </template>
          <template v-else-if="props.data.arg.action === 'setresult'">
            <p>显示的文本: {{ props.data.arg.text }}</p>
            <p>
              阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
            </p>
          </template>
        </template>
        <template v-else-if="props.data.arg.provider === 'DesktopPopup1'">
          <p>消息文本: {{ props.data.arg.message }}</p>
          <p>
            成功跳转目标: <code>{{ props.data.arg.onSuccess }}</code>
          </p>
          <p>
            出错跳转目标: <code>{{ props.data.arg.onError }}</code>
          </p>
          <p>
            关闭跳转目标: <code>{{ props.data.arg.onClose }}</code>
          </p>
          <p>
            取消跳转目标: <code>{{ props.data.arg.onCancel }}</code>
          </p>
          <p>阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}</p>
        </template>
        <template v-else-if="props.data.arg.provider === 'TimelineExternal'">
          <p>
            动作:
            <code>{{ props.data.arg.action }}</code> ({{
              $t(
                `comp.flowchart.2361_playtest.node.externalcall.TimelineExternal.action.${props.data.arg.action}`,
              )
            }})
          </p>

          <template v-if="props.data.arg.action === 'play'">
            <p>
              activateRoot:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.activateRoot}`) }}
            </p>
            <p>
              completeOnPauseBridge:
              {{
                $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.completeOnPauseBridge}`)
              }}
            </p>
            <p>
              阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
            </p>
          </template>
          <template v-else-if="props.data.arg.actionn === 'hide'">
            <p>
              activateRoot:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.activateRoot}`) }}
            </p>
            <p>
              阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
            </p>
          </template>
          <template v-else-if="props.data.arg.action === 'resume'">
            <p>
              activateRoot:
              {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.activateRoot}`) }}
            </p>
            <p>
              completeOnPauseBridge:
              {{
                $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.completeOnPauseBridge}`)
              }}
            </p>
            <p>
              阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}
            </p>
          </template>
        </template>
        <template v-else-if="props.data.arg.provider === 'GroupInvation'">
          <p>显示的消息: {{ props.data.arg.message }}</p>
          <p>确认按钮文本: {{ props.data.arg.confirmText }}</p>
          <p>取消按钮文本: {{ props.data.arg.cancelText }}</p>
          <p>
            成功跳转目标: <code>{{ props.data.arg.onSuccess }}</code>
          </p>
          <p>
            出错跳转目标: <code>{{ props.data.arg.onError }}</code>
          </p>
          <p>
            关闭跳转目标: <code>{{ props.data.arg.onClose }}</code>
          </p>
          <p>
            取消跳转目标: <code>{{ props.data.arg.onCancel }}</code>
          </p>
          <p>阻塞式脚本: {{ $t(`comp.flowchart.2361_playtest.boolean.${props.data.arg.wait}`) }}</p>
        </template>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
