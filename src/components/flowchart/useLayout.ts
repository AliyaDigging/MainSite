/** FROM https://vueflow.dev/examples/layout/simple.html */

import dagre from '@dagrejs/dagre'
import { Position, useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import type { FlowchartDataEdge, FlowchartDataNode } from './types/script5_vueflow_prod'

const DEFAULT_WIDTH = 220
const DEFAULT_HEIGHT = 50
const HEIGHT_OFFSET = 40

function getElementSize(divDataId: string) {
  const ele = document.querySelector<HTMLDivElement>(`div[data-id="${divDataId}"]`)

  let result
  if (ele) {
    const rect = ele.getBoundingClientRect()
    result = {
      width: rect.width,
      height: rect.height,
    }
  } else {
    result = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    }
  }

  //console.log(`${divDataId}, ${JSON.stringify(result)}`)
  return result
}

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
export function useLayout() {
  const { findNode } = useVueFlow()

  const graph = ref(new dagre.graphlib.Graph())

  function layout(nodes: FlowchartDataNode[], edges: FlowchartDataEdge[], direction: 'LR' | 'TB') {
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
      let size = {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      }

      if (graphNode) {
        size = {
          width: graphNode.dimensions.width,
          height: graphNode.dimensions.height,
        }
      }

      //console.log(`${node.id}, ${JSON.stringify(size)}`)

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
    nodes.forEach((node) => (nodeHeights[node.id] = getElementSize(node.id).height))

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
    // console.log(layers)

    // 调整 y 坐标
    let currentY = 0
    Object.keys(layers)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((rank) => {
        //console.log(rank)
        const layer = layers[Number(rank)]
        let maxHeight = 0

        // find the element whose height number is the biggest
        layer.forEach((nodeId) => {
          maxHeight = Math.max(maxHeight, nodeHeights[nodeId])
        })
        //console.log(maxHeight)

        // update all the elements' y position in this layer
        layer.forEach((nodeId) => {
          const node = dagreGraph.node(nodeId)
          node.y = currentY + nodeHeights[nodeId] / 2
          //console.log(`${nodeId}, ${node.y}`)
        })

        // move onto the next layer
        currentY += maxHeight * 1.5
        //console.log(currentY)
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
