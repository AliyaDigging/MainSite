/**
 * Aliya1 节点组件导出
 * 每个游戏的节点组件完全独立，不与其他游戏共享
 */

// Aliya1 所有节点
export { default as ActivateEH } from '../../aliya1/nodes/ActivateEH.vue'
export { default as ActivateEOG } from '../../aliya1/nodes/ActivateEOG.vue'
export { default as ActivateRadio } from '../../aliya1/nodes/ActivateRadio.vue'
export { default as AliyaMessage } from '../../aliya1/nodes/AliyaMessage.vue'
export { default as BanEHControl } from '../../aliya1/nodes/BanEHControl.vue'
export { default as BanEOGControl } from '../../aliya1/nodes/BanEOGControl.vue'
export { default as BanRadioControl } from '../../aliya1/nodes/BanRadioControl.vue'
export { default as CallBlock } from '../../aliya1/nodes/CallBlock.vue'
export { default as CallDailyPart } from '../../aliya1/nodes/CallDailyPart.vue'
export { default as CallFlowchart } from '../../aliya1/nodes/CallFlowchart.vue'
export { default as ChangeBGMusic } from '../../aliya1/nodes/ChangeBGMusic.vue'
export { default as ChangeRadioMusic } from '../../aliya1/nodes/ChangeRadioMusic.vue'
export { default as ClampO2Res } from '../../aliya1/nodes/ClampO2Res.vue'
export { default as ClampWaterRes } from '../../aliya1/nodes/ClampWaterRes.vue'
export { default as ConfigSpecialEnd } from '../../aliya1/nodes/ConfigSpecialEnd.vue'
export { default as DefaultChoice } from '../../aliya1/nodes/DefaultChoice.vue'
export { default as DefineVariable } from '../../aliya1/nodes/DefineVariable.vue'
export { default as DisableRadioMusic } from '../../aliya1/nodes/DisableRadioMusic.vue'
export { default as Else } from '../../aliya1/nodes/Else.vue'
export { default as EnableRadioMusic } from '../../aliya1/nodes/EnableRadioMusic.vue'
export { default as EndIf } from '../../aliya1/nodes/EndIf.vue'
export { default as ExitDailyInsert } from '../../aliya1/nodes/ExitDailyInsert.vue'
export { default as FlowchartBlock } from '../../aliya1/nodes/FlowchartBlock.vue'
export { default as FlowchartStart } from '../../aliya1/nodes/FlowchartStart.vue'
export { default as FOF_Node } from '../../aliya1/nodes/FOF_Node.vue'
export { default as FOF_Node_Achievement } from '../../aliya1/nodes/FOF_Node_Achievement.vue'
export { default as GetAchievement } from '../../aliya1/nodes/GetAchievement.vue'
export { default as GroupBlock } from '../../aliya1/nodes/GroupBlock.vue'
export { default as HighlightButton } from '../../aliya1/nodes/HighlightButton.vue'
export { default as If } from '../../aliya1/nodes/If.vue'
export { default as InvisibleChoice } from '../../aliya1/nodes/InvisibleChoice.vue'
export { default as MonoBehavior } from '../../aliya1/nodes/MonoBehavior.vue'
export { default as PlayerChoice } from '../../aliya1/nodes/PlayerChoice.vue'
export { default as PlayerInput } from '../../aliya1/nodes/PlayerInput.vue'
export { default as RestartGame } from '../../aliya1/nodes/RestartGame.vue'
export { default as SetEHValue } from '../../aliya1/nodes/SetEHValue.vue'
export { default as SetENGRes } from '../../aliya1/nodes/SetENGRes.vue'
export { default as SetHeartRate } from '../../aliya1/nodes/SetHeartRate.vue'
export { default as SetO2ConsumeFactor } from '../../aliya1/nodes/SetO2ConsumeFactor.vue'
export { default as SetRadioValue } from '../../aliya1/nodes/SetRadioValue.vue'
export { default as SetVariable } from '../../aliya1/nodes/SetVariable.vue'
export { default as Then } from '../../aliya1/nodes/Then.vue'
export { default as ToggleWarningAni } from '../../aliya1/nodes/ToggleWarningAni.vue'
export { default as WaitPreciseTime } from '../../aliya1/nodes/WaitPreciseTime.vue'
export { default as WaitTime } from '../../aliya1/nodes/WaitTime.vue'

// Aliya1 所有节点类型列表
export const ALIYA1_NODE_TYPES = [
  'ActivateEH',
  'ActivateEOG',
  'ActivateRadio',
  'AliyaMessage',
  'BanEHControl',
  'BanEOGControl',
  'BanRadioControl',
  'CallBlock',
  'CallDailyPart',
  'CallFlowchart',
  'ChangeBGMusic',
  'ChangeRadioMusic',
  'ClampO2Res',
  'ClampWaterRes',
  'ConfigSpecialEnd',
  'DefaultChoice',
  'DefineVariable',
  'DisableRadioMusic',
  'Else',
  'EnableRadioMusic',
  'EndIf',
  'ExitDailyInsert',
  'FlowchartBlock',
  'FlowchartStart',
  'FOF_Node',
  'FOF_Node_Achievement',
  'GetAchievement',
  'GroupBlock',
  'HighlightButton',
  'If',
  'InvisibleChoice',
  'MonoBehavior',
  'PlayerChoice',
  'PlayerInput',
  'RestartGame',
  'SetEHValue',
  'SetENGRes',
  'SetHeartRate',
  'SetO2ConsumeFactor',
  'SetRadioValue',
  'SetVariable',
  'Then',
  'ToggleWarningAni',
  'WaitPreciseTime',
  'WaitTime',
] as const

export type Aliya1NodeType = (typeof ALIYA1_NODE_TYPES)[number]
