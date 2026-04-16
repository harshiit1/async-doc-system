from sqlalchemy import Column, Integer, ForeignKey, String, Boolean
from app.db import Base

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_type= Column(String)
    size = Column(Integer)
    status = Column(String, default="Queued")

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True)
    document_id = Column(Integer, ForeignKey("documents.id"))
    status = Column(String)
    progress = Column(Integer, default=0)

class Result(Base):
    __tablename__ = "result"
    id= Column(Integer, primary_key=True)
    document_id = Column(Integer)
    title = Column(String)
    category = Column(String)
    summary = Column(String)
    final_result = Column(Boolean, default=False)
