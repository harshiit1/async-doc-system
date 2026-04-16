from app.db import sessionLocal
from sqlalchemy.orm import Session
from app import models
from celery import Celery
import time
import redis
import json
import os
celery = Celery(
    "worker",
    broker=os.getenv("REDIS_URL"),            
    backend=os.getenv("REDIS_URL")
)

redis_client = redis.from_url(os.getenv("REDIS_URL"))


# @celery.task
# def process_document(doument_id):
#     print(f"Processing document {doument_id}")

#     time.sleep(5)

#     return "done"

def update_job(document_id, status, progress):
    db:Session = sessionLocal()
    doc = db.query(models.Document).filter(models.Document.id == document_id).first()
    doc.status = status
    job = db.query(models.Job).filter(models.Job.document_id == document_id).first()
    if job:
        job.status = status
        job.progress = progress

    db.commit()
    db.close()

@celery.task
def process_document(document_id):
    db:Session = sessionLocal()

    job = models.Job(document_id=document_id, status="Processing", progress=0)
    db.add(job)
    db.commit()
    db.close()

    #progress 1
    update_job(document_id, "Processing", 10)
    publish_event(document_id,"Parsing Started",10)
    time.sleep(2)

    #progress 2
    update_job(document_id, "Processing", 40)
    publish_event(document_id, "Parsing Completed", 40)
    time.sleep(2)
    
    #progress 3
    update_job(document_id, "Processing", 70)
    publish_event(document_id, "Extraction Started", 40)
    time.sleep(2)

    #Final Progress
    update_job(document_id, "Completed", 100)
    publish_event(document_id, "Job Completed", 100)
    time.sleep(2)
    
    db:Session = sessionLocal()
    result = models.Result(
        document_id = document_id,
        title = "Sample Title",
        category = "General",
        summary = "This is extracted Summary"
    )

    db.add(result)
    doc = db.query(models.Document).filter(models.Document.id == document_id).first()
    doc.status = "Completed"

    doc = db.query(models.Job).filter(models.Job.document_id == document_id).first()
    job.status = "Completed"
    job.progress = 100

    db.commit()
    db.close()

    print("Job Completed")


def publish_event(doc_id, status, progress):
    event = {
        "document_id":doc_id,
        "status":status,
        "progress":progress
    }
    
    redis_client.publish("job_updates", json.dumps(event))
