// VUE FLOW 特化版本
export type FlowchartNode = {
  id: string;
  position: { x: number; y: number };
  type: "FOF_Node" | "FOF_Node_Achievement"; // Flowchart of Flowcharts, Node
  data: {
    label: string;
  };
};

export type FlowchartEdge = {
  id: string;
  type: "default";
  source: string;
  target: string;
  markerEnd: "arrowclosed" | "arrow";
  animated: boolean; // 仅 O2RunOut 等需要用
  label?: string;
  style?: { stroke: "red" | "green" };
  labelBgStyle?: { fill: "red" | "green" };
};

export type FlowchartOfFlowchartData = {
  data: { nodes: FlowchartNode[]; edges: FlowchartEdge[] };
};
