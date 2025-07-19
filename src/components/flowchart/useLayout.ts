/** FROM https://vueflow.dev/examples/layout/simple.html */

import dagre from '@dagrejs/dagre'
import { Position, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import type { FlowchartDataEdge, FlowchartDataNode } from './types/script5_vueflow_prod'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 20
const HEIGHT_OFFSET = 10

function getElementSize(divDataId: string) {
  const ele = document.querySelector<HTMLDivElement>(`div[data-id="${divDataId}"]`)

  if (ele) {
    return {
      width: ele.clientWidth,
      height: ele.clientHeight + HEIGHT_OFFSET,
    }
  } else {
    return {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT + HEIGHT_OFFSET,
    }
  }
}

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
export function useLayout() {
  const { findNode } = useVueFlow()

  const graph = ref(new dagre.graphlib.Graph())

  const previousDirection = ref('LR')

  function layout(
    nodes: FlowchartDataNode[],
    edges: FlowchartDataEdge[],
    direction: 'LR' | 'TB',
    useElementSize: boolean = false,
  ) {
    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    const dagreGraph = new dagre.graphlib.Graph()

    graph.value = dagreGraph

    dagreGraph.setDefaultEdgeLabel(() => ({}))

    const isHorizontal = direction === 'LR'
    dagreGraph.setGraph({ rankdir: direction })

    previousDirection.value = direction

    for (const node of nodes) {
      // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
      const graphNode = findNode(node.id)
      let size = {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT + HEIGHT_OFFSET,
      }

      // 使用实际的大小来辅助 re-positioning
      if (useElementSize) {
        size = getElementSize(node.id)
        // console.log(size)
      } else {
        if (graphNode) {
          size = {
            width: graphNode.dimensions.width,
            height: graphNode.dimensions.height,
          }
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

    dagre.layout(dagreGraph)

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

  return { graph, layout, previousDirection }
}
