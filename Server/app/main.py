from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.API.CourseAPI import router as CourseRoute

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # later restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(CourseRoute)