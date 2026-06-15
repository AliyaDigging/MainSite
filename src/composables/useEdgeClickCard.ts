import { ref, computed } from 'vue'
import type { EdgeMouseEvent } from '@vue-flow/core'

/**
 * 管理 Edge 点击事件的响应式状态
 * 供 flowchart viewer 组件使用，避免状态分散在各 viewer 中
 */
export function useEdgeClickCard() {
  const edge = ref<{ source: string; target: string } | null>(null)
  const position = ref<{ x: number; y: number }>({ x: 0, y: 0 })

  const visible = computed(() => edge.value !== null)

  function handleEdgeClick(event: EdgeMouseEvent) {
    const mouseEvent = event.event as MouseEvent
    edge.value = {
      source: event.edge.source,
      target: event.edge.target,
    }
    position.value = {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
    }
  }

  function close() {
    edge.value = null
  }

  return { edge, position, visible, handleEdgeClick, close }
}
