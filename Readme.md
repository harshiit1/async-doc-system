# Async Document Processing Workflow System

## Overview

This project is a full-stack asynchronous document processing system built with FastAPI, React, Celery, Redis, and PostgreSQL.

It allows users to upload documents, process them in the background, track real-time progress, review/edit extracted data, and export final results.

---

## Tech Stack

* Frontend: React (TypeScript, Vite)
* Backend: FastAPI (Python)
* Database: PostgreSQL
* Background Processing: Celery
* Messaging: Redis (Pub/Sub)

---

## Architecture

* Upload triggers async job via Celery
* Worker processes document in stages
* Progress events published via Redis Pub/Sub
* FastAPI WebSocket streams updates to frontend
* PostgreSQL stores documents, jobs, and results

---

## Workflow

1. Upload document
2. Job queued
3. Parsing stage
4. Extraction stage
5. Result stored
6. User reviews & edits
7. Finalization
8. Export (JSON / CSV)

---

## Features

* Async background processing
* Real-time progress tracking (WebSocket)
* Document dashboard with filters
* Editable extracted results
* Finalization workflow
* Retry failed jobs
* Export to JSON and CSV

---

## Run with Docker

```bash
docker-compose up --build
```

---

## Run Locally

Backend:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Worker:

```bash
celery -A celery_worker.celery worker --loglevel=info --pool=solo
```

Frontend:

```bash
npm install
npm run dev
```

---

## Assumptions

* Processing logic is simulated
* File storage is local
* No authentication implemented

---

## Improvements (Future Work)

* Authentication & user roles
* File storage (S3)
* Large file streaming
* Retry idempotency
* Job cancellation

---

## Demo Video
https://drive.google.com/file/d/1R7tILT931SF-p489RCKI-zwlBLH3bnEW/view?usp=sharing
---

## AI Usage

AI tools were used for guidance in structuring the system and accelerating development.

