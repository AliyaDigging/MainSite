import type {
  FlowchartDataEdge,
  FlowchartNode_FOF_Channel,
  FlowchartNode_FOF_Flowchart,
} from './script3'

/** OUTPUT TO: `data/flowcharts/vueflow/flowchart_of_flowcharts.json` */
export type FlowchartData_FOF = {
  data: {
    nodes: (FlowchartNode_FOF_Channel | FlowchartNode_FOF_Flowchart)[]
    edges: FlowchartDataEdge[]
  }
}
