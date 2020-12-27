import Form from "react-bootstrap/Form";
import Group from "react-bootstrap/FormGroup";
import Label from "react-bootstrap/FormLabel";
import Control from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { MdEdit, MdCheck } from "react-icons/md";
import { useTrueFalse } from "../../util/useTrueFalse";
import { SimpleTableAction } from "../actions";

import "./TableName.scss";

export interface TableNameProps {
  name: string;
  onNameChange(name: string): void;
}

export function TableName({ name, onNameChange }: TableNameProps) {
  const [isEditing, setEditing, setNotEditing] = useTrueFalse();
  const content = isEditing ? (
    <>
      <Control
        as="input"
        className="table-name__name"
        value={name}
        size="sm"
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Button size="sm" onClick={setNotEditing}>
        <MdCheck />
      </Button>
    </>
  ) : (
    <>
      <div className="table-name__name">{name}</div>
      <Button size="sm" onClick={setEditing}>
        <MdEdit />
      </Button>
    </>
  );

  return (
    <Form className="table-name" inline>
      <Group>
        <Label className="table-name__label">Table Name: </Label>
        {content}
      </Group>
    </Form>
  );
}

export function tableNameReducer(state: string, action: SimpleTableAction) {
  return action.type === "setName" ? action.payload : state;
}
