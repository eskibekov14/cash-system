## Getting started

1) Build dependencies
```
mvn clean install
```

### postgresql
```
sed -i -e 's/\r$//' ./docker-compose/postgres/init-db.sh
```

