import { Form } from "react-bootstrap";
import { MdEdit, MdCheck } from "react-icons/md";
import { useTrueFalse } from "../../util/useTrueFalse";
import { SimpleTableAction } from "../actions";

export function TableName({
  name,
  onNameChange,
}: {
  name: string;
  onNameChange: (x: string) => void;
}) {
  const [isEditing, setEditing, setNotEditing] = useTrueFalse();

  if (isEditing) {
    return (
      <div className="table-name">
        <Form.Control
          as="input"
          value={name}
          size="sm"
          onChange={(e) => onNameChange(e.target.value)}
        />
        <MdCheck onClick={setNotEditing} />
      </div>
    );
  } else {
    return (
      <div className="table-name">
        <div onFocus={setEditing}>{name}</div>
        <MdEdit onClick={setEditing} />
      </div>
    );
  }
}

export function tableNameReducer(state: string, action: SimpleTableAction) {
  return action.type === "setName" ? action.payload : state;
}
