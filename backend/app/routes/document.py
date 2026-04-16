from fastapi import APIRouter, Body
from app.db import sessionLocal
from sqlalchemy.orm import Session
from app import models
import io
import csv
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.get("/document/{document_id}")
def get_document(document_id:int):
    db:Session = sessionLocal()

    doc = db.query(models.Document).filter(models.Document.id == document_id).first()
    result = db.query(models.Result).filter(models.Result.document_id == document_id).first()

    return {
         "document": {
            "id": doc.id,
            "filename": doc.filename,
        } if doc else None,
        "result": {
            "title": result.title,
            "category": result.category,
            "summary": result.summary,
            "final_result": result.final_result,
        } if result else None
    }

@router.put("/document/{document_id}")
def update_document(document_id:int, data:dict = Body(...)):
    db:Session = sessionLocal()

    result = db.query(models.Result).filter(models.Result.document_id == document_id).first()

    result.title = data.get("title")
    result.category = data.get("category")
    result.summary = data.get("summary")

    db.commit()
    db.refresh(result)
    return {  
        "title": result.title,
        "category": result.category,
        "summary": result.summary,
        "final_result": result.final_result,
        }

@router.put("/document/{document_id}/finalize")
def finalize_document(document_id:int):
    db:Session = sessionLocal()

    result = db.query(models.Result).filter(models.Result.document_id == document_id).first()
    result.final_result = True
    db.commit()

    return {
        "message":"Finalized"
    }

@router.get("/document/{document_id}/export/json")
def export_json(document_id:int):
    db:Session = sessionLocal()

    result = db.query(models.Result).filter(models.Result.document_id == document_id).first()

    return result.__dict__

@router.get("/document/{document_id}/export/csv")
def export_csv(document_id:int):
    db:Session = sessionLocal()

    result = db.query(models.Result).filter(models.Result.document_id == document_id).first()

    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow(["title","category","summary"])
    writer.writerow([result.title, result.category, result.summary])

    output.seek(0)

    return StreamingResponse(output,media_type="text/csv")
