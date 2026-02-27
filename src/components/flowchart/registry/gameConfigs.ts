/**
 * 游戏配置注册
 * 每个游戏的节点组件完全独立
 */

import { registerGameConfig } from './nodeRegistry'
import { ALIYA1_NODE_TYPES } from '../nodes/aliya1'
import { DLC_NODE_TYPES } from '../nodes/aliya1_android_dlc'
import { YCYTX_5_NODE_TYPES } from '../nodes/ycytx_5'

import * as Aliya1Nodes from '../nodes/aliya1'
import * as DLCNodes from '../nodes/aliya1_android_dlc'
import * as Ycytx5Nodes from '../nodes/ycytx_5'

/**
 * 注册 Aliya1 游戏配置
 */
registerGameConfig({
  gameId: 'aliya1',
  nodeComponents: {
    ActivateEH: Aliya1Nodes.ActivateEH,
    ActivateEOG: Aliya1Nodes.ActivateEOG,
    ActivateRadio: Aliya1Nodes.ActivateRadio,
    AliyaMessage: Aliya1Nodes.AliyaMessage,
    BanEHControl: Aliya1Nodes.BanEHControl,
    BanEOGControl: Aliya1Nodes.BanEOGControl,
    BanRadioControl: Aliya1Nodes.BanRadioControl,
    CallBlock: Aliya1Nodes.CallBlock,
    CallDailyPart: Aliya1Nodes.CallDailyPart,
    CallFlowchart: Aliya1Nodes.CallFlowchart,
    ChangeBGMusic: Aliya1Nodes.ChangeBGMusic,
    ChangeRadioMusic: Aliya1Nodes.ChangeRadioMusic,
    ClampO2Res: Aliya1Nodes.ClampO2Res,
    ClampWaterRes: Aliya1Nodes.ClampWaterRes,
    ConfigSpecialEnd: Aliya1Nodes.ConfigSpecialEnd,
    DefaultChoice: Aliya1Nodes.DefaultChoice,
    DefineVariable: Aliya1Nodes.DefineVariable,
    DisableRadioMusic: Aliya1Nodes.DisableRadioMusic,
    Else: Aliya1Nodes.Else,
    EnableRadioMusic: Aliya1Nodes.EnableRadioMusic,
    EndIf: Aliya1Nodes.EndIf,
    ExitDailyInsert: Aliya1Nodes.ExitDailyInsert,
    FlowchartBlock: Aliya1Nodes.FlowchartBlock,
    FlowchartStart: Aliya1Nodes.FlowchartStart,
    FOF_Node: Aliya1Nodes.FOF_Node,
    FOF_Node_Achievement: Aliya1Nodes.FOF_Node_Achievement,
    GetAchievement: Aliya1Nodes.GetAchievement,
    GroupBlock: Aliya1Nodes.GroupBlock,
    HighlightButton: Aliya1Nodes.HighlightButton,
    If: Aliya1Nodes.If,
    InvisibleChoice: Aliya1Nodes.InvisibleChoice,
    MonoBehavior: Aliya1Nodes.MonoBehavior,
    PlayerChoice: Aliya1Nodes.PlayerChoice,
    PlayerInput: Aliya1Nodes.PlayerInput,
    RestartGame: Aliya1Nodes.RestartGame,
    SetEHValue: Aliya1Nodes.SetEHValue,
    SetENGRes: Aliya1Nodes.SetENGRes,
    SetHeartRate: Aliya1Nodes.SetHeartRate,
    SetO2ConsumeFactor: Aliya1Nodes.SetO2ConsumeFactor,
    SetRadioValue: Aliya1Nodes.SetRadioValue,
    SetVariable: Aliya1Nodes.SetVariable,
    Then: Aliya1Nodes.Then,
    ToggleWarningAni: Aliya1Nodes.ToggleWarningAni,
    WaitPreciseTime: Aliya1Nodes.WaitPreciseTime,
    WaitTime: Aliya1Nodes.WaitTime,
  },
  nodeTypes: [...ALIYA1_NODE_TYPES],
  imageBasePath: '/aliya/aliya1/images/',
})

/**
 * 注册 Aliya1 Android DLC 游戏配置
 */
registerGameConfig({
  gameId: 'aliya1_android_dlc',
  nodeComponents: {
    AliyaMessage: DLCNodes.AliyaMessage,
    CallBlock: DLCNodes.CallBlock,
    CallFlowchart: DLCNodes.CallFlowchart,
    DefaultChoice: DLCNodes.DefaultChoice,
    DefineVariable: DLCNodes.DefineVariable,
    Else: DLCNodes.Else,
    EndIf: DLCNodes.EndIf,
    EndWaitTimeForCondition: DLCNodes.EndWaitTimeForCondition,
    FlowchartBlock: DLCNodes.FlowchartBlock,
    FlowchartStart: DLCNodes.FlowchartStart,
    FOF_Node: DLCNodes.FOF_Node,
    FOF_Node_Achievement: DLCNodes.FOF_Node_Achievement,
    GroupBlock: DLCNodes.GroupBlock,
    If: DLCNodes.If,
    InterruptChartAndCallCommand: DLCNodes.InterruptChartAndCallCommand,
    MonoBehavior: DLCNodes.MonoBehavior,
    PlayerChoice: DLCNodes.PlayerChoice,
    PlayerInputWithOutDeleteField: DLCNodes.PlayerInputWithOutDeleteField,
    SetVariable: DLCNodes.SetVariable,
    StartAnCharacterChart: DLCNodes.StartAnCharacterChart,
    TextFileCommand: DLCNodes.TextFileCommand,
    Then: DLCNodes.Then,
    WaitTime: DLCNodes.WaitTime,
    WaitTimeForCondition: DLCNodes.WaitTimeForCondition,
  },
  nodeTypes: [...DLC_NODE_TYPES],
  imageBasePath: '/aliya/aliya1_android_dlc/images/',
})

registerGameConfig({
  gameId: 'ycytx_5',
  nodeComponents: {
    ChoiceText: Ycytx5Nodes.ChoiceText,
    GameBe: Ycytx5Nodes.GameBe,
    GameEnd: Ycytx5Nodes.GameEnd,
    GameHe: Ycytx5Nodes.GameHe,
    MikoPhoto: Ycytx5Nodes.MikoPhoto,
    MikoText: Ycytx5Nodes.MikoText,
    SystemStatusTips: Ycytx5Nodes.SystemStatusTips,
    SystemTimeline: Ycytx5Nodes.SystemTimeline,
    VF_JumpBe: Ycytx5Nodes.VFJumpBe,
    VF_JumpPrev: Ycytx5Nodes.VFJumpPrev,
    VF_JumpNext: Ycytx5Nodes.VFJumpNext,
  },
  nodeTypes: [...YCYTX_5_NODE_TYPES],
  imageBasePath: '/aliya/ycytz_5/images/',
})
