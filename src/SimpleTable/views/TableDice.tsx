import Form from "react-bootstrap/Form";
import Group from "react-bootstrap/FormGroup";
import Control from "react-bootstrap/FormControl";
import Label from "react-bootstrap/FormLabel";
import { DiceType, DICE_VALUES } from "../../Dice";
import { SimpleTableAction } from "../actions";
import "./TableDice.scss";

export interface TableDiceProps {
  dice: DiceType;
  onDiceChange(dice: DiceType): void;
}

export function TableDice({ dice, onDiceChange }: TableDiceProps) {
  return (
    <Form inline className="table-dice">
      <Group>
        <Label className="table-dice__label">Dice Type</Label>
        <Control
          as="select"
          value={dice}
          onChange={(e) => onDiceChange(e.target.value as DiceType)}
        >
          {DICE_VALUES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </Control>
      </Group>
    </Form>
  );
}

export function tableDiceReducer(state: DiceType, action: SimpleTableAction) {
  return action.type === "setDice" ? action.payload : state;
}
