import { SimpleTableData } from "./dataTypes";

export function fromJSON(json: string): SimpleTableData {
  const parsed = JSON.parse(json);
  if (typeof parsed !== "object" || parsed == null) {
    throw new Error("Input is not an object");
  }
  if (parsed.type !== "table") {
    throw new Error("Input is not a table");
  }
  if (parsed.version !== 1) {
    throw new Error(`Cannot handle version type ${parsed.version}`);
  }
  if (!Array.isArray(parsed.rows)) {
    throw new Error("Missing list of rows");
  }
  for (let i = 0; i < parsed.rows.length; i += 1) {
    const row = parsed.rows[i];
    if (typeof row.min !== "number") {
      throw new Error(`row[${i}] is missing valid property "min"`);
    }
    if (typeof row.description !== "string" || row.description.length === 0) {
      throw new Error(`row[${i}] is missing valid property "description"`);
    }
  }
  return parsed;
}
