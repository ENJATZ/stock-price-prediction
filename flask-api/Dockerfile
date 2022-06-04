FROM python:2.7.18-stretch

WORKDIR /spp/flask-app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD gunicorn main:app