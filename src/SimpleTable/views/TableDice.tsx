import { Form } from "react-bootstrap";
import { DiceType, DICE_VALUES } from "../../Dice";
import { SimpleTableAction } from "../actions";

export function TableDice({
  dice,
  onDiceChange,
}: {
  dice: DiceType;
  onDiceChange: (x: DiceType) => void;
}) {
  return (
    <Form.Group>
      <Form.Label>Dice Type</Form.Label>
      <Form.Control
        as="select"
        value={dice}
        onChange={(e) => onDiceChange(e.target.value as DiceType)}
      >
        {DICE_VALUES.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export function tableDiceReducer(state: DiceType, action: SimpleTableAction) {
  return action.type === "setDice" ? action.payload : state;
}
