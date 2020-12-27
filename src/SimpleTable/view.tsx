import Table from "react-bootstrap/Table";
import { SimpleTableData } from "./dataTypes";
import { builders, SimpleTableDispatch } from "./actions";
import "./index.scss";
import { TableName } from "./views/TableName";
import { TableDice } from "./views/TableDice";
import { TableRow } from "./views/TableRow";

export interface SimpleTableProps {
  data: SimpleTableData;
  dispatch: SimpleTableDispatch;
}

export function SimpleTable({ data, dispatch }: SimpleTableProps) {
  const { name, dice, rows } = data;
  return (
    <div className="simple-table">
      <TableName
        name={name}
        onNameChange={(newName) => dispatch(builders.setName(newName))}
      />
      <TableDice
        dice={dice}
        onDiceChange={(newDice) => dispatch(builders.setDice(newDice))}
      />
      <Table striped>
        <thead>
          <tr>
            <th className="roll-column">Roll</th>
            <th className="description-column">Result</th>
            <th className="trash-column"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((rowData, i) => (
            <TableRow key={i} index={i} data={rowData} dispatch={dispatch} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
