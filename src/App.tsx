import "./App.scss";
import Button from "react-bootstrap/Button";
import {
  builders,
  fromJSON,
  getSampleData,
  SimpleTable,
  SimpleTableData,
  useSimpleTableReducer,
} from "./SimpleTable";
import { ImportModal } from "./components/ImportModal";
import { ExportModal } from "./components/ExportModal";
import { useTrueFalse } from "./util/useTrueFalse";
import { messageFailure, messageSuccess } from "./util/userMessage";
import { validateModel } from "./SimpleTable/validateModel";
import { roll } from "./Dice";

function App() {
  const [tableData, dispatchTableData] = useSimpleTableReducer(getEmptyTable);
  const [showImportModal, openImportModal, closeImportModal] = useTrueFalse();
  const [showExportModal, openExportModal, closeExportModal] = useTrueFalse();

  const handleImportRows = (json: string) => {
    closeImportModal();
    try {
      const newTableData = fromJSON(json);
      dispatchTableData(builders.set(newTableData));
    } catch (e) {
      messageFailure(e.message);
    }
  };

  const handleValidateModel = () => {
    try {
      validateModel(tableData);
      messageSuccess("Table model is valid");
    } catch (e) {
      messageFailure(`Validation Failure: ${e.message}`);
    }
  };

  const handleRollTable = () => {
    try {
      validateModel(tableData);
      const rollResult = rollTable(tableData);
      messageSuccess(
        `Your roll was ${rollResult.rollValue}\n\n${rollResult.description}`
      );
    } catch (e) {
      messageFailure(`Validation Failure: ${e.message}`);
    }
  };

  return (
    <div className="app">
      <h1>Table Roller!</h1>
      <div className="action-bar">
        <Button onClick={openImportModal}>Import Table</Button>
        <Button onClick={openExportModal}>Export Table</Button>
        <Button
          onClick={() => dispatchTableData(builders.set(getSampleData()))}
        >
          Load Sample Data
        </Button>
        <Button onClick={handleValidateModel}>Validate Model</Button>
        <Button onClick={handleRollTable}>Roll!</Button>
      </div>
      <SimpleTable data={tableData} dispatch={dispatchTableData} />
      <ImportModal
        show={showImportModal}
        onSubmit={handleImportRows}
        onCancel={closeImportModal}
      />
      <ExportModal
        show={showExportModal}
        data={tableData}
        suggestedName={tableData.name}
        onClose={closeExportModal}
      />
    </div>
  );
}

function getEmptyTable(): SimpleTableData {
  return {
    type: "table",
    version: 1,
    name: "New Table",
    dice: "d20",
    rows: [],
  };
}

function rollTable(tableData: SimpleTableData) {
  const rollValue = roll(tableData.dice);

  for (const { min, max, description } of tableData.rows) {
    const _max = max == null ? min : max;
    if (rollValue >= min && rollValue <= _max) {
      return { rollValue, description };
    }
  }
  throw new Error("How did you get here?");
}

export default App;
