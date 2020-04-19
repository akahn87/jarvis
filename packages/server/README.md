# GraphQL Server

A GraphQL server made with PostgreSQL and Redis

## Setup

1. Start a PostgreSQL server

2. Create database called `jarvis`

```
createdb jarvis
```

3. [Add a user](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)
   with the username `postgres` and and no password. (You can change what these
   values are in the
   [ormconfig.json](https://github.com/akahn87/jarvis/blob/master/packages/server/server/ormconfig.json))
4. Install and start Redis

```
docker run --name my-redis -p 6379:6379 -d redis
```
