import { useEffect, useState } from "react";
import { get_jobs } from "../services/api";
import "../App.css";
import DocumentDetail from "./document-detail";
interface Job {
  id: number;
  document_id: number;
  status: string;
  progress: number;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const statusOptions = [
    { value: "", label: "All" },
    { value: "Processing", label: "Processing" },
    { value: "Completed", label: "Completed" },
    { value: "Failed", label: "Failed" },
  ];
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await get_jobs(statusFilter);
        const jobsData = res.data || res;
        setJobs(jobsData);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    };
    loadJobs();
  }, [statusFilter]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/websocket");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setJobs((prev) => {
        const jobExists = prev.some(
          (job) => Number(job.document_id) === Number(data.document_id),
        );

        if (!jobExists) {
          const newJob = {
            ...data,
            id: data.id || `temp-${data.document_id}`,
          };
          return [newJob, ...prev];
        }

        return prev.map((job) =>
          Number(job.document_id) === Number(data.document_id)
            ? {
                ...job,
                status: data.status,
                progress: data.progress,
              }
            : job,
        );
      });
    };
    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, []);

  return (
    <div>
      <hr className="divider" />
      <h2>Jobs Dashboard</h2>
      <div className="section-container">
        <p className="section-label">Jobs</p>

        <div className="status-filter">
          <label htmlFor="status-filter" className="status-label">
            Status
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-select"
          >
            {statusOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {jobs.length === 0 ? (
        <p className="empty-state">No jobs found.</p>
      ) : (
        <>
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-header">
                <div>
                  <div className="job-meta">
                    Document Id · {job.document_id}
                  </div>
                </div>

                <span className="badge b-running">{job.status}</span>
              </div>

              <div className="progress-row">
                <div className="track">
                  <div
                    className="fill"
                    style={{
                      width: `${job.progress}%`,
                      background: "#378ADD",
                      transition: "width 0.5s ease-in-out",
                    }}
                  />
                </div>

                <span className="pct">{job.progress}%</span>
                <button className="view-detail-btn" onClick={() => setSelectedDoc(job.document_id)}>
                  View Details
                </button>
                {selectedDoc === job.document_id && (
                  <>
                    <DocumentDetail
                      docId={selectedDoc}
                      onClose={() => setSelectedDoc(null)}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
