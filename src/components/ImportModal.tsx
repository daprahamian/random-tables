import { useState, ChangeEvent } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { messageFailure } from "../util/userMessage";

export interface ImportModalProps {
  show: boolean;
  onSubmit: (json: string) => void;
  onCancel: () => void;
}

export function ImportModal({ show, onSubmit, onCancel }: ImportModalProps) {
  const [jsonText, setJsonText] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setDisabled(true);
    try {
      if (e?.target?.files?.length === 1) {
        const text = await loadFile(e.target.files[0]);
        setJsonText(text);
      }
    } catch (e) {
      messageFailure("Something went wrong");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>Import a Table</Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Enter the JSON for your Modal here:</Form.Label>
          <Form.Control
            as="textarea"
            value={jsonText}
            disabled={disabled}
            onChange={(e) => setJsonText(e.target.value)}
          />
          <Form.File
            accept=".json"
            disabled={disabled}
            onChange={onFileUpload}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={disabled} onClick={onCancel}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={disabled}
          onClick={(e) => onSubmit(jsonText)}
        >
          Import
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function loadFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const result = e?.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject();
      }
    });
    reader.addEventListener("error", reject);
    reader.addEventListener("abort", reject);
    reader.readAsText(file);
  });
}
