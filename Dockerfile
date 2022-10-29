FROM node:latest as builder
WORKDIR /react
COPY frontend /react
RUN pwd && ls -a .
RUN npm install
RUN npm run build

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
# COPY user_auth /code/user_auth
RUN mkdir /code/workers
COPY workers /code/workers
RUN mkdir /code/WorkersPayroll
COPY WorkersPayroll /code/WorkersPayroll
RUN mkdir /code/frontend
COPY frontend /code/frontend
COPY manage.py /code/
COPY gen_data.py /code/
COPY bootstrap.py /code/
COPY gen_token.py /code/
RUN python ./gen_token.py
RUN ./manage.py makemigrations workers payroll
RUN	./manage.py migrate
RUN	./manage.py shell < bootstrap.py
RUN	./manage.py shell < gen_data.py
COPY --from=builder /react/build/static /code/frontend/static/
COPY --from=builder /react/build/index.html /code/frontend/templates/
COPY --from=builder /react/build/favicon.ico /code/frontend/templates/
COPY --from=builder /react/build/manifest.json /code/frontend/templates/
RUN ls /code/frontend/static
EXPOSE 8000
ENTRYPOINT [ "python" ]
CMD ["manage.py", "runserver", "0.0.0.0:8000"]