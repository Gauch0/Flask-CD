FROM python:3.9-alpine
WORKDIR /usr/src/
RUN apk update \
    && apk add --no-cache \
       gcc \
       musl-dev \
       python3-dev \
       mariadb-dev \
       libffi-dev \
       openssl-dev \
       mariadb-connector-c

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN addgroup -S python && adduser -S -u 1000 -G python python

USER python

CMD ["python", "run.py"]