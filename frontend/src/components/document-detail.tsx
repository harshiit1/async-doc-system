import { useEffect, useState } from "react";
import "../App.css";

export default function DocumentDetail({
  docId,
  onClose,
}: {
  docId: number;
  onClose: () => void;
}) {
  const [data, setData] = useState<any>(null);
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_BASE}/document/${docId}`)
      .then((res) => res.json())
      .then(setData);
  }, [docId]);

  if (!data) return null;

  const { result } = data;

  const handleSave = async () => {
    await fetch(`${API_BASE}/document/${docId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
    const res = await fetch(`${API_BASE}/document/${docId}`);
    const updated = await res.json();
    setData(updated);
    alert("Saved!");
    onClose();
  };

  const handleFinalize = async () => {
    await fetch(`${API_BASE}/document/${docId}/finalize`, {
      method: "PUT",
    });
    alert("Finalized!");
    const res = await fetch(`${API_BASE}/document/${docId}`);
    const updated = await res.json();
    setData(updated);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">Document Detail</div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Form */}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="input"
            value={result.title}
            onChange={(e) =>
              setData({
                ...data,
                result: { ...result, title: e.target.value },
              })
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <input
            className="input"
            value={result.category}
            onChange={(e) =>
              setData({
                ...data,
                result: { ...result, category: e.target.value },
              })
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label">Summary</label>
          <textarea
            className="textarea"
            value={result.summary}
            onChange={(e) =>
              setData({
                ...data,
                result: { ...result, summary: e.target.value },
              })
            }
          />
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button
            className="btn btn-primary"
            disabled={result.final_result === true}
            onClick={() => {
              handleSave();
            }}
          >
            {result.final_result ? "Saved & Locked" : "Save"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleFinalize();
            }}
            disabled={result.final_result === true}
          >
            {result.final_result ? "Finalized" : "Finalize"}
          </button>
        </div>

        {/* Export Links */}
        <a
          className="link"
          href={`${API_BASE}/document/${docId}/export/json`}
        >
          Export JSON
        </a>

        <a
          className="link"
          href={`${API_BASE}/document/${docId}/export/csv`}
        >
          Export CSV
        </a>
      </div>
    </div>
  );
}
