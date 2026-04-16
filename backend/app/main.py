from fastapi import FastAPI
from app.routes.upload import router as uploadRouter
from app.routes.jobs import router as jobsRouter
from app.routes.webSocket import router as webSocketRouter 
from app.routes.document import router as documentRouter
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],   
)
app.include_router(uploadRouter)
app.include_router(jobsRouter)
app.include_router(webSocketRouter)
app.include_router(documentRouter)



# from app.db import Base, engine
# Base.metadata.create_all(bind=engine)
