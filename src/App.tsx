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
      alert(e.message);
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
          Load Test Data
        </Button>
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

export default App;
