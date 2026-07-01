/**
 * 流程图布局 Composable
 * 使用 dagre 库计算节点和边的布局
 *
 * FROM https://vueflow.dev/examples/layout/simple.html
 */

import dagre from '@dagrejs/dagre'
import { Position, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'

const DEFAULT_WIDTH = 220
const DEFAULT_HEIGHT = 50

type NodeSize = {
  width: number
  height: number
}

type LayoutOptions<T> = {
  measureDom?: boolean
  getNodeSize?: (node: T) => NodeSize | undefined
}

function getElementSize(divDataId: string) {
  const ele = document.querySelector<HTMLElement>(`div[data-id="${divDataId}"]`)

  if (ele) {
    const width = ele.offsetWidth || ele.scrollWidth
    const height = ele.offsetHeight || ele.scrollHeight
    if (width > 0 && height > 0) {
      return { width, height }
    }

    const rect = ele.getBoundingClientRect()
    return {
      width: rect.width,
      height: rect.height,
    }
  }

  return {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  }
}

function estimateNodeSize(node: { data?: Record<string, unknown>; type?: string }): NodeSize {
  const dataText = collectTextLength(node.data)
  const lineCount = Math.max(1, Math.ceil(dataText / 34))
  const mediaHeight = hasMediaLikeField(node.data) ? 120 : 0
  const typeExtraHeight =
    node.type && /Message|Choice|If|Condition|Script|Flowchart/i.test(node.type) ? 24 : 0

  return {
    width: DEFAULT_WIDTH,
    height: Math.max(DEFAULT_HEIGHT, 42 + lineCount * 16 + mediaHeight + typeExtraHeight),
  }
}

function collectTextLength(value: unknown): number {
  if (value == null) return 0
  if (typeof value === 'string') return value.length
  if (typeof value === 'number' || typeof value === 'boolean') return String(value).length
  if (Array.isArray(value)) return value.reduce((total, item) => total + collectTextLength(item), 0)
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).reduce<number>(
      (total: number, item) => total + collectTextLength(item),
      0,
    )
  }
  return 0
}

function hasMediaLikeField(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false

  return Object.entries(value as Record<string, unknown>).some(([key, entry]) => {
    const keyLower = key.toLowerCase()
    if (
      keyLower.includes('image') ||
      keyLower.includes('img') ||
      keyLower.includes('photo') ||
      keyLower.includes('audio') ||
      keyLower.includes('bgm')
    ) {
      return entry != null && entry !== ''
    }

    if (Array.isArray(entry)) return entry.some((item) => hasMediaLikeField(item))
    if (entry && typeof entry === 'object') return hasMediaLikeField(entry)

    return false
  })
}

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
export function useFlowchartLayout() {
  const { findNode } = useVueFlow()

  const graph = ref(new dagre.graphlib.Graph())

  function layout<
    T extends { id: string; data?: Record<string, unknown>; type?: string },
    U extends { source: string; target: string },
  >(nodes: T[], edges: U[], direction: 'LR' | 'TB', options: LayoutOptions<T> = {}) {
    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    const dagreGraph = new dagre.graphlib.Graph()

    graph.value = dagreGraph

    dagreGraph.setDefaultEdgeLabel(() => ({}))

    const isHorizontal = direction === 'LR'
    dagreGraph.setGraph({ rankdir: direction })

    // add node and edge
    for (const node of nodes) {
      // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
      const graphNode = findNode(node.id)
      let size = options.getNodeSize?.(node) ?? estimateNodeSize(node)

      if (graphNode) {
        size = {
          width: graphNode.dimensions.width || size.width,
          height: graphNode.dimensions.height || size.height,
        }
      }

      dagreGraph.setNode(node.id, {
        width: size.width,
        height: size.height,
      })
    }
    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target)
    }

    // calculate layout
    dagre.layout(dagreGraph)

    // co-authored w/ Grok 3
    // 重新 layout
    // 首先，测量其实际高度
    const nodeHeights: Record<string, number> = {}
    nodes.forEach((node) => {
      nodeHeights[node.id] = options.measureDom
        ? getElementSize(node.id).height
        : (options.getNodeSize?.(node) ?? estimateNodeSize(node)).height
    })

    // 基于 rank (layer) 将 node 组织在一起
    const layers: Record<number, string[]> = {}
    dagreGraph.nodes().forEach((nodeId) => {
      const node = dagreGraph.node(nodeId)
      const rank = node.rank!
      if (!layers[rank]) {
        layers[rank] = []
      }
      layers[rank].push(nodeId)
    })

    // 调整 y 坐标
    let currentY = 0
    Object.keys(layers)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((rank) => {
        const layer = layers[Number(rank)]
        let maxHeight = 0

        // find the element whose height number is the biggest
        layer.forEach((nodeId) => {
          maxHeight = Math.max(maxHeight, nodeHeights[nodeId])
        })

        // update all the elements' y position in this layer
        layer.forEach((nodeId) => {
          const node = dagreGraph.node(nodeId)
          node.y = currentY + nodeHeights[nodeId] / 2
        })

        // move onto the next layer
        currentY += maxHeight * 1.5
      })

    // set nodes with updated positions
    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)

      return {
        ...node,
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      }
    })
  }

  return { graph, layout }
}

// 向后兼容别名
export const useLayout = useFlowchartLayout
