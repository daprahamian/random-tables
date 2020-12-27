import { DICE_MAP } from "../Dice";
import { SimpleTableData } from "./dataTypes";

export function validateModel(model: SimpleTableData) {
  const maxValue = DICE_MAP[model.dice];
  if (typeof maxValue !== "number") {
    raiseModelError(`Invalid dice "${model.dice}"`);
  }

  const unusedSet = new Set(
    Array.from({ length: maxValue }).map((_, i) => i + 1)
  );
  const usedMap = new Map<number, string>();

  for (const row of model.rows) {
    const min = row.min;
    const max = row.max ?? row.min;
    const rangeStr = `${min}-${max}`;

    if (min <= 0 || min > max || max > maxValue) {
      raiseModelError(`Range "${rangeStr}" is out of bounds`);
    }

    for (let i = min; i <= max; i += 1) {
      if (usedMap.has(i)) {
        raiseModelError(
          `Range "${rangeStr}" overlaps with "${usedMap.get(i)}"`
        );
      }
      unusedSet.delete(i);
      usedMap.set(i, rangeStr);
    }
  }

  if (unusedSet.size > 0) {
    raiseModelError(
      `Table has uncovered values ${Array.from(unusedSet).join()}`
    );
  }
}

function raiseModelError(message: string) {
  throw new Error(message);
}
