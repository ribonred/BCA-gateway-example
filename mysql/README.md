## Use to fire up mysql db at localhost:3306  for development
### use docker compose plugin
```
docker compose -f mysql/docker-compose.yaml up --build -d
```
### use docker compose
```
docker-compose -f mysql/docker-compose.yaml up --build -d
```
### destroy services
```
docker-compose -f mysql/docker-compose.yaml down
```
