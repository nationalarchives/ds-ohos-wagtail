# OHOS

[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

## Setting up a local build

Local development is done in Docker.

Note: Fabric and Plaform.sh are temporary provisions to pull data and media.

Convenience commands have been added to `fabfile.py` to help you interact with the various services. But, for any of these commands to work, you must first [install Fabric](https://www.fabfile.org/installing.html).

Alternatively, install fabric in a python virtual environment and run from the activated environment.

### Install platform.sh CLI

Check with team to have your username, email configured in Platform.sh and create API-Token

https://docs.platform.sh/administration/cli.html

CLI is used to pull data and media from Platform.sh.

## Before starting a build for the first time

Get the development `.env` from team

```sh
cp .env.example .env
```

`.env` hold sensitive values. Please ask on the `ds-etna-dev` slack channel to get those values.

## Build and start Docker containers

```sh
docker compose up -d
```

## Pull data, media from Platform.sh

```sh
fab pull-staging-data
```

```sh
fab pull-staging-media
```

## Access the site

<http://127.0.0.1:8002>

## Access the Wagtail admin

Navigate to the admin URL in your browser, and sign in using the username/password combination created via docker-compose.yml

<http://127.0.0.1:8002/admin/>

## Compile the front-end assets

```sh
docker compose exec web tna-node compile
```

## Run tests

```sh
docker compose exec dev poetry run python manage.py test
```

## Format, Sort

```sh
docker compose exec dev format
```

```sh
docker compose exec dev poetry run isort .
```

## Feature/Fix/Chore work

Create ticket branch off `ds-ohos-wagtail:ohos`

## Deploy OHOS

Merge PR into `ds-ohos-wagtail:ohos`

## Linux / OSX

If you are running a Unix based operating system, these alias commands may be useful to you to run inside the Docker container.
