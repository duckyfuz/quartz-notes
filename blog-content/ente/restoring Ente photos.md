#### restarting Ente servers
we want to ensure that postgres is up and running, then move our `backup.dump` file into the docker container
```
docker-compose up -d
docker cp dumpfile.dump ente-photos-postgres-1:/tmp/dumpfile.dump
```

#### resetting the db
```
docker exec -it ente-photos-postgres-1 psql -U pguser -d postgres
DROP DATABASE ente_db;
CREATE DATABASE ente_db;
```

#### re-creating entries
```
docker exec -it ente-photos-postgres-1 bash
pg_restore -U pguser -d ente_db /tmp/dumpfile.dump
pg_restore -U pguser -d ente_db --clean /tmp/dumpfile.dump
exit
```

#### cleanup (optional)
```
docker exec ente-photos-postgres-1 rm /tmp/dumpfile.dump
```
