# nutristack
Keep track of your supplements with NutriStack.

## Tech Overview

Simplified overview of project's tech stack:

* **Client Side**
  * Angular
  * Angular UI Router
  * Materialize (CSS)
* **Server Side**
  * Node
  * Express
  * Postgres
  * Sequelize

## Style

Using the Angular team approved style guide by John Papa. App was designed with modularity and code reuse in mind.

[Angular Style Guide](http://www.johnpapa.net/angular-style-guide/)

General JavaScript code styling was following the industry-approved Airbnb method.

[Airbnb Style Guide](https://github.com/airbnb/javascript)

## Database

> ***Important***: Please follow the directions in order to setup the necessary local user and PostgreSQL database - proper local functionality and testing relies on this.

***To setup your database locally:***

1. Install ***Postgres.app***
  * full-featured PostgreSQL installation w/ `psql` CLI
  * http://postgresapp.com/
2. Install ***Postico*** *_[optional]_*
  * PostgreSQL Client for OSX aka GUI
  * https://eggerapps.at/postico/
3. Use ***psql***, the Postgres CLI, to create needed database and authorized user
  1. From your terminal, enter `psql` and hit enter
  2. Now that `psql` is running, go ahead and create the user
    * `CREATE USER admin WITH SUPERUSER;`
    * `ALTER USER admin WITH PASSWORD 'admin';`
    * `SET ROLE admin;`
    * `CREATE DATABASE nutristack;`
4. Double check that your ***Postgres.app*** is running from your OSX toolbar, it should indicate that the port you are using is ***5432***
5. You're successfully setup for Postgres to use ***nutristack***!
