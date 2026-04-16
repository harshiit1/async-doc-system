const API_BASE = "http://localhost:8000";

export const export_doc = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const get_jobs = async (status?: string) => {
  const url = status
    ? `${API_BASE}/jobs?status=${encodeURIComponent(status)}`
    : `${API_BASE}/jobs`;
  const res = await fetch(url);
  return res.json();
};
