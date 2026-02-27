export { default as ChoiceText } from '../../ycytx_5/nodes/ChoiceText.vue'
export { default as GameBe } from '../../ycytx_5/nodes/GameBe.vue'
export { default as GameHe } from '../../ycytx_5/nodes/GameHe.vue'
export { default as GameEnd } from '../../ycytx_5/nodes/GameEnd.vue'
export { default as MikoPhoto } from '../../ycytx_5/nodes/MikoPhoto.vue'
export { default as MikoText } from '../../ycytx_5/nodes/MikoText.vue'
export { default as SystemStatusTips } from '../../ycytx_5/nodes/SystemStatusTips.vue'
export { default as SystemTimeline } from '../../ycytx_5/nodes/SystemTimeline.vue'
export { default as VFJumpBe } from '../../ycytx_5/nodes/VFJumpBe.vue'
export { default as VFJumpNext } from '../../ycytx_5/nodes/VFJumpNext.vue'
export { default as VFJumpPrev } from '../../ycytx_5/nodes/VFJumpPrev.vue'

// DLC 所有节点类型列表
export const YCYTX_5_NODE_TYPES = [
  'GameBe',
  'GameHe',
  'GameEnd',
  'MikoPhoto',
  'MikoText',
  'SystemStatusTips',
  'SystemTimeline',
  'ChoiceText',
  'VF_JumpBe',
  'VF_JumpNext',
  'VF_JumpPrev',
] as const

export type Ycytz5NodeType = (typeof YCYTX_5_NODE_TYPES)[number]
