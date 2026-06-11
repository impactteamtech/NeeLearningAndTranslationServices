import os 
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


#load the env
load_dotenv()

database_url = os.getenv("DATABASE_URL")
#creating the engine
engine = create_engine(database_url, echo=True)

#creating a session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback() #if no transaction is in progress it keeps going
        raise
    finally:
        db.close()
