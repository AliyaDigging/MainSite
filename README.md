# aliya_digging_site

## For Devs

- MANUALLY UPDATE the flowchart data from the parser.
  - PLEASE DO NOT use git submodules to do so since it's ugly and somehow makes vite to behave weird.

## Get Started

To start development or to try it yourself, run the commands below:

```bash
npm i
npm run dev
npm run dev_local # exposed on 0.0.0.0
```

## How to add new game data

修改内容

1. 删除了 nodes/shared/ 目录 - 不再有共享节点
2. nodes/aliya1/index.ts - 只从 aliya1/nodes/ 导出 45 个节点组件
3. nodes/aliya1_android_dlc/index.ts - 只从 aliya1_android_dlc/nodes/ 导出 24 个节点组件
4. registry/gameConfigs.ts - 每个游戏配置独立引用自己的节点组件

现在每个游戏的节点组件完全独立，添加新游戏时只需：

1. 在 nodes/<新游戏>/ 创建该游戏的节点组件
2. 在 nodes/<新游戏>/index.ts 导出节点
3. 在 registry/gameConfigs.ts 注册游戏配置
