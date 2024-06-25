Using a virtual env
pip install virtualenv
source myenv/bin/activate
deactivate

To start the server:
python manage.py runserver

psql postgres
CREATE USER myuser WITH PASSWORD 'password';

brew services start postgresql
brew services restart postgresql@14

When making changes to the database:
python manage.py makemigrations
python manage.py migrate
