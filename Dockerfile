FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
RUN mkdir /code/api
COPY api /code/api
RUN mkdir /code/payroll
COPY payroll /code/payroll
RUN mkdir /code/user_auth
COPY user_auth /code/user_auth
RUN mkdir /code/workers
COPY workers /code/workers
RUN mkdir /code/WorkersPayroll
COPY WorkersPayroll /code/WorkersPayroll
COPY manage.py /code/
COPY gen_data.py /code/
COPY bootstrap.py /code/
COPY gen_token.py /code/
RUN python ./gen_token.py
RUN . .env ;echo JWTKEY
RUN pwd && ls -lah .
RUN pwd && ls -lah /code/
RUN ./manage.py makemigrations workers payroll
RUN	./manage.py migrate
RUN	./manage.py shell < bootstrap.py