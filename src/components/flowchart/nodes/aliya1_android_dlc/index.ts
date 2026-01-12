/**
 * Aliya1 Android DLC 节点组件导出
 * 每个游戏的节点组件完全独立，不与其他游戏共享
 */

// DLC 所有节点
export { default as AliyaMessage } from '../../aliya1_android_dlc/nodes/AliyaMessage.vue'
export { default as CallBlock } from '../../aliya1_android_dlc/nodes/CallBlock.vue'
export { default as CallFlowchart } from '../../aliya1_android_dlc/nodes/CallFlowchart.vue'
export { default as DefaultChoice } from '../../aliya1_android_dlc/nodes/DefaultChoice.vue'
export { default as DefineVariable } from '../../aliya1_android_dlc/nodes/DefineVariable.vue'
export { default as Else } from '../../aliya1_android_dlc/nodes/Else.vue'
export { default as EndIf } from '../../aliya1_android_dlc/nodes/EndIf.vue'
export { default as EndWaitTimeForCondition } from '../../aliya1_android_dlc/nodes/EndWaitTimeForCondition.vue'
export { default as FlowchartBlock } from '../../aliya1_android_dlc/nodes/FlowchartBlock.vue'
export { default as FlowchartStart } from '../../aliya1_android_dlc/nodes/FlowchartStart.vue'
export { default as FOF_Node } from '../../aliya1_android_dlc/nodes/FOF_Node.vue'
export { default as FOF_Node_Achievement } from '../../aliya1_android_dlc/nodes/FOF_Node_Achievement.vue'
export { default as GroupBlock } from '../../aliya1_android_dlc/nodes/GroupBlock.vue'
export { default as If } from '../../aliya1_android_dlc/nodes/If.vue'
export { default as InterruptChartAndCallCommand } from '../../aliya1_android_dlc/nodes/InterruptChartAndCallCommand.vue'
export { default as MonoBehavior } from '../../aliya1_android_dlc/nodes/MonoBehavior.vue'
export { default as PlayerChoice } from '../../aliya1_android_dlc/nodes/PlayerChoice.vue'
export { default as PlayerInputWithOutDeleteField } from '../../aliya1_android_dlc/nodes/PlayerInputWithOutDeleteField.vue'
export { default as SetVariable } from '../../aliya1_android_dlc/nodes/SetVariable.vue'
export { default as StartAnCharacterChart } from '../../aliya1_android_dlc/nodes/StartAnCharacterChart.vue'
export { default as TextFileCommand } from '../../aliya1_android_dlc/nodes/TextFileCommand.vue'
export { default as Then } from '../../aliya1_android_dlc/nodes/Then.vue'
export { default as WaitTime } from '../../aliya1_android_dlc/nodes/WaitTime.vue'
export { default as WaitTimeForCondition } from '../../aliya1_android_dlc/nodes/WaitTimeForCondition.vue'

// DLC 所有节点类型列表
export const DLC_NODE_TYPES = [
  'AliyaMessage',
  'CallBlock',
  'CallFlowchart',
  'DefaultChoice',
  'DefineVariable',
  'Else',
  'EndIf',
  'EndWaitTimeForCondition',
  'FlowchartBlock',
  'FlowchartStart',
  'FOF_Node',
  'FOF_Node_Achievement',
  'GroupBlock',
  'If',
  'InterruptChartAndCallCommand',
  'MonoBehavior',
  'PlayerChoice',
  'PlayerInputWithOutDeleteField',
  'SetVariable',
  'StartAnCharacterChart',
  'TextFileCommand',
  'Then',
  'WaitTime',
  'WaitTimeForCondition',
] as const

export type DLCNodeType = (typeof DLC_NODE_TYPES)[number]
