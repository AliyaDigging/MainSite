export { default as AmbientMessage } from '../../aliya2_demo/nodes/AmbientMessage.vue'
export { default as Message } from '../../aliya2_demo/nodes/Message.vue'
export { default as PlayerChoice } from '../../aliya2_demo/nodes/PlayerChoice.vue'
export { default as DefaultChoice } from '../../aliya2_demo/nodes/DefaultChoice.vue'
export { default as WaitTime } from '../../aliya2_demo/nodes/WaitTime.vue'
export { default as WaitForCondition } from '../../aliya2_demo/nodes/WaitForCondition.vue'
export { default as ChangeBGM } from '../../aliya2_demo/nodes/ChangeBGM.vue'
export { default as RestartGame } from '../../aliya2_demo/nodes/RestartGame.vue'
export { default as PushNews } from '../../aliya2_demo/nodes/PushNews.vue'
export { default as PushDoc } from '../../aliya2_demo/nodes/PushDoc.vue'
export { default as StartConversation } from '../../aliya2_demo/nodes/StartConversation.vue'
export { default as WaitForever } from '../../aliya2_demo/nodes/WaitForever.vue'
export { default as PlayerInput } from '../../aliya2_demo/nodes/PlayerInput.vue'
export { default as ConditionCheck } from '../../aliya2_demo/nodes/ConditionCheck.vue'
export { default as CustomScript } from '../../aliya2_demo/nodes/CustomScript.vue'
export { default as OtherFlowchart } from '../../aliya2_demo/nodes/OtherFlowchart.vue'
export { default as DefaultNode } from '../../aliya2_demo/nodes/DefaultNode.vue'
export { default as FileRemoved } from '../../aliya2_demo/nodes/FileRemoved.vue'
export { default as FOF_Channel } from '../../aliya2_demo/nodes/FOF_Channel.vue'
export { default as FOF_Flowchart } from '../../aliya2_demo/nodes/FOF_Flowchart.vue'
export { default as FOF_JumpFrom } from '../../aliya2_demo/nodes/FOF_JumpFrom.vue'

export const ALIYA2_DEMO_NODE_TYPES = [
  'AmbientMessage',
  'Message',
  'PlayerChoice',
  'DefaultChoice',
  'WaitTime',
  'WaitForCondition',
  'ChangeBGM',
  'RestartGame',
  'PushNews',
  'PushDoc',
  'StartConversation',
  'WaitForever',
  'PlayerInput',
  'ConditionCheck',
  'CustomScript',
  'OtherFlowchart',
  'DefaultNode',
  'FileRemoved',
  'FOF_Channel',
  'FOF_Flowchart',
  'FOF_JumpFrom',
] as const

export type Aliya2DemoNodeType = (typeof ALIYA2_DEMO_NODE_TYPES)[number]
