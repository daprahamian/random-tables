import { useState } from "react";

export function useTrueFalse(): [boolean, () => void, () => void] {
  const [state, setState] = useState(false);
  return [state, () => setState(true), () => setState(false)];
}
