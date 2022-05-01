bootstrap:
	./manage.py makemigrations workers user_auth payroll
	./manage.py migrate
	./manage.py createsuperuser
	./manage.py shell < bootstrap.py


reset:
	rm -f db.sqlite3
	find . -name "migrations" -exec rm -rf "{}" \;


run:
	./manage.py runserver