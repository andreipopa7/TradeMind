# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.declarative import declarative_base
# import os
#
# # Citește URL-ul bazei de date din variabilele de mediu
# DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/users_db")
#
# # Creează engine-ul pentru SQLAlchemy
# try:
#     engine = create_engine(
#         DATABASE_URL,
#         pool_size=10,            # Număr maxim de conexiuni
#         max_overflow=20,         # Conexiuni suplimentare când pool-ul este plin
#         pool_pre_ping=True,      # Verifică conexiunea înainte de utilizare
#         connect_args={"connect_timeout": 10}  # Timp maxim de așteptare
#     )
# except Exception as e:
#     print(f"Eroare la conectarea la baza de date: {e}")
#     raise
#
# # Creează sesiunea și baza
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()
#
# # Generator pentru sesiunea bazei de date
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     except Exception as e:
#         db.rollback()  # Revine la starea inițială în caz de eroare
#         raise
#     finally:
#         db.close()
#
# def init_db():
#     Base.metadata.create_all(bind=engine)


from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Conexiunea la baza de date
DATABASE_URL = "postgresql://user:password@db:5432/users_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Inițializează schema bazei de date
def init_db():
    from ..entities.user_entity import UserEntity  # Importă modelul pentru a-l include în metadata
    Base.metadata.create_all(bind=engine)
