from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from app.Config.Config import setting

password = setting.DB_PASSWORD

url = f"postgresql://postgres:{password}@localhost:5432/feepilot"
engine = create_engine(url)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()