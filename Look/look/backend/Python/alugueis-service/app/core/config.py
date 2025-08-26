from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    FILMES_SERVICE_URL: str
    USUARIOS_SERVICE_URL: str

    class Config:
        env_file = ".env"

settings = Settings()