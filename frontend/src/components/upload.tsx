import { useState, useRef, useEffect } from "react";
import { export_doc } from "../services/api";
import "../App.css";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUpload = async () => {
    if (!file) return;
    const res = await export_doc(file);
    alert("Uploaded Document id: " + res.doc_id);
  };
  useEffect(() => {
    console.log("API:", import.meta.env.VITE_API_URL);
    console.log("WS:", import.meta.env.VITE_WS_API_URL);
  });
  return (
    <div>
      <p className="section-label">Upload document</p>
      <div
        className="drop-zone"
        id="drop-zone"
        onClick={() => inputRef.current?.click()}
      >
        <div className="drop-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12M8 8l4-4 4 4" />
          </svg>
        </div>
        <p className="drop-title">Drop a file here or click to browse</p>
        <p className="drop-sub">PDF, DOCX, TXT — up to 50 MB</p>
        {file && (
          <div id="file-pill-wrap">
            <span>{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
      <input
        type="file"
        id="file-input"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button className="submit-btn" id="submit-btn" onClick={handleUpload}>
        Submit job
      </button>
    </div>
  );
}
