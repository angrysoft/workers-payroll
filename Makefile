bootstrap:
	./manage.py makemigrations workers user_auth payroll
	./manage.py migrate
	./manage.py shell < bootstrap.py
	./manage.py createsuperuser


reset:
	rm -f db.sqlite3
	find . -name "migrations" -exec rm -rf "{}" \;


run:
	./manage.py runserver

test:
	./manage.py test