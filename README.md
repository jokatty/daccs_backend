# REST API DACCS application

Provides a REST API to DACCS React application.
The entire application is contained within the index.mjs file.

## Installation and setup

You should have PostgreSQL installed in your local machine.

- Create your db:
  `createdb my_db_name`
- Create the tables:
  `psql -d my_db_name -f init_tables.sql`
- Create the seed data:
  `psql -d my_db_name -f seed.sql`

## Get user data

`GET /`

Response:

```
[
{
"id": 1,
"user_name": "name",
"bank_account": "ACC123NO4",
"user_address": "some address",
"email": "user@example.com",
"phone": "01234567"
}
]
```

## Update user details:

`POST /update`
