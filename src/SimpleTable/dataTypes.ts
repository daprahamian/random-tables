import { DiceType } from "../Dice";

export interface SimpleTableRowData {
  min: number;
  max?: number;
  description: string;
}

export interface SimpleTableData {
  type: "table";
  version: number;
  name: string;
  dice: DiceType;
  rows: SimpleTableRowData[];
}
