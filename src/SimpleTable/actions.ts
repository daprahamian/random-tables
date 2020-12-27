import { DiceType } from "../Dice";
import { SimpleTableData } from "./dataTypes";

export interface SimpleTableActionSet {
  type: "set";
  payload: SimpleTableData;
}

export interface SimpleTableActionSetName {
  type: "setName";
  payload: string;
}

export interface SimpleTableActionSetDice {
  type: "setDice";
  payload: DiceType;
}

export interface SimpleTableActionSetRowRange {
  type: "setRowRange";
  index: number;
  min: number;
  max?: number;
}

export interface SimpleTableActionSetRowDescription {
  type: "setRowDescription";
  index: number;
  description: string;
}

export interface SimpleTableActionAddRow {
  type: "addRow";
}

export interface SimpleTableActionDeleteRow {
  type: "deleteRow";
  index: number;
}

export type SimpleTableAction =
  | SimpleTableActionSet
  | SimpleTableActionSetName
  | SimpleTableActionSetDice
  | SimpleTableActionSetRowRange
  | SimpleTableActionSetRowDescription
  | SimpleTableActionAddRow
  | SimpleTableActionDeleteRow;

export const builders = {
  set(payload: SimpleTableData): SimpleTableActionSet {
    return { type: "set", payload };
  },
  setName(payload: string): SimpleTableActionSetName {
    return { type: "setName", payload };
  },
  setDice(payload: DiceType): SimpleTableActionSetDice {
    return { type: "setDice", payload };
  },
  setRowRange(
    index: number,
    min: number,
    max: number | undefined
  ): SimpleTableActionSetRowRange {
    return { type: "setRowRange", index, min, max };
  },
  setRowDescription(
    index: number,
    description: string
  ): SimpleTableActionSetRowDescription {
    return { type: "setRowDescription", index, description };
  },
  addRow(): SimpleTableActionAddRow {
    return { type: "addRow" };
  },
  deleteRow(index: number): SimpleTableActionDeleteRow {
    return { type: "deleteRow", index };
  },
};

export type SimpleTableDispatch = (action: SimpleTableAction) => void;
