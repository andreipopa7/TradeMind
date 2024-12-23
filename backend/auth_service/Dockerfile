FROM python:3.10-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir grpcio grpcio-tools fastapi pydantic sqlalchemy psycopg2-binary passlib bcrypt

CMD ["python", "auth_server.py"]
