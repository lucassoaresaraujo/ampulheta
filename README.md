# Sistema Ampulheta

[Demo video](https://youtu.be/R8T7Kv3XJro)

## Requirements

#### [Node](https://nodejs.org/en/download/)

```
Node v10.15.x
```

#### [Yarn](https://yarnpkg.com/lang/pt-br/docs/install/#debian-stable)

> If you wish, you can use the equivalent commands in NPM

#### [PostgreSQL](https://www.postgresql.org/download/)

Installation via docker is recommended with the command below:

````
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres```
````

## Installation

The steps below will help you to install and configure the project correctly

#### 1. Download the project

```
git clone http://git.vibbra.com.br/candidatos/LucasSoaresAraujo.git
```

#### 2. Install the project libraries

Within the project folder, run the following command:

```
yarn
```

#### 3. Database creation

In postgres, create the database for application

#### 4. Dotenv configuration

At the root of the project, create a new file called `.env` and copy the contents of the`.env.example` file into it.

Adjust Postgres settings, for example:

```
# Database
DATABASE_HOST=localhost
DATABASE_NAME=vibbra
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=pgsql
DATABASE_PORT=5432

```

#### 5. Deploy in development environment

```
yarn start:dev
```

## Documentation

In the development environment, you can access the api documentation at the following address: `http://localhost:3000/api/v1/docs/`
