export { default as Message } from '../../tysy_demo/nodes/Message.vue'
export { default as OpenOption } from '../../tysy_demo/nodes/OpenOption.vue'
export { default as OpenOption_Default } from '../../tysy_demo/nodes/OpenOptionDefault.vue'
export { default as Waiting } from '../../tysy_demo/nodes/Waiting.vue'
export { default as System } from '../../tysy_demo/nodes/System.vue'
export { default as Check } from '../../tysy_demo/nodes/Check.vue'
export { default as SwitchFile } from '../../tysy_demo/nodes/SwitchFile.vue'
export { default as ShowPoint } from '../../tysy_demo/nodes/ShowPoint.vue'
export { default as Set804Position } from '../../tysy_demo/nodes/Set804Position.vue'
export { default as Photo } from '../../tysy_demo/nodes/Photo.vue'
export { default as Empty } from '../../tysy_demo/nodes/Empty.vue'
export { default as DefaultNode } from '../../tysy_demo/nodes/DefaultNode.vue'
export { default as WeatherEffect } from '../../tysy_demo/nodes/WeatherEffect.vue'

export const TYSY_DEMO_NODE_TYPES = [
  'Message',
  'OpenOption',
  'OpenOption_Default',
  'Waiting',
  'System',
  'Check',
  'SwitchFile',
  'ShowPoint',
  'Set804Position',
  'Photo',
  'Empty',
  'DefaultNode',
  'WeatherEffect',
] as const

export type TysyDemoNodeType = (typeof TYSY_DEMO_NODE_TYPES)[number]
