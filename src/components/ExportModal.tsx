import { useState, useMemo, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import clipboardCopy from "clipboard-copy";
import fileDownload from "js-file-download";
import { messageSuccess, messageFailure } from "../util/userMessage";

export interface ExportModalProps {
  show: boolean;
  data: object;
  suggestedName?: string;
  onClose: () => void;
}

export function ExportModal({
  show,
  data,
  suggestedName,
  onClose,
}: ExportModalProps) {
  const [disabled, setDisabled] = useState(false);
  const stringData = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const handleCopy = useCallback(() => {
    (async () => {
      setDisabled(true);
      try {
        await clipboardCopy(stringData);
        messageSuccess("Successfully copied to clipboard");
      } catch (e) {
        messageFailure("Something went wrong");
      }
      setDisabled(false);
    })().catch(() => {});
  }, [stringData]);

  const handleSave = useCallback(() => {
    setDisabled(true);
    const filename = suggestedName || "file";
    fileDownload(stringData, `${filename}.json`);
    setDisabled(false);
  }, [stringData, suggestedName]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>Export a Table</Modal.Header>
      <Modal.Body>
        <pre>{stringData}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={disabled}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCopy} disabled={disabled}>
          Copy to Clipboard
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={disabled}>
          Download JSON File
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
