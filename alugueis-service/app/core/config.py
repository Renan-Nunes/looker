from pydantic_settings import BaseSettings
from typing import Optional
from dotenv import load_dotenv  
import os

load_dotenv()
os.getenv("DATABASE_URL")
os.getenv("FILMES_SERVICE_URL")
os.getenv("USUARIOS_SERVICE_URL")


class Settings(BaseSettings):
    DATABASE_URL: str
    FILMES_SERVICE_URL: Optional[str] = None
    USUARIOS_SERVICE_URL: Optional[str] = None
    
    class Config:
        env_file = ".env"

settings = Settings()