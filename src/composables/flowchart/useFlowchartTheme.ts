/**
 * 流程图主题 Composable
 * 处理深色/浅色模式的样式计算
 */

import { computed, inject } from 'vue'
import { symbolUseDark } from '@/constants/injection'

/**
 * 流程图主题 composable
 * 提供深色/浅色模式下的节点样式计算
 */
export function useFlowchartTheme() {
  const isDark = inject(symbolUseDark)!

  const cssNodeBgColor = computed(() => (isDark.value ? '#1E1E1E' : '#FFFFFF'))
  const cssNodeTextColor = computed(() => (isDark.value ? 'white' : 'black'))

  return {
    isDark,
    cssNodeBgColor,
    cssNodeTextColor,
  }
}
