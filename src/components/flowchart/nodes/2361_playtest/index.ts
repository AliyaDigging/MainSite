export { default as If } from '../../2361_playtest/nodes/if.vue'
export { default as Elseif } from '../../2361_playtest/nodes/elseif.vue'
export { default as Else } from '../../2361_playtest/nodes/else.vue'
export { default as Endif } from '../../2361_playtest/nodes/endif.vue'
export { default as Wait } from '../../2361_playtest/nodes/wait.vue'
export { default as Nowait } from '../../2361_playtest/nodes/nowait.vue'
export { default as Set } from '../../2361_playtest/nodes/set.vue'
export { default as Jump } from '../../2361_playtest/nodes/jump.vue'
export { default as Selection } from '../../2361_playtest/nodes/selection.vue'
export { default as Defaultselection } from '../../2361_playtest/nodes/defaultselection.vue'
export { default as Se } from '../../2361_playtest/nodes/se.vue'
export { default as Sys } from '../../2361_playtest/nodes/sys.vue'
export { default as Bgm } from '../../2361_playtest/nodes/bgm.vue'
export { default as Shin } from '../../2361_playtest/nodes/shin.vue'
export { default as Externalcall } from '../../2361_playtest/nodes/externalcall.vue'
export { default as Add } from '../../2361_playtest/nodes/add.vue'
export { default as Insertresume } from '../../2361_playtest/nodes/insertresume.vue'
export { default as Toggle } from '../../2361_playtest/nodes/toggle.vue'
export { default as Installapp } from '../../2361_playtest/nodes/installapp.vue'
export { default as Waitany } from '../../2361_playtest/nodes/waitany.vue'
export { default as Waitcase } from '../../2361_playtest/nodes/waitcase.vue'
export { default as Waitend } from '../../2361_playtest/nodes/waitend.vue'
export { default as Bg } from '../../2361_playtest/nodes/bg.vue'
export { default as Waituntil } from '../../2361_playtest/nodes/waituntil.vue'
export { default as Shot } from '../../2361_playtest/nodes/shot.vue'
export { default as Watchstart } from '../../2361_playtest/nodes/watchstart.vue'
export { default as Watchstop } from '../../2361_playtest/nodes/watchstop.vue'
export { default as Watchpendingstart } from '../../2361_playtest/nodes/watchpendingstart.vue'
export { default as Watchpendingend } from '../../2361_playtest/nodes/watchpendingend.vue'
export { default as Recall } from '../../2361_playtest/nodes/recall.vue'
export { default as End } from '../../2361_playtest/nodes/end.vue'
export { default as Checkpoint } from '../../2361_playtest/nodes/checkpoint.vue'
export { default as Img } from '../../2361_playtest/nodes/img.vue'
export { default as Musicapp } from '../../2361_playtest/nodes/musicapp.vue'
export { default as Showdialogue } from '../../2361_playtest/nodes/showdialogue.vue'
export { default as Hidedialogue } from '../../2361_playtest/nodes/hidedialogue.vue'
export { default as Monitor } from '../../2361_playtest/nodes/monitor.vue'
export { default as Album } from '../../2361_playtest/nodes/album.vue'
export { default as Radarpuzzle } from '../../2361_playtest/nodes/radarpuzzle.vue'
export { default as OtherBlock } from '../../2361_playtest/nodes/otherblock.vue'
export { default as Chat } from '../../2361_playtest/nodes/chat.vue'

export const PLAYTEST_NODE_TYPES = [
  'if',
  'elseif',
  'else',
  'endif',
  'wait',
  'nowait',
  'set',
  'jump',
  'selection',
  'defaultselection',
  'se',
  'sys',
  'bgm',
  'shin',
  'externalcall',
  'add',
  'insertresume',
  'toggle',
  'installapp',
  'waitany',
  'waitcase',
  'waitend',
  'bg',
  'waituntil',
  'shot',
  'watchstart',
  'watchstop',
  'watchpendingstart',
  'watchpendingend',
  'recall',
  'end',
  'checkpoint',
  'img',
  'musicapp',
  'showdialogue',
  'hidedialogue',
  'monitor',
  'album',
  'radarpuzzle',
  'chat',
  'otherblock',
] as const

export type PlaytestNodeType = (typeof PLAYTEST_NODE_TYPES)[number]
