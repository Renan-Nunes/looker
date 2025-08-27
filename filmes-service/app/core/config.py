from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()  # lê o .env

class Settings(BaseSettings):
    DATABASE_URL: str

    class Config:
        env_file = "../../.env"

settings = Settings()

# Limpa espaços e caracteres invisíveis
settings.DATABASE_URL = settings.DATABASE_URL.strip()

print(f"url limpa: {repr(settings.DATABASE_URL)}")
