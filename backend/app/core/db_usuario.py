from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from core.config import DB_CONFIG

USER_DATABASE_URL = (
    f"mysql+pymysql://{DB_CONFIG['USER']}:{DB_CONFIG['PASSWORD']}"
    f"@{DB_CONFIG['HOST']}:{DB_CONFIG['PORT']}/{DB_CONFIG['DATABASE']}"
)

# Cria o engine
engine = create_engine(USER_DATABASE_URL)

# Cria a sessão
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()
