FROM python:3.12-slim

WORKDIR /user_service

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . /user_service

# Setează PYTHONPATH
ENV PYTHONPATH="/user_service"

EXPOSE 8000

CMD ["sh", "-c", "python3 init_db.py"]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
