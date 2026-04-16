from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:password@localhost:5432/docdb"

engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(bind=engine)

Base = declarative_base()