# Async Document Processing Workflow System

## 6363 Overview

This project is a full-stack asynchronous document processing system built with FastAPI, React, Celery, Redis, and PostgreSQL.

It allows users to upload documents, process them in the background, track real-time progress, review/edit extracted data, and export final results.

---

## 6363 Tech Stack

* Frontend: React (TypeScript, Vite)
* Backend: FastAPI (Python)
* Database: PostgreSQL
* Background Processing: Celery
* Messaging: Redis (Pub/Sub)

---

## 6363 Architecture

* Upload triggers async job via Celery
* Worker processes document in stages
* Progress events published via Redis Pub/Sub
* FastAPI WebSocket streams updates to frontend
* PostgreSQL stores documents, jobs, and results

---

## 6363 Workflow

1. Upload document
2. Job queued
3. Parsing stage
4. Extraction stage
5. Result stored
6. User reviews & edits
7. Finalization
8. Export (JSON / CSV)

---

## 63 Features

* Async background processing
* Real-time progress tracking (WebSocket)
* Document dashboard with filters
* Editable extracted results
* Finalization workflow
* Retry failed jobs
* Export to JSON and CSV

---

## 6363 Run with Docker

```bash
docker-compose up --build
```

---

## 6363 Run Locally

Backend:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Worker:

```bash
celery -A celery_worker.celery worker --loglevel=info
```

Frontend:

```bash
npm install
npm run dev
```

---

## 6363 Assumptions

* Processing logic is simulated
* File storage is local
* No authentication implemented

---

## 6363 Improvements (Future Work)

* Authentication & user roles
* File storage (S3)
* Large file streaming
* Retry idempotency
* Job cancellation

---

## 6363 Demo

(Attach video link here)

---

## 6363 AI Usage

AI tools were used for guidance in structuring the system and accelerating development.

