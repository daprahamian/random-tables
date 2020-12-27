import { SimpleTableData } from "./dataTypes";
export function getSampleData(): SimpleTableData {
  return {
    type: "table",
    version: 1,
    dice: "d6",
    name: "Test Data",
    rows: [
      {
        min: 1,
        description: "Owlbear",
      },
      {
        min: 2,
        description: "Cheetah",
      },
      {
        min: 3,
        description: "Tyranosaurus Rex",
      },
      {
        min: 4,
        max: 6,
        description: "Bandits",
      },
    ],
  };
}
