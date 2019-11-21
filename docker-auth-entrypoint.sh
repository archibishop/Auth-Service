#!/bin/bash
echo "starting server."
echo "Waiting for Db to be ready, On AWS this is required."
while !</dev/tcp/db/5432;
do
    echo "Database not ready to recieve connections"
    sleep 1;
done;
echo "Run migrations."
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
echo "Run the start command."
npm run start

