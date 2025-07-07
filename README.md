# OHOS

[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

## Setting up a local build

Local development is done in Docker.

Note: Fabric and Plaform.sh are temporary provisions to pull data and media.

Convenience commands have been added to `fabfile.py` to help you interact with the various services. But, for any of these commands to work, you must first [install Fabric](https://www.fabfile.org/installing.html).

Alternatively, install fabric in a python virtual environment.

### Install platform.sh CLI

Check with team to have your username, email configured in Platform.sh and create API-Token

https://docs.platform.sh/administration/cli.html

CLI is used to pull data and media from Platform.sh.

### Before starting a build for the first time

Get the development `.env` from team

```sh
cp .env.example .env
```

### 1. Build and start Docker containers

```sh
fab start
```

This command takes care of the following:

1. Building all of the necessary Docker containers
2. Starting all of the necessary Docker containers
3. Installing any new python dependencies
4. Collect static assets
5. Starts development server

Pull data

```sh
fab pull-staging-data
```

Pull media

```sh
fab pull-staging-media
```

### 2. Access the site

<http://127.0.0.1:8002>

### 3. Access the Wagtail admin

Navigate to the admin URL in your browser, and sign in using the username/password combination you chose in the previous step or created via docer-compose.yml

<http://127.0.0.1:8002/admin/>

### 4. Compile the front-end assets

```sh
docker compose exec web tna-node compile
```

### 5. Run tests

```sh
docker compose exec dev poetry run python3 manage.py test
```

### 6. Format, Sort

```sh
docker compose exec dev format
docker compose exec dev poetry run isort .
```

### 7. Feature/Fix/Chore work

Create ticket branch off `ds-ohos-wagtail:ohos`

### 8. Deploy OHOS

Merge PR into `ds-ohos-wagtail:ohos`

## Linux / OSX

If you are running a Unix based operating system, these alias commands may be useful to you to run inside the Docker container.
