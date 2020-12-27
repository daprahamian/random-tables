import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdAdd } from "react-icons/md";
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
            <th className="simple-table__roll-column">Roll</th>
            <th className="simple-table__description-column">Result</th>
            <th className="simple-table__trash-column"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((rowData, i) => (
            <TableRow key={i} index={i} data={rowData} dispatch={dispatch} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="simple-table__add-button-container">
              <Button
                className="simple-table__add-button"
                onClick={() => dispatch(builders.addRow())}
              >
                <MdAdd />
              </Button>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
