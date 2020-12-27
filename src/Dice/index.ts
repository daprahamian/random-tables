export const DICE_VALUES = [
  "d4",
  "d6",
  "d8",
  "d10",
  "d12",
  "d20",
  "d100",
] as const;
export const DICE_SET = new Set(DICE_VALUES);
export type DiceType = typeof DICE_VALUES[Exclude<
  keyof typeof DICE_VALUES,
  keyof []
>];

export const DICE_MAP: Record<DiceType, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
};

export function roll(dice: DiceType): number {
  const max = DICE_MAP[dice] as number;
  return Math.ceil(Math.random() * max);
}
