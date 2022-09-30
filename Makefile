bootstrap:
	./manage.py makemigrations workers payroll
	./manage.py migrate
	./manage.py shell < bootstrap.py
	# ./manage.py shell < gen_data.py


reset:
	rm -f db.sqlite3
	find . -name "migrations" -exec rm -rf "{}" \;

data:
	./manage.py shell < gen_data.py

run:
	./manage.py runserver

test:
	./manage.py test -v 2 

format:
	black .