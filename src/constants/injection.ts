import type { useDark } from '@vueuse/core'
import type { InjectionKey } from 'vue'

export const symbolUseDark = Symbol('useDark_global') as InjectionKey<ReturnType<typeof useDark>>
