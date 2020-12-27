import { SimpleTableData } from "./dataTypes";
export function getSampleData(): SimpleTableData {
  return {
    type: "table",
    version: 1,
    dice: "d20",
    name: "Test Data",
    rows: [
      {
        min: 1,
        description: "This is a thing",
      },
      {
        min: 2,
        max: 6,
        description: "This is a second thing",
      },
    ],
  };
}
