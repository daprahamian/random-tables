import { useCallback } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { MdDelete, MdEdit, MdCheck } from "react-icons/md";
import { useTrueFalse } from "../../util/useTrueFalse";
import { SimpleTableAction, SimpleTableDispatch, builders } from "../actions";
import { SimpleTableRowData } from "../dataTypes";
import "./TableRow.scss";

export interface TableRowProps {
  index: number;
  data: SimpleTableRowData;
  dispatch: SimpleTableDispatch;
}

export function TableRow({ index, data, dispatch }: TableRowProps) {
  const { min, max, description } = data;

  const onChangeRange = useCallback(
    (min, max) => {
      dispatch(builders.setRowRange(index, min, max));
    },
    [index, dispatch]
  );
  const onChangeDescription = useCallback(
    (description) => {
      dispatch(builders.setRowDescription(index, description));
    },
    [index, dispatch]
  );
  return (
    <tr className="table-row">
      <td>
        <TableRowRange min={min} max={max} onChange={onChangeRange} />
      </td>
      <td>
        <TableRowDescription
          description={description}
          onChange={onChangeDescription}
        />
      </td>
      <td>
        <Button size="sm" onClick={() => dispatch(builders.deleteRow(index))}>
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
}

function TableRowRange({
  min,
  max,
  onChange,
}: {
  min: number;
  max?: number;
  onChange: (min: number, max?: number | undefined) => void;
}) {
  const [isEditing, setEditing, setNotEditing] = useTrueFalse();

  const handleMin = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Number.parseInt(ev.target.value, 10) || 0;
      onChange(newMin, max);
    },
    [max, onChange]
  );

  const handleMax = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Number.parseInt(ev.target.value, 10) || undefined;
      onChange(min, newMax);
    },
    [min, onChange]
  );

  if (isEditing) {
    return (
      <div className="table-row__range">
        <Form.Control
          as="input"
          size="sm"
          value={min || ""}
          onChange={handleMin}
        />
        <div>-</div>
        <Form.Control
          as="input"
          size="sm"
          value={max || ""}
          placeholder={`${min}`}
          onChange={handleMax}
        />
        <Button size="sm" onClick={setNotEditing}>
          <MdCheck />
        </Button>
      </div>
    );
  } else {
    const range =
      typeof max === "number"
        ? `${min.toString(10)}-${max.toString(10)}`
        : min.toString(10);
    return (
      <div className="table-row__range">
        <div>{range}</div>
        <Button size="sm" onClick={setEditing}>
          <MdEdit />
        </Button>
      </div>
    );
  }
}

function TableRowDescription({
  description,
  onChange,
}: {
  description: string;
  onChange: (s: string) => void;
}) {
  const [isEditing, setEditing, setNotEditing] = useTrueFalse();

  if (isEditing) {
    return (
      <div className="table-row__description">
        <Form.Control
          as="textarea"
          size="sm"
          value={description}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button size="sm" onClick={setNotEditing}>
          <MdCheck />
        </Button>
      </div>
    );
  } else {
    return (
      <div className="table-row__description">
        <div>{description}</div>
        <Button size="sm" onClick={setEditing}>
          <MdEdit />
        </Button>
      </div>
    );
  }
}

export function tableRowsReducer(
  state: SimpleTableRowData[],
  action: SimpleTableAction
) {
  switch (action.type) {
    case "setRowRange":
      return state.map((row, i) => {
        if (i !== action.index) {
          return row;
        }
        return { ...row, min: action.min, max: action.max };
      });
    case "setRowDescription":
      return state.map((row, i) => {
        if (i !== action.index) {
          return row;
        }
        return { ...row, description: action.description };
      });
    case "addRow":
      return [...state, { min: 0, description: "" }];
    case "deleteRow":
      return state.filter((row, i) => i !== action.index);
  }
  return state;
}
