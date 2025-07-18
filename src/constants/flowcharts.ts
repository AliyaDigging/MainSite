export type FlowchartOption = {
  genericName: string
  localizedNameKey: string
  type:
    | 'main' // 主线（偏指一周目的一结局）
    | 'main_other' // 主线（偏指二周目、其它结局）
    | 'daily' // 日常线（结局五）
  value: string
}

export const flowchartOptions: FlowchartOption[] = [
  {
    genericName: '1-1',
    localizedNameKey: 'select.flowchart.1-1',
    type: 'main',
    value: '1-1',
  },
  {
    genericName: '1-2',
    localizedNameKey: 'select.flowchart.1-2',
    type: 'main',
    value: '1-2',
  },
]
