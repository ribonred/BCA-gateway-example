## spin up mysql for local development
[docker mysql](mysql/README.md)

### command run knex migrations local
```shell
NODE_ENV=localhost npx knex migrate:latest
```
### command run knex seed local
```shell
NODE_ENV=localhost npx knex seed:run
```
### command run knex migrations development
```shell
npx knex migrate:latest
```
### command run knex seed development
```shell
npx knex seed:run
```

### note
you may want to replace the seeds file in ci for production, 
because the value of acquirer or admin may not change