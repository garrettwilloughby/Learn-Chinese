Hi! Welcome to my chinese flashcard app.

My project notes:

Using a virtual env
pip install virtualenv
source myenv/bin/activate
deactivate

SERVER NEEDS TO BE RUNNING TO ACCESS DATABASE
To start the server:
python manage.py runserver

To get into the database:
psql postgres
\l or \list -> list all databases
\q -> quit
\c database -> connect to a database
\dt see all tables in the database

CREATE USER myuser WITH PASSWORD 'password';

brew services start postgresql
brew services restart postgresql@14

When making changes to the database:
python manage.py makemigrations
python manage.py migrate
