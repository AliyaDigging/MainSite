export type MergeInfo = {
  // originalFlowcharts 指示的是：原来总共有哪些流程图？它们都怎么样了？
  originalFlowcharts: Record<
    string, // flowchart id (essentially filename without extension); every flowchart before merge
    (
      | "not_changed" // still kept, and no other flowcharts are merged into it
      | "merged" // no longer exists, has been merged into others completely
      | "partially_merged" // part of the flowchart is being merged
      | "others_merged_into" // other flowcharts are merged into this
    )[] // a flowchart may possess the last 2 status at the same time
  >;

  // mergeStatus 指示的是：谁merge进我的流程图了？
  mergeStatus: Record<
    string, // flowchart id (essentially filename without extension); ONLY flowcharts AFTER merge
    string[] // flowcharts that got merged into the said flowchart
  >;

  // beingMergedStatus 指示的是：我被merge进哪些流程图了？
  beingMergedStatus: Record<
    string, // flowchart id (essentially filename without extension); every flowchart before merge
    string[] // 我被merge进哪些流程图了？
  >;
};
