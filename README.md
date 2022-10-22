# Workers Payroll

[![Workers Payroll][product-screenshot]](screens/screen_1.png)

## Distinctiveness and Complexity
Applications for support payroll management in event/rental company. App has two diferent view for workers and for administratos:

### Worker View:
* Report - display worker month report 

### Admin View:
* Users - managing users / workers
  * Adding new user
  * Edit user
  * Delete user
* Work Scheluder
  * Adding events
    * workers for working event day
  * Edit events
  * Delete events

## Backend
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

On backed application utilize Django:
- django orm - for berrer and simpler db managements  
- models
- json views
- pyjwt - library for encode and decode jwt tokens

## Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

On frontend application utilize javasript
- TypeScrpt - For catch errors early in editor not in runtime
- React.js - Popular js library for building user interface
- Tailwing css - for better support of css smoller bundel size.

## Files - Folders

- api - django app for application api utilzed by frontend
    - api/tests.py - tests for api endpoints
    - api/urls.py - main api endpoints
- frontend - django app for react frontend
    - frontend/src - source files for react frontend part.
- payroll - django app responsible for manage event / event work days
- screens - application screenshots
- workers - django application responsible for menaging workers / users
- WorkersPayroll - 
    - backends.py - 
    - deckoratos.py - 
    - defaults.py -
    - generic_views.py -
- bootstrap.py - 
- gen_data.py -
- gen_token.py - 

## Install Instructions

### Short way - docker:



[product-screenshot]: screens/screen_1.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Django]: https://img.shields.io/badge/Django-Web%20framework.-green
