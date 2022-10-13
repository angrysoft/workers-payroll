#!/usr/bin/python

from secrets import token_urlsafe


with open("WorkersPayroll/keys.py", "w") as out:
    out.write(f'JWTKEY = "{token_urlsafe(50)}"\n')
    out.write(f'SECRET_KEY = "{token_urlsafe(50)}"\n')

