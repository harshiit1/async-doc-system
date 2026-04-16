from fastapi import APIRouter, UploadFile, File
from celery_worker import process_document
from sqlalchemy.orm import Session
from app.db import sessionLocal
from app import models

router = APIRouter()

@router.post("/upload")
async def upload_file(file:UploadFile = File(...)):
    db: Session = sessionLocal()

    content = await file.read()
    doc = models.Document(
        filename=file.filename,
        file_type=file.content_type,
        size=len(content),
        status="Queued"
    )
    db.add(doc)
    db.commit()

    process_document.delay(doc.id)

    db.refresh(doc)

    return {
        "message": "Uploaded", 
        "doc_id":doc.id
    }