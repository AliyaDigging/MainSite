/** 变量赋值操作: Variable["name"] = value
 *
 * 已知的值类型：
 * - boolean: true / false
 * - string: "double-quoted"
 * - number: 整数
 */
export type Artisy_VariableOp_Assign = {
  variableName: string;
  valueAssigned: boolean | string | number;
};

/** 变量比较条件
 *
 * 已知的模式（均针对 boolean 变量）：
 * - Variable["x"]           → compareOp="eq", valueAgainst=true
 * - Variable["x"] == true   → compareOp="eq", valueAgainst=true
 * - not Variable["x"]       → compareOp="eq", valueAgainst=false
 * - (Variable["x"]) == false → compareOp="eq", valueAgainst=false
 * - (Variable["x"] == true) == false → compareOp="eq", valueAgainst=false
 *
 * compareOp 保留完整枚举以支持未来可能出现的 > < >= <= 比较
 */
export type Artisy_VariableOp_Compare = {
  variableName: string;
  compareOp: "eq" | "gt" | "lt" | "ge" | "le" | "ne";
  valueAgainst: boolean | string | number | { variableName: string };
};

/** 一次解析结果：从一个节点中提取的所有变量操作 */
export type Artisy_VariableOps = {
  assignments: Artisy_VariableOp_Assign[];
  condition: Artisy_VariableOp_Compare | null;
};
