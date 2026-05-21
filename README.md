# OHOS

## Setting up a local build

Local development is done in Docker.

## Before starting a build for the first time

Get the development `.env` from team

```sh
cp .env.example .env
```

`.env` hold sensitive values. Please ask on the `ds-etna-dev/rae-ohos` slack channel to get those values.

Get the database dump from team and copy to `database_dumps/` folder

`database_dumps/datafile.sql`

## Build and start Docker containers

```sh
docker compose up -d
```

## Import data

Import Wagtail data dump (provided by the platform team) into the local database

```sh
docker-compose exec -T db psql -U postgres < database_dumps/datafile.sql
```

Create Django Admin user

```sh
docker compose exec app poetry run python manage.py createsuperuser
```

## Access the site

<http://127.0.0.1:8002>

## Access the Wagtail admin

Navigate to the admin URL in your browser, and sign in using the username/password combination created via docker-compose.yml

<http://127.0.0.1:8002/admin/>

## Run tests

```sh
docker compose exec app poetry run python manage.py test
```

## Format, Sort

```sh
docker compose exec app format
```

## Feature/Fix/Chore work

Create ticket branch off `ds-ohos-wagtail:main`

## Deploy OHOS

Merge PR into `ds-ohos-wagtail:main`

After merging to `main`, a release image is automatically built and published:

- Release images: `https://github.com/nationalarchives/ds-ohos-wagtail/tags`

Once the image is available:

1. Notify the team in the channel `rae-ohos`
2. Confirm whether any database migrations need to be run
3. The team will deploy the image to AWS
4. After deployment, verify the changes on the hosted site

## Updating python dependencies

- Update version numbers in `pyproject.toml`
- If the app container is already running
  - Run `docker compose exec app poetry update`
- Alternatively, run `poetry update` on the docker host
- Alternatively, start a temporary app container to run the update:
  - Run `docker compose run --rm app poetry update`
  - Run `docker compose up -d --build app`

## Run migrations

```sh
docker compose exec app poetry run python manage.py makemigrations
docker compose exec app poetry run python manage.py migrate
```
