import { useReducer } from "react";
import { SimpleTableData } from "./dataTypes";
import { SimpleTableAction } from "./actions";
import { tableDiceReducer } from "./views/TableDice";
import { tableNameReducer } from "./views/TableName";
import { tableRowsReducer } from "./views/TableRow";

export function simpleTableReducer(
  state: SimpleTableData,
  action: SimpleTableAction
): SimpleTableData {
  if (action.type === "set") {
    return action.payload;
  }
  return {
    type: state.type,
    version: state.version,
    dice: tableDiceReducer(state.dice, action),
    name: tableNameReducer(state.name, action),
    rows: tableRowsReducer(state.rows, action),
  };
}

export function useSimpleTableReducer(initialState: () => SimpleTableData) {
  return useReducer(simpleTableReducer, {}, initialState);
}
