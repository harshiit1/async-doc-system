from fastapi import APIRouter, Query, Response
from app.db import sessionLocal
from sqlalchemy.orm import Session
from app import models
from celery_worker import process_document

router = APIRouter()

@router.post("/jobs/{doc_id}/retry")
def retry_job(doc_id:int):
    process_document.delay(doc_id)
    return {"message":"Retry Triggered"}


@router.get("/jobs")
def get_jobs(
    status: str = Query(None),
    search: str = Query(None),
):
    db: Session = sessionLocal()
    query = db.query(models.Job)

    if status:
        query = query.filter(models.Job.status == status)

    jobs = query.all()

    return jobs

@router.delete("/deletejobs")
def delete_all_jobs():
    db: Session = sessionLocal()
    try:
        # Delete all rows in the jobs table
        db.query(models.Job).delete()
        db.commit()
        return Response()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()